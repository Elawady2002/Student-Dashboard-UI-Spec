import { NavLink } from "react-router";
import { Home, BookOpen, MessageCircle, Users, User } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "الرئيسية" },
  { to: "/courses", icon: BookOpen, label: "كورساتي" },
  { to: "/chat", icon: MessageCircle, label: "الشات" },
  { to: "/community", icon: Users, label: "المجتمع" },
  { to: "/settings", icon: User, label: "حسابي" },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex items-center justify-around py-2 lg:hidden">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors
            ${isActive ? "text-primary" : "text-muted-foreground"}`
          }
        >
          <item.icon className="w-5 h-5" />
          <span style={{ fontSize: "10px" }}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
