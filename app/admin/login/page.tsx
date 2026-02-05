"use client";

import { login } from "@/lib/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
// import { useFormState } from "react-dom"; // Use minimal client logic first

export default function AdminLogin() {

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100">
            <Card className="w-full max-w-md mx-4 shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl font-bold text-slate-900">Admin Portal</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={login} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="admin@nova.io"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>

                        {/* In a real app, handle form state errors here using usage of useFormState if switching to that. 
                For now we rely on redirect or server return. */
                        }
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
