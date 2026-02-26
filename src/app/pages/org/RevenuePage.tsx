import { TrendingUp, Award, Download, ArrowUpRight, CheckCircle2, ReceiptText } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const revenueData = [
    { name: '1', value: 3000 },
    { name: '5', value: 4500 },
    { name: '10', value: 8000 },
    { name: '15', value: 12000 },
    { name: '20', value: 15000 },
    { name: '25', value: 22000 },
    { name: '30', value: 28000 },
];

const passRateData = [
    { exam: 'اختبار 1', rate: 75 },
    { exam: 'اختبار 2', rate: 82 },
    { exam: 'اختبار 3', rate: 78 },
    { exam: 'اختبار 4', rate: 88 },
    { exam: 'اختبار 5', rate: 92 },
];

export function RevenuePage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">الإيرادات والاختبارات</h1>
                    <p className="text-sm text-muted-foreground mt-1">تابع العائد الاستثماري للمقاعد وأداء الطلاب المجمع في الاختبارات</p>
                </div>
                <button className="bg-card border border-border hover:bg-accent text-foreground px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 font-medium text-sm">
                    <Download className="w-4 h-4" />
                    <span>تصدير تقرير شامل</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Financial Overview */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <ReceiptText className="w-6 h-6 text-emerald-500" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex gap-1 items-center">
                            <ArrowUpRight className="w-3 h-3" /> +12.5%
                        </span>
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-muted-foreground mb-1">القيمة التقديرية للإيرادات</p>
                        <h3 className="text-3xl font-black">245,000 <span className="text-sm font-normal text-muted-foreground">ر.س</span></h3>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                            <Award className="w-6 h-6 text-indigo-500" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex gap-1 items-center">
                            <CheckCircle2 className="w-3 h-3" /> ممتاز
                        </span>
                    </div>
                    <div>
                        <p className="text-[13px] font-bold text-muted-foreground mb-1">متوسط نسبة الاجتياز المجمع</p>
                        <h3 className="text-3xl font-black">85%</h3>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                    <h3 className="text-[15px] font-bold mb-4">أعلى الدورات مبيعاً / تفعيلاً للإيرادات</h3>
                    <div className="space-y-4">
                        {[
                            { title: 'القدرات العامة', value: '120K' },
                            { title: 'التحصيلي علمي', value: '85K' },
                            { title: 'كفايات معلمين', value: '40K' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-[13px] font-bold">{item.title}</span>
                                <span className="text-[13px] font-bold text-muted-foreground">{item.value} ر.س</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Revenue Growth Chart */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6">تطور الإيرادات (شهرياً)</h3>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
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
                                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Exam Pass Rates Chart */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6">معدلات اجتياز الاختبارات الجماعية</h3>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={passRateData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="exam" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))', direction: 'rtl' }}
                                    itemStyle={{ color: '#6366f1' }}
                                />
                                <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
