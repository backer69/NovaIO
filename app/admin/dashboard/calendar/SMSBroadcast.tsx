"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { RegistrationRecord, CalendarEvent } from "@/lib/types";

export function SMSBroadcast({ event, members }: { event: CalendarEvent, members: RegistrationRecord[] }) {
    const [isOpen, setIsOpen] = useState(false);

    const generateMessage = () => {
        const date = new Date(event.startAt).toLocaleDateString();
        const time = new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let msg = `Upcoming Event: ${event.title}\n`;
        msg += `Date: ${date}\n`;
        msg += `Time: ${time}\n`;
        if (event.meetLink) {
            msg += `Link: ${event.meetLink}\n`;
        }
        return encodeURIComponent(msg);
    };

    const message = generateMessage();

    // SMS protocol varies slightly by platform but "sms:<number>?body=<message>" or "sms:<number>&body=<message>" are standard.
    // For many mobile devices, just "sms:number?body=text" works.
    const getSMSLink = (phone: string) => {
        const cleanPhone = phone?.replace(/[^0-9+]/g, '');
        return `sms:${cleanPhone}?body=${message}`;
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(true)}
                className="mt-2 text-blue-600 border-blue-200 hover:bg-blue-50"
            >
                📱 Notify via SMS
            </Button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between border-b">
                            <CardTitle className="text-lg">SMS Broadcast</CardTitle>
                            <Button variant="ghost" onClick={() => setIsOpen(false)}>✕</Button>
                        </CardHeader>
                        <CardContent className="overflow-auto p-4 space-y-3">
                            <div className="bg-slate-50 p-3 rounded text-sm mb-4 border italic">
                                <strong>Message Preview:</strong><br />
                                {event.title}<br />
                                Date: {new Date(event.startAt).toLocaleDateString()}<br />
                                Time: {new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>

                            <h4 className="font-semibold text-sm">Send to:</h4>
                            {members.length === 0 ? (
                                <p className="text-xs text-slate-500">No members registered.</p>
                            ) : (
                                members.map(member => (
                                    <div key={member.id} className="flex items-center justify-between p-2 border rounded-md hover:bg-slate-50">
                                        <div className="text-xs">
                                            <p className="font-medium">{member.personal?.firstName} {member.personal?.lastName}</p>
                                            <p className="text-slate-500">{member.personal?.phone}</p>
                                        </div>
                                        <a
                                            href={getSMSLink(member.personal?.phone || '')}
                                            className="px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded hover:bg-blue-600 transition-colors"
                                        >
                                            Send SMS
                                        </a>
                                    </div>
                                ))
                            )}
                        </CardContent>
                        <div className="p-4 border-t bg-slate-50">
                            <p className="text-[10px] text-slate-400">
                                This will open your default SMS app with the pre-filled message.
                            </p>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
}
