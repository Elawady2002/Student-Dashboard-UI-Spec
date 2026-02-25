import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { recommendedCourses, myCourses } from "../data/mockData";
import { Search, Star, Heart } from "lucide-react";

const allCourses = [...myCourses, ...recommendedCourses];
const categories = ["الكل", "تصميم", "برمجة", "تسويق", "تصوير", "أعمال"];

export function ExplorePage() {
  const { setPageTitle } = useApp();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");

  useEffect(() => { setPageTitle("استكشف الكورسات"); }, [setPageTitle]);

  return (
    <div className="max-w-6xl space-y-5">
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>استكشف الكورسات 🔍</h1>
        <p className="text-muted-foreground" style={{ fontSize: "14px" }}>اكتشف كورسات جديدة وابدأ رحلة التعلم</p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن كورس..."
          className="w-full pr-12 pl-4 py-3 rounded-2xl bg-accent/50 border border-border"
          style={{ fontSize: "14px" }}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl shrink-0 transition-colors ${category === cat ? "bg-primary text-primary-foreground" : "bg-accent/50 hover:bg-accent"}`}
            style={{ fontSize: "13px" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {allCourses.filter((c) => !search || c.title.includes(search)).map((course) => (
          <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-video overflow-hidden relative">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className={`w-4 h-4 ${course.isFavorite ? "text-red-500 fill-red-500" : "text-muted-foreground"}`} />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="line-clamp-2" style={{ fontSize: "15px", fontWeight: 600 }}>{course.title}</h3>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{course.instructor}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span style={{ fontSize: "12px" }}>{course.rating}</span>
                </div>
                <span className="text-primary" style={{ fontSize: "14px", fontWeight: 700 }}>{course.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
