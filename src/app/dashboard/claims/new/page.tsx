"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle,
  Circle,
  ChevronRight,
  Calendar,
  MapPin,
  User,
  FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const steps = [
  { id: 1, name: "Trip Details", icon: MapPin },
  { id: 2, name: "Patient Info", icon: User },
  { id: 3, name: "Payer", icon: FileText },
  { id: 4, name: "Review", icon: CheckCircle2 }
];

export default function NewClaimPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);
  const [formData, setFormData] = useState({
    // Trip Details
    tripDate: "10/25/2023",
    pickupAddress: "123 Main St, Anytown, CA 90210",
    dropoffAddress: "456 Hospital Way, Anytown, CA 90210",
    mileage: "15.5",
    // Patient Info
    patientName: "John Doe",
    patientId: "ABC12345",
    dateOfBirth: "01/15/1980",
    // Payer
    payer: "",
    authCode: ""
  });

  const [validation, setValidation] = useState({
    patientName: true,
    patientId: false, // Will show error
    dateOfBirth: true,
    pickupAddress: true,
    dropoffAddress: true,
    mileage: true
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push("/dashboard/claims/NEMT-10921");
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Progress Steps */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step.id < currentStep 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : step.id === currentStep 
                        ? "bg-accent border-accent text-accent-foreground"
                        : "bg-surface border-border text-muted-foreground"
                  }`}>
                    {step.id < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>
                  <span className={`text-sm mt-2 ${
                    step.id === currentStep ? "text-accent font-semibold" : "text-muted-foreground"
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.id < currentStep ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trip Details Section */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Trip Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Date</Label>
                    <div className="relative">
                      <Input
                        value={formData.tripDate}
                        onChange={(e) => updateFormData("tripDate", e.target.value)}
                        className="bg-background border-border text-foreground pr-10"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Pickup Address</Label>
                    <Input
                      value={formData.pickupAddress}
                      onChange={(e) => updateFormData("pickupAddress", e.target.value)}
                      className={`bg-background border-border text-foreground ${validation.pickupAddress ? "border-success" : ""}`}
                    />
                    {validation.pickupAddress && (
                      <CheckCircle2 className="w-4 h-4 text-success absolute right-3 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Dropoff Address</Label>
                    <Input
                      value={formData.dropoffAddress}
                      onChange={(e) => updateFormData("dropoffAddress", e.target.value)}
                      className={`bg-background border-border text-foreground ${validation.dropoffAddress ? "border-success" : ""}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Mileage</Label>
                    <div className="relative">
                      <Input
                        value={formData.mileage}
                        onChange={(e) => updateFormData("mileage", e.target.value)}
                        className={`bg-background border-border text-foreground ${validation.mileage ? "border-success" : ""}`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">mi</span>
                    </div>
                    <p className="text-xs text-success">Valid mileage format.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Patient Info Section */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-surface border-border border-l-4 border-l-accent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Circle className="w-5 h-5 text-accent fill-accent" />
                    Patient Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-foreground">Patient Name</Label>
                    <Input
                      value={formData.patientName}
                      onChange={(e) => updateFormData("patientName", e.target.value)}
                      className={`bg-background border-border text-foreground ${validation.patientName ? "border-success" : ""}`}
                    />
                    {validation.patientName && (
                      <p className="text-xs text-success">Name looks good.</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Patient ID <span className="text-muted-foreground">(DM Mono)</span></Label>
                    <Input
                      value={formData.patientId}
                      onChange={(e) => updateFormData("patientId", e.target.value)}
                      className={`bg-background font-mono ${!validation.patientId ? "border-destructive" : "border-border"} text-foreground`}
                    />
                    {!validation.patientId && (
                      <p className="text-xs text-destructive flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Medicare auth codes are 10 digits. Current length: 8.
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">DM Mono</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-foreground">Date of Birth</Label>
                    <Input
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                      className={`bg-background border-border text-foreground ${validation.dateOfBirth ? "border-success" : ""}`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Form Progress Sidebar */}
          <div className="space-y-6">
            <motion.div variants={fadeInUp}>
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Form Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      {step.id < currentStep ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : step.id === currentStep ? (
                        <Circle className="w-5 h-5 text-accent fill-accent/30" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className={step.id === currentStep ? "text-accent font-medium" : "text-muted-foreground"}>
                        {step.name}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Mileage:</span>
                    <span className="text-foreground font-mono">15.5 mi</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="text-accent font-mono font-semibold">$45.00</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Progress saved automatically.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Actions */}
        <motion.div variants={fadeInUp} className="flex justify-between mt-8">
          <Button variant="ghost" className="text-muted-foreground">
            Cancel
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              Save Draft
            </Button>
            <Button 
              onClick={handleContinue}
              className="bg-primary hover:bg-primary-hover"
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
