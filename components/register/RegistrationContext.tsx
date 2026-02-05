"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { RegistrationDraft } from "@/lib/types";

interface RegistrationContextType {
    draft: RegistrationDraft;
    updateDraft: (data: Partial<RegistrationDraft>) => void;
    nextStep: () => void;
    prevStep: () => void;
}

const defaultDraft: RegistrationDraft = {
    currentStep: 1,
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(
    undefined
);

export function RegistrationProvider({ children }: { children: React.ReactNode }) {
    const [draft, setDraft] = useState<RegistrationDraft>(defaultDraft);

    // Load from sessionStorage on mount to persist on refresh
    useEffect(() => {
        const saved = sessionStorage.getItem("registration_draft");
        if (saved) {
            setDraft(JSON.parse(saved));
        }
    }, []);

    // Save to sessionStorage on change
    useEffect(() => {
        sessionStorage.setItem("registration_draft", JSON.stringify(draft));
    }, [draft]);

    const updateDraft = (data: Partial<RegistrationDraft>) => {
        setDraft((prev) => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        setDraft((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    };

    const prevStep = () => {
        setDraft((prev) => ({ ...prev, currentStep: Math.max(1, prev.currentStep - 1) }));
    };

    return (
        <RegistrationContext.Provider value={{ draft, updateDraft, nextStep, prevStep }}>
            {children}
        </RegistrationContext.Provider>
    );
}

export function useRegistration() {
    const context = useContext(RegistrationContext);
    if (context === undefined) {
        throw new Error("useRegistration must be used within a RegistrationProvider");
    }
    return context;
}
