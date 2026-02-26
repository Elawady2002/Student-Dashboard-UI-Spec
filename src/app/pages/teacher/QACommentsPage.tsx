import { useState } from "react";
import { MessageSquare, Star, Search, Filter, CheckCircle2, CornerDownRight, ThumbsUp } from "lucide-react";

const reviews = [
    { id: 1, student: "أحمد محمد", course: "القدرات العامة - التأسيس", text: "شرح مبسط وواضح جداً، شكراً لك أستاذي.", rating: 5, date: "منذ ساعتين", isReply: false },
    { id: 2, student: "سارة خالد", course: "مهارات القسم اللفظي", text: "عندي سؤال بخصوص المحاضرة الثالثة، هل التجميعات كافية؟", rating: 0, date: "منذ 5 ساعات", isReply: false },
];

export function QACommentsPage() {
    const [replyText, setReplyText] = useState("");

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">الأسئلة والتعليقات</h1>
                <p className="text-sm text-muted-foreground mt-1">تفاعل مع استفسارات طلابك ورد على تقييماتهم</p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-border pb-px">
                <button className="px-4 py-2 text-[14px] font-bold text-primary border-b-2 border-primary">
                    الكل (12)
                </button>
                <button className="px-4 py-2 text-[14px] font-bold text-muted-foreground hover:text-foreground">
                    لم يتم الرد (5)
                </button>
                <button className="px-4 py-2 text-[14px] font-bold text-muted-foreground hover:text-foreground">
                    تقييمات الكورسات
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between bg-card p-2 rounded-2xl border border-border shadow-sm">
                <div className="relative w-full sm:w-1/2">
                    <Search className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="ابحث في الأسئلة واسم الطالب..."
                        className="w-full bg-transparent border-none focus:ring-0 pl-4 pr-12 py-2 text-sm focus:outline-none"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-accent hover:bg-accent/80 rounded-xl transition-colors">
                    <Filter className="w-4 h-4" />
                    تصفية
                </button>
            </div>

            <div className="space-y-4">
                {reviews.map((rev) => (
                    <div key={rev.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                        <div className="p-5 flex flex-col md:flex-row gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
                                <span className="text-lg font-bold text-muted-foreground">{rev.student.charAt(0)}</span>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h4 className="text-[15px] font-bold leading-none">{rev.student}</h4>
                                        <p className="text-[12px] text-muted-foreground mt-1">{rev.course} • {rev.date}</p>
                                    </div>
                                    {rev.rating > 0 && (
                                        <div className="flex gap-1" dir="ltr">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30'}`} />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <p className="text-[14px] text-foreground leading-relaxed mt-2">{rev.text}</p>
                            </div>
                        </div>

                        {/* Reply Section */}
                        <div className="bg-accent/30 border-t border-border p-4 sm:p-5 flex gap-4">
                            <CornerDownRight className="w-5 h-5 text-muted-foreground shrink-0 mt-2 hidden sm:block" />
                            <div className="flex-1">
                                <textarea
                                    className="w-full bg-card border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none min-h-[80px]"
                                    placeholder="اكتب ردك هنا لطالبك..."
                                    defaultValue={replyText}
                                />
                                <div className="flex justify-end mt-3">
                                    <button className="bg-primary text-primary-foreground px-5 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
                                        إرسال الرد
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
