"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  X,
  Users,
  Clock,
  Calendar,
  FileText,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  CheckCircle,
  XCircle,
  BarChart3,
  Shield,
  Rocket,
  Globe,
  Mail,
  Linkedin,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Slide data - 13 slides from pitch deck content
const slides = [
  {
    id: 1,
    type: "cover",
    headline: "BillingRun",
    subheadline: "Automated NEMT billing that speaks every payer's language",
    tagline: "Stop losing 30% of claims to denials.",
    footer: "ChimeStream / Stravix • 2026"
  },
  {
    id: 2,
    type: "problem",
    title: "The Problem",
    headline: "NEMT operators are hemorrhaging cash.",
    stats: [
      { value: "15-30%", label: "claims denied due to formatting errors", icon: XCircle },
      { value: "$2B", label: "lost annually across the industry", icon: DollarSign },
      { value: "3-6 hrs/day", label: "spent on manual CMS 1500 forms", icon: Clock },
      { value: "30-90 days", label: "payment delays from denials", icon: Calendar }
    ],
    supporting: "Every payer (Medicare, Medicaid, UHC, Aetna) has different formatting rules. One missing authorization code or wrong patient ID format = instant denial."
  },
  {
    id: 3,
    type: "solution",
    title: "The Solution",
    headline: "One click. Every field validated. Every payer's format.",
    steps: [
      { step: "1", title: "Upload trip logs", desc: "CSV from any dispatch software" },
      { step: "2", title: "Auto-validate", desc: "Against 20+ payer rules" },
      { step: "3", title: "Submit clean claims", desc: "CMS 1500 PDF or 837P EDI" }
    ],
    supporting: "BillingRun is TurboTax for NEMT claims. It catches formatting errors BEFORE submission, generates payer-specific CMS 1500 forms, and tracks denials with plain-English decoder guides."
  },
  {
    id: 4,
    type: "market",
    title: "Market Size",
    headline: "$6.4B market. 38,000 providers. Huge opportunity.",
    funnel: [
      { label: "TAM", value: "$1.9B", desc: "All NEMT billing software spend in US" },
      { label: "SAM", value: "$180M", desc: "Mid-sized operators (5-50 vehicles)" },
      { label: "SOM", value: "$1.8M ARR", desc: "Year 1 realistic target" }
    ],
    growth: "+400% keyword growth for 'medical billing software'",
    supporting: "Competitors charge $60-$200/vehicle/month for all-in-one suites. We're the first focused billing tool at $0-$399/month flat pricing."
  },
  {
    id: 5,
    type: "product",
    title: "Product Demo",
    headline: "See BillingRun in action.",
    features: [
      { icon: CheckCircle, text: "Automated CMS 1500 generation (payer-specific)" },
      { icon: Shield, text: "Real-time validation (catches errors before submission)" },
      { icon: FileText, text: "Denial tracking (decode rejection codes in plain English)" },
      { icon: Zap, text: "One-click export (PDF + EDI files)" }
    ],
    supporting: "Upload 100 trips in a CSV. BillingRun validates patient IDs, auth codes, and payer formats in 30 seconds. Generate CMS 1500 forms with one click."
  },
  {
    id: 6,
    type: "traction",
    title: "Traction",
    headline: "Market validation from community signals.",
    evidence: [
      { value: "15K+", label: "Reddit members asking about claim denials" },
      { value: "12K", label: "Facebook group members discussing billing pain" },
      { value: "+400%", label: "Keyword growth for billing software" },
      { value: "50", label: "Operators interviewed — 48 said billing is #1 bottleneck" }
    ],
    supporting: "40 operators currently use Excel or bloated all-in-one suites. All 50 said they'd try a focused billing tool."
  },
  {
    id: 7,
    type: "business",
    title: "Business Model",
    headline: "Simple SaaS pricing. Predictable revenue.",
    tiers: [
      { name: "Free", price: "$0", claims: "50/mo", target: "1-3 vehicles" },
      { name: "Starter", price: "$199", claims: "500/mo", target: "5-20 vehicles" },
      { name: "Pro", price: "$399", claims: "Unlimited", target: "30-50 vehicles" },
      { name: "Enterprise", price: "Custom", claims: "Custom", target: "50+ vehicles" }
    ],
    metrics: [
      { label: "CAC", value: "$20-30" },
      { label: "LTV", value: "$4,776" },
      { label: "LTV:CAC", value: "159:1" }
    ],
    supporting: "Free tier lowers barrier. 30-40% convert to Starter within 60 days. Billing is mission-critical = low churn."
  },
  {
    id: 8,
    type: "competition",
    title: "Competition",
    headline: "We're the only focused NEMT billing tool.",
    competitors: [
      { name: "Tobi", price: "$60-200/vehicle", focus: "All-in-one dispatch", edge: "We automate validation" },
      { name: "RouteGenie", price: "$150/vehicle", focus: "Routing + billing", edge: "We prevent denials" },
      { name: "MediRoutes", price: "$100/vehicle", focus: "GPS + dispatch", edge: "We make billing the hero" },
      { name: "BillingRun", price: "$0-399 flat", focus: "Billing only", edge: "Focused, affordable, accurate" }
    ],
    supporting: "Competitors bundle billing into $500-$1,000/month suites. Operators don't need another routing tool. They need clean claims."
  },
  {
    id: 9,
    type: "gtm",
    title: "Go-To-Market",
    headline: "Direct to operators. Fast, focused distribution.",
    channels: [
      { name: "Reddit", desc: "r/NEMT community building" },
      { name: "Facebook", desc: "NEMT Operators (12K members)" },
      { name: "Google Ads", desc: "2.4K searches/month" },
      { name: "LinkedIn", desc: "B2B thought leadership" },
      { name: "Direct", desc: "50 emails/day outreach" }
    ],
    projections: [
      { period: "Month 1", value: "$500 MRR" },
      { period: "Month 3", value: "$10K MRR" },
      { period: "Month 6", value: "$25K MRR" },
      { period: "Year 1", value: "$600K ARR" }
    ]
  },
  {
    id: 10,
    type: "timing",
    title: "Why Now",
    headline: "Perfect timing. Market forces align.",
    catalysts: [
      { icon: Shield, title: "Regulatory Push", desc: "CMS mandates EDI submission by 2027. Paper forms being phased out." },
      { icon: TrendingUp, title: "Keyword Surge", desc: "+400% growth in 'medical billing software' searches. Demand is peaking." },
      { icon: Target, title: "Competitor Gaps", desc: "All-in-one suites are bloated ($500-$1K/mo). No focused tool exists." }
    ],
    supporting: "Operators are Googling 'NEMT billing automation' right now. BillingRun is the focused tool the market is begging for."
  },
  {
    id: 11,
    type: "team",
    title: "Team",
    headline: "Backed by ChimeStream, powered by Stravix.",
    about: [
      { name: "ChimeStream", desc: "Rapid product studio launching validated businesses in 48-hour sprints." },
      { name: "Stravix", desc: "Full-stack team with healthcare SaaS and HIPAA-compliant infrastructure expertise." }
    ],
    supporting: "We've shipped 20+ SaaS products. We know how to validate markets fast, build MVPs, and scale to profitability."
  },
  {
    id: 12,
    type: "ask",
    title: "The Ask",
    headline: "Join us. Fix your cash flow today.",
    ctas: [
      { text: "Try BillingRun free", desc: "50 claims/month, no credit card" },
      { text: "Book a demo", desc: "See how we cut denials by 40%" },
      { text: "Become a beta customer", desc: "3 months free + dedicated support" }
    ],
    contact: {
      website: "billingrun.ashketing.com",
      email: "hello@billingrun.com"
    }
  },
  {
    id: 13,
    type: "thankyou",
    headline: "Thank you.",
    subheadline: "Let's fix NEMT billing together.",
    contact: {
      website: "billingrun.ashketing.com",
      email: "hello@billingrun.com"
    }
  }
];

export default function PitchPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev < slides.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape") {
        router.push("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, router]);

  // Touch/swipe support for mobile
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  const slide = slides[currentSlide];

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    })
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col relative overflow-hidden">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Exit button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/")}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 text-[#D4AF37] hover:text-[#E5C048] hover:bg-white/5"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-6xl mx-auto w-full"
          >
            {/* SLIDE 1: Cover */}
            {slide.type === "cover" && (
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-3 mb-8"
                >
                  <div className="w-20 h-20 bg-[#0F5132] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0F5132]/30">
                    <span className="text-white font-bold text-4xl">B</span>
                  </div>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                >
                  <span className="text-[#FAFAFA]">Billing</span>
                  <span className="text-[#0F5132]">Run</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-[#A1A1A1] mb-4"
                >
                  {slide.subheadline}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-[#D4AF37] font-semibold"
                >
                  {slide.tagline}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm text-[#666] mt-12"
                >
                  {slide.footer}
                </motion.p>
              </div>
            )}

            {/* SLIDE 2: Problem */}
            {slide.type === "problem" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 mb-8"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {slide.stats?.map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div 
                        key={i}
                        custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                        className="bg-[#1A1A1A] border border-[#333] rounded-xl p-4 md:p-6 text-center"
                      >
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-red-500 mx-auto mb-3" />
                        <p className="text-2xl md:text-3xl font-bold text-red-500 font-mono">{stat.value}</p>
                        <p className="text-xs md:text-sm text-[#A1A1A1] mt-2">{stat.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.p 
                  custom={6} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg max-w-3xl"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 3: Solution */}
            {slide.type === "solution" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-10"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {slide.steps?.map((step, i) => (
                    <motion.div 
                      key={i}
                      custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                      className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6 relative"
                    >
                      <div className="w-10 h-10 bg-[#0F5132] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-semibold text-[#FAFAFA] mb-2">{step.title}</h3>
                      <p className="text-[#A1A1A1]">{step.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  custom={5} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg max-w-3xl"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 4: Market */}
            {slide.type === "market" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-10"
                >
                  {slide.headline}
                </motion.h2>
                
                {/* Funnel visualization */}
                <div className="flex flex-col items-center gap-4 mb-8">
                  {slide.funnel?.map((level, i) => (
                    <motion.div 
                      key={i}
                      custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                      className="bg-[#1A1A1A] border border-[#333] rounded-xl p-4 md:p-6 text-center"
                      style={{ width: `${100 - i * 20}%`, maxWidth: '600px' }}
                    >
                      <span className="text-[#D4AF37] text-sm font-semibold">{level.label}</span>
                      <p className="text-3xl md:text-4xl font-bold text-[#0F5132] font-mono my-2">{level.value}</p>
                      <p className="text-sm text-[#A1A1A1]">{level.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  custom={5} variants={itemVariants} initial="hidden" animate="visible"
                  className="flex items-center gap-2 justify-center text-[#0F5132] font-semibold"
                >
                  <TrendingUp className="w-5 h-5" />
                  {slide.growth}
                </motion.div>
              </div>
            )}

            {/* SLIDE 5: Product */}
            {slide.type === "product" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-10"
                >
                  {slide.headline}
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Mock dashboard */}
                  <motion.div 
                    custom={2} variants={itemVariants} initial="hidden" animate="visible"
                    className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#A1A1A1]">Total</p>
                        <p className="text-xl font-bold text-[#FAFAFA]">248</p>
                      </div>
                      <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#A1A1A1]">Approved</p>
                        <p className="text-xl font-bold text-[#0F5132]">89%</p>
                      </div>
                      <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#A1A1A1]">Denied</p>
                        <p className="text-xl font-bold text-red-500">8%</p>
                      </div>
                      <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
                        <p className="text-xs text-[#A1A1A1]">Pending</p>
                        <p className="text-xl font-bold text-[#D4AF37]">3%</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="bg-[#0A0A0A] rounded-lg p-3 flex items-center justify-between">
                          <span className="text-sm text-[#A1A1A1]">CLM-00{i + 1}</span>
                          <span className={`text-xs px-2 py-1 rounded ${i === 0 ? 'bg-[#0F5132]/20 text-[#0F5132]' : i === 1 ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-[#0F5132]/20 text-[#0F5132]'}`}>
                            {i === 0 ? 'Approved' : i === 1 ? 'Pending' : 'Approved'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Features */}
                  <div className="space-y-4">
                    {slide.features?.map((feature, i) => {
                      const IconComponent = feature.icon;
                      return (
                        <motion.div 
                          key={i}
                          custom={i + 3} variants={itemVariants} initial="hidden" animate="visible"
                          className="flex items-start gap-4"
                        >
                          <div className="w-10 h-10 bg-[#0F5132]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-[#0F5132]" />
                          </div>
                          <p className="text-[#FAFAFA] text-lg">{feature.text}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <motion.p 
                  custom={7} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg mt-8"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 6: Traction */}
            {slide.type === "traction" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-10"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {slide.evidence?.map((item, i) => (
                    <motion.div 
                      key={i}
                      custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                      className="bg-[#1A1A1A] border border-[#333] rounded-xl p-4 md:p-6 text-center"
                    >
                      <p className="text-3xl md:text-4xl font-bold text-[#0F5132] font-mono">{item.value}</p>
                      <p className="text-xs md:text-sm text-[#A1A1A1] mt-2">{item.label}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  custom={6} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 7: Business Model */}
            {slide.type === "business" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-8"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                  {slide.tiers?.map((tier, i) => (
                    <motion.div 
                      key={i}
                      custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                      className={`bg-[#1A1A1A] border rounded-xl p-4 md:p-6 text-center ${i === 1 ? 'border-[#0F5132]' : 'border-[#333]'}`}
                    >
                      {i === 1 && <span className="text-xs text-[#0F5132] font-semibold">POPULAR</span>}
                      <p className="text-lg font-semibold text-[#FAFAFA]">{tier.name}</p>
                      <p className="text-2xl md:text-3xl font-bold text-[#D4AF37] font-mono my-2">{tier.price}</p>
                      <p className="text-sm text-[#A1A1A1]">{tier.claims} claims</p>
                      <p className="text-xs text-[#666] mt-1">{tier.target}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  {slide.metrics?.map((metric, i) => (
                    <motion.div 
                      key={i}
                      custom={i + 6} variants={itemVariants} initial="hidden" animate="visible"
                      className="text-center"
                    >
                      <p className="text-sm text-[#A1A1A1]">{metric.label}</p>
                      <p className="text-xl font-bold text-[#0F5132] font-mono">{metric.value}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  custom={9} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg text-center mt-6"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 8: Competition */}
            {slide.type === "competition" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-8"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="overflow-x-auto">
                  <motion.table 
                    custom={2} variants={itemVariants} initial="hidden" animate="visible"
                    className="w-full min-w-[600px]"
                  >
                    <thead>
                      <tr className="border-b border-[#333]">
                        <th className="text-left py-3 px-4 text-[#A1A1A1] font-medium">Competitor</th>
                        <th className="text-left py-3 px-4 text-[#A1A1A1] font-medium">Price</th>
                        <th className="text-left py-3 px-4 text-[#A1A1A1] font-medium">Focus</th>
                        <th className="text-left py-3 px-4 text-[#A1A1A1] font-medium">Our Edge</th>
                      </tr>
                    </thead>
                    <tbody>
                      {slide.competitors?.map((comp, i) => (
                        <tr key={i} className={`border-b border-[#222] ${comp.name === 'BillingRun' ? 'bg-[#0F5132]/10' : ''}`}>
                          <td className={`py-3 px-4 font-semibold ${comp.name === 'BillingRun' ? 'text-[#0F5132]' : 'text-[#FAFAFA]'}`}>
                            {comp.name}
                          </td>
                          <td className="py-3 px-4 text-[#A1A1A1] font-mono">{comp.price}</td>
                          <td className="py-3 px-4 text-[#A1A1A1]">{comp.focus}</td>
                          <td className="py-3 px-4 text-[#D4AF37]">{comp.edge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </motion.table>
                </div>

                <motion.p 
                  custom={3} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg mt-8"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 9: GTM */}
            {slide.type === "gtm" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-8"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-[#A1A1A1] uppercase tracking-wider mb-4">Launch Channels</p>
                    <div className="space-y-3">
                      {slide.channels?.map((channel, i) => (
                        <motion.div 
                          key={i}
                          custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                          className="flex items-center gap-4 bg-[#1A1A1A] border border-[#333] rounded-lg p-4"
                        >
                          <div className="w-8 h-8 bg-[#0F5132]/20 rounded-lg flex items-center justify-center">
                            <Globe className="w-4 h-4 text-[#0F5132]" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#FAFAFA]">{channel.name}</p>
                            <p className="text-sm text-[#A1A1A1]">{channel.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-[#A1A1A1] uppercase tracking-wider mb-4">Revenue Projection</p>
                    <div className="space-y-3">
                      {slide.projections?.map((proj, i) => (
                        <motion.div 
                          key={i}
                          custom={i + 7} variants={itemVariants} initial="hidden" animate="visible"
                          className="flex items-center justify-between bg-[#1A1A1A] border border-[#333] rounded-lg p-4"
                        >
                          <span className="text-[#A1A1A1]">{proj.period}</span>
                          <span className="font-bold text-[#0F5132] font-mono text-lg">{proj.value}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 10: Why Now */}
            {slide.type === "timing" && (
              <div>
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-10"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  {slide.catalysts?.map((catalyst, i) => {
                    const IconComponent = catalyst.icon;
                    return (
                      <motion.div 
                        key={i}
                        custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                        className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6"
                      >
                        <div className="w-12 h-12 bg-[#0F5132]/20 rounded-xl flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-[#0F5132]" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#FAFAFA] mb-2">{catalyst.title}</h3>
                        <p className="text-[#A1A1A1]">{catalyst.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.p 
                  custom={5} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 11: Team */}
            {slide.type === "team" && (
              <div className="text-center">
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-10"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
                  {slide.about?.map((team, i) => (
                    <motion.div 
                      key={i}
                      custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                      className="bg-[#1A1A1A] border border-[#333] rounded-xl p-6"
                    >
                      <div className="w-16 h-16 bg-[#0F5132] rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">{team.name[0]}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#FAFAFA] mb-2">{team.name}</h3>
                      <p className="text-[#A1A1A1]">{team.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  custom={4} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#A1A1A1] text-base md:text-lg"
                >
                  {slide.supporting}
                </motion.p>
              </div>
            )}

            {/* SLIDE 12: Ask */}
            {slide.type === "ask" && (
              <div className="text-center">
                <motion.p 
                  custom={0} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-[#D4AF37] text-sm font-semibold uppercase tracking-wider mb-4"
                >
                  {slide.title}
                </motion.p>
                <motion.h2 
                  custom={1} variants={itemVariants} initial="hidden" animate="visible"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-10"
                >
                  {slide.headline}
                </motion.h2>
                
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
                  {slide.ctas?.map((cta, i) => (
                    <motion.div 
                      key={i}
                      custom={i + 2} variants={itemVariants} initial="hidden" animate="visible"
                      className="bg-[#1A1A1A] border border-[#333] hover:border-[#0F5132] rounded-xl p-6 transition-colors cursor-pointer group"
                    >
                      <Rocket className="w-8 h-8 text-[#0F5132] mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg font-semibold text-[#FAFAFA] mb-2">{cta.text}</h3>
                      <p className="text-sm text-[#A1A1A1]">{cta.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  custom={5} variants={itemVariants} initial="hidden" animate="visible"
                  className="flex flex-col md:flex-row items-center justify-center gap-4 text-[#A1A1A1]"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {slide.contact?.website}
                  </span>
                  <span className="hidden md:block">•</span>
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {slide.contact?.email}
                  </span>
                </motion.div>
              </div>
            )}

            {/* SLIDE 13: Thank You */}
            {slide.type === "thankyou" && (
              <div className="text-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-center gap-3 mb-8"
                >
                  <div className="w-20 h-20 bg-[#0F5132] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0F5132]/30">
                    <span className="text-white font-bold text-4xl">B</span>
                  </div>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAFAFA] mb-4"
                >
                  {slide.headline}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl text-[#A1A1A1] mb-10"
                >
                  {slide.subheadline}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="flex items-center gap-6">
                    <a href={`https://${slide.contact?.website}`} className="flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C048] transition-colors">
                      <Globe className="w-5 h-5" />
                      {slide.contact?.website}
                    </a>
                    <a href={`mailto:${slide.contact?.email}`} className="flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C048] transition-colors">
                      <Mail className="w-5 h-5" />
                      {slide.contact?.email}
                    </a>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-4 md:p-6 relative z-10">
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-white/5 disabled:opacity-30"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="text-[#A1A1A1]">
          <span className="text-[#D4AF37] font-mono">{currentSlide + 1}</span>
          <span className="mx-2">/</span>
          <span className="font-mono">{slides.length}</span>
        </div>

        <Button
          variant="ghost"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="text-[#A1A1A1] hover:text-[#FAFAFA] hover:bg-white/5 disabled:opacity-30"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
