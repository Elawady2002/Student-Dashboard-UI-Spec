import { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { currentUser, notifications } from "../../data/mockData";
import { Search, Bell, Flame, Zap, Menu, User, Settings, LogOut, X } from "lucide-react";
import { useNavigate } from "react-router";

export function Header() {
  const { pageTitle, setSidebarOpen, setShowLogoutModal } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-md border-b border-border flex items-center px-4 lg:px-6 gap-3">
      {/* Mobile menu button */}
      <button className="lg:hidden p-2 rounded-xl hover:bg-accent" onClick={() => setSidebarOpen(true)}>
        <Menu className="w-5 h-5" />
      </button>

      {/* Page title */}
      <h2 className="hidden sm:block shrink-0 text-lg font-bold">{pageTitle}</h2>

      {/* Search */}
      <div className="flex-1 max-w-lg mx-auto relative">
        {showSearch && (
          <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={() => setShowSearch(false)} />
        )}
        <div className={`${showSearch ? "fixed inset-x-0 top-0 p-4 bg-card z-50 sm:relative sm:p-0 sm:bg-transparent" : "hidden sm:block"}`}>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن كورس، كتاب، أو مدرس..."
              className="w-full h-10 pr-10 pl-4 rounded-xl bg-accent/50 border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              style={{ fontSize: "14px" }}
            />
            {showSearch && (
              <button className="absolute left-3 top-1/2 -translate-y-1/2 sm:hidden" onClick={() => setShowSearch(false)}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        <button className="sm:hidden p-2 rounded-xl hover:bg-accent" onClick={() => setShowSearch(true)}>
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Streak */}
        <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500/10 cursor-default" title={`${currentUser.streak} أيام متتالية — استمر!`}>
          <Flame className="w-4 h-4 text-orange-500" />
          <span className="text-orange-500 text-sm font-bold">{currentUser.streak}</span>
        </div>

        {/* XP */}
        <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-bold">{currentUser.xp.toLocaleString()} XP</span>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            className="p-2 rounded-xl hover:bg-accent relative"
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-destructive text-white flex items-center justify-center text-[10px]">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-[360px] max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-base font-bold">إشعاراتك</span>
                <button className="text-primary text-xs font-semibold">تحديد الكل كمقروء</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <button
                    key={n.id}
                    className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-accent/50 text-right transition-colors ${!n.isRead ? "bg-primary/5" : ""}`}
                    onClick={() => { navigate(n.link); setShowNotifications(false); }}
                  >
                    <span style={{ fontSize: "20px" }}>{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold leading-snug">{n.description}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.timeAgo}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                className="w-full py-3 text-center text-primary text-sm font-medium border-t border-border hover:bg-accent/50"
                onClick={() => { navigate("/notifications"); setShowNotifications(false); }}
              >
                عرض كل الإشعارات ←
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            className="p-1 rounded-full hover:ring-2 ring-primary/30"
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
          >
            <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          </button>

          {showProfile && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
              <button
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-accent text-right"
                onClick={() => { navigate("/settings"); setShowProfile(false); }}
              >
                <User className="w-4 h-4" />
                <span className="text-sm">الملف الشخصي</span>
              </button>
              <button
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-accent text-right"
                onClick={() => { navigate("/settings"); setShowProfile(false); }}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">الإعدادات</span>
              </button>
              <div className="h-px bg-border" />
              <button
                className="w-full flex items-center gap-2 px-4 py-3 hover:bg-destructive/10 text-destructive text-right"
                onClick={() => { setShowLogoutModal(true); setShowProfile(false); }}
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">تسجيل الخروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
