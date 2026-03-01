"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText, 
  Shield, 
  RefreshCw, 
  Download, 
  Upload, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  DollarSign,
  AlertTriangle,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Problem cards data
const problems = [
  {
    icon: AlertTriangle,
    title: "Manual CMS 1500 forms",
    description: "Time-consuming, error-prone, and prone to rejection. Hours wasted on repetitive paperwork."
  },
  {
    icon: FileText,
    title: "Payer format mismatches",
    description: "Every payer requires unique data fields. A simple mismatch causes instant denial."
  },
  {
    icon: Clock,
    title: "30-90 day payment delays",
    description: "Wait months for reimbursement while your cash flow dries up. Unpredictable revenue streams."
  }
];

// Features data
const features = [
  {
    icon: FileText,
    title: "Automated CMS 1500 Generation",
    description: "Instantly generate compliant CMS 1500 forms with pre-filled data, minimizing manual input."
  },
  {
    icon: Shield,
    title: "Payer-specific Validation",
    description: "Real-time checks against thousands of payer rules to ensure claim accuracy before submission."
  },
  {
    icon: RefreshCw,
    title: "Denial Tracking & Analysis",
    description: "Track every denial, understand the root cause, and leverage insights to prevent future rejections."
  },
  {
    icon: Download,
    title: "One-click Export & Submission",
    description: "Submit claims directly to payers or export in required formats with a single click."
  }
];

// How it works steps
const steps = [
  {
    number: "1",
    title: "Upload trips",
    description: "Simply upload your trip logs in any format (CSV, Excel) directly into BillingRun."
  },
  {
    number: "2",
    title: "Validate claims",
    description: "Our system automatically cleans and validates your data, flagging errors for instant correction."
  },
  {
    number: "3",
    title: "Submit & Get Paid",
    description: "Submit clean claims with one click and track your payments in real-time. Improve your cash flow."
  }
];

// Pricing tiers
const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for new NEMT providers.",
    features: [
      "Up to 50 claims/mo",
      "Basic CMS 1500 generation",
      "Payer validation for 2 payers",
      "Email support",
      "1 User"
    ],
    cta: "Start For Free",
    popular: false
  },
  {
    name: "Starter",
    price: "$199",
    period: "/month",
    description: "Growing companies needing efficiency.",
    features: [
      "Up to 500 claims/mo",
      "Advanced CMS 1500 & EDI",
      "Payer validation for 20 payers",
      "Denial tracking dashboard",
      "Priority email & chat support",
      "3 Users"
    ],
    cta: "Get Starter",
    popular: true
  },
  {
    name: "Pro",
    price: "$399",
    period: "/month",
    description: "High volume for established fleets.",
    features: [
      "Unlimited claims",
      "All advanced features",
      "Payer validation for all payers",
      "API Access",
      "Dedicated account manager",
      "Unlimited Users"
    ],
    cta: "Go Pro",
    popular: false
  }
];

// Testimonials
const testimonials = [
  {
    quote: "BillingRun cut our claim denials by 40% in the first month. The automated validation is a game-changer for our cash flow.",
    name: "Sarah J.",
    role: "Billing Coordinator",
    company: "Speedy Transport"
  },
  {
    quote: "We used to spend days on paperwork. Now, it takes minutes. The software is intuitive and saved us from hiring another staff member.",
    name: "Michael T.",
    role: "Owner",
    company: "Access Mobility"
  },
  {
    quote: "The denial tracking helped us identify and fix recurring issues we didn't even know we had. Worth every penny.",
    name: "Jessica R.",
    role: "Finance Manager",
    company: "CityWide NEMT"
  }
];

// FAQ items
const faqItems = [
  {
    question: "Is BillingRun HIPAA compliant?",
    answer: "Yes, BillingRun is fully HIPAA compliant. We use industry-standard encryption (AES-256) for all data at rest and in transit. Our infrastructure is hosted on secure, SOC 2 certified servers."
  },
  {
    question: "Which NEMT software does it integrate with?",
    answer: "BillingRun integrates with major dispatch platforms including Tobi, RouteGenie, TripMaster, and others. We also accept CSV exports from any system."
  },
  {
    question: "Can I try it for free?",
    answer: "Absolutely! Our Free plan includes 50 claims per month forever, no credit card required. You can upgrade to Starter or Pro at any time."
  },
  {
    question: "How secure is my data?",
    answer: "Your data is encrypted with AES-256 encryption at rest and TLS 1.3 in transit. We maintain strict access controls and regular security audits."
  },
  {
    question: "What if I exceed my claim limit?",
    answer: "If you exceed your monthly claim limit, you'll be notified and can upgrade your plan instantly. We never process claims without your explicit approval."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center lg:text-left"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
              >
                Stop losing 30% of claims to denials.
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground mb-8"
              >
                Automated NEMT billing software that reclaims your cash flow. Stop manual errors and start getting paid faster.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 text-lg">
                    Start Free Trial
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Dashboard Preview */}
              <div className="relative bg-surface rounded-lg border border-border p-4 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-foreground">Billing</span>
                  <span className="text-lg font-bold text-accent">Run</span>
                  <span className="ml-auto text-xs text-muted-foreground">Dashboard</span>
                </div>
                <div className="bg-background rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground">Claims</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-success/20 text-success text-xs rounded">Approved</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: "NEMT-10920", patient: "Sarah Johnson", status: "approved", amount: "$85.50" },
                      { id: "NEMT-10919", patient: "Robert Davis", status: "denied", amount: "$120.00" },
                      { id: "NEMT-10918", patient: "Emily Wilson", status: "pending", amount: "$65.75" },
                    ].map((claim) => (
                      <div key={claim.id} className="flex items-center justify-between py-2 border-b border-border text-sm">
                        <span className="text-muted-foreground">{claim.id}</span>
                        <span className="text-foreground">{claim.patient}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          claim.status === "approved" ? "bg-success/20 text-success" :
                          claim.status === "denied" ? "bg-destructive/20 text-destructive" :
                          "bg-warning/20 text-warning"
                        }`}>
                          {claim.status}
                        </span>
                        <span className="text-foreground font-mono">{claim.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Problem
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              The NEMT billing challenges holding you back.
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {problems.map((problem, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-background border-border border-l-4 border-l-accent h-full hover:bg-surface-hover transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <problem.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground text-sm">{problem.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Solution Showcase
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              From denied to paid, automatically.
            </motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <p className="text-sm text-muted-foreground mb-4">Before (Denied Claim)</p>
              <Card className="bg-surface border-destructive/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <span className="text-destructive font-semibold">Invalid Transport Code</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient ID</span>
                      <span className="text-destructive">Missing</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Auth Code</span>
                      <span className="text-destructive">Format Error</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="px-2 py-0.5 bg-destructive/20 text-destructive rounded text-xs">Rejected by Optum</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden md:flex justify-center"
            >
              <div className="flex flex-col items-center">
                <ArrowRight className="w-12 h-12 text-accent" />
                <p className="text-sm text-accent mt-2">BillingRun Auto-Fix</p>
              </div>
            </motion.div>
            
            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-start-2"
            >
              <p className="text-sm text-muted-foreground mb-4">After (Auto-Fixed by BillingRun)</p>
              <Card className="bg-surface border-success/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-success font-semibold">Auto-corrected Transport Code</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient ID</span>
                      <span className="text-success">✓ Valid</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Auth Code</span>
                      <span className="text-success">✓ Validated</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <span className="px-2 py-0.5 bg-success/20 text-success rounded text-xs">Approved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-surface">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Features Grid
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Powerful features built for financial clarity.
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-background border-border h-full hover:border-primary transition-colors group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              How-It-Works
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">{step.number}.</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Simple, transparent pricing for every stage.
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {pricingTiers.map((tier, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`bg-background border-border h-full relative ${tier.popular ? 'border-accent' : ''}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6 pt-8">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{tier.name}</h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-accent">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/signup" className="block">
                      <Button 
                        className={`w-full ${tier.popular ? 'bg-accent hover:bg-accent-hover text-accent-foreground' : 'bg-primary hover:bg-primary-hover'}`}
                      >
                        {tier.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              Social Proof
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Trusted by NEMT leaders across the country.
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-surface border-border h-full">
                  <CardContent className="p-6">
                    <div className="text-accent text-4xl font-serif mb-4">&ldquo;</div>
                    <p className="text-foreground mb-4 italic">{testimonial.quote}</p>
                    <div className="text-muted-foreground text-sm mt-4">&rdquo;</div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-accent">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeInUp} className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions.
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-background border border-border rounded-lg px-6">
                  <AccordionTrigger className="text-foreground hover:text-accent py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to stop losing money on claims?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join hundreds of NEMT providers reclaiming their revenue with BillingRun.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/signup">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground px-8 py-6 text-lg">
                  Start Your Free Trial Now
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
