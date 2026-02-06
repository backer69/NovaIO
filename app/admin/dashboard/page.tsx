import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getDashboardStats, getRegistrations, getCalendarEvents, getFinanceEntries } from "@/lib/data";
import Link from "next/link";

export default async function DashboardPage() {
    const stats = await getDashboardStats();
    const allMembers = await getRegistrations();
    const allEvents = await getCalendarEvents();
    const allFinance = await getFinanceEntries();

    const recentMembers = allMembers.slice(0, 5);
    const upcomingEvents = allEvents.filter(e => new Date(e.startAt) > new Date()).slice(0, 3);
    const recentFinance = allFinance.slice(0, 5);

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <div className="text-teal-500">💰</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-slate-500">Real-time revenue</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Registrations</CardTitle>
                        <div className="text-teal-500">👥</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{stats.totalRegistrations}</div>
                        <p className="text-xs text-slate-500">Total registered users</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Webinars</CardTitle>
                        <div className="text-teal-500">📹</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeWebinars}</div>
                        <p className="text-xs text-slate-500">Upcoming or live</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                        <div className="text-teal-500">⚠️</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingRegistrations}</div>
                        <p className="text-xs text-slate-500">Needs review</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Members */}
                <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Recent Members</CardTitle>
                        <Link href="/admin/dashboard/members" className="text-xs text-teal-600 hover:underline font-medium">View All</Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentMembers.length === 0 ? (
                                <p className="text-sm text-slate-500 py-4 text-center">No members found.</p>
                            ) : (
                                recentMembers.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
                                                {member.personal?.firstName?.[0]}{member.personal?.lastName?.[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{member.personal?.firstName} {member.personal?.lastName}</p>
                                                <p className="text-xs text-slate-500">{member.personal?.email}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${member.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {member.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Upcoming Events</CardTitle>
                        <Link href="/admin/dashboard/calendar" className="text-xs text-teal-600 hover:underline font-medium">View All</Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingEvents.length === 0 ? (
                                <p className="text-sm text-slate-500 py-4 text-center">No upcoming events.</p>
                            ) : (
                                upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50/50">
                                        <div className="bg-teal-600 text-white rounded p-2 text-center min-w-[50px]">
                                            <p className="text-xs font-bold leading-none">{new Date(event.startAt).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</p>
                                            <p className="text-lg font-black leading-tight">{new Date(event.startAt).getDate()}</p>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-slate-800">{event.title}</p>
                                            <p className="text-xs text-slate-500">{new Date(event.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Finance */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg">Recent Financial Records</CardTitle>
                        <Link href="/admin/dashboard/finance" className="text-xs text-teal-600 hover:underline font-medium">View All</Link>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b text-slate-500">
                                    <tr>
                                        <th className="text-left font-medium pb-2">Category</th>
                                        <th className="text-left font-medium pb-2">Description</th>
                                        <th className="text-left font-medium pb-2">Date</th>
                                        <th className="text-right font-medium pb-2">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentFinance.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-slate-500">No records found.</td>
                                        </tr>
                                    ) : (
                                        recentFinance.map((record) => (
                                            <tr key={record.id} className="border-b last:border-0 hover:bg-slate-50/50">
                                                <td className="py-3 font-medium capitalize">{record.category}</td>
                                                <td className="py-3 text-slate-500">{record.description || '-'}</td>
                                                <td className="py-3 text-slate-500">{new Date(record.date).toLocaleDateString()}</td>
                                                <td className={`py-3 text-right font-bold ${record.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {record.type === 'INCOME' ? '+' : '-'}${record.amount.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
