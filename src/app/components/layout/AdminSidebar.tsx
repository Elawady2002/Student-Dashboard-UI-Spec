import { useApp } from "../../context/AppContext";
import { NavLink } from "react-router";
import {
    Home, CreditCard, Users, ShieldAlert, LifeBuoy, ServerCrash,
    Settings, Moon, Sun, LogOut, X, ShieldCheck
} from "lucide-react";

const navItems = [
    { to: "/admin", icon: Home, label: "القيادة المركزية", badge: 0 },
    { to: "/admin/finance", icon: CreditCard, label: "المالية والاشتراكات", badge: 0 },
    { to: "/admin/users", icon: Users, label: "المستخدمين والمحتوى", badge: 5 },
    { to: "/admin/system", icon: ServerCrash, label: "هيكلة النظام", badge: 0 },
    { to: "/admin/security", icon: ShieldAlert, label: "الحماية والصلاحيات", badge: 1 },
    { to: "/admin/support", icon: LifeBuoy, label: "نظام الدعم الفني", badge: 12 },
];

export function AdminSidebar() {
    const { isDark, toggleTheme, setShowLogoutModal, sidebarOpen, setSidebarOpen } = useApp();

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 right-0 h-full w-[260px] bg-card border-l border-border z-50
        flex flex-col transition-transform duration-300
        lg:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
            >
                {/* Logo */}
                <div className="px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground" style={{ fontSize: "18px" }}>⭐</span>
                        </div>
                        <span className="text-primary text-xl font-bold">تميز</span>
                        <span className="text-[10px] bg-rose-500/10 text-rose-500 px-2 py-0.5 rounded-full mr-2 font-bold uppercase tracking-widest">Admin</span>
                    </div>
                    <button className="lg:hidden p-1 text-muted-foreground hover:text-foreground" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mx-5 h-px bg-border" />

                {/* Identity */}
                <div className="px-5 py-4 flex flex-col items-center text-center">
                    <div className="relative">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin1"
                            alt="Admin Avatar"
                            className="w-[60px] h-[60px] rounded-full object-cover border-2 border-primary"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                        </div>
                    </div>
                    <p className="mt-2 text-base font-bold">Super Admin</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
                        System Online 100%
                    </span>
                </div>

                <div className="mx-5 h-px bg-border" />

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-colors
                ${isActive ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-accent font-medium"}`
                            }
                            end={item.to === "/admin"}
                        >
                            <item.icon className="w-5 h-5 shrink-0" />
                            <span className="text-sm">{item.label}</span>
                            {item.badge > 0 && (
                                <span className="mr-auto bg-primary text-primary-foreground rounded-full px-2 py-0.5 min-w-[20px] text-center text-[10px]">
                                    {item.badge}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="mx-5 h-px bg-border" />

                {/* Bottom actions */}
                <div className="px-3 py-3 space-y-1">
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-foreground hover:bg-accent transition-colors font-medium"
                    >
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span className="text-sm">{isDark ? "الوضع الفاتح" : "الوضع الداكن"}</span>
                    </button>

                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-destructive hover:bg-destructive/10 transition-colors font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm">تسجيل الخروج</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
