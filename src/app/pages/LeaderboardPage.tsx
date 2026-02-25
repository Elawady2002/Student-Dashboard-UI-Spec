import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { leaderboard, currentUser } from "../data/mockData";
import { Trophy, Medal } from "lucide-react";

export function LeaderboardPage() {
  const { setPageTitle } = useApp();
  const [period, setPeriod] = useState("month");

  useEffect(() => { setPageTitle("المتميزون"); }, [setPageTitle]);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>المتميزون 🏆</h1>
        <p className="text-muted-foreground" style={{ fontSize: "14px" }}>أفضل المتعلمين على المنصة</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select className="px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "13px" }}>
          <option>مصر</option>
          <option>الكل</option>
        </select>
        <select className="px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "13px" }}>
          <option>كل التخصصات</option>
          <option>تصميم UI/UX</option>
          <option>تطوير الويب</option>
          <option>التسويق الرقمي</option>
        </select>
        <div className="flex gap-1 bg-accent/50 rounded-xl p-1">
          {[
            { key: "month", label: "هذا الشهر" },
            { key: "year", label: "هذه السنة" },
            { key: "all", label: "الكل" },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${period === p.key ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
              style={{ fontSize: "12px" }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 pt-8 pb-4">
        {/* 2nd place */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-100 flex items-center justify-center border-3 border-gray-400 mb-2">
            <span style={{ fontSize: "20px" }}>{top3[1].name[0]}</span>
          </div>
          <p style={{ fontSize: "13px", fontWeight: 600 }}>{top3[1].name}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{top3[1].xp.toLocaleString()} XP</p>
          <div className="w-24 h-20 bg-gray-200 dark:bg-gray-700 rounded-t-xl mt-2 flex items-center justify-center">
            <span style={{ fontSize: "24px" }}>🥈</span>
          </div>
        </div>

        {/* 1st place */}
        <div className="text-center -mt-8">
          <span style={{ fontSize: "24px" }}>👑</span>
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-200 flex items-center justify-center border-3 border-amber-500 mb-2">
            <span style={{ fontSize: "24px" }}>{top3[0].name[0]}</span>
          </div>
          <p style={{ fontSize: "14px", fontWeight: 700 }}>{top3[0].name}</p>
          <p className="text-amber-500" style={{ fontSize: "12px", fontWeight: 600 }}>{top3[0].xp.toLocaleString()} XP</p>
          <div className="w-24 h-28 bg-amber-100 dark:bg-amber-900/30 rounded-t-xl mt-2 flex items-center justify-center">
            <span style={{ fontSize: "28px" }}>🥇</span>
          </div>
        </div>

        {/* 3rd place */}
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-orange-300 to-orange-100 flex items-center justify-center border-3 border-orange-400 mb-2">
            <span style={{ fontSize: "20px" }}>{top3[2].name[0]}</span>
          </div>
          <p style={{ fontSize: "13px", fontWeight: 600 }}>{top3[2].name}</p>
          <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{top3[2].xp.toLocaleString()} XP</p>
          <div className="w-24 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-t-xl mt-2 flex items-center justify-center">
            <span style={{ fontSize: "24px" }}>🥉</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="text-right px-4 py-3" style={{ fontSize: "13px", fontWeight: 600 }}>المركز</th>
                <th className="text-right px-4 py-3" style={{ fontSize: "13px", fontWeight: 600 }}>الاسم</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell" style={{ fontSize: "13px", fontWeight: 600 }}>التخصص</th>
                <th className="text-right px-4 py-3" style={{ fontSize: "13px", fontWeight: 600 }}>XP</th>
                <th className="text-right px-4 py-3 hidden sm:table-cell" style={{ fontSize: "13px", fontWeight: 600 }}>كورسات</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((entry) => (
                <tr key={entry.rank} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                  <td className="px-4 py-3" style={{ fontSize: "14px", fontWeight: 600 }}>#{entry.rank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0" style={{ fontSize: "12px" }}>
                        {entry.name[0]}
                      </div>
                      <span style={{ fontSize: "13px" }}>{entry.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell" style={{ fontSize: "13px" }}>{entry.specialty}</td>
                  <td className="px-4 py-3 text-primary" style={{ fontSize: "13px", fontWeight: 600 }}>{entry.xp.toLocaleString()}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell" style={{ fontSize: "13px" }}>{entry.coursesCompleted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My position */}
      <div className="bg-primary/5 rounded-2xl border border-primary/20 p-4 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span style={{ fontSize: "14px", fontWeight: 600 }}>مركزك الحالي: #{currentUser.rank}</span>
        </div>
        <span className="text-muted-foreground" style={{ fontSize: "13px" }}>أنت على بُعد {currentUser.xpToTop10} XP من المركز العاشر 💪</span>
        <div className="flex-1 w-full sm:max-w-32 h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary" style={{ width: "60%" }} />
        </div>
      </div>
    </div>
  );
}
