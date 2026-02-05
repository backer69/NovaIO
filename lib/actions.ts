'use server';

import { addRegistration, addFinanceEntry, addCalendarEvent } from "./data";
import { RegistrationDraft } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

export async function submitRegistration(draft: RegistrationDraft) {
    if (!draft.personal || !draft.address || !draft.motivation) {
        throw new Error("Incomplete registration data");
    }

    const record = {
        id: uuidv4(),
        ...draft,
        personal: draft.personal!,
        address: draft.address!,
        motivation: draft.motivation!,
        currentStep: 3,
        status: 'PENDING' as const,
        createdAt: new Date().toISOString(),
    };

    await addRegistration(record);
    revalidatePath('/admin/dashboard/members');
    revalidatePath('/admin/dashboard');
    return { success: true };
}

export async function createFinanceEntryAction(formData: FormData) {
    const type = formData.get('type') as 'INCOME' | 'EXPENSE';
    const amount = Number(formData.get('amount'));
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;

    if (!type || isNaN(amount) || !date) {
        throw new Error('Invalid input');
    }

    await addFinanceEntry({
        type,
        amount,
        category,
        description,
        date,
    });

    revalidatePath('/admin/dashboard/finance');
    revalidatePath('/admin/dashboard');
}

export async function createCalendarEventAction(formData: FormData) {
    const title = formData.get('title') as string;
    const startAt = formData.get('startAt') as string;
    const endAt = formData.get('endAt') as string;
    const meetLink = formData.get('meetLink') as string;

    if (!title || !startAt || !endAt) {
        throw new Error('Invalid input');
    }

    await addCalendarEvent({
        title,
        startAt,
        endAt,
        meetLink,
    });

    revalidatePath('/admin/dashboard/calendar');
    revalidatePath('/admin/dashboard');
}
