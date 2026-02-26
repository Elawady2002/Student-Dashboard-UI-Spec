import { Users, Search, Filter, ShieldCheck, Mail, Edit2, Trash2, Ban } from "lucide-react";

const allUsers = [
    { id: 1, name: "عبدالله السالم", role: "طالب", date: "2023-11-20", status: "نشط", email: "abdullah@example.com" },
    { id: 2, name: "د. أسامة", role: "معلم", date: "2023-10-15", status: "نشط", email: "osama@example.com" },
    { id: 3, name: "مدارس الرواد", role: "مؤسسة", date: "2023-09-01", status: "نشط", email: "info@alrowad.edu" },
    { id: 4, name: "مستخدم موقوف", role: "طالب", date: "2023-11-10", status: "موقوف", email: "banned@example.com" },
];

export function UserContentOversightPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">إدارة المستخدمين والمحتوى</h1>
                    <p className="text-sm text-muted-foreground mt-1">التحكم الكامل والرقابة على جميع مستخدمي المنصة ومحتواها</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex gap-1 bg-accent/50 rounded-xl p-1">
                    {[
                        { id: "all", label: "الكل" },
                        { id: "students", label: "الطلاب" },
                        { id: "teachers", label: "المعلمين" },
                        { id: "orgs", label: "المؤسسات" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            className={`px-4 py-2 rounded-lg transition-colors text-[13px] font-medium ${tab.id === 'all' ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent text-foreground"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="ابحث بالاسم، البريد الاكتروني..."
                            className="w-full bg-accent/50 border border-border rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors h-10"
                        />
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 text-muted-foreground bg-accent/50 hover:bg-accent rounded-xl transition-colors border border-border">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-accent/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">المستخدم</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">الدور المخصص</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">تاريخ التسجيل</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">حالة الحساب</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">إجراءات الرقابة</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {allUsers.map((user, i) => (
                                <tr key={i} className="hover:bg-accent/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold">{user.name}</p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5" dir="ltr">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${user.role === 'مؤسسة' ? 'bg-indigo-500/10 text-indigo-500' :
                                                user.role === 'معلم' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-accent text-foreground'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-[12px]" dir="ltr">
                                        {user.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${user.status === 'نشط' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 bg-accent hover:bg-primary/10 hover:text-primary rounded-xl transition-colors" title="تعديل الحساب">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-accent hover:bg-amber-500/10 hover:text-amber-500 rounded-xl transition-colors" title="تعليق / إيقاف مؤقت">
                                                <Ban className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-accent hover:bg-destructive/10 hover:text-destructive rounded-xl transition-colors" title="حذف نهائي">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
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
