"use client";

import { useRegistration } from "@/components/register/RegistrationContext";
import { Stepper } from "@/components/ui/Stepper";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AddressDetails() {
    const { draft, updateDraft, nextStep, prevStep } = useRegistration();
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        street: draft.address?.street || "",
        city: draft.address?.city || "",
        country: draft.address?.country || "",
        zipCode: draft.address?.zipCode || "",
    });

    // Hydrate state if draft loads late (though context should handle it, explicit safety)
    useEffect(() => {
        if (draft.address) {
            setFormData({
                street: draft.address.street || "",
                city: draft.address.city || "",
                country: draft.address.country || "",
                zipCode: draft.address.zipCode || "",
            })
        }
    }, [draft.address]);


    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.street) newErrors.street = "Street is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.country) newErrors.country = "Country is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            updateDraft({ address: formData });
            nextStep();
            router.push("/register/motivation");
        }
    };

    const handleBack = () => {
        prevStep();
        router.back();
    }

    return (
        <>
            <Stepper currentStep={2} />
            <Card>
                <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                        <Input
                            id="street"
                            placeholder="123 Main St"
                            value={formData.street}
                            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                            className={errors.street ? "border-red-500" : ""}
                        />
                        {errors.street && <span className="text-xs text-red-500">{errors.street}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="city" className="text-sm font-medium">City</label>
                            <Input
                                id="city"
                                placeholder="New York"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className={errors.city ? "border-red-500" : ""}
                            />
                            {errors.city && <span className="text-xs text-red-500">{errors.city}</span>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="zipCode" className="text-sm font-medium">Zip Code</label>
                            <Input
                                id="zipCode"
                                placeholder="10001"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="country" className="text-sm font-medium">Country</label>
                        <Input
                            id="country"
                            placeholder="USA"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className={errors.country ? "border-red-500" : ""}
                        />
                        {errors.country && <span className="text-xs text-red-500">{errors.country}</span>}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button variant="outline" className="w-1/3" onClick={handleBack}>
                            Back
                        </Button>
                        <Button className="w-2/3" onClick={handleNext}>
                            Next Step
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
