import { Users, Building, TrendingUp, CheckCircle, Ticket, AlertCircle, ArrowUpRight } from "lucide-react";

export function OrgHomePage() {
    return (
        <div className="space-y-8">
            {/* Block 1: Welcome Banner (Matching Student Dashboard) */}
            <div className="bg-gradient-to-l from-indigo-500/10 via-indigo-500/5 to-transparent rounded-2xl p-5 lg:p-6 border border-indigo-500/10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <div className="flex-1 space-y-4">
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">أهلاً بمدارس الرواد! 🏫</h1>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                                <Building className="w-7 h-7 text-indigo-500" />
                            </div>
                            <div>
                                <p className="text-xl lg:text-2xl font-bold">ملخص سير العمليات الإدارية</p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    باقة الشركات Enterprise - تعمل بكفاءة 100%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-64 p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold">استهلاك المقاعد</p>
                            <span className="text-[10px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded">تنبيه</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-1.5 mb-2 overflow-hidden">
                            <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-[11px] text-muted-foreground mb-3">850 مقعد مستخدم من أصل 1000 مقعد متاح.</p>
                        <button className="text-indigo-500 flex items-center gap-1 hover:underline text-sm font-semibold mt-auto">
                            ترقية الباقة أو شراء مقاعد
                        </button>
                    </div>
                </div>
            </div>

            {/* Block 2: Quick Stats */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Ticket, label: "المقاعد النشطة", value: 850, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { icon: Users, label: "إجمالي المعلمين", value: 7, color: "text-purple-500", bg: "bg-purple-500/10" },
                    { icon: TrendingUp, label: "الإيرادات الإجمالية", value: "245K", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { icon: CheckCircle, label: "نسب إجتياز الطلاب", value: "92%", color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between hover:-translate-y-1 transition-transform shadow-sm">
                        <div>
                            <p className="text-[13px] font-bold text-muted-foreground mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-2xl ${stat.bg}`}>
                            <stat.icon className={`w-7 h-7 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </section>

            {/* Block 3: Recent Activity Lists */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-bold">أحدث تفعيلات الأكواد (Seats)</h3>
                        <button className="text-primary text-xs font-semibold hover:underline">عرض الكل ({150})</button>
                    </div>
                    <div className="space-y-2">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-accent/50 transition-colors border border-transparent hover:border-border">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <Ticket className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">كود مقعد تم تفعيله</p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">الطالب: عبدالرحمن سعد • دورة الإنجليزي</p>
                                    </div>
                                </div>
                                <span className="text-[11px] font-bold text-emerald-500">تم التفعيل</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-bold">تنبيهات النظام للمؤسسة</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/5 hover:bg-amber-500/10 transition-colors cursor-pointer border border-amber-500/20">
                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-amber-700 dark:text-amber-500">استهلاك عالٍ للمقاعد</p>
                                <p className="text-[12px] text-amber-600/80 dark:text-amber-500/80 mt-1">تجاوزت استخدام مقاعد دورة الرياضيات 90%. نرجو توفير مقاعد إضافية لتجنب إيقاف التسجيل.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer border border-primary/20">
                            <Building className="w-5 h-5 text-primary shrink-0" />
                            <div>
                                <p className="text-sm font-bold text-primary">فاتورة متجددة قريباً</p>
                                <p className="text-[12px] text-primary/80 mt-1">سيتم تجديد باقة Enterprise في تاريخ 01-05-2024 بمبلغ 15,000 ريال.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
