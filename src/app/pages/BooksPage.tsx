import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { recommendedBooks } from "../data/mockData";
import { Download, Heart } from "lucide-react";

export function BooksPage() {
  const { setPageTitle } = useApp();
  useEffect(() => { setPageTitle("كتبي"); }, [setPageTitle]);

  return (
    <div className="max-w-6xl space-y-5">
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>كتبي 📖</h1>
        <p className="text-muted-foreground" style={{ fontSize: "14px" }}>الكتب اللي اشتريتها أو حملتها</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {recommendedBooks.map((book) => (
          <div key={book.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow relative group">
            <div className="aspect-[3/4] overflow-hidden">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <button className="absolute top-3 left-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
              <Heart className={`w-4 h-4 ${book.isFavorite ? "text-red-500 fill-red-500" : "text-muted-foreground"}`} />
            </button>
            <div className="p-3 space-y-1">
              <p style={{ fontSize: "14px", fontWeight: 600 }}>{book.title}</p>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>{book.author}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3 text-muted-foreground" />
                  <span style={{ fontSize: "11px" }}>{book.downloads.toLocaleString()}</span>
                </div>
                <span className="text-primary" style={{ fontSize: "13px", fontWeight: 600 }}>{book.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recommendedBooks.length === 0 && (
        <div className="text-center py-16">
          <span style={{ fontSize: "48px" }}>📖</span>
          <p className="mt-4 text-muted-foreground" style={{ fontSize: "16px" }}>ما اشتريتش أي كتاب لحد دلوقتي</p>
        </div>
      )}
    </div>
  );
}
