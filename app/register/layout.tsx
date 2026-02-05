"use client";

import { RegistrationProvider } from "@/components/register/RegistrationContext";
import Link from 'next/link';

export default function RegistrationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RegistrationProvider>
            <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
                            Webinar Registration
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Join us for an exclusive event.
                        </p>
                    </div>
                    {children}
                </div>
                <Link href="/" className="mt-8 text-sm text-slate-500 hover:text-slate-700">
                    ← Back to Home
                </Link>
            </div>
        </RegistrationProvider>
    );
}
