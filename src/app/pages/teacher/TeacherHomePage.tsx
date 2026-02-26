import { BookOpen, Book, Users, Wallet, Star, ArrowUpRight, ArrowDownRight, Target, Flame, FileText, CheckCircle } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";

const stats = [
    { name: 'يناير', students: 120, revenue: 4000 },
    { name: 'فبراير', students: 150, revenue: 5500 },
    { name: 'مارس', students: 280, revenue: 8200 },
    { name: 'أبريل', students: 250, revenue: 7800 },
    { name: 'مايو', students: 380, revenue: 12500 },
    { name: 'يونيو', students: 420, revenue: 15000 },
];

export function TeacherHomePage() {
    return (
        <div className="space-y-8">
            {/* Block 1: Welcome Banner (Matching Student Dashboard) */}
            <div className="bg-gradient-to-l from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 lg:p-6 border border-primary/10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <div className="flex-1 space-y-4">
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">أهلاً بعودتك يا د. أسامة! 🌟</h1>

                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                                <Flame className="w-7 h-7 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-xl lg:text-2xl font-bold">أداء ممتاز هذا الشهر</p>
                                <p className="text-sm text-muted-foreground">
                                    تقييم طلابك عالي جداً! استمر على هذا المنوال.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-64 p-4 rounded-xl bg-card border border-border">
                        <p className="text-sm font-semibold mb-2">💡 نصيحة للنمو</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            إضافة اختبارات قصيرة بعد الدروس تزيد من تفاعل الطلاب بنسبة 40%.
                        </p>
                        <button className="text-primary flex items-center gap-1 hover:underline text-sm font-semibold">
                            أضف اختبار الآن
                        </button>
                    </div>
                </div>
            </div>

            {/* Block 2: Quick Stats */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { icon: BookOpen, label: "إجمالي الدورات", value: 12, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { icon: Book, label: "الكتب المرفوعة", value: 4, color: "text-purple-500", bg: "bg-purple-500/10" },
                    { icon: Users, label: "الطلاب المسجلين", value: 4892, color: "text-green-500", bg: "bg-green-500/10" },
                    { icon: Star, label: "متوسط التقييم", value: 4.8, color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className="bg-card rounded-2xl border border-border p-4 text-center hover:-translate-y-1 transition-transform cursor-default shadow-sm"
                    >
                        <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <p className="text-3xl font-extrabold text-foreground tracking-tight">{stat.value}</p>
                        <p className="text-sm text-muted-foreground font-medium mt-1">{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Block 3: Charts Area */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card p-5 lg:p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold">نمو المبيعات (ر.س)</h3>
                            <p className="text-sm text-muted-foreground mt-1">تطور الإيرادات خلال الـ 6 أشهر الماضية</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex gap-1 items-center">
                            <ArrowUpRight className="w-3 h-3" /> +14.5%
                        </span>
                    </div>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))', direction: 'rtl' }}
                                    itemStyle={{ color: '#10b981' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card p-5 lg:p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold">إحصائيات التسجيلات الان</h3>
                            <p className="text-sm text-muted-foreground mt-1">معدل انضمام الطلاب للدورات</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex gap-1 items-center">
                            <ArrowUpRight className="w-3 h-3" /> +28%
                        </span>
                    </div>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--accent))' }}
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))', direction: 'rtl' }}
                                    itemStyle={{ color: '#6366f1' }}
                                />
                                <Bar dataKey="students" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* Block 4: Recent Acitivity/Alerts */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold">آخر التعليقات والتقييمات</h3>
                        <button className="text-primary text-xs font-semibold">عرض الكل</button>
                    </div>
                    <div className="space-y-1">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors">
                                <span className="text-lg">💬</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm leading-snug">"كورس رائع جداً، شرح مبسط وممتاز!" - طالب</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">منذ ساعتين</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-base font-bold">مهام سريعة</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-primary" />
                                </div>
                                <p className="text-sm font-semibold">مراجعة الأسئلة المعلقة (5)</p>
                            </div>
                            <ArrowDownRight className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-accent hover:bg-accent/80 transition-colors cursor-pointer border border-border">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <p className="text-sm font-semibold text-muted-foreground">إنشاء كوبون خصم لليوم الوطني</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
