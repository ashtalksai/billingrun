"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Eye, Users } from "lucide-react";
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

const values = [
  {
    icon: CheckCircle2,
    title: "Accuracy",
    description: "Precision is paramount. We leverage AI and machine learning to minimize errors and ensure every claim is submitted perfectly the first time."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We believe in open communication. Our platform provides real-time insights and complete visibility into your billing lifecycle."
  },
  {
    icon: Zap,
    title: "Efficiency",
    description: "Time is money. We automate repetitive tasks to speed up processing, allowing you to serve more patients and grow your fleet."
  }
];

const timeline = [
  {
    year: "2018",
    title: "BillingRun Founded",
    description: "Initial prototype developed to solve NEMT billing challenges."
  },
  {
    year: "2019",
    title: "Pilot Program Launch",
    description: "Partnered with select operators for real-world testing and feedback."
  },
  {
    year: "2021",
    title: "National Expansion",
    description: "Scaled operations to serve NEMT providers across multiple states."
  },
  {
    year: "2024",
    title: "Integrated AI Suite",
    description: "Introduced advanced automation and predictive analytics features."
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-surface">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <span className="text-accent text-xl">🚐</span>
              </div>
              <span className="text-accent text-sm font-semibold uppercase tracking-wider">NEMT</span>
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Built for operators who deserve better billing
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Our mission is to empower NEMT providers with seamless, automated solutions that simplify claims, maximize reimbursements, and free up time to focus on what matters most: patient care.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Origin Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018 by two industry veterans who witnessed the daily struggles of NEMT operators, BillingRun was born out of frustration with convoluted, outdated billing systems.
                </p>
                <p>
                  We saw hardworking providers getting bogged down by manual data entry, denied claims, and delayed payments. We knew there had to be a better way—a smarter way.
                </p>
                <p>
                  We built BillingRun from the ground up to address these specific pain points, leveraging cutting-edge technology and a deep understanding of the NEMT landscape.
                </p>
                <p>
                  Our journey began with a simple premise: operators deserve better billing. Today, we are proud to be the trusted partner for hundreds of NEMT businesses nationwide, driving their growth and ensuring they get paid accurately and on time.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Card className="bg-accent/10 border-accent/30 p-8 max-w-sm">
                <CardContent className="p-0 text-center">
                  <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm">Founder & Co-Founder</p>
                  <p className="text-foreground font-semibold">Photo Placeholder</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Our Core Values
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-background border-border h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 uppercase tracking-wider">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground">
              Company Timeline
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2"></div>
              
              {timeline.map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className={`relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 border-4 border-background z-10"></div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-accent font-bold text-lg">{item.year}</span>
                    <h3 className="text-foreground font-semibold mt-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Streamline Your Billing?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join the community of operators who trust BillingRun to optimize their claims and maximize revenue.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/signup">
                <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground px-8 py-6 text-lg">
                  Try BillingRun Free
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
