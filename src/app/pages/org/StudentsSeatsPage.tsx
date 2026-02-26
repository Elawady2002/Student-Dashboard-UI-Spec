import { useState } from "react";
import { Plus, Search, Mail, Filter, CheckCircle2, XCircle, Ticket, Clock, Check } from "lucide-react";

const seats = [
    { id: "S-5521-ABCD", student: "سارة خالد", email: "sara@example.com", course: "القدرات العامة", status: "مفعل", date: "2023-10-15" },
    { id: "S-8812-XYZR", student: "محمد فهد", email: "mohammed@example.com", course: "التحصيلي علمي", status: "مفعل", date: "2023-10-14" },
    { id: "S-9934-LMNO", student: "غير محدد", email: "غير محدد", course: "القدرات العامة", status: "متاح", date: "-" },
    { id: "S-1123-PQRS", student: "غير محدد", email: "غير محدد", course: "التحصيلي علمي", status: "متاح", date: "-" },
];

export function StudentsSeatsPage() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">إدارة المقاعد والطلاب (Seats)</h1>
                    <p className="text-sm text-muted-foreground mt-1">توليد أكواد الوصول للطلاب وتتبع حالة استخدامها</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                    <Ticket className="w-4 h-4" />
                    <span>توليد أكواد جديدة</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Ticket className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-muted-foreground">إجمالي المقاعد المتاحة</p>
                        <h3 className="text-2xl font-black mt-1">150 <span className="text-sm font-normal text-muted-foreground">من 1000</span></h3>
                    </div>
                </div>
                <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-muted-foreground">الكودات المفعلة</p>
                        <h3 className="text-2xl font-black mt-1">850</h3>
                    </div>
                </div>
                <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-center">
                    <p className="text-sm font-bold text-muted-foreground mb-2">استهلاك الباقة</p>
                    <div className="w-full bg-accent rounded-full h-2 mb-2 overflow-hidden">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-[12px] font-bold text-amber-500 text-left" dir="ltr">85%</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex gap-1 bg-accent/50 rounded-xl p-1">
                    {[
                        { id: "all", label: "جميع الأكواد" },
                        { id: "active", label: "المفعلة" },
                        { id: "available", label: "المتاحة" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg transition-colors text-[13px] font-medium ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent text-foreground"
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
                            placeholder="ابحث برقم الكود أو الطالب..."
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
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">رمز الوصول (Access Code)</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">الطالب المسجل</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">الدورة المخصصة</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">الحالة</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">تاريخ التفعيل</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {seats.map((seat, i) => (
                                <tr key={seat.id} className="hover:bg-accent/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <code className="px-2 py-1 bg-accent rounded text-[12px] font-mono text-primary font-bold select-all" dir="ltr">{seat.id}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        {seat.student !== 'غير محدد' ? (
                                            <div>
                                                <p className="font-bold">{seat.student}</p>
                                                <p className="text-[11px] text-muted-foreground mt-0.5" dir="ltr">{seat.email}</p>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground text-[12px] italic">لم يُستخدم بعد</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-muted-foreground">
                                        {seat.course}
                                    </td>
                                    <td className="px-6 py-4">
                                        {seat.status === 'مفعل' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-500">
                                                <Check className="w-3 h-3" /> مفعل
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-500">
                                                <Clock className="w-3 h-3" /> متاح
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground font-mono text-[12px]" dir="ltr">
                                        {seat.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        {seat.status === 'متاح' ? (
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors text-[12px] font-bold">
                                                <Mail className="w-3.5 h-3.5" /> إرسال دعوة
                                            </button>
                                        ) : (
                                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors text-[12px] font-bold">
                                                <XCircle className="w-3.5 h-3.5" /> إلغاء الربط
                                            </button>
                                        )}
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
