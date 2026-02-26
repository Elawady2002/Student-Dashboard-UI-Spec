import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Upload, PlayCircle, Search, Edit2, Trash2, X, FileText, ImageIcon } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

const initialCourses = [
    { id: 1, title: "القدرات العامة - التأسيس", students: 1250, revenue: 120000, status: "نشط", lessons: 42, hasCoupon: true, thumb: "https://images.unsplash.com/photo-1633613286991-611ff3fd5a86?w=400&q=80" },
    { id: 2, title: "التحصيلي علمي 1445", students: 850, revenue: 85000, status: "مسودة", lessons: 15, hasCoupon: false, thumb: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80" },
    { id: 3, title: "مهارات القسم اللفظي", students: 2100, revenue: 150000, status: "مكتمل", lessons: 28, hasCoupon: false, thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
];

export function CourseManagementPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("all");
    const [courses, setCourses] = useState(initialCourses);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [newCourse, setNewCourse] = useState({
        title: "",
        status: "مسودة",
        lessons: 0,
        price: 0,
        hasCoupon: false,
        couponCode: "",
        couponDiscount: 0,
        thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80"
    });

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
        const courseToAdd = {
            id: Date.now(),
            title: newCourse.title || "دورة جديدة",
            students: 0,
            revenue: 0,
            status: newCourse.status,
            lessons: newCourse.lessons,
            hasCoupon: newCourse.hasCoupon,
            thumb: newCourse.thumb
        };
        setCourses([courseToAdd, ...courses]);
        setIsAddModalOpen(false);
        setNewCourse({ title: "", status: "مسودة", lessons: 0, price: 0, hasCoupon: false, couponCode: "", couponDiscount: 0, thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" });
    };

    const filteredCourses = courses.filter(c => {
        if (activeTab === "all") return true;
        if (activeTab === "active") return c.status === "نشط";
        if (activeTab === "drafts") return c.status === "مسودة";
        return true;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">إدارة الكورسات</h1>
                    <p className="text-sm text-muted-foreground mt-1">أنشئ، عدّل، ونظم دوراتك التعليمية</p>
                </div>

                <Dialog.Root open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <Dialog.Trigger asChild>
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                            <Plus className="w-4 h-4" />
                            <span>كورس جديد</span>
                        </button>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" />
                        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-card p-6 shadow-xl z-50 overflow-y-auto border border-border focus:outline-none">
                            <div className="flex items-center justify-between mb-6">
                                <Dialog.Title className="text-xl font-bold">إضافة دورة جديدة</Dialog.Title>
                                <Dialog.Close className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors">
                                    <X className="w-5 h-5" />
                                </Dialog.Close>
                            </div>

                            <form onSubmit={handleAddCourse} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">عنوان الدورة</label>
                                    <input
                                        type="text"
                                        value={newCourse.title}
                                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                        required
                                        placeholder="مثال: دورة التحصيلي المكثفة..."
                                        className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold">عدد الدروس المتوقع</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={newCourse.lessons}
                                            onChange={(e) => setNewCourse({ ...newCourse, lessons: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold">سعر الدورة (ر.س)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={newCourse.price}
                                            onChange={(e) => setNewCourse({ ...newCourse, price: parseInt(e.target.value) || 0 })}
                                            placeholder="صفر = مجانية"
                                            className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">حالة الدورة</label>
                                    <select
                                        value={newCourse.status}
                                        onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value })}
                                        className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                                    >
                                        <option value="مسودة">مسودة (غير منشورة)</option>
                                        <option value="نشط">نشط (متاح للطلاب)</option>
                                        <option value="مكتمل">مكتمل الأرشيف</option>
                                    </select>
                                </div>

                                {/* Coupon Section */}
                                <div className="bg-accent/30 rounded-xl p-4 border border-border">
                                    <label className="flex items-center gap-2 cursor-pointer mb-3">
                                        <input
                                            type="checkbox"
                                            checked={newCourse.hasCoupon}
                                            onChange={(e) => setNewCourse({ ...newCourse, hasCoupon: e.target.checked })}
                                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm font-semibold">تفعيل كوبون خصم للدورة</span>
                                    </label>

                                    {newCourse.hasCoupon && (
                                        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-border/50">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-muted-foreground">كود الخصم</label>
                                                <input
                                                    type="text"
                                                    value={newCourse.couponCode}
                                                    onChange={(e) => setNewCourse({ ...newCourse, couponCode: e.target.value })}
                                                    placeholder="مثال: KSATOP"
                                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary uppercase"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-muted-foreground">نسبة الخصم (%)</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={newCourse.couponDiscount}
                                                    onChange={(e) => setNewCourse({ ...newCourse, couponDiscount: parseInt(e.target.value) || 0 })}
                                                    className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">صورة غلاف الدورة</label>
                                    <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-accent/30 transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <ImageIcon className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm font-medium">اضغط لرفع صورة الغلاف</p>
                                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG (المقاس المثالي 1920x1080)</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                                    <Dialog.Close asChild>
                                        <button type="button" className="px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-accent transition-colors">
                                            إلغاء
                                        </button>
                                    </Dialog.Close>
                                    <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md">
                                        إنشاء الدورة
                                    </button>
                                </div>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

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
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => navigate(`/teacher/courses/${course.id}`)}
                        className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all flex flex-col group relative cursor-pointer"
                    >

                        {/* Action Menu (Hover) */}
                        <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button
                                onClick={(e) => { e.stopPropagation(); /* edit logic */ }}
                                className="p-1.5 bg-black/50 hover:bg-black/70 backdrop-blur text-white rounded-lg transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setCourses(courses.filter(c => c.id !== course.id)); }}
                                className="p-1.5 bg-black/50 hover:bg-destructive border-transparent text-white rounded-lg transition-colors"
                            >
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
                                    {course.hasCoupon && (
                                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold backdrop-blur bg-orange-500/20 text-orange-300`}>
                                            خصم فعّال
                                        </span>
                                    )}
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
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary/5 rounded-2xl border-2 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-colors flex flex-col items-center justify-center p-8 min-h-[300px] text-primary group"
                >
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
