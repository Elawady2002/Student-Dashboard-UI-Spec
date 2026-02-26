import { Activity, Users, CreditCard, ShieldAlert, Server, Globe2, AlertTriangle, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const serverLoad = [
    { time: '00:00', load: 45 }, { time: '04:00', load: 30 },
    { time: '08:00', load: 60 }, { time: '12:00', load: 85 },
    { time: '16:00', load: 92 }, { time: '20:00', load: 75 },
    { time: '24:00', load: 50 },
];

export function AdminHomePage() {
    return (
        <div className="space-y-8">
            {/* Block 1: Welcome Banner (Matching Student Dashboard) */}
            <div className="bg-gradient-to-l from-rose-500/10 via-rose-500/5 to-transparent rounded-2xl p-5 lg:p-6 border border-rose-500/10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                    <div className="flex-1 space-y-4">
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">القيادة المركزية (Super Admin)</h1>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center shadow-inner">
                                <Activity className="w-7 h-7 text-rose-500" />
                            </div>
                            <div>
                                <p className="text-xl lg:text-2xl font-bold">حالة النظام: مستقرة 100%</p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    جميع الخوادم تعمل بكفاءة. لا توجد تنبيهات أمنية حرجة.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-64 p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold">استهلاك الخادم (CPU)</p>
                            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded">آمن</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-1.5 mb-2 overflow-hidden">
                            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                        <p className="text-[11px] text-muted-foreground">متوسط استهلاك الموارد: 42%.</p>
                    </div>
                </div>
            </div>

            {/* Block 2: Global Stats */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: "إجمالي المستخدمين", value: "24,592", color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12%" },
                    { icon: CreditCard, label: "إيرادات المنصة", value: "1.2M", color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+8%" },
                    { icon: Server, label: "استهلاك التخزين", value: "4.2 TB", color: "text-purple-500", bg: "bg-purple-500/10", trend: "+2%" },
                    { icon: ShieldAlert, label: "التقارير المفتوحة", value: "3", color: "text-amber-500", bg: "bg-amber-500/10", trend: "-5%" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card rounded-2xl border border-border p-5 hover:-translate-y-1 transition-transform shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex gap-1 items-center">
                                <ArrowUpRight className="w-3 h-3" /> {stat.trend}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                            <p className="text-[13px] font-bold text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Block 3: Charts & Logs */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-rose-500" />
                        حركة المرور (Traffic) آخر 24 ساعة
                    </h3>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={serverLoad} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))', direction: 'rtl' }}
                                    itemStyle={{ color: '#f43f5e' }}
                                />
                                <Area type="monotone" dataKey="load" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                    <h3 className="text-base font-bold mb-5 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        تنبيهات النظام والمراقبة
                    </h3>
                    <div className="space-y-3 flex-1">
                        {[
                            { type: "info", text: "تم تسجيل دخول أدمن جديد (IP: 192.168.1.1)", time: "منذ 5 د" },
                            { type: "warning", text: "استهلاك قواعد البيانات وصل 80%", time: "منذ 15 د" },
                            { type: "error", text: "فشل محاولة دفع للمستخدم #5923", time: "منذ ساعة" },
                            { type: "success", text: "اكتمل النسخ الاحتياطي اليومي", time: "منذ ساعتين" },
                        ].map((alert, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-accent/30 hover:bg-accent transition-colors text-sm">
                                <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${alert.type === 'error' ? 'bg-destructive' :
                                        alert.type === 'warning' ? 'bg-amber-500' :
                                            alert.type === 'success' ? 'bg-emerald-500' :
                                                'bg-blue-500'
                                    }`} />
                                <div>
                                    <p className="font-semibold">{alert.text}</p>
                                    <p className="text-[10px] text-muted-foreground mt-1" dir="ltr">{alert.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-2 border border-border rounded-xl text-xs font-bold hover:bg-accent transition-colors">
                        عرض كل السجلات (Logs)
                    </button>
                </div>
            </section>
        </div>
    );
}
