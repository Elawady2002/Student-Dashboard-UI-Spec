import { Wallet, ArrowUpRight, ArrowDownRight, Download, CreditCard, Landmark, Clock, CheckCircle } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const withdrawalHistory = [
    { id: "W-8932", date: "2023-11-01", amount: 15000, status: "مكتمل" },
    { id: "W-8412", date: "2023-10-01", amount: 12400, status: "مكتمل" },
    { id: "W-7992", date: "2023-09-01", amount: 8500, status: "مكتمل" },
];

const profitData = [
    { name: 'يوليو', value: 8000 },
    { name: 'أغسطس', value: 12000 },
    { name: 'سبتمبر', value: 18000 },
    { name: 'أكتوبر', value: 25000 },
    { name: 'نوفمبر', value: 22000 },
    { name: 'ديسمبر', value: 34500 },
];

export function FinancialHubPage() {
    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">المركز المالي</h1>
                    <p className="text-sm text-muted-foreground mt-1">تتبع أرباحك واطلب عمليات سحب الرصيد بأمان</p>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                    <Wallet className="w-4 h-4" />
                    <span>طلب سحب للرصيد</span>
                </button>
            </div>

            {/* Hero Financial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-6 rounded-2xl shadow-xl shadow-emerald-900/10 text-white flex flex-col justify-between min-h-[160px] relative overflow-hidden">
                    <Wallet className="absolute -left-6 -bottom-6 w-32 h-32 text-white/10" />
                    <div className="relative z-10 flex justify-between items-start">
                        <p className="font-bold text-emerald-50">الرصيد المتاح للسحب</p>
                        <span className="bg-white/20 px-2 py-1 rounded text-xs backdrop-blur font-bold uppercase tracking-wider">SAR</span>
                    </div>
                    <div className="relative z-10 mt-auto">
                        <h2 className="text-4xl font-black tabular-nums tracking-tight">34,500.00</h2>
                        <p className="text-emerald-100 text-sm mt-1">أرباح الدورات (بعد استقطاع العمولة)</p>
                    </div>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between min-h-[160px]">
                    <div className="flex justify-between items-start">
                        <p className="font-bold text-muted-foreground">الحساب البنكي المربوط</p>
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Landmark className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <div className="mt-auto">
                        <h2 className="text-xl font-bold font-mono tracking-widest text-foreground" dir="ltr">**** **** **** 4892</h2>
                        <p className="text-sm mt-1 text-primary font-bold">مصرف الراجحي</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Area */}
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6">نمو الأرباح</h3>
                    <div className="h-[250px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={profitData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
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
                                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Withdrawal History */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">سجل السحوبات</h3>
                        <button className="text-primary hover:text-primary-foreground hover:bg-primary px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">عرض الكل</button>
                    </div>

                    <div className="space-y-4 flex-1">
                        {withdrawalHistory.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-accent/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground font-mono" dir="ltr">{item.id}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{item.date}</p>
                                    </div>
                                </div>
                                <div className="text-left font-bold text-[14px]">
                                    {item.amount.toLocaleString()} <span className="text-xs text-muted-foreground font-normal">ر.س</span>
                                </div>
                            </div>
                        ))}

                        <button className="w-full flex items-center justify-center gap-2 py-3 mt-4 border border-dashed border-border rounded-xl text-sm font-medium hover:bg-accent transition-colors text-muted-foreground">
                            <Download className="w-4 h-4" />
                            تنزيل كشف حساب PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
