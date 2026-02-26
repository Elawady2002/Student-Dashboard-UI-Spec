import { useState } from "react";
import { Plus, Upload, Book, Search, MoreVertical, Edit2, Download, Link as LinkIcon, FileText, X, Trash2 } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

const initialBooks = [
    { id: 1, title: "ملزمة تأسيس الكمي 1445", type: "PDF", pages: 120, downloads: 450, linkedCourse: "القدرات العامة - التأسيس", priceType: "مجاني", thumb: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" },
    { id: 2, title: "تجميعات اللفظي - الإصدار الثالث", type: "PDF", pages: 85, downloads: 890, linkedCourse: "القدرات العامة - التأسيس", priceType: "مجاني", thumb: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80" },
    { id: 3, title: "ملخص قوانين الفيزياء", type: "PDF", pages: 45, downloads: 120, linkedCourse: "التحصيلي علمي 1445", priceType: "مدفوع", thumb: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80" },
];

export function BookManagementPage() {
    const [books, setBooks] = useState(initialBooks);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [newBook, setNewBook] = useState({
        title: "",
        pages: 0,
        linkedCourse: "بدون ارتباط",
        priceType: "مجاني",
        thumb: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80"
    });

    const handleAddBook = (e: React.FormEvent) => {
        e.preventDefault();
        const bookToAdd = {
            id: Date.now(),
            title: newBook.title || "كتاب جديد",
            type: "PDF",
            pages: newBook.pages,
            downloads: 0,
            linkedCourse: newBook.linkedCourse,
            priceType: newBook.priceType,
            thumb: newBook.thumb
        };
        setBooks([bookToAdd, ...books]);
        setIsAddModalOpen(false);
        setNewBook({ title: "", pages: 0, linkedCourse: "بدون ارتباط", priceType: "مجاني", thumb: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80" });
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">إدارة الكتب والملازم</h1>
                    <p className="text-sm text-muted-foreground mt-1">ارفع ملفات الـ PDF واربطها بالدورات لتتاح للطلاب</p>
                </div>

                <Dialog.Root open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                    <Dialog.Trigger asChild>
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 font-medium text-sm">
                            <Upload className="w-4 h-4" />
                            <span>رفع كتاب جديد</span>
                        </button>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity" />
                        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-card p-6 shadow-xl z-50 overflow-y-auto border border-border focus:outline-none">
                            <div className="flex items-center justify-between mb-6">
                                <Dialog.Title className="text-xl font-bold">رفع كتاب جديد</Dialog.Title>
                                <Dialog.Close className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors">
                                    <X className="w-5 h-5" />
                                </Dialog.Close>
                            </div>

                            <form onSubmit={handleAddBook} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">عنوان الكتاب/الملزمة</label>
                                    <input
                                        type="text"
                                        value={newBook.title}
                                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                        required
                                        placeholder="مثال: ملزمة الفيزياء المكثفة..."
                                        className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold">عدد الصفحات</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={newBook.pages}
                                            onChange={(e) => setNewBook({ ...newBook, pages: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold">ارتباط بدورة (اختياري)</label>
                                        <select
                                            value={newBook.linkedCourse}
                                            onChange={(e) => setNewBook({ ...newBook, linkedCourse: e.target.value })}
                                            className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                                        >
                                            <option value="بدون ارتباط">بدون ارتباط</option>
                                            <option value="القدرات العامة - التأسيس">القدرات العامة - التأسيس</option>
                                            <option value="التحصيلي علمي 1445">التحصيلي علمي 1445</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5 col-span-2">
                                        <label className="text-sm font-semibold">التسعير</label>
                                        <select
                                            value={newBook.priceType}
                                            onChange={(e) => setNewBook({ ...newBook, priceType: e.target.value })}
                                            className="w-full bg-accent/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                                        >
                                            <option value="مجاني">مجاني لجميع الطلاب</option>
                                            <option value="مدفوع">مدفوع (15 ر.س)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold">ملف الكتاب (PDF)</label>
                                    <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-accent/30 transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Upload className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm font-medium">اضغط لرفع الملف أو اسحبه هنا</p>
                                        <p className="text-xs text-muted-foreground mt-1">PDF فقط (الحد الأقصى 50MB)</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                                    <Dialog.Close asChild>
                                        <button type="button" className="px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-accent transition-colors">
                                            إلغاء
                                        </button>
                                    </Dialog.Close>
                                    <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md">
                                        حفظ ورفع
                                    </button>
                                </div>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

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

            {/* Grid of Books */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {books.map((book) => (
                    <div key={book.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-transform hover:-translate-y-1 flex flex-col group relative">

                        <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setBooks(books.filter(b => b.id !== book.id))}
                                className="p-1.5 bg-card/80 backdrop-blur rounded-lg border border-border text-destructive hover:bg-destructive hover:text-white transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
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
                                <div className="flex gap-1.5">
                                    {book.priceType === "مدفوع" && (
                                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold">مدفوع</span>
                                    )}
                                    <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">{book.type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
