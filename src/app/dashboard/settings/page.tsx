"use client";

import { motion } from "framer-motion";
import { Settings, Bell, User, Shield, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const settingsSections = [
  { icon: User, title: "Profile Settings", description: "Manage your account details" },
  { icon: Bell, title: "Notifications", description: "Configure alerts and emails" },
  { icon: Shield, title: "Security", description: "Password and two-factor auth" },
  { icon: CreditCard, title: "Billing", description: "Subscription and payments" },
];

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Settings className="w-8 h-8 text-accent" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account preferences and configurations
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="bg-surface border-border">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Settings className="w-10 h-10 text-accent" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Settings Coming Soon
              </h2>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We&apos;re building a comprehensive settings experience. Soon you&apos;ll be able to customize every aspect of your BillingRun account.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                {settingsSections.map((section, index) => (
                  <div 
                    key={index}
                    className="bg-background border border-border rounded-lg p-4 text-left opacity-50"
                  >
                    <section.icon className="w-5 h-5 text-accent mb-2" />
                    <p className="text-foreground font-medium text-sm">{section.title}</p>
                    <p className="text-muted-foreground text-xs">{section.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
