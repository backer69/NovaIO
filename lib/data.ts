import fs from 'fs';
import path from 'path';
import { DatabaseSchema, RegistrationRecord, AdminCredentials, FinanceEntry, CalendarEvent } from './types';
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

// --- Supabase Check ---
const isSupabaseEnabled = () => {
    return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !!supabase;
}

// --- Local JSON Helpers ---
const readLocalDb = (): DatabaseSchema => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading local DB:', error);
        return { registrations: [], admins: [], finance: [], calendar: [] };
    }
};

const writeLocalDb = (data: DatabaseSchema) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing local DB:', error);
    }
};

// --- Hybrid Data Access Methods ---

export const getRegistrations = async (): Promise<RegistrationRecord[]> => {
    if (isSupabaseEnabled()) {
        try {
            const { data, error } = await supabase
                .from('registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            // Map Supabase rows to our types (converting snake_case to camelCase manually if needed, 
            // but for simplicity we kept schema somewhat consistent.
            // Note: Schema in SQL uses snake_case keys (first_name, last_name).
            // Our TS type uses camelCase or nested objects (personal.firstName).
            // We need a mapper here.

            return (data || []).map((row: any) => ({
                id: row.id,
                currentStep: 3, // Logic assumption: if in DB, it's complete
                personal: {
                    firstName: row.first_name,
                    lastName: row.last_name,
                    email: row.email,
                    phone: row.phone,
                },
                address: {
                    street: row.address_street || '',
                    city: row.address_city || '',
                    country: row.address_country || '',
                    zipCode: row.address_zip || '',
                },
                motivation: {
                    message: row.motivation
                },
                status: row.status as 'PENDING' | 'APPROVED' | 'REJECTED',
                createdAt: row.created_at,
                webinarLink: row.meet_link
            }));

        } catch (e) {
            console.warn('Falling back to local DB due to error');
            return readLocalDb().registrations;
        }
    }
    return readLocalDb().registrations;
}

export const addRegistration = async (registration: RegistrationRecord) => {
    if (isSupabaseEnabled()) {
        try {
            // Map domain model to DB row
            const row = {
                id: registration.id,
                first_name: registration.personal?.firstName,
                last_name: registration.personal?.lastName,
                email: registration.personal?.email,
                phone: registration.personal?.phone,
                address_street: registration.address?.street,
                address_city: registration.address?.city,
                address_country: registration.address?.country,
                address_zip: registration.address?.zipCode,
                motivation: registration.motivation?.message,
                status: registration.status,
                created_at: registration.createdAt
            };

            const { error } = await supabase.from('registrations').insert(row);
            if (error) throw error;
            return;
        } catch (e) {
            console.error('Supabase Write Failed, falling back to local:', e);
            // Fallthrough to local
        }
    }

    // Local Fallback
    const db = readLocalDb();
    db.registrations.push(registration);
    writeLocalDb(db);
}

export const getAdminByEmail = async (email: string): Promise<AdminCredentials | undefined> => {
    if (isSupabaseEnabled()) {
        try {
            const { data, error } = await supabase
                .from('admin_users')
                .select('*')
                .eq('email', email)
                .single();

            if (data) {
                return {
                    id: data.id,
                    email: data.email,
                    passwordHash: data.password_hash,
                    name: data.name
                };
            }
        } catch (e) {
            // ignore
        }
    }

    // Fallback
    const db = readLocalDb();
    return db.admins.find(admin => admin.email === email);
}

// --- Finance Methods ---

export const getFinanceEntries = async (): Promise<FinanceEntry[]> => {
    if (isSupabaseEnabled()) {
        try {
            const { data, error } = await supabase
                .from('finance_entries')
                .select('*')
                .order('date', { ascending: false });
            if (error) throw error;
            return (data || []).map((row: any) => ({
                id: row.id,
                type: row.type,
                amount: row.amount,
                category: row.category,
                description: row.description,
                date: row.date,
                createdAt: row.created_at
            }));
        } catch (e) {
            console.warn('Fallback to local finance');
        }
    }
    return readLocalDb().finance;
}

export const addFinanceEntry = async (entry: Omit<FinanceEntry, 'id' | 'createdAt'>) => {
    if (isSupabaseEnabled()) {
        try {
            const { error } = await supabase.from('finance_entries').insert(entry);
            if (error) throw error;
            return;
        } catch (e) {
            console.error('Supabase write failed', e);
        }
    }
    const db = readLocalDb();
    const newEntry: FinanceEntry = {
        ...entry,
        id: uuidv4(),
        createdAt: new Date().toISOString()
    };
    db.finance.push(newEntry);
    writeLocalDb(db);
}

// --- Calendar Methods ---

export const getCalendarEvents = async (): Promise<CalendarEvent[]> => {
    if (isSupabaseEnabled()) {
        try {
            const { data, error } = await supabase
                .from('calendar_events')
                .select('*')
                .order('start_at', { ascending: true });
            if (error) throw error;
            return (data || []).map((row: any) => ({
                id: row.id,
                title: row.title,
                startAt: row.start_at,
                endAt: row.end_at,
                meetLink: row.meet_link,
                createdAt: row.created_at
            }));
        } catch (e) {
            console.warn('Fallback to local calendar');
        }
    }
    return readLocalDb().calendar;
}

export const addCalendarEvent = async (event: Omit<CalendarEvent, 'id' | 'createdAt'>) => {
    if (isSupabaseEnabled()) {
        try {
            // Mapping to snake_case for supabase
            const row = {
                title: event.title,
                start_at: event.startAt,
                end_at: event.endAt,
                meet_link: event.meetLink
            };
            const { error } = await supabase.from('calendar_events').insert(row);
            if (error) throw error;
            return;
        } catch (e) {
            console.error('Supabase write failed', e);
        }
    }
    const db = readLocalDb();
    const newEvent: CalendarEvent = {
        ...event,
        id: uuidv4(),
        createdAt: new Date().toISOString()
    };
    db.calendar.push(newEvent);
    writeLocalDb(db);
}

// --- Dashboard Stats ---

export const getDashboardStats = async () => {
    const registrations = await getRegistrations();
    const finance = await getFinanceEntries();
    const calendar = await getCalendarEvents();

    const totalRevenue = finance
        .filter(e => e.type === 'INCOME')
        .reduce((sum, e) => sum + Number(e.amount), 0);

    const pendingRegistrations = registrations.filter(r => r.status === 'PENDING').length;

    // Logic for "active webinars": let's say events that haven't ended yet
    const now = new Date();
    const activeWebinars = calendar.filter(e => new Date(e.endAt) > now).length;

    return {
        totalRevenue,
        totalRegistrations: registrations.length,
        activeWebinars,
        pendingRegistrations
    };
}
