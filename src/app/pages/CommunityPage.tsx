import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { communityPosts, leaderboard } from "../data/mockData";
import { ThumbsUp, MessageCircle, Bookmark, Share2, MoreHorizontal, X, Send } from "lucide-react";

const filterTabs = [
  { key: "all", label: "الكل" },
  { key: "question", label: "أسئلة" },
  { key: "idea", label: "أفكار" },
  { key: "project", label: "مشاريع" },
  { key: "discussion", label: "نقاشات" },
];

const categoryColors: Record<string, string> = {
  question: "bg-blue-500/10 text-blue-600",
  idea: "bg-amber-500/10 text-amber-600",
  project: "bg-green-500/10 text-green-600",
  discussion: "bg-purple-500/10 text-purple-600",
};

export function CommunityPage() {
  const { setPageTitle } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCompose, setShowCompose] = useState(false);
  const [posts, setPosts] = useState(communityPosts);

  useEffect(() => { setPageTitle("المجتمع"); }, [setPageTitle]);

  const filtered = activeFilter === "all" ? posts : posts.filter((p) => p.category === activeFilter);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Feed */}
        <div className="flex-1 space-y-4">
          <h1 style={{ fontSize: "22px", fontWeight: 700 }}>مجتمع تميز</h1>

          {/* Compose */}
          <div
            className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3 cursor-pointer hover:bg-accent/30 transition-colors"
            onClick={() => setShowCompose(true)}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span style={{ fontSize: "16px" }}>👤</span>
            </div>
            <p className="text-muted-foreground" style={{ fontSize: "14px" }}>شارك فكرة أو اسأل سؤالاً...</p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {filterTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveFilter(t.key)}
                className={`px-4 py-2 rounded-xl shrink-0 transition-colors ${activeFilter === t.key ? "bg-primary text-primary-foreground" : "bg-accent/50 hover:bg-accent"}`}
                style={{ fontSize: "13px" }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          {filtered.map((post) => (
            <div key={post.id} className="bg-card rounded-2xl border border-border p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center" style={{ fontSize: "14px" }}>
                  {post.author[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "14px", fontWeight: 600 }}>{post.author}</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary" style={{ fontSize: "10px" }}>{post.authorLevel}</span>
                  </div>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{post.timeAgo}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full ${categoryColors[post.category]}`} style={{ fontSize: "11px" }}>
                  {post.categoryLabel}
                </span>
                <button className="p-1.5 rounded-lg hover:bg-accent">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div>
                <h3 className="mb-1" style={{ fontSize: "15px", fontWeight: 600 }}>{post.title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: "13px" }}>{post.body}</p>
              </div>

              <div className="flex items-center gap-4 pt-1 border-t border-border">
                <button
                  onClick={() => setPosts(posts.map((p) => p.id === post.id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p))}
                  className={`flex items-center gap-1 ${post.isLiked ? "text-primary" : "text-muted-foreground"} hover:text-primary transition-colors`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span style={{ fontSize: "12px" }}>{post.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span style={{ fontSize: "12px" }}>{post.comments}</span>
                </button>
                <button
                  onClick={() => setPosts(posts.map((p) => p.id === post.id ? { ...p, isSaved: !p.isSaved } : p))}
                  className={`flex items-center gap-1 ${post.isSaved ? "text-amber-500" : "text-muted-foreground"} hover:text-amber-500 transition-colors`}
                >
                  <Bookmark className={`w-4 h-4 ${post.isSaved ? "fill-amber-500" : ""}`} />
                  <span style={{ fontSize: "12px" }}>حفظ</span>
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span style={{ fontSize: "12px" }}>مشاركة</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-72 space-y-4">
          {/* Top members */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <h3 className="mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>🏆 المتميزون هذا الأسبوع</h3>
            {leaderboard.slice(0, 3).map((m, i) => (
              <div key={m.rank} className="flex items-center gap-3 py-2">
                <span style={{ fontSize: "16px" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center" style={{ fontSize: "12px" }}>
                  {m.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate" style={{ fontSize: "13px", fontWeight: 600 }}>{m.name}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{m.xp.toLocaleString()} XP</p>
                </div>
              </div>
            ))}
          </div>

          {/* Active instructors */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <h3 className="mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>المدرسون النشطون</h3>
            {["م. سارة أحمد", "م. خالد عبدالله", "د. نورا حسن"].map((name) => (
              <div key={name} className="flex items-center gap-3 py-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-300 to-green-100 flex items-center justify-center" style={{ fontSize: "12px" }}>
                    {name[0]}
                  </div>
                  <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600 }}>{name}</p>
                  <p className="text-green-500" style={{ fontSize: "11px" }}>متاح للرد</p>
                </div>
              </div>
            ))}
          </div>

          {/* Challenges */}
          <div className="bg-card rounded-2xl border border-border p-4">
            <h3 className="mb-3" style={{ fontSize: "15px", fontWeight: 700 }}>التحديات الجارية</h3>
            <div className="p-3 rounded-xl bg-gradient-to-l from-primary/10 to-transparent border border-primary/10">
              <p style={{ fontSize: "13px", fontWeight: 600 }}>🏆 تحدي التصميم الأسبوعي</p>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>صمم صفحة هبوط كاملة</p>
              <p className="text-primary mt-1" style={{ fontSize: "11px" }}>ينتهي بعد 3 أيام</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCompose(false)}>
          <div className="bg-card rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize: "18px", fontWeight: 700 }}>منشور جديد</h2>
              <button onClick={() => setShowCompose(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="العنوان" className="w-full px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "14px" }} />
              <textarea placeholder="اكتب منشورك هنا..." className="w-full px-3 py-2 rounded-xl bg-accent/50 border border-border h-32 resize-none" style={{ fontSize: "14px" }} />
              <select className="px-3 py-2 rounded-xl bg-accent/50 border border-border" style={{ fontSize: "13px" }}>
                <option>اختر التصنيف</option>
                <option>سؤال</option>
                <option>فكرة</option>
                <option>مشروع</option>
                <option>نقاش</option>
              </select>
              <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground flex items-center justify-center gap-1" style={{ fontSize: "14px" }} onClick={() => setShowCompose(false)}>
                <Send className="w-4 h-4" /> نشر
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
