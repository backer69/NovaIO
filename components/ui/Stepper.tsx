import { cn } from "@/lib/utils";

interface StepperProps {
    currentStep: number;
}

export function Stepper({ currentStep }: StepperProps) {
    const steps = [
        { number: 1, title: "Personal" },
        { number: 2, title: "Address" },
        { number: 3, title: "Motivation" },
    ];

    return (
        <div className="flex items-center justify-center w-full mb-8">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div
                        className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold transition-colors",
                            currentStep >= step.number
                                ? "border-teal-500 bg-teal-500 text-white"
                                : "border-slate-300 text-slate-500"
                        )}
                    >
                        {step.number}
                    </div>
                    <span
                        className={cn(
                            "ml-2 text-sm font-medium hidden sm:block",
                            currentStep >= step.number ? "text-teal-700" : "text-slate-500"
                        )}
                    >
                        {step.title}
                    </span>
                    {index < steps.length - 1 && (
                        <div
                            className={cn(
                                "w-12 h-1 mx-4 rounded",
                                currentStep > step.number ? "bg-teal-500" : "bg-slate-200"
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
