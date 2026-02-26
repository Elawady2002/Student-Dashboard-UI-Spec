import { useState } from "react";
import { Plus, Search, MoreVertical, Edit2, Shield, UserX, Mail, Building2, User } from "lucide-react";

const teamMembers = [
    { id: 1, name: "محمد الخالدي", email: "m.alkhaldi@alrowad.edu", role: "أدمن مؤسسة", status: "نشط", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=m" },
    { id: 2, name: "د. أسامة عبدالله", email: "osama@alrowad.edu", role: "معلم", status: "نشط", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=o" },
    { id: 3, name: "أحمد الفهد", email: "ahmad@alrowad.edu", role: "معلم", status: "بدون صلاحيات", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=a" },
];

export function TeamManagementPage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">إدارة الفريق (المعلمين والمشرفين)</h1>
                    <p className="text-sm text-muted-foreground mt-1">أضف أعضاء للفريق وحدد صلاحيات كل عضو</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span>إضافة عضو جديد</span>
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="ابحث بالاسم أو البريد..."
                        className="w-full bg-accent/50 border border-border rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors h-10"
                    />
                </div>
                <select className="bg-accent/50 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors h-10 w-full sm:w-auto cursor-pointer">
                    <option>جميع الأدوار</option>
                    <option>أدمن مؤسسة</option>
                    <option>معلم</option>
                </select>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-accent/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">عضو الفريق</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">البريد الإلكتروني</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">الدور والصلاحيات</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">الحالة</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {teamMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-accent/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={member.avatar} alt="" className="w-10 h-10 rounded-full border border-border bg-accent" />
                                            <div>
                                                <p className="font-bold">{member.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground" dir="ltr">
                                        {member.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5 font-medium">
                                            {member.role === 'أدمن مؤسسة' ? (
                                                <Shield className="w-4 h-4 text-indigo-500" />
                                            ) : (
                                                <User className="w-4 h-4 text-emerald-500" />
                                            )}
                                            {member.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${member.status === 'نشط' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 bg-accent hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" title="تعديل">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            {member.role !== 'أدمن مؤسسة' && (
                                                <button className="p-2 bg-accent hover:bg-destructive/10 hover:text-destructive rounded-xl transition-colors" title="إلغاء الصلاحيات">
                                                    <UserX className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
