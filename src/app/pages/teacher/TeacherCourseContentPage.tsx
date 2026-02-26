import { useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowRight, Plus, GripVertical, FileText, PlayCircle, MoreVertical, Edit2, Trash2, X, Upload } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export interface Lesson {
    id: number;
    title: string;
    type: string;
    duration?: string;
    size?: string;
}

export interface CourseModule {
    id: number;
    title: string;
    lessons: Lesson[];
}

export interface CourseData {
    id: number;
    title: string;
    modules: CourseModule[];
}

// Mock Data for a single Course Content
const initialCourseData: CourseData = {
    id: 1,
    title: "القدرات العامة - التأسيس",
    modules: [
        {
            id: 101,
            title: "أساسيات الجبر",
            lessons: [
                { id: 1001, title: "مقدمة في المعادلات", type: "video", duration: "12:45" },
                { id: 1002, title: "ملخص القوانين الجبرية", type: "pdf", size: "2MB" },
            ]
        },
        {
            id: 102,
            title: "الهندسة والمساحات",
            lessons: [
                { id: 1003, title: "حساب مساحة المثلث", type: "video", duration: "15:20" },
            ]
        }
    ]
};

export function TeacherCourseContentPage() {
    const { id } = useParams();
    const [course, setCourse] = useState<CourseData>(initialCourseData);

    // Modals state
    const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
    const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);

    // Form states
    const [newModuleTitle, setNewModuleTitle] = useState("");
    const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
    const [newLesson, setNewLesson] = useState({ title: "", type: "video", duration: "" });

    // Open/Close specific module accordions
    const [expandedModules, setExpandedModules] = useState<number[]>([101, 102]);

    const toggleModule = (moduleId: number) => {
        setExpandedModules(prev =>
            prev.includes(moduleId) ? prev.filter(id => id !== moduleId) : [...prev, moduleId]
        );
    };

    const handleAddModule = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newModuleTitle.trim()) return;

        const newModule = {
            id: Date.now(),
            title: newModuleTitle,
            lessons: []
        };

        setCourse({
            ...course,
            modules: [...course.modules, newModule]
        });

        setExpandedModules([...expandedModules, newModule.id]);
        setNewModuleTitle("");
        setIsAddModuleOpen(false);
    };

    const handleDeleteModule = (moduleId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCourse({
            ...course,
            modules: course.modules.filter(m => m.id !== moduleId)
        });
    };

    const openAddLessonModal = (moduleId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveModuleId(moduleId);
        setIsAddLessonOpen(true);
    };

    const handleAddLesson = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newLesson.title.trim() || !activeModuleId) return;

        const lessonToAdd = {
            id: Date.now(),
            title: newLesson.title,
            type: newLesson.type,
            duration: newLesson.type === "video" ? newLesson.duration || "0:00" : undefined,
            size: newLesson.type === "pdf" ? "1.5MB" : undefined
        };

        setCourse({
            ...course,
            modules: course.modules.map(m =>
                m.id === activeModuleId
                    ? { ...m, lessons: [...m.lessons, lessonToAdd] }
                    : m
            )
        });

        if (!expandedModules.includes(activeModuleId)) {
            setExpandedModules([...expandedModules, activeModuleId]);
        }

        setNewLesson({ title: "", type: "video", duration: "" });
        setIsAddLessonOpen(false);
    };

    const handleDeleteLesson = (moduleId: number, lessonId: number) => {
        setCourse({
            ...course,
            modules: course.modules.map(m =>
                m.id === moduleId
                    ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
                    : m
            )
        });
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-4">
                    <Link to="/teacher/courses" className="p-2 hover:bg-accent rounded-xl text-muted-foreground hover:text-foreground transition-colors border border-border bg-card">
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">إدارة محتوى الكورس</h1>
                        <p className="text-sm text-muted-foreground mt-1">{course.title}</p>
                    </div>
                </div>

                <Dialog.Root open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
                    <Dialog.Trigger asChild>
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm w-fit">
                            <Plus className="w-4 h-4" />
                            <span>قسم / وحدة جديدة</span>
                        </button>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" />
                        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-card p-6 shadow-xl z-50 overflow-y-auto border border-border focus:outline-none">
                            <div className="flex items-center justify-between mb-6">
                                <Dialog.Title className="text-xl font-bold">إضافة قسم جديد</Dialog.Title>
                                <Dialog.Close className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors">
                                    <X className="w-5 h-5" />
                                </Dialog.Close>
                            </div>

                            <form onSubmit={handleAddModule} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">عنوان القسم</label>
                                    <input
                                        type="text"
                                        value={newModuleTitle}
                                        onChange={(e) => setNewModuleTitle(e.target.value)}
                                        required
                                        placeholder="مثال: الوحدة الأولى: الهندسة..."
                                        className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                                    <Dialog.Close asChild>
                                        <button type="button" className="px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-accent transition-colors">
                                            إلغاء
                                        </button>
                                    </Dialog.Close>
                                    <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md">
                                        إضافة القسم
                                    </button>
                                </div>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
                {course.modules.length === 0 ? (
                    <div className="bg-card border border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold">لا يوجد محتوى بعد</h3>
                        <p className="text-muted-foreground text-sm mt-1 max-w-sm">
                            ابدأ ببناء الدورة الخاصة بك عن طريق إضافة الأقسام والوحدات التعليمية، ثم ضع بداخلها الدروس المرئية والمقروءة.
                        </p>
                    </div>
                ) : (
                    course.modules.map((module, index) => {
                        const isExpanded = expandedModules.includes(module.id);

                        return (
                            <div key={module.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition-all">
                                {/* Module Header (Accordion Toggle) */}
                                <div
                                    onClick={() => toggleModule(module.id)}
                                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-accent/30 transition-colors select-none group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-muted-foreground cursor-grab active:cursor-grabbing hover:text-foreground">
                                            <GripVertical className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[15px] flex items-center gap-2">
                                                <span className="text-primary text-sm font-black tracking-widest bg-primary/10 px-2 py-0.5 rounded-md">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                                {module.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {module.lessons.length} دروس مقترنة
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mr-8 sm:mr-0">
                                        <button
                                            onClick={(e) => openAddLessonModal(module.id, e)}
                                            className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-1.5"
                                        >
                                            <Plus className="w-3.5 h-3.5" /> درس
                                        </button>
                                        <button
                                            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
                                            onClick={(e) => e.stopPropagation()} // Edit 
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteModule(module.id, e)}
                                            className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Lessons List (Accordion Content) */}
                                {isExpanded && (
                                    <div className="p-4 pt-0 border-t border-border/50 bg-accent/10">
                                        {module.lessons.length === 0 ? (
                                            <div className="text-center py-6 text-sm text-muted-foreground">
                                                هذا القسم فارغ. قم بإضافة دروس أو ملفات.
                                            </div>
                                        ) : (
                                            <div className="space-y-2 mt-4">
                                                {module.lessons.map((lesson, idx) => (
                                                    <div key={lesson.id} className="bg-card border border-border p-3 rounded-xl flex items-center justify-between gap-3 group/lesson hover:border-primary/40 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-muted-foreground cursor-grab hover:text-foreground">
                                                                <GripVertical className="w-4 h-4 opacity-30 group-hover/lesson:opacity-100 transition-opacity" />
                                                            </div>
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${lesson.type === 'video' ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'
                                                                }`}>
                                                                {lesson.type === 'video' ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-semibold">{lesson.title}</p>
                                                                <p className="text-[11px] text-muted-foreground">
                                                                    {lesson.type === 'video' ? `فيديو • ${lesson.duration}` : `ملف مقروء • ${lesson.size}`}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover/lesson:opacity-100 transition-opacity">
                                                            <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors">
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteLesson(module.id, lesson.id)}
                                                                className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Add Lesson Modal */}
            <Dialog.Root open={isAddLessonOpen} onOpenChange={setIsAddLessonOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" />
                    <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-card p-6 shadow-xl z-50 overflow-y-auto border border-border focus:outline-none">
                        <div className="flex items-center justify-between mb-6">
                            <Dialog.Title className="text-xl font-bold">إضافة درس جديد</Dialog.Title>
                            <Dialog.Close className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </Dialog.Close>
                        </div>

                        <form onSubmit={handleAddLesson} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold">عنوان الدرس / الملف</label>
                                <input
                                    type="text"
                                    value={newLesson.title}
                                    onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                                    required
                                    placeholder="مثال: شرح نظرية فيثاغورس..."
                                    className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-semibold">نوع المحتوى</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${newLesson.type === 'video' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-card text-muted-foreground hover:bg-accent/50'}`}>
                                        <input
                                            type="radio"
                                            name="lessontype"
                                            value="video"
                                            checked={newLesson.type === 'video'}
                                            onChange={() => setNewLesson({ ...newLesson, type: 'video' })}
                                            className="sr-only"
                                        />
                                        <PlayCircle className="w-6 h-6" />
                                        <span className="text-sm font-bold">فيديو مسجل</span>
                                    </label>
                                    <label className={`border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${newLesson.type === 'pdf' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-card text-muted-foreground hover:bg-accent/50'}`}>
                                        <input
                                            type="radio"
                                            name="lessontype"
                                            value="pdf"
                                            checked={newLesson.type === 'pdf'}
                                            onChange={() => setNewLesson({ ...newLesson, type: 'pdf' })}
                                            className="sr-only"
                                        />
                                        <FileText className="w-6 h-6" />
                                        <span className="text-sm font-bold">ملف مقروء (PDF)</span>
                                    </label>
                                </div>
                            </div>

                            {newLesson.type === 'video' && (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">مدة الفيديو المتقرحة (اختياري)</label>
                                    <input
                                        type="text"
                                        value={newLesson.duration}
                                        onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                                        placeholder="مثال: 15:30"
                                        className="w-full bg-accent/30 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold">رفع الملف / الرابط</label>
                                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-accent/30 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <Upload className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-medium">اضغط لرفع المحتوى</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {newLesson.type === 'video' ? 'MP4, WebM (الحد الأقصى 2GB)' : 'PDF فقط (الحد الأقصى 50MB)'}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                                <Dialog.Close asChild>
                                    <button type="button" className="px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-accent transition-colors">
                                        إلغاء
                                    </button>
                                </Dialog.Close>
                                <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md">
                                    إضافة المحتوى
                                </button>
                            </div>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

        </div>
    );
}
