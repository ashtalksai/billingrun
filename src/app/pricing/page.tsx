"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for new NEMT providers.",
    features: [
      "10 claims per month",
      "Basic features",
      "User dashboard",
      "Email support"
    ],
    cta: "Get Started for Free",
    popular: false,
    href: "/signup?plan=free"
  },
  {
    name: "Starter",
    price: "$199",
    period: "/month",
    description: "Growing companies needing efficiency.",
    features: [
      "100 claims per month",
      "Payer validation",
      "CMS 1500 generation",
      "Electronic claims submission",
      "Standard support",
      "Performance analytics"
    ],
    cta: "Choose Starter",
    popular: true,
    href: "/signup?plan=starter"
  },
  {
    name: "Pro",
    price: "$499",
    period: "/month",
    description: "High volume for established fleets.",
    features: [
      "Unlimited claims",
      "Priority support",
      "API access",
      "Dedicated account manager",
      "Custom reporting",
      "Bulk claims import"
    ],
    cta: "Go Pro",
    popular: false,
    href: "/signup?plan=pro"
  }
];

const featureMatrix = [
  { feature: "Claims per month (10, 100, Unlimited)", free: "10", starter: true, pro: true },
  { feature: "Payer validation", free: false, starter: true, pro: true },
  { feature: "CMS 1500 generation", free: false, starter: true, pro: true },
  { feature: "Electronic claims submission", free: false, starter: true, pro: true },
  { feature: "API access", free: false, starter: true, pro: true },
  { feature: "Priority support", free: false, starter: true, pro: true },
  { feature: "Performance analytics", free: false, starter: true, pro: true }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent leading-tight mb-6"
            >
              Plans that scale with your fleet
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Simple, transparent pricing for NEMT claims billing. Start for free and upgrade as you grow.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {pricingTiers.map((tier, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`bg-surface border-border h-full relative ${tier.popular ? 'border-accent border-2' : ''}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-8 pt-10">
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4">{tier.name}</h3>
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-5xl font-bold text-foreground">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={tier.href} className="block">
                      <Button 
                        className={`w-full py-6 ${tier.popular ? 'bg-accent hover:bg-accent-hover text-accent-foreground' : 'bg-surface-hover hover:bg-border text-foreground border border-border'}`}
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

      {/* Enterprise Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <Card className="bg-surface border-border">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise</h3>
                <p className="text-muted-foreground">
                  For large fleets requiring custom solutions, dedicated infrastructure, and advanced integrations.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-bold text-accent">Custom Pricing</span>
                <Link href="/contact">
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 lg:px-6 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Feature Comparison Matrix
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-foreground font-semibold">Features</th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">Free</th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">Starter</th>
                  <th className="text-center py-4 px-4 text-foreground font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground">{row.feature}</td>
                    <td className="text-center py-4 px-4">
                      {typeof row.free === 'string' ? (
                        <span className="text-muted-foreground">{row.free}</span>
                      ) : row.free ? (
                        <CheckCircle2 className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.starter ? (
                        <CheckCircle2 className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {row.pro ? (
                        <CheckCircle2 className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <Minus className="w-5 h-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
