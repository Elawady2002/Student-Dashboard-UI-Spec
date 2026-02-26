import { useApp } from "../../context/AppContext";
import { currentUser } from "../../data/mockData";
import { NavLink } from "react-router";
import {
    Home, BookOpen, Book, MessageCircle, Wallet, BarChart3,
    Settings, Moon, Sun, LogOut, X, GraduationCap
} from "lucide-react";

const navItems = [
    { to: "/teacher", icon: Home, label: "نظرة عامة", badge: 0 },
    { to: "/teacher/courses", icon: BookOpen, label: "إدارة الكورسات", badge: 0 },
    { to: "/teacher/books", icon: Book, label: "إدارة الكتب", badge: 0 },
    { to: "/teacher/qa", icon: MessageCircle, label: "الأسئلة والتعليقات", badge: 12 },
    { to: "/teacher/financial", icon: Wallet, label: "المركز المالي", badge: 0 },
    { to: "/teacher/analytics", icon: BarChart3, label: "التحليلات", badge: 0 },
];

export function TeacherSidebar() {
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
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full mr-2 font-bold">معلم</span>
                    </div>
                    <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mx-5 h-px bg-border" />

                {/* User identity */}
                <div className="px-5 py-4 flex flex-col items-center text-center">
                    <div className="relative">
                        <img
                            src={currentUser.avatar}
                            alt={currentUser.name}
                            className="w-[60px] h-[60px] rounded-full object-cover border-2 border-primary"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                            <GraduationCap className="w-3.5 h-3.5 text-primary" />
                        </div>
                    </div>
                    <p className="mt-2 text-base font-bold">{currentUser.name}</p>
                    <span className="inline-flex items-center gap-1 mt-1 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        شريك مميز ✨
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
                            end={item.to === "/teacher"}
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
                    <NavLink
                        to="/teacher/settings"
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium
              ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`
                        }
                    >
                        <Settings className="w-5 h-5" />
                        <span className="text-sm">الإعدادات</span>
                    </NavLink>

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
