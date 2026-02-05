'use server';

import { addRegistration } from "./data";
import { RegistrationDraft } from "./types";
import { v4 as uuidv4 } from 'uuid';

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
    return { success: true };
}
