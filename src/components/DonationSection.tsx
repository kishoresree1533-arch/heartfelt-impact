import { ShieldCheck, Zap, Heart, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import kvbQR from "@/assets/image.png";

const bankDetails = [
  { label: "Account Name",   value: "IRAI THULIGAL IYAKKAM" },
  { label: "Account Number", value: "1198010000000591" },
  { label: "IFSC Code",      value: "KVBL0001198" },
  { label: "Branch",         value: "Tiruvannamalai" },
  { label: "Bank Name",      value: "Karur Vysya Bank" },
];

const trustBadges = [
  { icon: ShieldCheck, text: "100% Transparent" },
  { icon: Zap,         text: "Instant Settlement" },
  { icon: Heart,       text: "Direct Field Impact" },
];

const DonationSection = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="donate" className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-8">

        {/* ── Header ── */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-4">
              Support Our Cause
            </p>
            <h2 className="font-display text-4xl font-medium text-primary md:text-6xl leading-tight">
              Today, You Can <span className="italic text-gold">Rewrite a Life</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-14 bg-gold/40" />
            <p className="mt-6 text-base font-light text-muted-foreground max-w-lg mx-auto">
              Every contribution — big or small — reaches real people in real need.
              Choose how you'd like to give.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Two cards ── */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

          {/* Bank Transfer card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="flex flex-col h-full rounded-2xl border border-border bg-[#faf8f5] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-3 px-8 py-6 border-b border-border bg-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.45em] text-gold font-bold">Option 01</p>
                  <h3 className="font-display text-lg text-primary">Bank Transfer</h3>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1 px-8 py-7 gap-5">
                {bankDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    className="group flex items-center justify-between pb-5 border-b border-border last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/60 mb-1">{label}</p>
                      <p className="text-base font-medium text-primary">{value}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(value, label)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex h-8 w-8 items-center justify-center rounded-lg border border-gold/30 bg-white hover:bg-gold/10 text-gold"
                      title="Copy"
                    >
                      {copied === label
                        ? <CheckCheck className="h-3.5 w-3.5" />
                        : <Copy className="h-3.5 w-3.5" />
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* UPI card */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="flex flex-col h-full rounded-2xl border border-border bg-[#faf8f5] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-3 px-8 py-6 border-b border-border bg-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 border border-gold/20">
                  <Zap className="h-4 w-4 text-gold" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.45em] text-gold font-bold">Option 02</p>
                  <h3 className="font-display text-lg text-primary">Scan & Pay — UPI</h3>
                </div>
              </div>

              {/* QR + UPI ID */}
              <div className="flex flex-col flex-1 items-center justify-center px-8 py-10 gap-8">
                {/* QR Image */}
                <div className="group relative p-5 bg-white rounded-2xl shadow-md border border-border hover:shadow-xl hover:border-gold/30 transition-all duration-500 w-full max-w-[340px]">
                  {/* Replace src below with: import kvbQR from "@/assets/kvb-qr.jpeg" once saved */}
                  <div className="flex items-center justify-center aspect-square bg-white rounded-xl overflow-hidden">
                    <img
                      src={kvbQR}
                      alt="KVB UPI QR Code — IRAI THULIGAL IYAKKAM"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-4 pt-3 border-t border-border text-center">
                    <p className="text-[8px] uppercase tracking-[0.4em] text-muted-foreground/50 font-bold">
                      Scan with any UPI App
                    </p>
                    <p className="text-[9px] font-bold text-primary/70 mt-1">BHIM · GPay · PhonePe · Paytm</p>
                  </div>
                </div>

                {/* UPI ID */}
                <div className="text-center">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground/50 mb-2">UPI ID</p>
                  <p className="font-display text-base font-medium text-primary mb-1">
                    Mswipe.1430042826001727@mswipesbm
                  </p>
                  <p className="text-[8px] text-muted-foreground/40 mb-3">IRAI THULIGAL IYAKKAM</p>
                  <button
                    onClick={() => handleCopy("Mswipe.1430042826001727@mswipesbm", "upi")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-amber-50 text-[9px] uppercase tracking-[0.4em] text-gold font-bold hover:bg-gold/10 transition-all duration-300"
                  >
                    {copied === "upi" ? <CheckCheck className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied === "upi" ? "Copied!" : "Copy UPI ID"}
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* ── Trust badges ── */}
        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 px-5 py-3 rounded-full border border-gold/25 bg-amber-50 text-sm font-light text-foreground/70"
              >
                <Icon className="h-4 w-4 text-gold shrink-0" />
                <span className="text-[10px] uppercase tracking-[0.35em] font-bold text-gold">{text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── Quote ── */}
        <ScrollReveal delay={0.25}>
          <p className="mt-10 text-center font-display text-lg italic text-muted-foreground/50">
            "Every heart matters."
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default DonationSection;
