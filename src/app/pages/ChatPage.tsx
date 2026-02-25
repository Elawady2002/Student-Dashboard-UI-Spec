import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { chatConversations, chatMessages } from "../data/mockData";
import { Search, Paperclip, Image, Send, MoreVertical, ArrowRight, Smile } from "lucide-react";

const chatTabs = [
  { key: "all", label: "الكل" },
  { key: "instructors", label: "مدرسين" },
  { key: "groups", label: "مجموعات" },
];

export function ChatPage() {
  const { setPageTitle } = useApp();
  const [selectedChat, setSelectedChat] = useState<string | null>("ch1");
  const [messageText, setMessageText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState(chatMessages);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => { setPageTitle("الشات"); }, [setPageTitle]);

  const activeConv = chatConversations.find((c) => c.id === selectedChat);

  const filteredConvs = activeTab === "all"
    ? chatConversations
    : activeTab === "groups"
    ? chatConversations.filter((c) => c.isGroup)
    : chatConversations.filter((c) => !c.isGroup);

  const handleSend = () => {
    if (!messageText.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      sender: "أنا",
      isOwn: true,
      text: messageText,
      time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    }]);
    setMessageText("");
  };

  return (
    <div className="max-w-6xl -m-4 lg:-m-6 h-[calc(100vh-64px)] lg:h-[calc(100vh-64px-48px)]">
      <div className="flex h-full bg-card border border-border lg:rounded-2xl lg:m-6 overflow-hidden">
        {/* Conversations list */}
        <div className={`w-full lg:w-[340px] border-l border-border flex flex-col ${showMobileChat ? "hidden lg:flex" : "flex"}`}>
          <div className="p-4 border-b border-border space-y-3">
            <h2 style={{ fontSize: "18px", fontWeight: 700 }}>المحادثات</h2>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="ابحث في محادثاتك..."
                className="w-full pr-10 pl-3 py-2 rounded-xl bg-accent/50 border border-border"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div className="flex gap-1">
              {chatTabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex-1 py-1.5 rounded-lg transition-colors ${activeTab === t.key ? "bg-primary text-primary-foreground" : "bg-accent/50 hover:bg-accent"}`}
                  style={{ fontSize: "12px" }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConvs.map((conv) => (
              <button
                key={conv.id}
                onClick={() => { setSelectedChat(conv.id); setShowMobileChat(true); }}
                className={`w-full flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors text-right ${selectedChat === conv.id ? "bg-accent/50" : ""}`}
              >
                <div className="relative shrink-0">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span style={{ fontSize: "16px" }}>{conv.isGroup ? "👥" : conv.name[0]}</span>
                  </div>
                  {conv.isOnline && (
                    <div className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate" style={{ fontSize: "14px", fontWeight: 600 }}>{conv.name}</span>
                    <span className="text-muted-foreground shrink-0" style={{ fontSize: "11px" }}>{conv.timeAgo}</span>
                  </div>
                  <p className="text-muted-foreground truncate" style={{ fontSize: "12px" }}>{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0" style={{ fontSize: "11px" }}>
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active conversation */}
        <div className={`flex-1 flex flex-col ${!showMobileChat ? "hidden lg:flex" : "flex"}`}>
          {activeConv ? (
            <>
              {/* Chat header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <button className="lg:hidden p-1" onClick={() => setShowMobileChat(false)}>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span style={{ fontSize: "14px" }}>{activeConv.isGroup ? "👥" : activeConv.name[0]}</span>
                  </div>
                  {activeConv.isOnline && (
                    <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: "14px", fontWeight: 600 }}>{activeConv.name}</p>
                  <p style={{ fontSize: "11px" }} className={activeConv.isOnline ? "text-green-500" : "text-muted-foreground"}>
                    {activeConv.isOnline ? "متصل الآن" : "آخر ظهور منذ ساعة"}
                  </p>
                </div>
                <button className="p-2 rounded-lg hover:bg-accent">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="text-center">
                  <span className="px-3 py-1 rounded-full bg-accent/50 text-muted-foreground" style={{ fontSize: "11px" }}>اليوم</span>
                </div>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isOwn ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.isOwn ? "bg-primary text-primary-foreground rounded-br-md" : "bg-accent rounded-bl-md"}`}>
                      <p style={{ fontSize: "14px" }}>{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        <span style={{ fontSize: "10px" }}>{msg.time}</span>
                        {msg.isOwn && <span style={{ fontSize: "10px" }}>{msg.isRead ? "✓✓" : "✓"}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
                  <Smile className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
                  <Image className="w-5 h-5" />
                </button>
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="اكتب رسالة..."
                  className="flex-1 px-3 py-2 rounded-xl bg-accent/50 border border-border"
                  style={{ fontSize: "14px" }}
                />
                <button onClick={handleSend} className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground" style={{ fontSize: "14px" }}>اختر محادثة للبدء</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
