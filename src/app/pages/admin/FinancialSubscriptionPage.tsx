import { useState } from "react";
import { CreditCard, Download, Search, Edit2, ShieldCheck, PlayCircle, StopCircle, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const transactions = [
    { id: "TRX-99812", user: "أحمد بن فهد", amount: 1500, type: "اشتراك باقة", status: "مكتمل", date: "2023-11-20" },
    { id: "TRX-88312", user: "مدرسة الرواد", amount: 15000, type: "باقة Enterprise", status: "مكتمل", date: "2023-11-19" },
    { id: "TRX-77412", user: "سارة خالد", amount: 450, type: "شراء دورة", status: "فشل", date: "2023-11-18" },
    { id: "TRX-66512", user: "محمد العتيبي", amount: 1500, type: "اشتراك باقة", status: "مكتمل", date: "2023-11-18" },
];

const revenueData = [
    { name: 'يوليو', value: 80000 },
    { name: 'أغسطس', value: 120000 },
    { name: 'سبتمبر', value: 180000 },
    { name: 'أكتوبر', value: 250000 },
    { name: 'نوفمبر', value: 345000 },
];

export function FinancialSubscriptionPage() {
    const [activeTab, setActiveTab] = useState("transactions");

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">المالية والاشتراكات</h1>
                    <p className="text-sm text-muted-foreground mt-1">إدارة الباقات، الاشتراكات، ومراقبة التدفقات النقدية للمنصة</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                    <Download className="w-4 h-4" />
                    <span>تصدير التقارير الضريبية</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full flex gap-1 items-center">
                            <ArrowUpRight className="w-3 h-3" /> +24%
                        </span>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground mb-1">صافي الإيرادات (هذا الشهر)</p>
                    <h3 className="text-3xl font-black tabular-nums">345,000 ر.س</h3>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl">
                            <CreditCard className="w-6 h-6 text-indigo-500" />
                        </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground mb-1">الاشتراكات النشطة</p>
                    <h3 className="text-3xl font-black tabular-nums">1,240</h3>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center flex flex-col justify-center items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center mb-3">
                        <span className="text-lg font-bold text-emerald-500">98%</span>
                    </div>
                    <p className="text-sm font-bold">نسبة نجاح عمليات الدفع</p>
                    <p className="text-xs text-muted-foreground mt-1">عبر جميع بوابات الدفع المرتبطة</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6">التدفق النقدي للإيرادات</h3>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
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
                                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6">إدارة باقات المنصة</h3>
                    <div className="space-y-3">
                        {[
                            { name: "Start (طالب)", price: "مجاني", active: 24000, status: "مفعل" },
                            { name: "Pro (معلم مستقل)", price: "200 ر.س", active: 1200, status: "مفعل" },
                            { name: "Enterprise (مؤسسات)", price: "مخصص", active: 45, status: "مفعل" },
                        ].map((plan, i) => (
                            <div key={i} className="p-4 rounded-xl border border-border bg-accent/30 hover:bg-accent transition-colors flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold">{plan.name}</span>
                                    <button className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">السعر: {plan.price}</span>
                                    <span className="text-emerald-500 font-bold">{plan.active.toLocaleString()} مشترك</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden mt-6">
                <div className="p-5 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <h3 className="text-lg font-bold">سجل المعاملات المالية (Transactions)</h3>
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="ابحث برقم العملية TRX..."
                            className="w-full bg-accent/50 border border-border rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-right text-sm">
                        <thead className="bg-accent/50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">رقم العملية</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">المستخدم والتفاصيل</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">المبلغ</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">تاريخ المعاملة</th>
                                <th className="px-6 py-4 font-bold text-muted-foreground whitespace-nowrap">الحالة</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {transactions.map((trx, i) => (
                                <tr key={i} className="hover:bg-accent/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <code className="bg-accent px-2 py-1 rounded text-[12px] font-mono text-foreground font-bold" dir="ltr">{trx.id}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold">{trx.user}</p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">{trx.type}</p>
                                    </td>
                                    <td className="px-6 py-4 font-bold tabular-nums">
                                        {trx.amount.toLocaleString()} ر.س
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-[12px]" dir="ltr">
                                        {trx.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${trx.status === 'مكتمل' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
                                            }`}>
                                            {trx.status}
                                        </span>
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
