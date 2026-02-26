import { useState } from "react";
import { LifeBuoy, Clock, CheckCircle2, AlertTriangle, MessageSquare, Search, Filter } from "lucide-react";

const supportTickets = [
    { id: "T-4491", user: "مدرسة الرواد", role: "مؤسسة", subject: "مشكلة في لوحة إضافة المعلمين", status: "مفتوح", priority: "عالي", time: "منذ 10 دقائق" },
    { id: "T-4490", user: "د. أسامة", role: "معلم", subject: "طلب تغيير باقة الاشتراك", status: "قيد المراجعة", priority: "متوسط", time: "منذ ساعة" },
    { id: "T-4488", user: "أحمد طالب", role: "طالب", subject: "لم يتم تفعيل كود المقعد", status: "مغلق", priority: "منخفض", time: "منذ 5 ساعات" },
];

export function SupportSystemPage() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">نظام الدعم الفني</h1>
                    <p className="text-sm text-muted-foreground mt-1">إدارة التذاكر وحل مشاكل المعلمين، الطلاب والمؤسسات</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "التذاكر المفتوحة", value: "24", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-500/10" },
                    { label: "متوسط وقت الرد", value: "1.5h", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "تذاكر مغلقة (اليوم)", value: "12", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "إجمالي التذاكر النشطة", value: "36", icon: LifeBuoy, color: "text-indigo-500", bg: "bg-indigo-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-5 rounded-2xl border border-border flex items-center gap-4 hover:-translate-y-1 transition-transform shadow-sm">
                        <div className={`p-3 rounded-2xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-0.5 tracking-tight" dir="ltr">{stat.value}</h3>
                            <p className="text-[12px] font-bold text-muted-foreground">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex gap-1 bg-accent/50 rounded-xl p-1">
                    {[
                        { id: "all", label: "الكل" },
                        { id: "open", label: "المفتوحة" },
                        { id: "pending", label: "قيد المراجعة" },
                        { id: "closed", label: "المغلقة" }
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
                            placeholder="بحث برقم التذكرة أو الايميل..."
                            className="w-full bg-accent/50 border border-border rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors h-10"
                        />
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 text-muted-foreground bg-accent/50 hover:bg-accent rounded-xl transition-colors border border-border">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-3">
                {supportTickets.map((ticket, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                        <div className="flex items-start gap-4 flex-1">
                            <div className={`p-3 rounded-xl flex-shrink-0 ${ticket.status === 'مفتوح' ? 'bg-rose-500/10 text-rose-500' :
                                    ticket.status === 'قيد المراجعة' ? 'bg-amber-500/10 text-amber-500' :
                                        'bg-emerald-500/10 text-emerald-500'
                                }`}>
                                <MessageSquare className="w-6 h-6" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <code className="text-[12px] font-bold text-muted-foreground bg-accent px-1.5 py-0.5 rounded" dir="ltr">{ticket.id}</code>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ticket.priority === 'عالي' ? 'bg-rose-500 text-white' :
                                            ticket.priority === 'متوسط' ? 'bg-amber-500 text-white' :
                                                'bg-emerald-500 text-white'
                                        }`}>
                                        أولوية: {ticket.priority}
                                    </span>
                                </div>
                                <h3 className="text-base font-bold group-hover:text-primary transition-colors">{ticket.subject}</h3>
                                <div className="flex items-center gap-2 mt-2 text-[12px] text-muted-foreground font-medium">
                                    <span className="text-foreground">{ticket.user}</span>
                                    <span>•</span>
                                    <span>{ticket.role}</span>
                                    <span>•</span>
                                    <span>{ticket.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className={`text-[12px] font-bold flex items-center gap-1 ${ticket.status === 'مفتوح' ? 'text-rose-500' :
                                    ticket.status === 'قيد المراجعة' ? 'text-amber-500' :
                                        'text-emerald-500'
                                }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {ticket.status}
                            </span>
                            <button className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm">
                                فتح التذكرة
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
