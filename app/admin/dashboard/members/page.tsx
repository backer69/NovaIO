import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getRegistrations } from "@/lib/data";
import { MemberDetailsModal } from "./MemberDetailsModal";

export default async function MembersPage() {
    const members = await getRegistrations();


    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Registered Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100">
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Name</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Email</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Progress</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {members.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="h-24 text-center">No registrants found.</td>
                                    </tr>
                                ) : (
                                    members.map((member, i) => (
                                        <tr key={member.id || i} className="border-b transition-colors hover:bg-slate-100/50">
                                            <td className="p-4 align-middle font-medium">
                                                <div>{member.personal?.firstName} {member.personal?.lastName}</div>
                                                <div className="text-xs text-slate-500">{member.address?.city}, {member.address?.country}</div>
                                            </td>
                                            <td className="p-4 align-middle">{member.personal?.email}</td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-teal-500 text-white shadow hover:bg-teal-500/80">
                                                    {member.status || 'PENDING'}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
                                                    <div
                                                        className="h-full bg-teal-500 transition-all"
                                                        style={{ width: `${(member.currentStep / 3) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-slate-500">{member.currentStep}/3 steps completed</span>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <MemberDetailsModal member={member} />
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
    );
}
