"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { RegistrationRecord } from "@/lib/types";

export function MemberDetailsModal({ member }: { member: RegistrationRecord }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
                Details
            </Button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Member Registration Details</CardTitle>
                            <Button variant="ghost" onClick={() => setIsOpen(false)}>✕</Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold border-b pb-1 text-teal-700">Step 1: Personal Information</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><span className="font-medium">First Name:</span> {member.personal?.firstName}</p>
                                    <p><span className="font-medium">Last Name:</span> {member.personal?.lastName}</p>
                                    <p><span className="font-medium">Email:</span> {member.personal?.email}</p>
                                    <p><span className="font-medium">Phone/SMS:</span> {member.personal?.phone}</p>
                                </div>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold border-b pb-1 text-teal-700">Step 2: Address Information</h3>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <p><span className="font-medium">Street:</span> {member.address?.street}</p>
                                    <p><span className="font-medium">City:</span> {member.address?.city}</p>
                                    <p><span className="font-medium">Country:</span> {member.address?.country}</p>
                                    <p><span className="font-medium">Zip Code:</span> {member.address?.zipCode || "N/A"}</p>
                                </div>
                            </section>

                            <section className="space-y-2">
                                <h3 className="text-lg font-semibold border-b pb-1 text-teal-700">Step 3: Motivation</h3>
                                <div className="bg-slate-50 p-3 rounded border text-sm italic">
                                    "{member.motivation?.message}"
                                </div>
                            </section>

                            <section className="pt-4 border-t flex justify-between items-center text-sm text-slate-500">
                                <p>Registered on: {new Date(member.createdAt).toLocaleString()}</p>
                                <div className="flex items-center gap-2">
                                    <span>Status:</span>
                                    <span className="px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full text-xs font-bold uppercase">
                                        {member.status}
                                    </span>
                                </div>
                            </section>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
