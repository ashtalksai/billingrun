"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Lock, Server, FileCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const complianceFeatures = [
  {
    icon: Lock,
    title: "Data Encryption",
    description: "All data encrypted at rest and in transit using AES-256"
  },
  {
    icon: Server,
    title: "Secure Infrastructure",
    description: "SOC 2 compliant cloud infrastructure with regular audits"
  },
  {
    icon: FileCheck,
    title: "Access Controls",
    description: "Role-based access and detailed audit logging"
  },
  {
    icon: Shield,
    title: "BAA Available",
    description: "Business Associate Agreements for all healthcare clients"
  }
];

export default function HipaaPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                HIPAA Compliance
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                BillingRun is committed to protecting patient health information in accordance with HIPAA regulations.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 mb-12">
              {complianceFeatures.map((feature, index) => (
                <Card key={index} className="bg-surface border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-surface border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Our Commitment to Security
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  As a healthcare technology provider, we understand the critical importance of protecting 
                  Protected Health Information (PHI). Our comprehensive HIPAA compliance program includes:
                </p>
                
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li>• Regular security assessments and penetration testing</li>
                  <li>• Employee training on HIPAA requirements and best practices</li>
                  <li>• Incident response procedures and breach notification protocols</li>
                  <li>• Physical and technical safeguards for all systems handling PHI</li>
                  <li>• Minimum necessary access policies for all team members</li>
                </ul>

                <div className="bg-background border border-border rounded-lg p-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    For our complete HIPAA compliance documentation or to request a Business Associate Agreement, 
                    please contact our security team at{" "}
                    <a href="mailto:security@billingrun.com" className="text-accent hover:underline">
                      security@billingrun.com
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center mt-8">
              <Link href="/">
                <Button variant="outline" className="border-border text-foreground hover:bg-surface-hover">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
