const WHATSAPP_NUMBER = "919842362462";

export function shareOnWhatsApp(summary: string) {
  const text = encodeURIComponent(
    `${summary}\n\nView more: ${window.location.origin}\n— JC.HGF.PA.SARAVANAN, Financial Consultant`,
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
}

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);