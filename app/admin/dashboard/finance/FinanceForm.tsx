"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { createFinanceEntryAction } from "@/lib/actions";

export function FinanceForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = async (formData: FormData) => {
        await createFinanceEntryAction(formData);
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                + Add Record
            </Button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Add New Record</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={handleAdd} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Type</label>
                                    <select name="type" className="w-full p-2 border rounded-md" required>
                                        <option value="INCOME">Income</option>
                                        <option value="EXPENSE">Expense</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Amount ($)</label>
                                    <Input name="amount" type="number" step="0.01" required placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <Input name="category" required placeholder="e.g. Sales, Rent, Marketing" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <Input name="description" placeholder="Short description" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date</label>
                                    <Input name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="flex gap-2 justify-end pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-teal-600">Save Record</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
