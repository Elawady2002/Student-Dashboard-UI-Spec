import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { myCourses, Course } from "../data/mockData";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router";

const tabs = [
  { key: "all", label: "الكل" },
  { key: "learning", label: "بيتعلم" },
  { key: "completed", label: "مكتمل" },
  { key: "not_started", label: "لسه ما بدأش" },
];

const sortOptions = [
  { key: "newest", label: "الأحدث" },
  { key: "oldest", label: "الأقدم" },
  { key: "most_progress", label: "الأكثر تقدماً" },
  { key: "least_progress", label: "الأقل تقدماً" },
];

function StatusBadge({ status }: { status: Course["status"] }) {
  const config = {
    learning: { label: "بيتعلم", bg: "bg-amber-500/10 text-amber-600" },
    completed: { label: "مكتمل", bg: "bg-green-500/10 text-green-600" },
    not_started: { label: "لسه ما بدأش", bg: "bg-gray-500/10 text-gray-500" },
  };
  const c = config[status];
  return <span className={`px-2 py-0.5 rounded-full ${c.bg}`} style={{ fontSize: "11px", fontWeight: 600 }}>{c.label}</span>;
}

export function MyCoursesPage() {
  const { setPageTitle } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [sort, setSort] = useState("newest");

  useEffect(() => { setPageTitle("كورساتي"); }, [setPageTitle]);

  let filtered = activeTab === "all" ? myCourses : myCourses.filter((c) => c.status === activeTab);

  if (sort === "most_progress") filtered = [...filtered].sort((a, b) => b.progress - a.progress);
  if (sort === "least_progress") filtered = [...filtered].sort((a, b) => a.progress - b.progress);

  return (
    <div className="max-w-6xl space-y-5">
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>كورساتي</h1>
        <p className="text-muted-foreground" style={{ fontSize: "14px" }}>كل الكورسات اللي اشتركت فيها</p>
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1 bg-accent/50 rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2 rounded-lg transition-colors ${activeTab === t.key ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              style={{ fontSize: "13px" }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 rounded-xl bg-accent/50 border border-border"
          style={{ fontSize: "13px" }}
        >
          {sortOptions.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span style={{ fontSize: "48px" }}>📚</span>
          <p className="mt-4" style={{ fontSize: "16px", fontWeight: 600 }}>ما اشتركتش في أي كورس لحد دلوقتي</p>
          <button
            onClick={() => navigate("/explore")}
            className="mt-3 px-6 py-2 rounded-xl bg-primary text-primary-foreground"
            style={{ fontSize: "14px" }}
          >
            استكشف الكورسات ←
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((course) => (
            <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <StatusBadge status={course.status} />
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="line-clamp-2" style={{ fontSize: "15px", fontWeight: 700 }}>{course.title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{course.instructor}</p>
                {course.status !== "not_started" && (
                  <>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${course.progress >= 75 ? "bg-amber-500" : course.progress >= 25 ? "bg-primary" : "bg-muted-foreground"}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p style={{ fontSize: "12px" }}>{course.progress}% مكتمل</p>
                  </>
                )}
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>آخر نشاط: {course.lastActivity}</p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="flex-1 py-2 rounded-xl bg-primary text-primary-foreground flex items-center justify-center gap-1"
                    style={{ fontSize: "13px" }}
                  >
                    {course.status === "not_started" ? "ابدأ الكورس" : "أكمل الكورس"} <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button className="px-3 py-2 rounded-xl border border-border hover:bg-accent" style={{ fontSize: "12px" }}>
                    عرض المحتوى
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
