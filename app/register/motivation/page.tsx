"use client";

import { useRegistration } from "@/components/register/RegistrationContext";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitRegistration } from "@/lib/actions";

export default function MotivationDetails() {
    const { draft, updateDraft, prevStep } = useRegistration();
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [message, setMessage] = useState(draft.motivation?.message || "");



    const handleSubmit = async () => {
        if (message.length < 10) {
            setError("Please write at least 10 characters.");
            return;
        }

        setIsSubmitting(true);
        updateDraft({ motivation: { message } });

        try {
            await submitRegistration({
                ...draft,
                motivation: { message }
            });
            router.push("/register/success");
        } catch (e) {
            console.error(e);
            setError("Failed to submit registration.");
            setIsSubmitting(false);
        }
    };


    const handleBack = () => {
        prevStep();
        router.back();
    }

    return (
        <>
            <Stepper currentStep={3} />
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="motivation" className="text-sm font-medium">Why do you want to join?</label>
                        <textarea
                            id="motivation"
                            className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us about yourself..."
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                setError("");
                            }}
                        />
                        {error && <span className="text-xs text-red-500">{error}</span>}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button variant="outline" className="w-1/3" onClick={handleBack} disabled={isSubmitting}>
                            Back
                        </Button>
                        <Button className="w-2/3" onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Complete Registration"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
