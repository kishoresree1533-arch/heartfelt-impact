import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Users, Heart, Leaf, Droplets,
  ArrowUpRight, Star, Shield, MapPin, Upload, Download, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

/* ── Config ── */
const API_URL = "http://localhost/heartfelt-impact/admin/api/membership.php";

const benefits = [
  { icon: Heart,    title: "Humanitarian Aid",       desc: "Be part of dignified last-rites and food drives" },
  { icon: Droplets, title: "Blood Donation Drives",  desc: "Priority access to all blood donation camps" },
  { icon: Leaf,     title: "Tree Plantation",        desc: "Join our greening initiatives across Tamil Nadu" },
  { icon: Users,    title: "Community Network",      desc: "Connect with 1,200+ like-minded volunteers" },
  { icon: Star,     title: "Volunteer Certificate",  desc: "Official recognition from Iraithuligal Iyakkam" },
  { icon: Shield,   title: "Free Membership",        desc: "No fees, no barriers — open to all ages 15+" },
];

const roles = [
  "Field Volunteer", "Blood Donation Coordinator", "Tree Plantation Leader",
  "Food Distribution Helper", "Event Organiser", "Social Media Ambassador",
  "Community Outreach Worker", "Other",
];

interface FormData {
  fullName: string; email: string; phone: string;
  age: string; district: string; role: string;
  motivation: string; agreeTerms: boolean;
}
const blank: FormData = {
  fullName: "", email: "", phone: "", age: "",
  district: "", role: "", motivation: "", agreeTerms: false,
};

interface CardData {
  memberId: string; fullName: string; role: string;
  district: string; phone: string; photoUrl: string | null;
}

/* ══════════════════════════════════════════════════════
   PREMIUM MEMBERSHIP CARD — Clean White & Gold
   1050 × 660 px  (standard ID card ratio)
══════════════════════════════════════════════════════ */
const drawMemberCard = (canvas: HTMLCanvasElement, data: CardData, photo: HTMLImageElement | null) => {
  const W = 1050, H = 660;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  /* helpers */
  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y,     x + w, y + r,     r);
    ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h); ctx.arcTo(x,     y + h, x,     y + h - r, r);
    ctx.lineTo(x,     y + r); ctx.arcTo(x,     y,     x + r, y,         r);
    ctx.closePath();
  };

  /* ── 1. White card base ───────────────────────────── */
  ctx.fillStyle = "#ffffff";
  rr(0, 0, W, H, 32); ctx.fill();

  /* ── 2. Soft warm paper texture (very subtle) ─────── */
  ctx.save();
  const paper = ctx.createLinearGradient(0, 0, W, H);
  paper.addColorStop(0,   "rgba(255,248,220,0.45)");
  paper.addColorStop(0.5, "rgba(255,255,255,0)");
  paper.addColorStop(1,   "rgba(255,248,220,0.35)");
  ctx.fillStyle = paper;
  rr(0, 0, W, H, 32); ctx.fill();
  ctx.restore();

  /* ── 3. Gold header bar (top 110px) ───────────────── */
  const headerGrad = ctx.createLinearGradient(0, 0, W, 0);
  headerGrad.addColorStop(0,    "#b8862a");
  headerGrad.addColorStop(0.25, "#e8c56a");
  headerGrad.addColorStop(0.5,  "#f5d97a");
  headerGrad.addColorStop(0.75, "#e8c56a");
  headerGrad.addColorStop(1,    "#b8862a");
  ctx.fillStyle = headerGrad;
  ctx.beginPath();
  ctx.moveTo(32, 0);
  ctx.lineTo(W - 32, 0); ctx.arcTo(W, 0, W, 32, 32);
  ctx.lineTo(W, 110); ctx.lineTo(0, 110);
  ctx.lineTo(0, 32); ctx.arcTo(0, 0, 32, 0, 32);
  ctx.closePath();
  ctx.fill();

  /* ── 4. Org name in header — bold, centered ──────── */
  ctx.fillStyle = "#3d2600";
  ctx.font = "bold 38px Georgia, 'Times New Roman', serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("IRAITHULIGAL IYAKKAM", W / 2, 68);
  ctx.letterSpacing = "0px";
  /* Tamil sub-line */
  ctx.fillStyle = "rgba(61,38,0,0.65)";
  ctx.font = "italic 15px Georgia, serif";
  ctx.fillText("இரை துளிகள் இயக்கம்  —  Service to Humanity", W / 2, 94);

  /* ── 5. Thin gold rule below header ──────────────── */
  ctx.strokeStyle = "#c9993a";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(40, 110); ctx.lineTo(W - 40, 110); ctx.stroke();

  /* ── 6. Outer card border ────────────────────────── */
  const border = ctx.createLinearGradient(0, 0, W, H);
  border.addColorStop(0,   "#b8862a");
  border.addColorStop(0.5, "#f5d97a");
  border.addColorStop(1,   "#b8862a");
  ctx.strokeStyle = border;
  ctx.lineWidth = 3;
  rr(1.5, 1.5, W - 3, H - 3, 31); ctx.stroke();

  /* ── 7. Inner inset border ───────────────────────── */
  ctx.strokeStyle = "rgba(200,153,58,0.25)";
  ctx.lineWidth = 1;
  rr(12, 12, W - 24, H - 24, 24); ctx.stroke();

  /* ── 8. Corner ornaments ─────────────────────────── */
  const orn = (ox: number, oy: number, sx: number, sy: number) => {
    ctx.strokeStyle = "#c9993a";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(ox, oy + sy * 30); ctx.lineTo(ox, oy); ctx.lineTo(ox + sx * 30, oy);
    ctx.stroke();
    ctx.globalAlpha = 0.5;
    ctx.beginPath(); ctx.arc(ox + sx * 8, oy + sy * 8, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#c9993a"; ctx.fill();
    ctx.globalAlpha = 1;
  };
  orn(22, 22,  1,  1); orn(W - 22, 22,  -1,  1);
  orn(22, H - 22, 1, -1); orn(W - 22, H - 22, -1, -1);

  /* ── 9. Watermark text (very faint) ──────────────── */
  ctx.save();
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = "#c9993a";
  ctx.font = "bold 110px Georgia, serif";
  ctx.textAlign = "center";
  ctx.translate(W / 2, H / 2 + 40);
  ctx.rotate(-0.18);
  ctx.fillText("MEMBER", 0, 0);
  ctx.restore();

  /* ── 10. LEFT COLUMN — photo + ID ────────────────── */
  const photoX = 145, photoY = 290, photoR = 90;

  /* photo glow */
  ctx.save();
  const glow = ctx.createRadialGradient(photoX, photoY, photoR * 0.6, photoX, photoY, photoR * 1.5);
  glow.addColorStop(0,   "rgba(200,153,58,0.18)");
  glow.addColorStop(1,   "transparent");
  ctx.fillStyle = glow;
  ctx.beginPath(); ctx.arc(photoX, photoY, photoR * 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  /* photo circle clip */
  ctx.save();
  ctx.beginPath(); ctx.arc(photoX, photoY, photoR, 0, Math.PI * 2); ctx.clip();
  if (photo) {
    const s = Math.min(photo.width, photo.height);
    const sx = (photo.width - s) / 2, sy = (photo.height - s) / 2;
    ctx.drawImage(photo, sx, sy, s, s, photoX - photoR, photoY - photoR, photoR * 2, photoR * 2);
  } else {
    const fbg = ctx.createRadialGradient(photoX, photoY - 20, 0, photoX, photoY, photoR);
    fbg.addColorStop(0, "#f5e8c8"); fbg.addColorStop(1, "#e8d4a0");
    ctx.fillStyle = fbg; ctx.fillRect(photoX - photoR, photoY - photoR, photoR * 2, photoR * 2);
    ctx.fillStyle = "#7a5a00"; ctx.font = "bold 72px Georgia, serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(data.fullName.charAt(0).toUpperCase(), photoX, photoY);
  }
  ctx.restore();

  /* photo ring — double gold */
  const ring = ctx.createLinearGradient(photoX - photoR, photoY - photoR, photoX + photoR, photoY + photoR);
  ring.addColorStop(0, "#f5d97a"); ring.addColorStop(0.5, "#c9993a"); ring.addColorStop(1, "#f5d97a");
  ctx.strokeStyle = ring; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(photoX, photoY, photoR + 2, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "rgba(200,153,58,0.3)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(photoX, photoY, photoR + 8, 0, Math.PI * 2); ctx.stroke();

  /* member ID pill */
  const idW = 170, idH = 30, idX = photoX - idW / 2, idY = photoY + photoR + 22;
  const idBg = ctx.createLinearGradient(idX, 0, idX + idW, 0);
  idBg.addColorStop(0, "#f5e8c0"); idBg.addColorStop(1, "#ede0b0");
  ctx.fillStyle = idBg; rr(idX, idY, idW, idH, 15); ctx.fill();
  ctx.strokeStyle = "#c9993a"; ctx.lineWidth = 1;
  rr(idX, idY, idW, idH, 15); ctx.stroke();
  ctx.fillStyle = "#7a5a00"; ctx.font = "bold 12px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(data.memberId, photoX, idY + 15);
  ctx.textBaseline = "alphabetic";

  /* "Volunteer Member" label */
  ctx.fillStyle = "#c9993a"; ctx.font = "600 10px Georgia, serif";
  ctx.letterSpacing = "2px"; ctx.textAlign = "center";
  ctx.fillText("VOLUNTEER  MEMBER", photoX, idY + idH + 24);
  ctx.letterSpacing = "0px";

  /* ── 11. Thin vertical divider ───────────────────── */
  const divGrad = ctx.createLinearGradient(0, 130, 0, H - 30);
  divGrad.addColorStop(0,   "rgba(200,153,58,0)");
  divGrad.addColorStop(0.2, "rgba(200,153,58,0.4)");
  divGrad.addColorStop(0.8, "rgba(200,153,58,0.4)");
  divGrad.addColorStop(1,   "rgba(200,153,58,0)");
  ctx.strokeStyle = divGrad; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(282, 130); ctx.lineTo(282, H - 30); ctx.stroke();

  /* ── 12. RIGHT COLUMN — details ─────────────────── */
  const rx = 318;

  /* "MEMBERSHIP CARD" small label */
  ctx.fillStyle = "#c9993a"; ctx.font = "700 10px Georgia, serif";
  ctx.letterSpacing = "4px"; ctx.textAlign = "left";
  ctx.fillText("MEMBERSHIP CARD", rx, 148);
  ctx.letterSpacing = "0px";

  /* Full name */
  ctx.fillStyle = "#1a1008";
  ctx.font = "300 54px Georgia, 'Times New Roman', serif";
  ctx.fillText(data.fullName, rx, 212);

  /* Thin rule under name */
  ctx.strokeStyle = ctx.createLinearGradient(rx, 0, rx + 680, 0) as CanvasGradient;
  const nameRule = ctx.createLinearGradient(rx, 0, rx + 680, 0);
  nameRule.addColorStop(0, "#c9993a"); nameRule.addColorStop(0.5, "rgba(200,153,58,0.2)"); nameRule.addColorStop(1, "transparent");
  ctx.strokeStyle = nameRule; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(rx, 226); ctx.lineTo(rx + 680, 226); ctx.stroke();

  /* Role pill */
  ctx.font = "700 13px Georgia, serif";
  const roleW = ctx.measureText(data.role).width + 40;
  const rolePill = ctx.createLinearGradient(rx, 0, rx + roleW, 0);
  rolePill.addColorStop(0, "#c9993a"); rolePill.addColorStop(1, "#e8c56a");
  ctx.fillStyle = rolePill;
  rr(rx, 238, roleW, 32, 16); ctx.fill();
  ctx.fillStyle = "#3d2600"; ctx.textAlign = "left";
  ctx.fillText(data.role, rx + 20, 260);

  /* ── 13. Details grid ────────────────────────────── */
  const fields: [string, string][] = [
    ["DISTRICT", data.district],
    ["MOBILE NO.", data.phone],
    ["YEAR JOINED", new Date().getFullYear().toString()],
  ];
  const colSpacing = 226;
  fields.forEach(([label, val], i) => {
    const fx = rx + i * colSpacing;
    const fy = 318;

    /* label */
    ctx.fillStyle = "#c9993a"; ctx.font = "700 9px Georgia, serif";
    ctx.letterSpacing = "2.5px"; ctx.textAlign = "left";
    ctx.fillText(label, fx, fy);
    ctx.letterSpacing = "0px";

    /* value */
    ctx.fillStyle = "#1a1008"; ctx.font = "400 20px Georgia, serif";
    ctx.fillText(val, fx, fy + 28);

    /* underline */
    ctx.strokeStyle = "rgba(200,153,58,0.2)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(fx, fy + 36); ctx.lineTo(fx + colSpacing - 16, fy + 36); ctx.stroke();
  });

  /* ── 14. Gold footer bar ─────────────────────────── */
  const footerY = H - 80;
  const footerGrad = ctx.createLinearGradient(0, footerY, W, footerY);
  footerGrad.addColorStop(0,    "#b8862a");
  footerGrad.addColorStop(0.25, "#e8c56a");
  footerGrad.addColorStop(0.5,  "#f5d97a");
  footerGrad.addColorStop(0.75, "#e8c56a");
  footerGrad.addColorStop(1,    "#b8862a");
  ctx.fillStyle = footerGrad;
  ctx.beginPath();
  ctx.moveTo(0, footerY);
  ctx.lineTo(W, footerY);
  ctx.lineTo(W, H - 32); ctx.arcTo(W, H, W - 32, H, 32);
  ctx.lineTo(32, H); ctx.arcTo(0, H, 0, H - 32, 32);
  ctx.lineTo(0, footerY);
  ctx.closePath();
  ctx.fill();

  /* footer content */
  ctx.fillStyle = "#3d2600"; ctx.font = "700 11px Georgia, serif";
  ctx.letterSpacing = "1px"; ctx.textAlign = "left";
  ctx.fillText("VALID : LIFETIME MEMBERSHIP", rx, footerY + 26);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = "rgba(61,38,0,0.6)"; ctx.font = "italic 10px Georgia, serif";
  ctx.fillText("This card certifies the holder as an official volunteer of Iraithuligal Iyakkam.", rx, footerY + 48);

  /* footer right — org name */
  ctx.fillStyle = "rgba(61,38,0,0.7)"; ctx.font = "bold 11px Georgia, serif";
  ctx.letterSpacing = "2px"; ctx.textAlign = "right";
  ctx.fillText("IRAITHULIGAL IYAKKAM", W - 36, footerY + 38);
  ctx.letterSpacing = "0px";
};

/* ── Field wrapper ── */
const Field = ({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) => (
  <div>
    <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-2">
      {label}{required && <span className="text-gold ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
  </div>
);

const inputCls = (err?: string) =>
  `w-full rounded-xl border px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all duration-300 ${
    err ? "border-red-400" : "border-border hover:border-gold/40"
  }`;

/* ══════════════════════════════════════════ */
const Membership = () => {
  const [form, setForm]           = useState<FormData>(blank);
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({});
  const [loading, setLoading]     = useState(false);
  const [cardData, setCardData]   = useState<CardData | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      e.phone = "Enter a valid 10-digit mobile number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.age || +form.age < 15 || +form.age > 80)
      e.age = "Age must be between 15 and 80";
    if (!form.district.trim()) e.district = "District is required";
    if (!form.role)             e.role     = "Please select a role";
    if (!form.agreeTerms)       e.agreeTerms = "You must agree to continue";
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(p => ({ ...p, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
    setErrors(p => ({ ...p, [name]: undefined }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const renderCard = useCallback((data: CardData, photoUrl: string | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (photoUrl) {
      const img = new Image();
      img.onload = () => drawMemberCard(canvas, data, img);
      img.src = photoUrl;
    } else {
      drawMemberCard(canvas, data, null);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const isConfirmed = window.confirm("Are you sure you want to submit your membership registration?");
    if (!isConfirmed) return;

    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (photoFile) fd.append("photo", photoFile);

    try {
      const res  = await fetch(API_URL, { method: "POST", body: fd });
      const json = await res.json();
      if (json.success) {
        const cd: CardData = {
          memberId: json.member_id,
          fullName: form.fullName,
          role:     form.role,
          district: form.district,
          phone:    form.phone,
          photoUrl: photoPreview,
        };
        setCardData(cd);
        setTimeout(() => renderCard(cd, photoPreview), 100);
      } else {
        alert("Error: " + json.message);
      }
    } catch {
      alert("Could not connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Membership_Card_${cardData?.memberId ?? "iraithuligal"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative bg-primary overflow-hidden pt-36 pb-28 px-6">
        <div className="absolute top-8 left-8 h-px w-16 bg-gold opacity-40" />
        <div className="absolute top-8 left-8 w-px h-16 bg-gold opacity-40" />
        <div className="absolute bottom-8 right-8 h-px w-16 bg-gold opacity-40" />
        <div className="absolute bottom-8 right-8 w-px h-16 bg-gold opacity-40" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full border border-white/[0.03]" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full border border-white/[0.03]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-gold mb-6">Volunteer Membership</p>
            <h1 className="font-display text-5xl md:text-7xl font-medium text-white leading-[1.05] mb-8">
              Be the Heart of<br /><span className="italic text-gold">Our Movement</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-lg mb-12">
              Join Iraithuligal Iyakkam as a volunteer and become a leader in
              compassion, service, and community change across Tamil Nadu.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <a href="#membership-form"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gold/50 bg-gold/10 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.45em] text-white backdrop-blur-sm hover:border-gold transition-all duration-500">
                <span className="relative z-10">Register Now</span>
                <ArrowUpRight className="relative z-10 h-3.5 w-3.5" />
                <div className="absolute inset-0 rounded-full -translate-y-full bg-gold transition-transform duration-500 group-hover:translate-y-0" />
              </a>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-display text-xl font-medium text-white">1,247</span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">Active Volunteers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="bg-[#faf8f5] py-20 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-100/50 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-4">Why Join Us</p>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-primary leading-tight">
                What Membership <span className="italic text-gold">Means for You</span>
              </h2>
              <div className="mx-auto mt-5 h-px w-14 bg-gold/40" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.08} direction="up">
                <div className="group relative flex flex-col rounded-2xl border border-border bg-white px-7 py-7 shadow-sm hover:shadow-xl hover:border-gold/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 border border-gold/20 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-400">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-primary mb-2 group-hover:text-gold transition-colors duration-400">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-700 group-hover:w-full opacity-40" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM / CARD ── */}
      <section id="membership-form" className="bg-white py-20 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-amber-50/80 blur-[100px]" />
        <div className="relative mx-auto max-w-2xl">

          {cardData ? (
            /* ── SUCCESS + CARD DOWNLOAD ── */
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/30 mb-8">
                <CheckCircle2 className="h-9 w-9 text-gold" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold mb-3">Registration Complete</p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-primary mb-4">
                Welcome, <span className="italic text-gold">{cardData.fullName}</span>
              </h2>
              <p className="text-muted-foreground text-sm mb-1">Member ID: <strong className="text-primary">{cardData.memberId}</strong></p>
              <p className="text-muted-foreground text-sm mb-8">Our team will contact you on <strong>{cardData.phone}</strong> within 48 hours.</p>

              {/* Canvas card preview */}
              <div className="mb-6 rounded-2xl overflow-hidden shadow-2xl border border-border">
                <canvas ref={canvasRef} className="w-full" style={{ display: "block" }} />
              </div>

              <button onClick={downloadCard}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-[10px] font-bold uppercase tracking-[0.45em] text-primary-foreground shadow-lg transition-all duration-500 hover:shadow-gold/20 hover:shadow-xl mb-4">
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download Membership Card
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
              </button>

              <br />
              <button onClick={() => { setCardData(null); setForm(blank); setPhotoPreview(null); setPhotoFile(null); }}
                className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors mt-2">
                Register Another Member
              </button>
            </motion.div>
          ) : (
            /* ── REGISTRATION FORM ── */
            <>
              <ScrollReveal>
                <div className="text-center mb-12">
                  <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold mb-4">Join the Family</p>
                  <h2 className="font-display text-3xl md:text-5xl font-medium text-primary leading-tight">
                    Volunteer <span className="italic text-gold">Registration</span>
                  </h2>
                  <div className="mx-auto mt-5 h-px w-14 bg-gold/40" />
                  <p className="text-muted-foreground mt-5 max-w-md mx-auto text-sm leading-relaxed">
                    Fill in your details and become part of our growing community of change-makers across Tamil Nadu.
                  </p>
                </div>
              </ScrollReveal>

              <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative rounded-3xl border border-border bg-[#faf8f5] p-6 md:p-10 shadow-xl space-y-6 overflow-hidden"
                noValidate encType="multipart/form-data">
                <div className="absolute top-6 left-6 h-px w-10 bg-gold opacity-40" />
                <div className="absolute top-6 left-6 w-px h-10 bg-gold opacity-40" />
                <div className="absolute bottom-6 right-6 h-px w-10 bg-gold opacity-40" />
                <div className="absolute bottom-6 right-6 w-px h-10 bg-gold opacity-40" />

                {/* Photo upload */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-3">
                    Your Photo <span className="text-muted-foreground font-normal">(for membership card)</span>
                  </label>
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-gold/40 bg-gold/5 flex items-center justify-center shrink-0 cursor-pointer"
                      onClick={() => fileRef.current?.click()}>
                      {photoPreview
                        ? <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                        : <Upload className="h-6 w-6 text-gold/50" />}
                      {photoPreview && (
                        <button type="button" onClick={e => { e.stopPropagation(); setPhotoPreview(null); setPhotoFile(null); }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div>
                      <button type="button" onClick={() => fileRef.current?.click()}
                        className="text-[10px] font-bold uppercase tracking-widest border border-gold/40 text-gold px-4 py-2 rounded-full hover:bg-gold/10 transition-colors">
                        {photoPreview ? "Change Photo" : "Upload Photo"}
                      </button>
                      <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG or WEBP · Max 4 MB</p>
                    </div>
                    <input ref={fileRef} type="file" name="photo" accept="image/jpeg,image/png,image/webp"
                      className="hidden" onChange={handlePhoto} />
                  </div>
                </div>

                <Field label="Full Name" required error={errors.fullName}>
                  <input type="text" name="fullName" value={form.fullName} onChange={handleChange}
                    placeholder="Enter your full name" className={inputCls(errors.fullName)} />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Mobile Number" required error={errors.phone}>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="10-digit number" maxLength={10} className={inputCls(errors.phone)} />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="Optional" className={inputCls(errors.email)} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Age" required error={errors.age}>
                    <input type="number" name="age" value={form.age} onChange={handleChange}
                      placeholder="Your age" min={15} max={80} className={inputCls(errors.age)} />
                  </Field>
                  <Field label="District" required error={errors.district}>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50 pointer-events-none" />
                      <input type="text" name="district" value={form.district} onChange={handleChange}
                        placeholder="Your district" className={`${inputCls(errors.district)} pl-9`} />
                    </div>
                  </Field>
                </div>

                <Field label="Preferred Role" required error={errors.role}>
                  <select name="role" value={form.role} onChange={handleChange} className={inputCls(errors.role)}>
                    <option value="">Select a role...</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>

                <Field label="Why do you want to join?">
                  <textarea name="motivation" value={form.motivation} onChange={handleChange} rows={3}
                    placeholder="Share your motivation in a few words... (optional)"
                    className="w-full rounded-xl border border-border px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all duration-300 resize-none hover:border-gold/40" />
                </Field>

                <div className="flex items-start gap-3 pt-1">
                  <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={form.agreeTerms}
                    onChange={handleChange} className="mt-0.5 accent-gold w-4 h-4 cursor-pointer shrink-0" />
                  <label htmlFor="agreeTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    I agree to volunteer in good faith with Iraithuligal Iyakkam and uphold the values of compassion, service, and community.
                  </label>
                </div>
                {errors.agreeTerms && <p className="text-red-500 text-xs -mt-3">{errors.agreeTerms}</p>}

                <button type="submit" disabled={loading}
                  className="group relative w-full overflow-hidden flex items-center justify-center gap-3 rounded-2xl bg-primary py-4 text-[10px] font-bold uppercase tracking-[0.45em] text-primary-foreground shadow-lg transition-all duration-500 hover:shadow-gold/20 hover:shadow-xl disabled:opacity-60">
                  <span className="relative z-10 flex items-center gap-3">
                    {loading ? (
                      <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Submitting...</>
                    ) : (
                      <>Join the Movement <ArrowUpRight className="h-3.5 w-3.5" /></>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </motion.form>
            </>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Membership;
