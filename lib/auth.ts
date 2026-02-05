'use server';

import { cookies } from 'next/headers';
import { getAdminByEmail } from './data';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simple Mock Auth
    const admin = await getAdminByEmail(email);

    // In a real app, verify password hash. Here we just check existence and simple equality for MV
    if (admin && admin.passwordHash === password) {
        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_session', admin.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        });
    } else {
        redirect('/admin/login?error=InvalidCredentials');
    }
    redirect('/admin/dashboard');
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('admin_session');
    redirect('/admin/login');
}

export async function getSession() {
    const cookieStore = await cookies();
    return cookieStore.get('admin_session')?.value;
}
