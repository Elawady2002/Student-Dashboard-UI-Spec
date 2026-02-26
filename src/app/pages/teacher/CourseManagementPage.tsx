import { useState } from "react";
import { Plus, Upload, PlayCircle, FileText, CheckCircle, Search, MoreVertical, Edit2, Trash2, LayoutGrid, Award } from "lucide-react";

const courses = [
    { id: 1, title: "القدرات العامة - التأسيس", students: 1250, revenue: 120000, status: "نشط", lessons: 42, thumb: "https://images.unsplash.com/photo-1633613286991-611ff3fd5a86?w=400&q=80" },
    { id: 2, title: "التحصيلي علمي 1445", students: 850, revenue: 85000, status: "مسودة", lessons: 15, thumb: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80" },
    { id: 3, title: "مهارات القسم اللفظي", students: 2100, revenue: 150000, status: "مكتمل", lessons: 28, thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
];

export function CourseManagementPage() {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">إدارة الكورسات</h1>
                    <p className="text-sm text-muted-foreground mt-1">أنشئ، عدّل، ونظم دوراتك التعليمية</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                    <Plus className="w-4 h-4" />
                    <span>كورس جديد</span>
                </button>
            </div>

            {/* Control Bar (Matching Student MyCoursesPage structure) */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex gap-1 bg-accent/50 rounded-xl p-1">
                    {[
                        { id: "all", label: "الكل" },
                        { id: "active", label: "النشطة" },
                        { id: "drafts", label: "المسودات" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg transition-colors text-[13px] font-medium ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-accent text-foreground"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="ابحث عن كورس..."
                        className="w-full bg-accent/50 border border-border rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors h-10"
                    />
                </div>
            </div>

            {/* Grid (Matching Student MyCoursesPage card style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {courses.map((course) => (
                    <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col group relative">

                        {/* Action Menu (Hover) */}
                        <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button className="p-1.5 bg-black/50 hover:bg-black/70 backdrop-blur text-white rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 bg-black/50 hover:bg-destructive border-transparent text-white rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="aspect-video relative overflow-hidden bg-muted">
                            <img src={course.thumb} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold backdrop-blur ${course.status === "نشط" ? "bg-emerald-500/20 text-emerald-300" :
                                            course.status === "مكتمل" ? "bg-primary/20 text-primary-200" :
                                                "bg-white/20 text-white"
                                        }`}>
                                        {course.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 space-y-3 flex-1 flex flex-col">
                            <div>
                                <h3 className="text-[15px] font-bold tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{course.title}</h3>
                                <p className="text-muted-foreground text-[12px] mt-1 flex items-center gap-1">
                                    <PlayCircle className="w-3.5 h-3.5" /> {course.lessons} درس
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-[13px] pt-3 border-t border-border mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-0.5">الطلاب</span>
                                    <span className="font-bold">{course.students.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mb-0.5">الإيرادات</span>
                                    <span className="font-bold text-emerald-500">{course.revenue.toLocaleString()} ر.س</span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

                {/* Create New Prompt Card */}
                <button className="bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-colors flex flex-col items-center justify-center p-8 min-h-[300px] text-primary group">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-1">إضافة دورة جديدة</h3>
                    <p className="text-sm text-muted-foreground text-center">ابدأ بإنشاء دورتك التفاعلية واختباراتها.</p>
                </button>
            </div>

        </div>
    );
}
