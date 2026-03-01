"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  FileText,
  Download,
  Edit,
  Trash2,
  RefreshCw,
  Calendar,
  CreditCard
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Mock claim data
const claimData = {
  id: "CL-10423",
  status: "approved",
  date: "Oct 27, 2023",
  patient: {
    name: "John Doe",
    dob: "03/15/1958",
    id: "87203-4521"
  },
  trip: {
    pickupAddress: "123 Maple Street, Suite 100, Springfield, IL 62704",
    dropoffAddress: "456 Oak Avenue, Medical Center, Springfield, IL 62702",
    dateTime: "Oct 25, 2023 | 10:30 AM",
    mileage: "23",
    payer: "Medicare"
  },
  validation: [
    { rule: "Authorization code format valid", passed: true },
    { rule: "Patient ID verified", passed: true },
    { rule: "Payer specifications met", passed: true },
    { rule: "Mileage within range", passed: true }
  ]
};

export default function ClaimDetailPage() {
  const params = useParams();
  const claimId = params.id;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-foreground">
              Claim #{claimData.id}
            </h1>
            <Badge className="bg-success/20 text-success border border-success px-4 py-1 uppercase font-semibold">
              {claimData.status}
            </Badge>
          </div>
          <span className="text-muted-foreground">{claimData.date}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trip Data Card */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-surface border-border border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="text-foreground">Trip Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Patient Name</p>
                    <p className="text-foreground font-medium">{claimData.patient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">DOB</p>
                    <p className="text-foreground">{claimData.patient.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Patient ID</p>
                    <p className="text-foreground font-mono">{claimData.patient.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pickup Address</p>
                    <p className="text-foreground text-sm">{claimData.trip.pickupAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Dropoff Address</p>
                    <p className="text-foreground text-sm">{claimData.trip.dropoffAddress}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Trip Date/Time</p>
                    <p className="text-foreground">{claimData.trip.dateTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Mileage</p>
                    <p className="text-accent font-mono font-semibold">{claimData.trip.mileage} mi</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payer</p>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">{claimData.trip.payer}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Validation Status Card */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Validation Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {claimData.validation.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">{item.rule}</span>
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <Progress value={100} className="h-1.5 bg-border">
                      <div className="h-full bg-success rounded-full" style={{ width: "100%" }} />
                    </Progress>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Download Options */}
        <motion.div variants={fadeInUp} className="mt-6">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Download Options</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button className="bg-primary hover:bg-primary-hover">
                <Download className="w-4 h-4 mr-2" />
                Download CMS 1500 PDF
              </Button>
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Download className="w-4 h-4 mr-2" />
                Download 837P EDI
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div variants={fadeInUp} className="mt-6">
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button variant="outline" className="border-border text-foreground hover:bg-surface-hover">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
              <Button variant="outline" className="border-border text-foreground hover:bg-surface-hover">
                <RefreshCw className="w-4 h-4 mr-2" />
                Resubmit
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
