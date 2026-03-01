"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function TermsPage() {
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
                <FileText className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Terms of Service
              </h1>
              <p className="text-muted-foreground">
                Last updated: January 2024
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-surface border border-border rounded-xl p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-6">
                  Our complete Terms of Service document is currently being finalized by our legal team. 
                  This page will be updated with the full terms and conditions for using BillingRun services.
                </p>
                
                <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">Summary</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• BillingRun provides NEMT claims automation services</li>
                  <li>• Users must provide accurate information for claim processing</li>
                  <li>• We protect your data according to HIPAA guidelines</li>
                  <li>• Service availability is subject to our uptime commitments</li>
                  <li>• Billing is processed according to your selected plan</li>
                </ul>

                <div className="bg-background border border-border rounded-lg p-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    For questions about our terms of service, please contact us at{" "}
                    <a href="mailto:legal@billingrun.com" className="text-accent hover:underline">
                      legal@billingrun.com
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
