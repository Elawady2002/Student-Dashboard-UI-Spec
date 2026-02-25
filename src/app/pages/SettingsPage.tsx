import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { currentUser } from "../data/mockData";
import { Camera, X, Shield, Bell, Eye, Clock, LogOut, Trash2 } from "lucide-react";

export function SettingsPage() {
  const { setPageTitle, setShowLogoutModal } = useApp();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  useEffect(() => { setPageTitle("الملف الشخصي والإعدادات"); }, [setPageTitle]);

  const [notifSettings, setNotifSettings] = useState({
    instructorMessages: true,
    communityUpdates: true,
    streakReminder: true,
    goalAlerts: true,
    platformNews: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    showInLeaderboard: true,
    allowInstructorMessages: true,
    hideActivity: false,
  });

  const xpPercent = (currentUser.xp / currentUser.xpNextLevel) * 100;

  return (
    <div className="max-w-3xl space-y-6">
      {/* Profile section */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <img src={currentUser.avatar} alt="" className="w-20 h-20 rounded-full object-cover border-3 border-primary" />
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-right flex-1">
            <h2 style={{ fontSize: "20px", fontWeight: 700 }}>{currentUser.name}</h2>
            <p className="text-muted-foreground" style={{ fontSize: "13px" }}>ahmed@example.com</p>
            <p className="text-muted-foreground" style={{ fontSize: "12px" }}>تاريخ الانضمام: يناير 2025</p>
            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="px-3 py-0.5 rounded-full bg-primary/10 text-primary" style={{ fontSize: "12px" }}>
                {currentUser.levelEmoji} {currentUser.level}
              </span>
            </div>
            <div className="mt-2 max-w-xs">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: `${xpPercent}%` }} />
              </div>
              <p className="text-muted-foreground mt-0.5" style={{ fontSize: "11px" }}>
                {currentUser.xp.toLocaleString()} / {currentUser.xpNextLevel.toLocaleString()} XP
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowEditProfile(true)}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground shrink-0"
            style={{ fontSize: "13px" }}
          >
            تعديل الملف
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>الإشعارات</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "instructorMessages", label: "رسائل المدرسين" },
            { key: "communityUpdates", label: "تحديثات المجتمع" },
            { key: "streakReminder", label: "تذكير الـ Streak اليومي" },
            { key: "goalAlerts", label: "تنبيهات انتهاء الهدف" },
            { key: "platformNews", label: "عروض وأخبار المنصة" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <span style={{ fontSize: "14px" }}>{item.label}</span>
              <button
                onClick={() => setNotifSettings({ ...notifSettings, [item.key]: !notifSettings[item.key as keyof typeof notifSettings] })}
                className={`w-11 h-6 rounded-full transition-colors ${notifSettings[item.key as keyof typeof notifSettings] ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${notifSettings[item.key as keyof typeof notifSettings] ? "-translate-x-5" : "-translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-primary" />
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>الخصوصية</h3>
        </div>
        <div className="space-y-3">
          {[
            { key: "showInLeaderboard", label: "ظهور ملفي في المتميزين" },
            { key: "allowInstructorMessages", label: "السماح للمدرسين بمراسلتي" },
            { key: "hideActivity", label: "إخفاء نشاطي عن المجتمع" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-2">
              <span style={{ fontSize: "14px" }}>{item.label}</span>
              <button
                onClick={() => setPrivacySettings({ ...privacySettings, [item.key]: !privacySettings[item.key as keyof typeof privacySettings] })}
                className={`w-11 h-6 rounded-full transition-colors ${privacySettings[item.key as keyof typeof privacySettings] ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${privacySettings[item.key as keyof typeof privacySettings] ? "-translate-x-5" : "-translate-x-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>سجل النشاط</h3>
        </div>
        <div className="space-y-2">
          {[
            { action: "تسجيل دخول", detail: "Chrome — Cairo, EG", time: "اليوم، 10:30 ص" },
            { action: "مشاهدة درس", detail: "مقدمة في الـ Typography", time: "اليوم، 9:15 ص" },
            { action: "شراء كورس", detail: "أساسيات تصميم UI/UX", time: "أمس، 3:00 م" },
            { action: "تحميل كتاب", detail: "الخط العربي الحديث", time: "منذ يومين" },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-accent/30">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <div className="flex-1">
                <p style={{ fontSize: "13px", fontWeight: 600 }}>{log.action}</p>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{log.detail}</p>
              </div>
              <span className="text-muted-foreground shrink-0" style={{ fontSize: "11px" }}>{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 style={{ fontSize: "16px", fontWeight: 700 }}>الخروج والأمان</h3>
        </div>
        <div className="space-y-3">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-2 p-3 rounded-xl border border-border hover:bg-accent text-right"
          >
            <LogOut className="w-4 h-4" />
            <span style={{ fontSize: "14px" }}>تسجيل الخروج من كل الأجهزة</span>
          </button>
          <button
            onClick={() => setShowDeleteAccount(true)}
            className="w-full flex items-center gap-2 p-3 rounded-xl border border-destructive/30 hover:bg-destructive/5 text-destructive text-right"
          >
            <Trash2 className="w-4 h-4" />
            <span style={{ fontSize: "14px" }}>حذف الحساب</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditProfile(false)}>
          <div className="bg-card rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: "18px", fontWeight: 700 }}>تعديل الملف الشخصي</h2>
              <button onClick={() => setShowEditProfile(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label style={{ fontSize: "13px" }}>الاسم</label>
                <input defaultValue={currentUser.name} className="w-full mt-1 px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ fontSize: "13px" }}>البريد الإلكتروني</label>
                <input defaultValue="ahmed@example.com" className="w-full mt-1 px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ fontSize: "13px" }}>كلمة المرور الحالية</label>
                <input type="password" className="w-full mt-1 px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "14px" }} />
              </div>
              <div>
                <label style={{ fontSize: "13px" }}>كلمة المرور الجديدة</label>
                <input type="password" className="w-full mt-1 px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "14px" }} />
              </div>
              <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground" style={{ fontSize: "14px" }} onClick={() => setShowEditProfile(false)}>
                حفظ التعديلات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete account modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteAccount(false)}>
          <div className="bg-card rounded-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-center mb-2" style={{ fontSize: "16px", fontWeight: 600 }}>حذف الحساب نهائياً؟</p>
            <p className="text-center text-muted-foreground mb-4" style={{ fontSize: "13px" }}>هذا الإجراء لا يمكن التراجع عنه</p>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 rounded-xl bg-destructive text-white" onClick={() => setShowDeleteAccount(false)}>حذف</button>
              <button className="flex-1 py-2.5 rounded-xl bg-accent" onClick={() => setShowDeleteAccount(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
