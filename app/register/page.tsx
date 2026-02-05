"use client";

import { useRegistration } from "@/components/register/RegistrationContext";
import { Stepper } from "@/components/ui/Stepper";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PersonalDetails() {
    const { draft, updateDraft, nextStep } = useRegistration();
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        firstName: draft.personal?.firstName || "",
        lastName: draft.personal?.lastName || "",
        email: draft.personal?.email || "",
        phone: draft.personal?.phone || "",
    });

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            updateDraft({ personal: formData });
            nextStep();
            router.push("/register/address");
        }
    };

    return (
        <>
            <Stepper currentStep={1} />
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                            <Input
                                id="firstName"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className={errors.firstName ? "border-red-500" : ""}
                            />
                            {errors.firstName && <span className="text-xs text-red-500">{errors.firstName}</span>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                            <Input
                                id="lastName"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className={errors.lastName ? "border-red-500" : ""}
                            />
                            {errors.lastName && <span className="text-xs text-red-500">{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 234 567 890"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                    </div>

                    <Button className="w-full mt-4" onClick={handleNext}>
                        Next Step
                    </Button>
                </CardContent>
            </Card>
        </>
    );
}
