import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface AppContextType {
  isDark: boolean;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  unreadNotifications: number;
  unreadMessages: number;
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [pageTitle, setPageTitle] = useState("الرئيسية");

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  }, []);

  useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        sidebarOpen,
        setSidebarOpen,
        showLogoutModal,
        setShowLogoutModal,
        unreadNotifications: 3,
        unreadMessages: 7,
        pageTitle,
        setPageTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
