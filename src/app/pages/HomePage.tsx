import { useEffect, useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { currentUser, myCourses, notifications, activityFeed, recommendedCourses, recommendedBooks } from "../data/mockData";
import { Flame, Zap, Target, BookOpen, CheckCircle, Award, Clock, Star, Heart, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router";

function AnimatedNumber({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target]);
  return <span ref={ref}>{value}</span>;
}

function getGreeting(name: string) {
  const hour = new Date().getHours();
  if (hour < 12) return `صباح التميز يا ${name}! 🌟`;
  if (hour < 17) return `مساء النشاط يا ${name}! 💪`;
  return `أهلاً بعودتك يا ${name}! 🌙`;
}

export function HomePage() {
  const { setPageTitle } = useApp();
  const navigate = useNavigate();

  useEffect(() => { setPageTitle("الرئيسية"); }, [setPageTitle]);

  const learningCourses = myCourses.filter((c) => c.status === "learning");
  const completedCourses = myCourses.filter((c) => c.status === "completed");
  const goalPercent = (currentUser.todayMinutes / currentUser.todayGoalMinutes) * 100;
  const goalMet = currentUser.todayMinutes >= currentUser.todayGoalMinutes;

  return (
    <div className="space-y-8">
      {/* Block 1: Welcome + Motivation */}
      <div className="bg-gradient-to-l from-primary/10 via-primary/5 to-transparent rounded-2xl p-5 lg:p-6 border border-primary/10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-5">
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">{getGreeting(currentUser.name)}</h1>

            {/* Streak */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold">{currentUser.streak} أيام متتالية</p>
                <p className="text-sm text-muted-foreground">
                  {currentUser.streak > 0 ? "استمر ولا توقف! 🔥" : "ابدأ streak جديدك النهارده!"}
                </p>
                <p className="text-xs text-orange-500">٣ أيام كمان وتوصل لـ ١٠ 🎯</p>
              </div>
            </div>

            {/* Today's goal */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">هدف اليوم</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${goalMet ? "bg-green-500" : "bg-primary"}`}
                  style={{ width: `${Math.min(goalPercent, 100)}%` }}
                />
              </div>
              <p className="text-sm">
                {goalMet
                  ? "✓ أنهيت هدف اليوم! عظيم 🎉"
                  : `أنجزت ${currentUser.todayMinutes} دقيقة من ${currentUser.todayGoalMinutes} دقيقة`}
              </p>
            </div>

            {/* XP today */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 w-fit">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">كسبت {currentUser.todayXP} XP النهارده</span>
            </div>
          </div>

          {/* Achievement hint */}
          <div className="lg:w-64 p-4 rounded-xl bg-card border border-border">
            <p className="text-sm font-semibold mb-2">🏅 قريب من شهادة جديدة!</p>
            <p className="text-sm text-muted-foreground mb-4">
              أنت على بُعد درسين من شهادة أساسيات تصميم UI/UX
            </p>
            <button
              onClick={() => navigate("/course/1")}
              className="text-primary flex items-center gap-1 hover:underline text-sm font-semibold"
            >
              أكمل الآن <ArrowLeft className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Block 2: Continue learning */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">أكمل من حيث توقفت</h2>
            <p className="text-sm text-muted-foreground">استكمل رحلتك التعلمية</p>
          </div>
          <button onClick={() => navigate("/courses")} className="text-primary flex items-center gap-1 text-sm font-semibold">
            عرض كل كورساتي <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {learningCourses.map((course) => (
            <div key={course.id} className="min-w-[280px] max-w-[320px] bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold line-clamp-2">{course.title}</h3>
                <p className="text-xs text-muted-foreground">{course.instructor}</p>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${course.progress >= 75 ? "bg-amber-500" : course.progress >= 25 ? "bg-primary" : "bg-muted-foreground"}`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>{course.progress}% مكتمل</span>
                  <span className="text-muted-foreground">الدرس {course.completedLessons} من {course.totalLessons}</span>
                </div>
                <button
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="w-full py-2.5 mt-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  أكمل الآن <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Block 3: Quick Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: BookOpen, label: "الكورسات المشتراة", value: myCourses.length, color: "text-blue-500", bg: "bg-blue-500/10" },
          { icon: CheckCircle, label: "الكورسات المكتملة", value: completedCourses.length, color: "text-green-500", bg: "bg-green-500/10" },
          { icon: Award, label: "شهاداتي", value: 3, color: "text-amber-500", bg: "bg-amber-500/10" },
          { icon: Clock, label: "ساعات التعلم", value: 47, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl border border-border p-4 text-center hover:-translate-y-1 transition-transform cursor-default"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-3xl font-extrabold">
              <AnimatedNumber target={stat.value} />
            </p>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Block 4: Notifications + Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">إشعاراتك</h3>
            <button className="text-primary text-xs font-semibold">عرض الكل</button>
          </div>
          <div className="space-y-1">
            {notifications.slice(0, 5).map((n) => (
              <div key={n.id} className={`flex items-start gap-3 p-3 rounded-xl ${!n.isRead ? "bg-primary/5" : "hover:bg-accent/50"} transition-colors`}>
                <span style={{ fontSize: "18px" }}>{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">{n.description}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">نشاطك الأخير</h3>
            <button className="text-primary text-xs font-semibold">عرض السجل الكامل ←</button>
          </div>
          <div className="space-y-3">
            {activityFeed.map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0" style={{ fontSize: "14px" }}>
                  {a.icon}
                </span>
                <div className="flex-1">
                  <p className="text-sm leading-snug">{a.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5: Recommendations */}
      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold">مقترح ليك</h2>
          <p className="text-sm text-muted-foreground">بناءً على ما تعلمته</p>
        </div>

        {/* Recommended Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base lg:text-lg font-bold">كورسات قد تعجبك</h3>
            <button
              onClick={() => navigate("/explore")}
              className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {recommendedCourses.map((c) => (
              <div key={c.id} className="min-w-[240px] lg:min-w-[280px] bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2">
                  <p className="font-bold text-sm lg:text-base tracking-tight truncate">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.instructor}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-xs font-bold">{c.rating}</span>
                    </div>
                    <span className="text-primary text-sm font-bold">{c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Books */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base lg:text-lg font-bold">كتب مقترحة</h3>
            <button
              onClick={() => navigate("/books")}
              className="text-primary flex items-center gap-1 text-sm font-semibold hover:underline"
            >
              عرض الكل <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {recommendedBooks.map((b) => (
              <div key={b.id} className="min-w-[140px] lg:min-w-[180px] bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[3/4.5] overflow-hidden">
                  <img src={b.cover} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 space-y-2">
                  <p className="font-bold text-sm tracking-tight truncate">{b.title}</p>
                  <p className="text-xs text-muted-foreground">{b.author}</p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-medium">{b.downloads.toLocaleString()}</span>
                    </div>
                    <span className="text-primary text-[13px] font-bold">{b.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 6: Quick Access */}
      <section>
        <h2 className="mb-6 text-xl font-bold">وصول سريع</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: "⭐", label: "المفضلة", sub: "12 عنصر محفوظ", to: "/favorites" },
            { icon: "👥", label: "مجتمع تميز", sub: "5 منشور جديد", to: "/community" },
            { icon: "🏅", label: "شهاداتي", sub: "3 شهادة مكتسبة", to: "/certificates" },
            { icon: "🎯", label: "أهدافي", sub: "هدف اليوم جاري", to: "/goals" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.to)}
              className="bg-card rounded-2xl border border-border p-5 text-right hover:border-primary/40 hover:-translate-y-1 transition-all group"
            >
              <span className="text-3xl lg:text-4xl block mb-2">{item.icon}</span>
              <p className="text-sm lg:text-base font-bold group-hover:text-primary transition-colors">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
