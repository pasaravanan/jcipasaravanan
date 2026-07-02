import { Phone, MessageCircle } from "lucide-react";

const MobileBottomBar = () => (
  <div
    className="fixed inset-x-0 bottom-0 z-50 flex md:hidden"
    style={{
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(16px)",
      borderTop: "1px solid #e8eaf0",
      boxShadow: "0 -4px 24px rgba(12,30,74,0.08)",
    }}
  >
    <a
      href="tel:+917010105335"
      className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors hover:bg-[#f7f8fc]"
      style={{ color: "hsl(222,68%,17%)" }}
    >
      <Phone size={17} style={{ color: "hsl(38,71%,44%)" }} />
      Call Now
    </a>
    <div className="w-px bg-[#e8eaf0]" />
    <a
      href="https://wa.me/919842362462"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all hover:opacity-90"
      style={{
        background: "linear-gradient(135deg, hsl(38,71%,47%), hsl(38,78%,56%))",
        color: "hsl(222,68%,15%)",
      }}
    >
      <MessageCircle size={17} />
      WhatsApp
    </a>
  </div>
);

export default MobileBottomBar;
