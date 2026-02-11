import { Phone, MessageCircle } from "lucide-react";

const MobileBottomBar = () => (
  <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-border bg-primary shadow-lg md:hidden">
    <a
      href="tel:+917010105335"
      className="flex flex-1 items-center justify-center gap-2 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
    >
      <Phone size={20} /> Call Now
    </a>
    <div className="w-px bg-primary-foreground/20" />
    <a
      href="https://wa.me/919842362462"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-1 items-center justify-center gap-2 bg-gold py-3 font-semibold text-gold-foreground transition-colors hover:bg-gold/90"
    >
      <MessageCircle size={20} /> WhatsApp
    </a>
  </div>
);

export default MobileBottomBar;
