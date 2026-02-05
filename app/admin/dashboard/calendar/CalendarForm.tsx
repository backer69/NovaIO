"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { createCalendarEventAction } from "@/lib/actions";

export function CalendarForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAdd = async (formData: FormData) => {
        await createCalendarEventAction(formData);
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)} className="bg-teal-600 hover:bg-teal-700">
                + Create Event
            </Button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md">
                        <CardHeader>
                            <CardTitle>Create New Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form action={handleAdd} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Event Title</label>
                                    <Input name="title" required placeholder="e.g. Future of Tech Webinar" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Start Time</label>
                                    <Input name="startAt" type="datetime-local" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">End Time</label>
                                    <Input name="endAt" type="datetime-local" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Meeting Link (Optional)</label>
                                    <Input name="meetLink" placeholder="https://..." />
                                </div>
                                <div className="flex gap-2 justify-end pt-4">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" className="bg-teal-600">Create Event</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
