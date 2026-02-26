import { Outlet } from "react-router";
import { TeacherSidebar } from "./TeacherSidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { useApp } from "../../context/AppContext";

export function TeacherLayout() {
    const { showLogoutModal, setShowLogoutModal } = useApp();

    return (
        <div className="min-h-screen bg-background" dir="rtl">
            <TeacherSidebar />
            <div className="lg:mr-[260px] flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
            <MobileNav />

            {/* Logout modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setShowLogoutModal(false)}>
                    <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <p className="text-center mb-6" style={{ fontSize: "16px", fontWeight: 600 }}>
                            هل أنت متأكد من تسجيل الخروج؟
                        </p>
                        <div className="flex gap-3">
                            <button
                                className="flex-1 py-2.5 rounded-xl bg-destructive text-white hover:bg-destructive/90 transition-colors"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                تأكيد
                            </button>
                            <button
                                className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent/80 transition-colors"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                إلغاء
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
