import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function CalendarPage() {
    const events = [
        { id: 1, title: "Webinar: Future of Tech", date: "2024-02-10", time: "10:00 AM" },
        { id: 2, title: "Team Sync", date: "2024-02-12", time: "02:00 PM" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                    <Card key={event.id} className="border-l-4 border-l-teal-500">
                        <CardHeader>
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-slate-600">📅 {event.date}</p>
                            <p className="text-sm text-slate-600">⏰ {event.time}</p>
                        </CardContent>
                    </Card>
                ))}
                <Card className="border-dashed border-2 bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                    <CardContent className="flex items-center justify-center h-full pt-6">
                        <p className="font-medium text-slate-500">+ Add Event</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
