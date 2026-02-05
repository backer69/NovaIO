export interface RegistrationDraft {
    currentStep: number;
    personal?: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    address?: {
        street: string;
        city: string;
        country: string;
        zipCode?: string;
    };
    motivation?: {
        message: string;
    };
}

export interface RegistrationRecord extends RegistrationDraft {
    id: string;
    createdAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    webinarLink?: string;
}

export interface AdminCredentials {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
}

export interface DatabaseSchema {
    registrations: RegistrationRecord[];
    admins: AdminCredentials[];
    finance: any[];
    calendar: any[];
}
