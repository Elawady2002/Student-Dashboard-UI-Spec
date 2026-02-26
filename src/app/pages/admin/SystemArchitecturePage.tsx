import { Server, Database, Globe, Cpu, MemoryStick, Activity, ShieldAlert, ArrowUpRight, Copy } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const performanceLogs = [
    { time: '10:00', cpu: 30, memory: 45, network: 20 },
    { time: '11:00', cpu: 45, memory: 55, network: 40 },
    { time: '12:00', cpu: 75, memory: 80, network: 85 },
    { time: '13:00', cpu: 60, memory: 70, network: 60 },
    { time: '14:00', cpu: 40, memory: 50, network: 35 },
];

export function SystemArchitecturePage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">هيكلة النظام ومراقبة الموارد</h1>
                    <p className="text-sm text-muted-foreground mt-1">مراقبة حية لأداء الخوادم، قواعد البيانات ومستويات الاستهلاك</p>
                </div>
            </div>

            {/* Resource Utilization Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "معالجات النظام (CPU)", value: "42%", icon: Cpu, color: "text-blue-500", bg: "bg-blue-500/10", status: "مستقر" },
                    { label: "الذاكرة العشوائية (RAM)", value: "68%", icon: MemoryStick, color: "text-indigo-500", bg: "bg-indigo-500/10", status: "مستقر" },
                    { label: "مساحة التخزين الكلية", value: "4.2 TB", icon: Database, color: "text-emerald-500", bg: "bg-emerald-500/10", status: "مستقر" },
                    { label: "حركة مرور الشبكة", value: "850 Mbps", icon: Globe, color: "text-violet-500", bg: "bg-violet-500/10", status: "عالي" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-5 rounded-2xl border border-border flex flex-col justify-between shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.status === 'مستقر' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                }`}>
                                {stat.status}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-1 font-mono" dir="ltr">{stat.value}</h3>
                            <p className="text-[13px] font-bold text-muted-foreground">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live Performance Chart */}
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-indigo-500" />
                        استهلاك الموارد (Live)
                    </h3>
                    <div className="h-[300px] w-full mt-auto" dir="ltr">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceLogs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))', direction: 'rtl' }}
                                />
                                <Area type="monotone" dataKey="cpu" name="CPU" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCpu)" />
                                <Area type="monotone" dataKey="memory" name="Memory" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorMemory)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Infrastructure Stack */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-base font-bold mb-5 flex items-center gap-2">
                        <Server className="w-4 h-4 text-emerald-500" />
                        بنية الخوادم (Infrastructure)
                    </h3>
                    <div className="space-y-3">
                        {[
                            { name: "Frontend Cluster", type: "Vercel / Edge Network", status: "متصل", ip: "104.21.XX.XX" },
                            { name: "Backend Core API", type: "AWS EC2 • Node.js", status: "متصل", ip: "34.201.XX.XX" },
                            { name: "Primary Database", type: "PostgreSQL (RDS)", status: "متصل", ip: "Internal" },
                            { name: "Redis Cache", type: "ElastiCache", status: "متصل", ip: "Internal" },
                        ].map((node, i) => (
                            <div key={i} className="p-3.5 rounded-xl border border-border bg-accent/30 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-sm tracking-tight" dir="ltr">{node.name}</span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                                </div>
                                <p className="text-[11px] text-muted-foreground font-mono" dir="ltr">{node.type}</p>
                                <div className="flex items-center justify-between mt-1">
                                    <code className="text-[10px] bg-card px-2 py-0.5 rounded font-bold" dir="ltr">{node.ip}</code>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
