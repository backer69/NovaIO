module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[project]/lib/supabase.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase,
    "supabaseAdmin",
    ()=>supabaseAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
// Environment variables checks
const supabaseUrl = ("TURBOPACK compile-time value", "https://avwffulngozklvboiymh.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable_sxpq-Px6d5gNQ3i6A0frPQ_VdqalxKY");
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey) : "TURBOPACK unreachable";
const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceRoleKey) : null;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addCalendarEvent",
    ()=>addCalendarEvent,
    "addFinanceEntry",
    ()=>addFinanceEntry,
    "addRegistration",
    ()=>addRegistration,
    "getAdminByEmail",
    ()=>getAdminByEmail,
    "getCalendarEvents",
    ()=>getCalendarEvents,
    "getDashboardStats",
    ()=>getDashboardStats,
    "getFinanceEntries",
    ()=>getFinanceEntries,
    "getRegistrations",
    ()=>getRegistrations
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
;
;
;
;
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'src', 'data', 'db.json');
// --- Supabase Check ---
const isSupabaseEnabled = ()=>{
    return !!("TURBOPACK compile-time value", "https://avwffulngozklvboiymh.supabase.co") && !!("TURBOPACK compile-time value", "sb_publishable_sxpq-Px6d5gNQ3i6A0frPQ_VdqalxKY") && !!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"];
};
const isSupabaseAdminEnabled = ()=>{
    return !!("TURBOPACK compile-time value", "https://avwffulngozklvboiymh.supabase.co") && !!process.env.SUPABASE_SERVICE_ROLE_KEY && !!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"];
};
// --- Local JSON Helpers ---
const readLocalDb = ()=>{
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading local DB:', error);
        return {
            registrations: [],
            admins: [],
            finance: [],
            calendar: []
        };
    }
};
const writeLocalDb = (data)=>{
    try {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing local DB:', error);
    }
};
const getRegistrations = async ()=>{
    if (isSupabaseEnabled()) {
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('registrations').select('*').order('created_at', {
                ascending: false
            });
            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }
            // Map Supabase rows to our types (converting snake_case to camelCase manually if needed, 
            // but for simplicity we kept schema somewhat consistent.
            // Note: Schema in SQL uses snake_case keys (first_name, last_name).
            // Our TS type uses camelCase or nested objects (personal.firstName).
            // We need a mapper here.
            return (data || []).map((row)=>({
                    id: row.id,
                    currentStep: 3,
                    personal: {
                        firstName: row.first_name,
                        lastName: row.last_name,
                        email: row.email,
                        phone: row.phone
                    },
                    address: {
                        street: row.address_street || '',
                        city: row.address_city || '',
                        country: row.address_country || '',
                        zipCode: row.address_zip || ''
                    },
                    motivation: {
                        message: row.motivation
                    },
                    status: row.status,
                    createdAt: row.created_at,
                    webinarLink: row.meet_link
                }));
        } catch (e) {
            console.warn('Falling back to local DB due to error');
            return readLocalDb().registrations;
        }
    }
    return readLocalDb().registrations;
};
const addRegistration = async (registration)=>{
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
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('registrations').insert(row);
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
};
const getAdminByEmail = async (email)=>{
    if (isSupabaseAdminEnabled()) {
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('admin_users').select('*').eq('email', email).single();
            if (data) {
                return {
                    id: data.id,
                    email: data.email,
                    passwordHash: data.password_hash,
                    name: data.name
                };
            }
            if (error) {
                console.error('Supabase admin error:', error);
            }
        } catch (e) {
        // ignore
        }
    }
    // Fallback
    const db = readLocalDb();
    return db.admins.find((admin)=>admin.email === email);
};
const getFinanceEntries = async ()=>{
    if (isSupabaseEnabled()) {
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('finance_entries').select('*').order('date', {
                ascending: false
            });
            if (error) throw error;
            return (data || []).map((row)=>({
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
};
const addFinanceEntry = async (entry)=>{
    if (isSupabaseEnabled()) {
        try {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('finance_entries').insert(entry);
            if (error) throw error;
            return;
        } catch (e) {
            console.error('Supabase write failed', e);
        }
    }
    const db = readLocalDb();
    const newEntry = {
        ...entry,
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        createdAt: new Date().toISOString()
    };
    db.finance.push(newEntry);
    writeLocalDb(db);
};
const getCalendarEvents = async ()=>{
    if (isSupabaseEnabled()) {
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('calendar_events').select('*').order('start_at', {
                ascending: true
            });
            if (error) throw error;
            return (data || []).map((row)=>({
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
};
const addCalendarEvent = async (event)=>{
    if (isSupabaseEnabled()) {
        try {
            // Mapping to snake_case for supabase
            const row = {
                title: event.title,
                start_at: event.startAt,
                end_at: event.endAt,
                meet_link: event.meetLink
            };
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabase"].from('calendar_events').insert(row);
            if (error) throw error;
            return;
        } catch (e) {
            console.error('Supabase write failed', e);
        }
    }
    const db = readLocalDb();
    const newEvent = {
        ...event,
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        createdAt: new Date().toISOString()
    };
    db.calendar.push(newEvent);
    writeLocalDb(db);
};
const getDashboardStats = async ()=>{
    const registrations = await getRegistrations();
    const finance = await getFinanceEntries();
    const calendar = await getCalendarEvents();
    const totalRevenue = finance.filter((e)=>e.type === 'INCOME').reduce((sum, e)=>sum + Number(e.amount), 0);
    const pendingRegistrations = registrations.filter((r)=>r.status === 'PENDING').length;
    // Logic for "active webinars": let's say events that haven't ended yet
    const now = new Date();
    const activeWebinars = calendar.filter((e)=>new Date(e.endAt) > now).length;
    return {
        totalRevenue,
        totalRegistrations: registrations.length,
        activeWebinars,
        pendingRegistrations
    };
};
}),
"[project]/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0060298a0d9e64a858ea5c29d3cb350aa60229f0b3":"getSession","00dcae2ad9f7ba68b0aa16deeeec50b4b81ae610d5":"logout","40bd10e7da003ae13511d42b6f0c1d70bb3db4e271":"login"},"",""] */ __turbopack_context__.s([
    "getSession",
    ()=>getSession,
    "login",
    ()=>login,
    "logout",
    ()=>logout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function login(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    // Simple Mock Auth
    const admin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminByEmail"])(email);
    // In a real app, verify password hash. Here we just check existence and simple equality for MV
    if (admin && admin.passwordHash === password) {
        // Set cookie
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
        cookieStore.set('admin_session', admin.id, {
            httpOnly: true,
            secure: ("TURBOPACK compile-time value", "development") === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        });
    } else {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/login?error=InvalidCredentials');
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/dashboard');
}
async function logout() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('admin_session');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/admin/login');
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get('admin_session')?.value;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    login,
    logout,
    getSession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "40bd10e7da003ae13511d42b6f0c1d70bb3db4e271", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "00dcae2ad9f7ba68b0aa16deeeec50b4b81ae610d5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSession, "0060298a0d9e64a858ea5c29d3cb350aa60229f0b3", null);
}),
"[project]/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0082d0072a188b453704870eb9566079e84316be84":"adminHealthCheck","40ce4610ee2cca951a1fe3d8486398af3ac6c1d41c":"submitRegistration","40d9bc2c5bec3b41d2a53fe5db76c0732d8f057569":"createCalendarEventAction","40e49910126a85fc34196c800eae66036dea9ea7fc":"createFinanceEntryAction"},"",""] */ __turbopack_context__.s([
    "adminHealthCheck",
    ()=>adminHealthCheck,
    "createCalendarEventAction",
    ()=>createCalendarEventAction,
    "createFinanceEntryAction",
    ()=>createFinanceEntryAction,
    "submitRegistration",
    ()=>submitRegistration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist-node/v4.js [app-rsc] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function submitRegistration(draft) {
    if (!draft.personal || !draft.address || !draft.motivation) {
        throw new Error("Incomplete registration data");
    }
    const record = {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
        ...draft,
        personal: draft.personal,
        address: draft.address,
        motivation: draft.motivation,
        currentStep: 3,
        status: 'PENDING',
        createdAt: new Date().toISOString()
    };
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRegistration"])(record);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard/members');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
    return {
        success: true
    };
}
async function createFinanceEntryAction(formData) {
    const type = formData.get('type');
    const amount = Number(formData.get('amount'));
    const category = formData.get('category');
    const description = formData.get('description');
    const date = formData.get('date');
    if (!type || isNaN(amount) || !date) {
        throw new Error('Invalid input');
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addFinanceEntry"])({
        type,
        amount,
        category,
        description,
        date
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard/finance');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
}
async function createCalendarEventAction(formData) {
    const title = formData.get('title');
    const startAt = formData.get('startAt');
    const endAt = formData.get('endAt');
    const meetLink = formData.get('meetLink');
    if (!title || !startAt || !endAt) {
        throw new Error('Invalid input');
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addCalendarEvent"])({
        title,
        startAt,
        endAt,
        meetLink
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard/calendar');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/dashboard');
}
async function adminHealthCheck() {
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"]) {
        return {
            ok: false,
            error: 'Supabase admin client not configured'
        };
    }
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["supabaseAdmin"].from('admin_users').select('id').limit(1);
    if (error) {
        return {
            ok: false,
            error: error.message
        };
    }
    return {
        ok: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    submitRegistration,
    createFinanceEntryAction,
    createCalendarEventAction,
    adminHealthCheck
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitRegistration, "40ce4610ee2cca951a1fe3d8486398af3ac6c1d41c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createFinanceEntryAction, "40e49910126a85fc34196c800eae66036dea9ea7fc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCalendarEventAction, "40d9bc2c5bec3b41d2a53fe5db76c0732d8f057569", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(adminHealthCheck, "0082d0072a188b453704870eb9566079e84316be84", null);
}),
"[project]/.next-internal/server/app/admin/dashboard/health/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/.next-internal/server/app/admin/dashboard/health/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0082d0072a188b453704870eb9566079e84316be84",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminHealthCheck"],
    "00dcae2ad9f7ba68b0aa16deeeec50b4b81ae610d5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "40ce4610ee2cca951a1fe3d8486398af3ac6c1d41c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitRegistration"],
    "40d9bc2c5bec3b41d2a53fe5db76c0732d8f057569",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCalendarEventAction"],
    "40e49910126a85fc34196c800eae66036dea9ea7fc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createFinanceEntryAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$dashboard$2f$health$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/admin/dashboard/health/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a1cb86ad._.js.map