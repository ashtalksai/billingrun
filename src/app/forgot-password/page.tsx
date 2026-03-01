"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="w-full max-w-md"
      >
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <span className="text-2xl font-bold text-foreground">Billing</span>
            <span className="text-2xl font-bold text-accent">Run</span>
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="bg-surface border-border">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-accent" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Password Reset
              </h1>
              
              <p className="text-muted-foreground mb-6">
                Password reset functionality is coming soon. In the meantime, please contact our support team for assistance.
              </p>
              
              <div className="bg-background border border-border rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Need help? Email us at
                </p>
                <a 
                  href="mailto:support@billingrun.com" 
                  className="text-accent hover:underline font-medium"
                >
                  support@billingrun.com
                </a>
              </div>

              <Link href="/login">
                <Button variant="outline" className="border-border text-foreground hover:bg-surface-hover">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
