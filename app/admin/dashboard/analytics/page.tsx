import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function AnalyticsPage() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Usage Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed border-slate-200">
                    <p className="text-slate-400">Chart Placeholder (Implementation requires Chart.js/Recharts)</p>
                </CardContent>
            </Card>
        </div>
    );
}
