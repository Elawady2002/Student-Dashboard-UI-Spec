import { useState } from "react";
import { Plus, Upload, Book, Search, MoreVertical, Edit2, Download, Link as LinkIcon, FileText } from "lucide-react";

const books = [
    { id: 1, title: "ملزمة تأسيس الكمي 1445", type: "PDF", pages: 120, downloads: 450, linkedCourse: "القدرات العامة - التأسيس", thumb: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" },
    { id: 2, title: "تجميعات اللفظي - الإصدار الثالث", type: "PDF", pages: 85, downloads: 890, linkedCourse: "القدرات العامة - التأسيس", thumb: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80" },
    { id: 3, title: "ملخص قوانين الفيزياء", type: "PDF", pages: 45, downloads: 120, linkedCourse: "التحصيلي علمي 1445", thumb: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80" },
];

export function BookManagementPage() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">إدارة الكتب والملازم</h1>
                    <p className="text-sm text-muted-foreground mt-1">ارفع ملفات الـ PDF واربطها بالدورات لتتاح للطلاب</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                    <Upload className="w-4 h-4" />
                    <span>رفع كتاب جديد</span>
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="ابحث باسم الكتاب أو الملزمة..."
                        className="w-full bg-accent/50 border border-border rounded-xl pr-10 pl-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors h-10"
                    />
                </div>
                <select className="bg-accent/50 border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors h-10 w-full sm:w-auto cursor-pointer">
                    <option>ترتيب حسب: الأحدث ترفيعاً</option>
                    <option>الأكثر تحميلاً</option>
                    <option>حسب الدورة المرتبطة</option>
                </select>
            </div>

            {/* Grid of Books matching recommended style */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {books.map((book) => (
                    <div key={book.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col group relative">

                        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 bg-card/80 backdrop-blur rounded-lg border border-border text-foreground hover:bg-accent transition-colors">
                                <MoreVertical className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="aspect-[3/4.5] relative overflow-hidden bg-muted">
                            <img src={book.thumb} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                                <div className="flex items-center gap-1.5 text-white text-[11px] font-bold">
                                    <FileText className="w-3.5 h-3.5" /> {book.pages} صفحة
                                </div>
                            </div>
                        </div>

                        <div className="p-3 flex-1 flex flex-col">
                            <h3 className="text-[13px] font-bold tracking-tight line-clamp-2 leading-snug group-hover:text-primary transition-colors">{book.title}</h3>

                            <div className="mt-2 text-[10px] text-muted-foreground flex items-center gap-1.5 bg-accent/50 p-1.5 rounded-md border border-border/50">
                                <LinkIcon className="w-3 h-3 text-primary shrink-0" />
                                <span className="truncate">{book.linkedCourse}</span>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-3">
                                <div className="flex items-center gap-1 text-muted-foreground font-medium">
                                    <Download className="w-3.5 h-3.5" />
                                    <span className="text-[11px]">{book.downloads}</span>
                                </div>
                                <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">{book.type}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
