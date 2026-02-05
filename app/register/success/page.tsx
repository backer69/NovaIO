"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";

// Step 3 installed `lucide-react`? No, I installed `react-dom` etc. 
// I will not use lucide-react to avoid missing dependency error. I'll use an emoji or SVG.

export default function SuccessPage() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <Card className="w-full max-w-md mx-4 shadow-xl border-teal-500/20">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    </div>
                    <CardTitle className="text-2xl text-teal-900">Registration Complete!</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <p className="text-slate-600">
                        Your account has been created successfully. <br />
                        Please wait for the Google Meet conference link.
                    </p>

                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                        <Link href="/">Return to Home</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
