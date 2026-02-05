import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getCalendarEvents, getRegistrations } from "@/lib/data";
import { CalendarForm } from "./CalendarForm";
import { SMSBroadcast } from "./SMSBroadcast";

export default async function CalendarPage() {
    const events = await getCalendarEvents();
    const members = await getRegistrations();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
                <h1 className="text-2xl font-bold">Event Calendar</h1>
                <CalendarForm />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.length === 0 ? (
                    <Card className="col-span-full border-dashed border-2 bg-slate-50 flex items-center justify-center h-40">
                        <p className="text-slate-500">No events scheduled.</p>
                    </Card>
                ) : (
                    events.map(event => (
                        <Card key={event.id} className="border-l-4 border-l-teal-500 flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-lg">{event.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <p className="text-sm text-slate-600">📅 {new Date(event.startAt).toLocaleDateString()}</p>
                                <p className="text-sm text-slate-600">⏰ {new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                {event.meetLink && (
                                    <a href={event.meetLink} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 mt-2 block hover:underline">
                                        🔗 Join Meeting
                                    </a>
                                )}
                            </CardContent>
                            <div className="p-4 pt-0 mt-auto border-t bg-slate-50/50">
                                <SMSBroadcast event={event} members={members} />
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
