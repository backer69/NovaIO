import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getDashboardStats, getRegistrations, getFinanceEntries } from "@/lib/data";

export default async function AnalyticsPage() {
    const stats = await getDashboardStats();
    const registrations = await getRegistrations();
    const finance = await getFinanceEntries();

    // Group registrations by month for a simple bar chart
    const monthlyRegistrations = registrations.reduce((acc: any, reg) => {
        const month = new Date(reg.createdAt).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    const months = Object.keys(monthlyRegistrations);
    const maxRegs = Math.max(...Object.values(monthlyRegistrations) as number[], 1);

    // Financial calculations
    const income = finance.filter(f => f.type === 'INCOME').reduce((sum, f) => sum + f.amount, 0);
    const expense = finance.filter(f => f.type === 'EXPENSE').reduce((sum, f) => sum + f.amount, 0);
    const net = income - expense;

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">App Analytics</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-teal-50 border-teal-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-teal-600">Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${income.toLocaleString()}</div>
                        <p className="text-xs text-teal-500 mt-1">Gross earnings from all sources</p>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 border-red-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-600">Total Expenses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${expense.toLocaleString()}</div>
                        <p className="text-xs text-red-500 mt-1">Operational costs</p>
                    </CardContent>
                </Card>
                <Card className={net >= 0 ? "bg-green-50 border-green-100" : "bg-orange-50 border-orange-100"}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-600">Net Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${net.toLocaleString()}</div>
                        <p className="text-xs text-slate-500 mt-1">Current financial balance</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Registration Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full flex items-end gap-4 pt-10 px-4">
                            {months.length === 0 ? (
                                <p className="text-center w-full text-slate-400">No data available</p>
                            ) : (
                                months.map(month => (
                                    <div key={month} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div className="relative w-full">
                                            <div
                                                className="bg-teal-500 rounded-t-md hover:bg-teal-600 transition-all duration-300 relative"
                                                style={{ height: `${(monthlyRegistrations[month] / maxRegs) * 180}px` }}
                                            >
                                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {monthlyRegistrations[month]}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-slate-500 rotate-45 md:rotate-0 mt-2">{month}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Member Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        {[
                            { label: 'Approved', count: registrations.filter(r => r.status === 'APPROVED').length, color: 'bg-green-500' },
                            { label: 'Pending', count: registrations.filter(r => r.status === 'PENDING').length, color: 'bg-yellow-500' },
                            { label: 'Rejected', count: registrations.filter(r => r.status === 'REJECTED').length, color: 'bg-red-500' }
                        ].map(item => (
                            <div key={item.label} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span>{item.label}</span>
                                    <span className="font-semibold">{item.count}</span>
                                </div>
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${item.color}`}
                                        style={{ width: `${(item.count / (registrations.length || 1)) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
