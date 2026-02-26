import { Users, TrendingUp, BarChart3, Clock, Star, BrainCircuit } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell } from "recharts";

const performanceData = [
    { name: 'الكمي', value: 400 },
    { name: 'اللفظي', value: 300 },
    { name: 'تجميعات', value: 300 },
    { name: 'التحصيلي', value: 200 },
];
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#8b5cf6'];

const completionData = [
    { module: 'درس 1', students: 420 },
    { module: 'درس 2', students: 380 },
    { module: 'درس 3', students: 350 },
    { module: 'درس 4', students: 310 },
    { module: 'درس 5', students: 250 },
    { module: 'درس 6', students: 210 },
];

export function AnalyticsPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">التحليلات التفصيلية</h1>
                    <p className="text-sm text-muted-foreground mt-1">تتبع أداء دوراتك ومعدلات إنجاز الطلاب بدقة</p>
                </div>
                <select className="bg-card border border-border/50 text-[13px] rounded-xl px-4 py-2.5 shadow-sm focus:outline-none focus:border-primary font-medium cursor-pointer">
                    <option>دورة القدرات - تأسيس (الحالية)</option>
                    <option>التحصيلي علمي المكثف</option>
                    <option>جميع الدورات</option>
                </select>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "معدل الإنجاز العام", value: "68%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "متوسط ساعات التعلم", value: "12.4", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "معدل التفاعل بالإجابات", value: "84%", icon: BrainCircuit, color: "text-purple-500", bg: "bg-purple-500/10" },
                    { label: "تقييم ختام الدورة", value: "4.8", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </div>
                        <div>
                            <p className="text-[13px] font-bold text-muted-foreground mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pie Chart: Audience Distribution */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6">توزيع المشاركات بالأقسام</h3>
                    <div className="h-[250px] w-full mt-auto relative font-medium text-[12px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={performanceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {performanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))', direction: 'rtl' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl font-black">{1200}</span>
                            <span className="text-[11px] text-muted-foreground font-bold">طالب</span>
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        {performanceData.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-[13px] font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                    <span>{item.name}</span>
                                </div>
                                <span className="font-bold">{item.value} طالب</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bar Chart: Progress Drop-off */}
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">معدل الانخراط بالدروس (Drop-off Analysis)</h3>
                        <span className="text-[11px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-1 rounded">يوضح استمرار الطلاب</span>
                    </div>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart data={completionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="module" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} dx={-10} />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--accent))' }}
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))', direction: 'rtl' }}
                                    itemStyle={{ color: '#6366f1' }}
                                />
                                <Bar dataKey="students" name="الطلاب المستمرين" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
