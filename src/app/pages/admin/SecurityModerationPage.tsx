import { ShieldAlert, ShieldCheck, Lock, Key, EyeOff, UserX, AlertTriangle, ShieldBan } from "lucide-react";

const recentIncidents = [
    { id: "INC-8891", type: "محاولة تسجيل دخول فاشلة متكررة", ip: "185.200.11.45", location: "الرياض، السعودية", time: "منذ 15 دقيقة", severity: "متوسط" },
    { id: "INC-8890", type: "تغيير صلاحيات مدير (Admin)", ip: "85.10.12.99", location: "جدة، السعودية", time: "منذ ساعتين", severity: "عالي" },
    { id: "INC-8889", type: "حظر عنوان IP تلقائي", ip: "110.45.21.3", location: "خارج المملكة", time: "منذ 3 ساعات", severity: "منخفض" },
];

export function SecurityModerationPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">الأمن السيبراني والمراقبة</h1>
                    <p className="text-sm text-muted-foreground mt-1">مراقبة التهديدات، سجل التدقيق (Audit Logs)، وتكوين سياسات الأمان</p>
                </div>
                <button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                    <ShieldBan className="w-4 h-4" />
                    <span>تفعيل وضع الإغلاق للطوارئ</span>
                </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "حالة جدار الحماية", value: "مُفعل", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "IPs محظورة (24 ساعة)", value: "142", icon: UserX, color: "text-rose-500", bg: "bg-rose-500/10" },
                    { label: "هجمات تم صدها (DDoS)", value: "5", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-500/10" },
                    { label: "تشفير البيانات (At Rest)", value: "AES-256", icon: Lock, color: "text-indigo-500", bg: "bg-indigo-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
                        <div className={`p-3 rounded-2xl ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black font-mono tracking-tight" dir="ltr">{stat.value}</h3>
                            <p className="text-[12px] font-bold text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Security Settings & Policies */}
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Key className="w-5 h-5 text-primary" />
                        سياسات الأمان النشطة
                    </h3>
                    <div className="space-y-4">
                        {[
                            { title: "المصادقة الثنائية (2FA)", desc: "مفعلة إجبارياً لجميع مدراء النظام والمؤسسات.", active: true },
                            { title: "حظر الجغرافي (Geo-Block)", desc: "السماح بالوصول للوحة التحكم من داخل المملكة فقط.", active: true },
                            { title: "مهلة الخمول (Session Timeout)", desc: "إنهاء الجلسة بعد 30 دقيقة من الخمول المؤكد.", active: false },
                            { title: "إشعارات محاولات الدخول الخطرة", desc: "إرسال بريد وتسجيل الحدث عند تغيير IP للمسؤولين.", active: true },
                        ].map((policy, i) => (
                            <div key={i} className="flex items-start justify-between p-3 rounded-xl border border-border bg-accent/30">
                                <div>
                                    <p className="font-bold text-sm tracking-tight">{policy.title}</p>
                                    <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{policy.desc}</p>
                                </div>
                                <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${policy.active ? 'bg-primary' : 'bg-muted'}`}>
                                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${policy.active ? '-translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Audit Logs / Incident Reports */}
                <div className="lg:col-span-2 bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <EyeOff className="w-5 h-5 text-amber-500" />
                            سجل الأحداث الأمنية (Security Audit Log)
                        </h3>
                        <button className="text-[13px] font-bold text-primary hover:underline">تحميل التقرير</button>
                    </div>

                    <div className="space-y-3">
                        {recentIncidents.map((incident, i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-border bg-accent/30 hover:bg-accent transition-colors">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-2 h-2 rounded-full ${incident.severity === 'عالي' ? 'bg-rose-500' :
                                                incident.severity === 'متوسط' ? 'bg-amber-500' :
                                                    'bg-emerald-500'
                                            }`} />
                                        <p className="font-bold text-sm">{incident.type}</p>
                                    </div>
                                    <p className="text-[12px] text-muted-foreground flex items-center gap-2">
                                        <code className="bg-card px-1.5 rounded" dir="ltr">{incident.ip}</code>
                                        <span>• {incident.location}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[11px] font-mono text-muted-foreground" dir="ltr">{incident.time}</span>
                                    <code className="text-[10px] bg-card border border-border px-2 py-1 rounded text-foreground font-bold" dir="ltr">{incident.id}</code>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
