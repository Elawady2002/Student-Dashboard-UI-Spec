import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { myCourses, recommendedBooks } from "../data/mockData";
import { Heart, Star, Download } from "lucide-react";

const tabs = [
  { key: "courses", label: "كورسات" },
  { key: "books", label: "كتب" },
  { key: "instructors", label: "مدرسين" },
  { key: "posts", label: "منشورات من المجتمع" },
];

export function FavoritesPage() {
  const { setPageTitle } = useApp();
  const [activeTab, setActiveTab] = useState("courses");
  const [removeConfirm, setRemoveConfirm] = useState<string | null>(null);

  useEffect(() => { setPageTitle("المفضلة"); }, [setPageTitle]);

  const favCourses = myCourses.filter((c) => c.isFavorite);
  const favBooks = recommendedBooks.filter((b) => b.isFavorite);

  return (
    <div className="max-w-6xl space-y-5">
      <h1 style={{ fontSize: "22px", fontWeight: 700 }}>المفضلة ⭐</h1>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 rounded-xl shrink-0 transition-colors ${activeTab === t.key ? "bg-primary text-primary-foreground" : "bg-accent/50 hover:bg-accent"}`}
            style={{ fontSize: "13px" }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "courses" && (
        favCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {favCourses.map((c) => (
              <div key={c.id} className="bg-card rounded-2xl border border-border overflow-hidden relative">
                <div className="aspect-video overflow-hidden">
                  <img src={c.thumbnail} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => setRemoveConfirm(c.id)}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
                <div className="p-4 space-y-2">
                  <h3 style={{ fontSize: "15px", fontWeight: 600 }}>{c.title}</h3>
                  <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{c.instructor}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span style={{ fontSize: "12px" }}>{c.rating}</span>
                    <span className="text-primary mr-auto" style={{ fontSize: "13px", fontWeight: 600 }}>{c.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="ما حفظتش كورسات لحد دلوقتي" icon="📚" />
        )
      )}

      {activeTab === "books" && (
        favBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {favBooks.map((b) => (
              <div key={b.id} className="bg-card rounded-2xl border border-border overflow-hidden relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={b.cover} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
                <div className="p-3 space-y-1">
                  <p style={{ fontSize: "13px", fontWeight: 600 }}>{b.title}</p>
                  <p className="text-muted-foreground" style={{ fontSize: "11px" }}>{b.author}</p>
                  <div className="flex items-center gap-2">
                    <Download className="w-3 h-3 text-muted-foreground" />
                    <span style={{ fontSize: "11px" }}>{b.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="ما حفظتش كتب لحد دلوقتي" icon="📖" />
        )
      )}

      {activeTab === "instructors" && <EmptyState text="ما حفظتش مدرسين لحد دلوقتي" icon="👨‍🏫" />}
      {activeTab === "posts" && <EmptyState text="ما حفظتش منشورات لحد دلوقتي" icon="💬" />}

      {/* Remove confirmation */}
      {removeConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setRemoveConfirm(null)}>
          <div className="bg-card rounded-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-center mb-4" style={{ fontSize: "16px", fontWeight: 600 }}>هتشيل من المفضلة؟</p>
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 rounded-xl bg-destructive text-white" onClick={() => setRemoveConfirm(null)}>ت��كيد</button>
              <button className="flex-1 py-2.5 rounded-xl bg-accent" onClick={() => setRemoveConfirm(null)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyState({ text, icon }: { text: string; icon: string }) {
  return (
    <div className="text-center py-16">
      <span style={{ fontSize: "48px" }}>{icon}</span>
      <p className="mt-4 text-muted-foreground" style={{ fontSize: "16px" }}>{text}</p>
    </div>
  );
}
