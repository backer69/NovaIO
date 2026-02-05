import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getDashboardStats } from "@/lib/data";

export default async function DashboardPage() {
    const stats = await getDashboardStats();

    return (
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
    );
}
