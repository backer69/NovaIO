import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function FinancePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Financial Records</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                        <div>
                            <p className="font-medium">Webinar Ticket Sales (Batch A)</p>
                            <p className="text-sm text-slate-500">2024-02-01</p>
                        </div>
                        <div className="font-bold text-green-600">+$12,500.00</div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                        <div>
                            <p className="font-medium">Server Costs (AWS)</p>
                            <p className="text-sm text-slate-500">2024-02-02</p>
                        </div>
                        <div className="font-bold text-red-600">-$150.00</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
