import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { goals, studyHeatmap, weekDays } from "../data/mockData";
import { Plus, Edit3, Trash2, X, AlertCircle } from "lucide-react";

export function GoalsPage() {
  const { setPageTitle } = useApp();
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { setPageTitle("أهدافي"); }, [setPageTitle]);

  // Check deadline warnings
  const urgentGoals = goals.filter((g) => g.progress < 100);

  return (
    <div className="max-w-6xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">أهدافي</h1>
          <p className="text-sm text-muted-foreground">تابع أهدافك وتقدمك الشخصي</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
        >
          <Plus className="w-5 h-5" /> أضف هدف جديد
        </button>
      </div>

      {/* Deadline warning */}
      {urgentGoals.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold">⏰ هدفك "{urgentGoals[0].title}" بينتهي قريب!</p>
            <button className="text-primary mt-1 text-xs font-semibold hover:underline">أكمل الآن ←</button>
          </div>
        </div>
      )}

      {/* Active Goals */}
      <section className="space-y-4">
        <h2 className="text-base lg:text-lg font-bold">الأهداف النشطة</h2>
        {goals.map((goal) => (
          <div key={goal.id} className="bg-card rounded-2xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-bold">{goal.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">ينتهي في {goal.deadline}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl hover:bg-accent transition-colors"><Edit3 className="w-4 h-4 text-muted-foreground" /></button>
                <button className="p-2 rounded-xl hover:bg-destructive/10 transition-colors" onClick={() => setShowDeleteConfirm(goal.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-700 ${goal.progress >= 100 ? "bg-green-500" : goal.progress >= 50 ? "bg-primary" : "bg-amber-500"}`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold">{goal.progress}% مكتمل</span>
              <span className="text-muted-foreground font-medium">
                {goal.type === "course" && `${goal.current} من ${goal.target} درس`}
                {goal.type === "hours" && `${goal.current} من ${goal.target} ساعة`}
                {goal.type === "lessons" && `${goal.current} من ${goal.target} درس`}
              </span>
            </div>
            {goal.hasReminder && (
              <p className="text-primary mt-3 text-[10px] font-bold">🔔 التذكير مفعل</p>
            )}
          </div>
        ))}
      </section>

      {/* Study Heatmap */}
      <section className="bg-card rounded-2xl border border-border p-5 lg:p-6 shadow-sm overflow-hidden text-right">
        <h2 className="mb-6 text-base lg:text-lg font-bold">ساعات الدراسة</h2>
        <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
          <div className="flex flex-col gap-4 min-w-max">
            {/* Week Headers */}
            <div className="flex gap-2 pr-16 text-right">
              <div className="grid grid-cols-[repeat(40,24px)] gap-1">
                {studyHeatmap.map((_, wi) => (
                  <div key={wi} className="w-6 text-center text-[9px] text-muted-foreground font-bold truncate">أس{wi + 1}</div>
                ))}
              </div>
            </div>

            {/* Heatmap Grid: Days as Rows */}
            <div className="space-y-1">
              {weekDays.map((dayName, di) => (
                <div key={di} className="flex gap-2 items-center">
                  <span className="w-14 text-[10px] text-muted-foreground font-bold shrink-0">{dayName}</span>
                  <div className="grid grid-cols-[repeat(40,24px)] gap-1">
                    {studyHeatmap.map((week, wi) => (
                      <div
                        key={wi}
                        className={`w-6 h-6 rounded-[3px] cursor-pointer transition-all hover:ring-2 hover:ring-primary/40 shrink-0 ${week[di] === 0 ? "bg-muted/40" :
                          week[di] < 30 ? "bg-primary/20" :
                            week[di] < 60 ? "bg-primary/45" :
                              "bg-primary/75"
                          }`}
                        title={`${dayName} — أسبوع ${wi + 1}: ${week[di]} دقيقة`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8 justify-end">
            <span className="text-[10px] text-muted-foreground font-bold">أقل</span>
            <div className="flex gap-1.5">
              {[0, 20, 45, 75].map((val) => (
                <div key={val} className={`w-3.5 h-3.5 rounded-[3px] ${val === 0 ? "bg-muted/40" : `bg-primary/${val}`}`} />
              ))}
            </div>
            <span className="text-[10px] text-muted-foreground font-bold">أكثر</span>
          </div>
        </div>
      </section>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowAddGoal(false)}>
          <div className="bg-card rounded-3xl w-full max-w-md p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">أضف هدف جديد</h2>
              <button onClick={() => setShowAddGoal(false)} className="p-2 hover:bg-accent rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="text-sm font-bold block mb-1.5">عنوان الهدف</label>
                <input className="w-full px-4 py-3 rounded-2xl bg-accent/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" placeholder="مثال: أكمل كورس React" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold block mb-1.5">نوع الهدف</label>
                  <select className="w-full px-4 py-3 rounded-2xl bg-accent/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm appearance-none">
                    <option>كورس محدد</option>
                    <option>عدد ساعات</option>
                    <option>عدد دروس</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold block mb-1.5">تاريخ الانتهاء</label>
                  <input type="date" className="w-full px-4 py-3 rounded-2xl bg-accent/50 border border-border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-3 p-1">
                <input type="checkbox" id="reminder" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20" />
                <label htmlFor="reminder" className="text-sm font-bold cursor-pointer select-none">تذكير يومي للالتزام</label>
              </div>
              <button className="w-full py-3.5 mt-2 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20" onClick={() => setShowAddGoal(false)}>
                احفظ الهدف كخطة عمل
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)}>
          <div className="bg-card rounded-3xl w-full max-w-sm p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-destructive" />
            </div>
            <p className="text-center mb-8 text-base font-bold">هل أنت متأكد من حذف هذا الهدف النهائي؟</p>
            <div className="flex gap-3">
              <button className="flex-1 py-3.5 rounded-2xl bg-destructive text-white font-bold hover:bg-destructive/90 transition-colors" onClick={() => setShowDeleteConfirm(null)}>نعم، احذف</button>
              <button className="flex-1 py-3.5 rounded-2xl bg-accent font-bold hover:bg-accent/80 transition-colors" onClick={() => setShowDeleteConfirm(null)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
