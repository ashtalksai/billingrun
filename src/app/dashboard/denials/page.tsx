"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar,
  Search,
  Info,
  Download,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Mock denied claims data
const deniedClaims = [
  { id: "#C-10045", date: "2024-01-28", patient: "John Doe", payer: "Medicare", reasonCode: "CO-16", missingFields: ["Auth Code"] },
  { id: "#C-10044", date: "2024-01-27", patient: "Jane Smith", payer: "Medicaid", reasonCode: "CO-18", missingFields: ["Pickup Time"] },
  { id: "#C-10043", date: "2024-01-26", patient: "Robert Johnson", payer: "Blue Cross", reasonCode: "CO-22", missingFields: ["Auth Code", "Pickup Time"] },
  { id: "#C-10042", date: "2024-01-25", patient: "Mary Williams", payer: "Aetna", reasonCode: "CO-16", missingFields: ["Auth Code"] },
  { id: "#C-10041", date: "2024-01-24", patient: "David Brown", payer: "Medicare", reasonCode: "CO-19", missingFields: ["Pickup Time"] },
  { id: "#C-10040", date: "2024-01-23", patient: "Sarah Davis", payer: "Medicaid", reasonCode: "CO-16", missingFields: ["Auth Code"] },
  { id: "#C-10039", date: "2024-01-22", patient: "Michael Wilson", payer: "UnitedHealthcare", reasonCode: "CO-18", missingFields: ["Pickup Time"] },
  { id: "#C-10038", date: "2024-01-21", patient: "Emily Taylor", payer: "Cigna", reasonCode: "CO-22", missingFields: ["Auth Code"] },
  { id: "#C-10037", date: "2024-01-20", patient: "James Anderson", payer: "Medicare", reasonCode: "CO-16", missingFields: ["Auth Code"] },
  { id: "#C-10036", date: "2024-01-19", patient: "Elizabeth Thomas", payer: "Medicaid", reasonCode: "CO-18", missingFields: ["Pickup Time"] },
];

const reasonCodeDescriptions: Record<string, string> = {
  "CO-16": "Claim/service lacks information or has submission/billing error(s).",
  "CO-18": "Exact duplicate claim/service.",
  "CO-19": "This is a work-related injury/illness and thus the liability of the Worker's Compensation Carrier.",
  "CO-22": "This care may be covered by another payer per coordination of benefits.",
  "CO-27": "Expenses incurred after coverage terminated."
};

export default function DenialsPage() {
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);
  const [rejectionCode, setRejectionCode] = useState("CO-27");

  const toggleClaim = (id: string) => {
    setSelectedClaims(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedClaims.length === deniedClaims.length) {
      setSelectedClaims([]);
    } else {
      setSelectedClaims(deniedClaims.map(c => c.id));
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Filters */}
        <motion.div variants={fadeInUp} className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Date Range</label>
            <div className="relative">
              <Input
                value="Jan 01, 2024 - Jan 31, 2024"
                readOnly
                className="bg-surface border-border text-foreground pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Payer</label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-surface border-border">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="medicare">Medicare</SelectItem>
                <SelectItem value="medicaid">Medicaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Reason Code</label>
            <div className="relative">
              <Input
                placeholder="Search"
                className="bg-surface border-border text-foreground pr-10"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <div className="flex items-end">
            <Button variant="link" className="text-accent hover:text-accent-hover">
              Clear Filters
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Denied Claims Table */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Denied Claims Table</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 w-10">
                          <Checkbox 
                            checked={selectedClaims.length === deniedClaims.length}
                            onCheckedChange={toggleAll}
                          />
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Claim ID</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Date</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Patient</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Payer</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Reason Code</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Missing Fields</th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deniedClaims.map((claim) => (
                        <tr key={claim.id} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                          <td className="py-4 px-4">
                            <Checkbox 
                              checked={selectedClaims.includes(claim.id)}
                              onCheckedChange={() => toggleClaim(claim.id)}
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-destructive rounded-full"></span>
                              <span className="text-foreground font-mono">{claim.id}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground">{claim.date}</td>
                          <td className="py-4 px-4 text-foreground">{claim.patient}</td>
                          <td className="py-4 px-4 text-muted-foreground">{claim.payer}</td>
                          <td className="py-4 px-4">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 cursor-help">
                                  <span className="text-foreground">{claim.reasonCode}</span>
                                  <Info className="w-3 h-3 text-muted-foreground" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">{reasonCodeDescriptions[claim.reasonCode] || "Unknown code"}</p>
                              </TooltipContent>
                            </Tooltip>
                            <span className="text-xs text-muted-foreground block">Hover for details</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-1 flex-wrap">
                              {claim.missingFields.map((field, i) => (
                                <Badge key={i} className="bg-destructive/20 text-destructive border border-destructive text-xs">
                                  {field}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Button size="sm" className="bg-primary hover:bg-primary-hover text-xs">
                              Fix & Resubmit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Batch Actions */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      checked={selectedClaims.length === deniedClaims.length}
                      onCheckedChange={toggleAll}
                    />
                    <span className="text-sm text-foreground">Select All</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-accent hover:bg-accent-hover text-accent-foreground"
                    disabled={selectedClaims.length === 0}
                  >
                    Resubmit Selected
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Denied Claims
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rejection Code Decoder */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-surface border-border border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="text-accent">Rejection Code Decoder</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Enter rejection code</label>
                  <Input
                    value={rejectionCode}
                    onChange={(e) => setRejectionCode(e.target.value)}
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="e.g., CO-27"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Output</label>
                  <div className="bg-background border border-border rounded-md p-4">
                    <p className="text-foreground text-sm mb-2">
                      <span className="text-accent font-semibold">Code {rejectionCode}:</span> Patient ID not found
                    </p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      → Verify ID matches payer records
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
