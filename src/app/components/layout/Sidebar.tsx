import { useApp } from "../../context/AppContext";
import { currentUser } from "../../data/mockData";
import { NavLink } from "react-router";
import {
  Home, BookOpen, Book, Award, Target, MessageCircle,
  Users, Star, Trophy, Search, Settings, Moon, Sun, LogOut, X
} from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "الرئيسية", badge: 0 },
  { to: "/courses", icon: BookOpen, label: "كورساتي", badge: 3 },
  { to: "/books", icon: Book, label: "كتبي", badge: 0 },
  { to: "/certificates", icon: Award, label: "شهاداتي", badge: 1 },
  { to: "/goals", icon: Target, label: "أهدافي", badge: 0 },
  { to: "/chat", icon: MessageCircle, label: "الشات", badge: 7 },
  { to: "/community", icon: Users, label: "المجتمع", badge: 2 },
  { to: "/favorites", icon: Star, label: "المفضلة", badge: 0 },
  { to: "/leaderboard", icon: Trophy, label: "المتميزون", badge: 0 },
  { to: "/explore", icon: Search, label: "استكشف الكورسات", badge: 0 },
];

export function Sidebar() {
  const { isDark, toggleTheme, setShowLogoutModal, sidebarOpen, setSidebarOpen } = useApp();
  const xpPercent = (currentUser.xp / currentUser.xpNextLevel) * 100;

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
          </div>
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mx-5 h-px bg-border" />

        {/* User identity */}
        <div className="px-5 py-4 flex flex-col items-center text-center">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-[60px] h-[60px] rounded-full object-cover border-2 border-primary"
          />
          <p className="mt-2 text-base font-bold">{currentUser.name}</p>
          <span className="inline-flex items-center gap-1 mt-1 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
            {currentUser.levelEmoji} {currentUser.level}
          </span>
          <div className="w-full mt-3">
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
            <p className="mt-1 text-muted-foreground text-[10px]">
              {currentUser.xp.toLocaleString()} / {currentUser.xpNextLevel.toLocaleString()} XP للمستوى التالي
            </p>
          </div>
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
                ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`
              }
              end={item.to === "/"}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
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
            to="/settings"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors
              ${isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent"}`
            }
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">الإعدادات</span>
          </NavLink>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-foreground hover:bg-accent transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="text-sm font-medium">{isDark ? "الوضع الفاتح" : "الوضع الداكن"}</span>
          </button>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}
