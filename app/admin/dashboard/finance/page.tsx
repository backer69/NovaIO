import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getFinanceEntries } from "@/lib/data";
import { FinanceForm } from "./FinanceForm";

export default async function FinancePage() {
    const entries = await getFinanceEntries();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Finance Management</h1>
                <FinanceForm />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Financial Records</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {entries.length === 0 ? (
                            <p className="text-center text-slate-500 py-10">No records found.</p>
                        ) : (
                            entries.map((entry) => (
                                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                                    <div>
                                        <p className="font-medium">{entry.description || entry.category}</p>
                                        <p className="text-sm text-slate-500">{entry.date}</p>
                                        <p className="text-xs text-slate-400 capitalize">{entry.category}</p>
                                    </div>
                                    <div className={entry.type === 'INCOME' ? "font-bold text-green-600" : "font-bold text-red-600"}>
                                        {entry.type === 'INCOME' ? '+' : '-'}${entry.amount.toLocaleString()}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
