import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { myCourses, courseSections } from "../data/mockData";
import { useParams } from "react-router";
import {
  Play, Pause, Volume2, Maximize, SkipForward, ChevronDown, ChevronUp,
  CheckCircle, Lock, PlayCircle, ArrowLeft, FileText, X, Zap
} from "lucide-react";

const tabs = ["نبذة", "ملاحظاتي", "أسئلة واستفسارات", "المراجعات"];

export function CoursePlayerPage() {
  const { setPageTitle } = useApp();
  const { id } = useParams();
  const course = myCourses.find((c) => c.id === id) || myCourses[0];
  const [activeTab, setActiveTab] = useState("نبذة");
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [speed, setSpeed] = useState("1x");
  const [expandedSections, setExpandedSections] = useState<string[]>(["s1", "s2", "s3"]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([
    { id: "n1", time: "2:30", text: "نقطة مهمة عن التوازن البصري" },
    { id: "n2", time: "5:15", text: "راجع مثال الـ Serif fonts" },
  ]);

  useEffect(() => {
    setPageTitle("مشاهدة الكورس");
  }, [setPageTitle]);

  const toggleSection = (sid: string) => {
    setExpandedSections((prev) =>
      prev.includes(sid) ? prev.filter((s) => s !== sid) : [...prev, sid]
    );
  };

  const totalLessons = courseSections.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedLessons = courseSections.reduce(
    (acc, s) => acc + s.lessons.filter((l) => l.completed).length, 0
  );
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="max-w-7xl -m-4 lg:-m-6">
      <div className="flex flex-col lg:flex-row">
        {/* Video + Below */}
        <div className="flex-1">
          {/* Video player */}
          <div className="relative bg-black aspect-video">
            <img src={course.thumbnail} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => { setPlaying(!playing); if (!playing) setTimeout(() => setShowQuiz(true), 5000); }}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {playing ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white mr-[-2px]" />}
              </button>
            </div>

            {/* Lesson title */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <p className="text-white" style={{ fontSize: "13px" }}>الدرس 5: مبادئ الـ Typography</p>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              {/* Progress bar */}
              <div
                className="w-full h-1.5 rounded-full bg-white/30 mb-3 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  setProgress(Math.round((x / rect.width) * 100));
                }}
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button onClick={() => setPlaying(!playing)}>
                    {playing ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                  </button>
                  <button><SkipForward className="w-5 h-5 text-white" /></button>
                  <button><Volume2 className="w-5 h-5 text-white" /></button>
                  <span className="text-white" style={{ fontSize: "12px" }}>5:20 / 14:20</span>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    className="bg-white/20 text-white rounded px-2 py-0.5 border-0"
                    style={{ fontSize: "12px" }}
                  >
                    {["0.75x", "1x", "1.25x", "1.5x", "2x"].map((s) => (
                      <option key={s} value={s} className="text-black">{s}</option>
                    ))}
                  </select>
                  <button className="text-white" style={{ fontSize: "12px" }}>CC</button>
                  <button><Maximize className="w-5 h-5 text-white" /></button>
                </div>
              </div>
            </div>

            {/* Next lesson button */}
            {playing && (
              <button className="absolute bottom-16 left-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground flex items-center gap-1"
                style={{ fontSize: "13px" }}>
                الدرس التالي <ArrowLeft className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Quiz overlay */}
          {showQuiz && (
            <div className="bg-card border border-border rounded-2xl m-4 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontSize: "16px", fontWeight: 700 }}>💡 سؤال سريع قبل الدرس الجاي</h3>
                <button onClick={() => setShowQuiz(false)}><X className="w-5 h-5" /></button>
              </div>
              <p className="mb-4" style={{ fontSize: "14px" }}>ما الفرق الأساسي بين خطوط الـ Serif والـ Sans-serif؟</p>
              <div className="space-y-2 mb-4">
                {[
                  "Serif بتكون أنظف والـ Sans-serif أكتر تفصيلاً",
                  "Serif عندها زوائد والـ Sans-serif بدون زوائد",
                  "مفيش فرق بينهم",
                  "Serif بتستخدم في الويب بس",
                ].map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => !quizSubmitted && setSelectedAnswer(i)}
                    className={`w-full text-right p-3 rounded-xl border transition-colors ${
                      quizSubmitted && i === 1
                        ? "border-green-500 bg-green-500/10"
                        : quizSubmitted && selectedAnswer === i && i !== 1
                        ? "border-red-500 bg-red-500/10"
                        : selectedAnswer === i
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-accent/50"
                    }`}
                    style={{ fontSize: "13px" }}
                  >
                    {answer}
                  </button>
                ))}
              </div>
              {!quizSubmitted ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => selectedAnswer !== null && setQuizSubmitted(true)}
                    className="px-6 py-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50"
                    style={{ fontSize: "13px" }}
                    disabled={selectedAnswer === null}
                  >
                    تأكيد الإجابة
                  </button>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-6 py-2 rounded-xl border border-border hover:bg-accent"
                    style={{ fontSize: "13px" }}
                  >
                    تخطي السؤال
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedAnswer === 1 ? (
                    <p className="text-green-600 flex items-center gap-1" style={{ fontSize: "14px", fontWeight: 600 }}>
                      ✅ إجابة صحيحة! <Zap className="w-4 h-4" /> +10 XP
                    </p>
                  ) : (
                    <div>
                      <p className="text-red-500" style={{ fontSize: "14px", fontWeight: 600 }}>❌ إجابة خاطئة</p>
                      <p className="text-muted-foreground" style={{ fontSize: "13px" }}>الإجابة الصحيحة: Serif عندها زوائد والـ Sans-serif بدون زوائد</p>
                    </div>
                  )}
                  <button
                    className="px-6 py-2 rounded-xl bg-primary text-primary-foreground flex items-center gap-1"
                    style={{ fontSize: "13px" }}
                    onClick={() => setShowQuiz(false)}
                  >
                    الدرس التالي <ArrowLeft className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tabs below video */}
          <div className="px-4 pt-4">
            <div className="flex gap-1 border-b border-border mb-4">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 border-b-2 transition-colors ${activeTab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  style={{ fontSize: "13px" }}
                >
                  {t}
                </button>
              ))}
            </div>

            {activeTab === "نبذة" && (
              <div className="space-y-3 pb-6">
                <p style={{ fontSize: "14px" }}>
                  في هذا الدرس هنتعلم أساسيات الـ Typography وإزاي نختار الخطوط المناسبة لمشاريعنا.
                  هنغطي الفرق بين أنواع الخطوط المختلفة وأفضل ممارسات استخدامها.
                </p>
                <div className="p-3 rounded-xl bg-accent/50 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span style={{ fontSize: "13px" }}>ملف مرفق: Typography_Guide.pdf</span>
                  <button className="mr-auto text-primary" style={{ fontSize: "12px" }}>تحميل</button>
                </div>
              </div>
            )}

            {activeTab === "ملاحظاتي" && (
              <div className="space-y-3 pb-6">
                <div className="flex gap-2">
                  <input
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="أضف ملاحظة عند الوقت الحالي للفيديو"
                    className="flex-1 px-3 py-2 rounded-xl bg-accent/50 border border-border"
                    style={{ fontSize: "13px" }}
                  />
                  <button
                    onClick={() => {
                      if (noteText.trim()) {
                        setNotes([...notes, { id: Date.now().toString(), time: "5:20", text: noteText }]);
                        setNoteText("");
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground"
                    style={{ fontSize: "13px" }}
                  >
                    إضافة
                  </button>
                </div>
                {notes.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-accent/30 hover:bg-accent/50 cursor-pointer">
                    <span className="text-primary shrink-0" style={{ fontSize: "12px", fontWeight: 600 }}>{n.time}</span>
                    <p style={{ fontSize: "13px" }}>{n.text}</p>
                  </div>
                ))}
                <button className="text-primary" style={{ fontSize: "13px" }}>تصدير الملاحظات كـ PDF</button>
              </div>
            )}

            {activeTab === "أسئلة واستفسارات" && (
              <div className="space-y-3 pb-6">
                <div className="flex gap-2">
                  <input
                    placeholder="اكتب سؤالك هنا..."
                    className="flex-1 px-3 py-2 rounded-xl bg-accent/50 border border-border"
                    style={{ fontSize: "13px" }}
                  />
                  <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground" style={{ fontSize: "13px" }}>إرسال</button>
                </div>
                <div className="p-3 rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20" />
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>محمد أحمد</span>
                    <span className="text-muted-foreground" style={{ fontSize: "11px" }}>منذ يومين</span>
                    <span className="mr-auto px-2 py-0.5 rounded-full bg-green-500/10 text-green-600" style={{ fontSize: "10px" }}>مجابة</span>
                  </div>
                  <p style={{ fontSize: "13px" }}>إيه الفرق بين tracking و kerning في الخطوط؟</p>
                  <div className="mt-2 mr-8 p-2 rounded-lg bg-primary/5">
                    <p style={{ fontSize: "12px" }}><span style={{ fontWeight: 600 }}>م. سارة:</span> tracking هو المسافة بين كل الحروف، أما kerning فهو المسافة بين حرفين محددين</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "المراجعات" && (
              <div className="space-y-3 pb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} className={`${s <= 4 ? "text-amber-500" : "text-muted"}`} style={{ fontSize: "20px" }}>★</button>
                    ))}
                  </div>
                  <span style={{ fontSize: "14px" }}>4.8 (245 مراجعة)</span>
                </div>
                <textarea
                  placeholder="اكتب مراجعتك هنا..."
                  className="w-full px-3 py-2 rounded-xl bg-accent/50 border border-border h-20 resize-none"
                  style={{ fontSize: "13px" }}
                />
                <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground" style={{ fontSize: "13px" }}>إرسال المراجعة</button>
              </div>
            )}
          </div>
        </div>

        {/* Course Sidebar */}
        <div className="w-full lg:w-80 border-r border-border bg-card">
          <div className="p-4 border-b border-border">
            <h3 className="mb-2" style={{ fontSize: "15px", fontWeight: 700 }}>{course.title}</h3>
            <div className="h-2 rounded-full bg-muted overflow-hidden mb-1">
              <div className="h-full rounded-full bg-primary" style={{ width: `${overallProgress}%` }} />
            </div>
            <p style={{ fontSize: "12px" }}>{overallProgress}% مكتمل</p>
          </div>

          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            {courseSections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-accent/50 transition-colors"
                >
                  <div className="text-right">
                    <p style={{ fontSize: "13px", fontWeight: 600 }}>{section.title}</p>
                    <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{section.lessons.length} دروس</p>
                  </div>
                  {expandedSections.includes(section.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.includes(section.id) && (
                  <div>
                    {section.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-right hover:bg-accent/50 transition-colors ${
                          lesson.id === "l5" ? "bg-primary/5 border-r-2 border-primary" : ""
                        }`}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                        ) : lesson.locked ? (
                          <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                        ) : lesson.id === "l5" ? (
                          <PlayCircle className="w-4 h-4 text-primary shrink-0" />
                        ) : (
                          <PlayCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="truncate" style={{ fontSize: "12px" }}>{lesson.title}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground" style={{ fontSize: "11px" }}>{lesson.duration}</span>
                            {lesson.isFree && (
                              <span className="text-green-600 bg-green-500/10 px-1.5 rounded" style={{ fontSize: "10px" }}>مجاني</span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
