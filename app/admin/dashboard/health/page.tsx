import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { adminHealthCheck } from "@/lib/actions";

export default async function HealthPage() {
    const result = await adminHealthCheck();
    const checkedAt = new Date().toISOString();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Admin Health Check</h1>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Supabase Admin Client</CardTitle>
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            result.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                    >
                        {result.ok ? "OK" : "ERROR"}
                    </span>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p className="text-sm text-slate-600">
                        {result.ok
                            ? "Service role key is configured and can query admin_users."
                            : "Admin client failed to query admin_users."
                        }
                    </p>
                    {!result.ok && (
                        <p className="text-sm text-red-600">{result.error}</p>
                    )}
                    <p className="text-xs text-slate-400">Checked at: {checkedAt}</p>
                </CardContent>
            </Card>
        </div>
    );
}
