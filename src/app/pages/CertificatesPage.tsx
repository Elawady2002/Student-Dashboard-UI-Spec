import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import { certificates, currentUser } from "../data/mockData";
import { Download, Linkedin, Link2, X, QrCode } from "lucide-react";

export function CertificatesPage() {
  const { setPageTitle } = useApp();
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  useEffect(() => { setPageTitle("شهاداتي"); }, [setPageTitle]);

  const cert = certificates.find((c) => c.id === selectedCert);

  return (
    <div className="max-w-6xl space-y-5">
      <div>
        <h1 style={{ fontSize: "22px", fontWeight: 700 }}>شهاداتي</h1>
        <p className="text-muted-foreground" style={{ fontSize: "14px" }}>{certificates.length} شهادة مكتسبة</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {certificates.map((c) => (
          <div key={c.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Certificate preview */}
            <div
              className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-primary/5 to-amber-500/10 p-6 flex flex-col items-center justify-center cursor-pointer relative"
              onClick={() => setSelectedCert(c.id)}
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <span style={{ fontSize: "24px" }}>🏅</span>
              </div>
              <p className="text-center" style={{ fontSize: "11px", fontWeight: 600 }}>شهادة إتمام</p>
              <p className="text-center text-primary" style={{ fontSize: "15px", fontWeight: 700 }}>{c.courseName}</p>
              <p className="text-muted-foreground text-center mt-1" style={{ fontSize: "11px" }}>{currentUser.name}</p>
              <div className="absolute bottom-3 left-3 w-10 h-10 rounded bg-foreground/10 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p style={{ fontSize: "14px", fontWeight: 600 }}>{c.courseName}</p>
              <p className="text-muted-foreground" style={{ fontSize: "12px" }}>تاريخ الإتمام: {c.completionDate}</p>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-primary text-primary-foreground" style={{ fontSize: "12px" }}>
                  <Download className="w-3 h-3" /> تحميل PDF
                </button>
                <button className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#0077B5]/10 text-[#0077B5]" style={{ fontSize: "12px" }}>
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </button>
                <button className="flex items-center gap-1 px-3 py-2 rounded-xl border border-border hover:bg-accent" style={{ fontSize: "12px" }}>
                  <Link2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Detail Modal */}
      {cert && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCert(null)}>
          <div className="bg-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 style={{ fontSize: "18px", fontWeight: 700 }}>شهادة إتمام</h2>
              <button onClick={() => setSelectedCert(null)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                  <span style={{ fontSize: "32px" }}>🏅</span>
                </div>
                <p style={{ fontSize: "13px" }}>شهادة إتمام مقدمة من</p>
                <p className="text-primary" style={{ fontSize: "20px", fontWeight: 700 }}>منصة تميز</p>
                <div className="h-px bg-border w-32 mx-auto" />
                <p style={{ fontSize: "14px" }}>تشهد بأن</p>
                <p style={{ fontSize: "24px", fontWeight: 700 }}>{currentUser.name}</p>
                <p style={{ fontSize: "14px" }}>قد أتم بنجاح كورس</p>
                <p className="text-primary" style={{ fontSize: "18px", fontWeight: 700 }}>{cert.courseName}</p>
                <p className="text-muted-foreground" style={{ fontSize: "13px" }}>بتاريخ {cert.completionDate}</p>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <div className="w-16 h-16 rounded bg-foreground/10 flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground" style={{ fontSize: "11px" }}>
                  رمز التحقق: {cert.verificationCode}
                </p>
              </div>
            </div>
            <div className="p-4 flex gap-2 justify-center border-t border-border">
              <button className="flex items-center gap-1 px-6 py-2 rounded-xl bg-primary text-primary-foreground" style={{ fontSize: "13px" }}>
                <Download className="w-4 h-4" /> تحميل PDF
              </button>
              <button className="flex items-center gap-1 px-6 py-2 rounded-xl bg-[#0077B5] text-white" style={{ fontSize: "13px" }}>
                <Linkedin className="w-4 h-4" /> شارك على LinkedIn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
