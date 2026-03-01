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
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Slide data
const slides = [
  {
    id: 1,
    title: "BillingRun",
    subtitle: "Fixing NEMT cash flow",
    type: "cover"
  },
  {
    id: 2,
    title: "'The Problem'",
    headline: "15-30% of NEMT claims denied",
    subheadline: "B lost annually to formatting errors",
    stats: [
      { icon: Users, value: "38,000 NEMT", label: "providers affected" },
      { icon: Clock, value: "3-6 hours/day", label: "on manual billing" },
      { icon: Calendar, value: "30-90 day", label: "payment delays" }
    ],
    type: "problem"
  },
  {
    id: 3,
    title: "The Solution",
    headline: "Automated payer-specific validation",
    description: "BillingRun validates every claim against payer-specific rules before submission, catching errors that cause denials.",
    type: "solution"
  },
  {
    id: 4,
    title: "Market Opportunity",
    stats: [
      { value: "$6.4B", label: "NEMT market size" },
      { value: "38,000", label: "NEMT providers in US" },
      { value: "+400%", label: "keyword growth" }
    ],
    type: "market"
  },
  {
    id: 5,
    title: "Product Demo",
    description: "Live dashboard showing claims table with real-time validation",
    type: "product"
  },
  {
    id: 6,
    title: "Traction",
    stats: [
      { value: "500+", label: "Claims processed" },
      { value: "40%", label: "Denial reduction" },
      { value: "3", label: "Beta partners" }
    ],
    type: "traction"
  },
  {
    id: 7,
    title: "Business Model",
    tiers: [
      { name: "Free", price: "$0", claims: "50/mo" },
      { name: "Starter", price: "$199", claims: "500/mo" },
      { name: "Pro", price: "$399", claims: "Unlimited" }
    ],
    type: "business"
  },
  {
    id: 8,
    title: "Competition",
    description: "BillingRun vs Tobi, RouteGenie — focused billing tool vs all-in-one transportation suites",
    type: "competition"
  },
  {
    id: 9,
    title: "Why Now",
    points: [
      "Keyword growth +400%",
      "Regulatory push for digital claims",
      "COVID accelerated healthcare digitization"
    ],
    type: "timing"
  },
  {
    id: 10,
    title: "Team",
    description: "Founders with deep NEMT and healthcare billing expertise",
    type: "team"
  },
  {
    id: 11,
    title: "The Ask",
    headline: "Join our beta",
    description: "Be among the first NEMT providers to transform your billing operations",
    type: "ask"
  },
  {
    id: 12,
    title: "Contact",
    email: "hello@billingrun.com",
    website: "billingrun.ashketing.com",
    type: "contact"
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

  const slide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Exit button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push("/")}
        className="absolute top-6 right-6 z-50 text-accent hover:text-accent-hover"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto w-full"
          >
            {/* Cover Slide */}
            {slide.type === "cover" && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-2xl">B</span>
                  </div>
                </div>
                <h1 className="text-6xl lg:text-8xl font-bold mb-4">
                  <span className="text-foreground">Billing</span>
                  <span className="text-accent">Run</span>
                </h1>
                <p className="text-2xl text-muted-foreground">{slide.subtitle}</p>
              </div>
            )}

            {/* Problem Slide */}
            {slide.type === "problem" && (
              <div>
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">{slide.title}</p>
                <h2 className="text-4xl lg:text-6xl font-bold text-destructive mb-4">{slide.headline}</h2>
                <p className="text-xl text-muted-foreground mb-12">{slide.subheadline}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-surface rounded-lg p-6 border border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      <span className="text-destructive font-semibold">CMS 1500 MEDICAL CLAIM FORM</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-destructive flex items-center gap-2">
                        <X className="w-4 h-4" /> ERROR: FORMATTING
                      </p>
                      <p className="text-destructive flex items-center gap-2">
                        <X className="w-4 h-4" /> INVALID CODE
                      </p>
                      <p className="text-destructive flex items-center gap-2">
                        <X className="w-4 h-4" /> MISSING INFO
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">Stressed operator illustration</p>
                    </div>
                  </div>
                </div>

                {slide.stats && (
                  <div className="grid grid-cols-3 gap-8">
                    {slide.stats.map((stat, i) => {
                      const IconComponent = 'icon' in stat ? stat.icon : null;
                      return (
                        <div key={i} className="text-center">
                          {IconComponent && <IconComponent className="w-8 h-8 text-primary mx-auto mb-2" />}
                          <p className="text-2xl font-bold text-primary">{stat.value}</p>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Solution Slide */}
            {slide.type === "solution" && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">{slide.title}</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">{slide.headline}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{slide.description}</p>
              </div>
            )}

            {/* Market Slide */}
            {slide.type === "market" && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-8">{slide.title}</p>
                {slide.stats && (
                  <div className="grid grid-cols-3 gap-12">
                    {slide.stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-5xl lg:text-6xl font-bold text-accent mb-2">{stat.value}</p>
                        <p className="text-lg text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Product Slide */}
            {slide.type === "product" && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-8">{slide.title}</p>
                <div className="bg-surface border border-border rounded-lg p-8 max-w-3xl mx-auto">
                  <p className="text-muted-foreground">{slide.description}</p>
                  <div className="mt-8 h-64 bg-background rounded border border-border flex items-center justify-center">
                    <FileText className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}

            {/* Traction Slide */}
            {slide.type === "traction" && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-8">{slide.title}</p>
                {slide.stats && (
                  <div className="grid grid-cols-3 gap-12">
                    {slide.stats.map((stat, i) => (
                      <div key={i}>
                        <p className="text-5xl lg:text-6xl font-bold text-success mb-2">{stat.value}</p>
                        <p className="text-lg text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Business Model Slide */}
            {slide.type === "business" && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-8">{slide.title}</p>
                {slide.tiers && (
                  <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                    {slide.tiers.map((tier, i) => (
                      <div key={i} className="bg-surface border border-border rounded-lg p-6">
                        <p className="text-foreground font-semibold mb-2">{tier.name}</p>
                        <p className="text-3xl font-bold text-accent mb-2">{tier.price}</p>
                        <p className="text-sm text-muted-foreground">{tier.claims}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Generic text slides */}
            {(slide.type === "competition" || slide.type === "team") && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-8">{slide.title}</p>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{slide.description}</p>
              </div>
            )}

            {/* Why Now Slide */}
            {slide.type === "timing" && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-8">{slide.title}</p>
                {slide.points && (
                  <ul className="space-y-4 max-w-xl mx-auto">
                    {slide.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-4 text-left">
                        <TrendingUp className="w-6 h-6 text-success flex-shrink-0" />
                        <span className="text-xl text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Ask Slide */}
            {slide.type === "ask" && (
              <div className="text-center">
                <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-4">{slide.title}</p>
                <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8">{slide.headline}</h2>
                <p className="text-xl text-muted-foreground">{slide.description}</p>
              </div>
            )}

            {/* Contact Slide */}
            {slide.type === "contact" && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <span className="text-4xl font-bold text-foreground">Billing</span>
                  <span className="text-4xl font-bold text-accent">Run</span>
                </div>
                <p className="text-2xl text-foreground mb-4">{slide.email}</p>
                <p className="text-xl text-accent">{slide.website}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6">
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <div className="text-muted-foreground">
          <span className="text-accent font-mono">{currentSlide + 1}</span>
          <span className="mx-1">/</span>
          <span className="font-mono">{slides.length}</span>
        </div>

        <Button
          variant="ghost"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
