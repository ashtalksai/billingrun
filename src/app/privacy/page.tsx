"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function PrivacyPage() {
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
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last updated: January 2024
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-surface border border-border rounded-xl p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-6">
                  At BillingRun, we take your privacy seriously. This policy outlines how we collect, 
                  use, and protect your personal information when you use our NEMT billing services.
                </p>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Information We Collect</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Account information (name, email, company details)</li>
                  <li>• Claims data necessary for processing</li>
                  <li>• Usage data to improve our services</li>
                  <li>• Payment information for billing purposes</li>
                </ul>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">How We Use Your Data</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Process and submit claims on your behalf</li>
                  <li>• Provide customer support</li>
                  <li>• Improve our platform and services</li>
                  <li>• Comply with legal requirements</li>
                </ul>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Data Protection</h2>
                <p className="text-muted-foreground mb-4">
                  We implement industry-standard security measures including encryption, access controls, 
                  and regular security audits. As a healthcare technology provider, we maintain full 
                  HIPAA compliance for all protected health information.
                </p>

                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Your Rights</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Access your personal data</li>
                  <li>• Request corrections to your data</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt out of marketing communications</li>
                </ul>

                <div className="bg-background border border-border rounded-lg p-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    For privacy-related inquiries or to exercise your rights, please contact us at{" "}
                    <a href="mailto:privacy@billingrun.com" className="text-accent hover:underline">
                      privacy@billingrun.com
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
