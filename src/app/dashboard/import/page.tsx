"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  ChevronDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// Mock CSV columns
const csvColumns = [
  { name: "Date", mapped: true, field: "Trip Date, Service Date, Invoice Date" },
  { name: "Patient_Name", mapped: true, field: "Patient Name, Client Name, Member ID" },
  { name: "Pickup", mapped: true, field: "Pickup Address, Origin, Starting Point" },
  { name: "Dropoff", mapped: true, field: "Dropoff Address, Destination, Ending Point" },
  { name: "Payer", mapped: true, field: "Payer Name, Funding Source, Insurance Provider" }
];

// Mock preview data
const previewData = [
  { valid: true, date: "10/25/2023", patient: "John Doe", pickup: "123 Main St, Anytown, CA", dropoff: "456 Oak Ave, Othertown, CA", payer: "Medicaid" },
  { valid: true, date: "10/25/2023", patient: "Jane Smith", pickup: "789 Pine Ln, Somecity, CA", dropoff: "101 Maple Dr, Anothercity, CA", payer: "Private Pay" },
  { valid: false, date: "10/26/2023", patient: "Robert Johnson", pickup: "222 Elm St, Thiscity, CA", dropoff: "333 Birch Rd, Thatcity, CA", payer: "Unknown Payer" },
  { valid: true, date: "10/26/2023", patient: "Emily Davis", pickup: "555 Cedar Way, Newtown, CA", dropoff: "666 Spruce Ct, Oldtown, CA", payer: "Aetna" },
  { valid: true, date: "10/27/2023", patient: "Michael Wilson", pickup: "888 Willow Pl, Thecity, CA", dropoff: "999 Aspen Blvd, Anotherplace, CA", payer: "Blue Cross" }
];

export default function ImportPage() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setFileUploaded(true);
  };

  const handleFileSelect = () => {
    setFileUploaded(true);
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
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Import Trips for BillingRun
          </h1>
          <p className="text-muted-foreground">
            Step 1 of 3: Upload CSV and Map Columns
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div variants={fadeInUp} className="mb-8">
          <Card className="bg-surface border-border">
            <CardContent className="p-8">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                  isDragging 
                    ? "border-accent bg-accent/5" 
                    : "border-border hover:border-primary"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Drop CSV file here or click to browse
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    CSV from dispatch software (MediRoutes, Tobi, etc.)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supported file types: .csv
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-upload">
                    <Button className="mt-4 bg-primary hover:bg-primary-hover" asChild>
                      <span>Choose File</span>
                    </Button>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {fileUploaded && (
          <>
            {/* Column Mapping */}
            <motion.div 
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Column Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">CSV Column</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">BillingRun Field</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csvColumns.map((col, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="py-4 px-4 text-foreground font-mono">{col.name}</td>
                            <td className="py-4 px-4">
                              <Select defaultValue={col.field.split(",")[0].trim()}>
                                <SelectTrigger className="w-full bg-background border-border">
                                  <SelectValue placeholder="[Select Field]" />
                                </SelectTrigger>
                                <SelectContent>
                                  {col.field.split(",").map((field, i) => (
                                    <SelectItem key={i} value={field.trim()}>
                                      {field.trim()}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preview Mapped Data */}
            <motion.div 
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card className="bg-surface border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Preview Mapped Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground"></th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Trip Date</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Patient Name</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Pickup Address</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Dropoff Address</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Payer Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="py-4 px-4">
                              {row.valid ? (
                                <CheckCircle2 className="w-5 h-5 text-success" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-warning" />
                              )}
                            </td>
                            <td className="py-4 px-4 text-foreground">{row.date}</td>
                            <td className="py-4 px-4 text-foreground">{row.patient}</td>
                            <td className="py-4 px-4 text-muted-foreground text-sm">{row.pickup}</td>
                            <td className="py-4 px-4 text-muted-foreground text-sm">{row.dropoff}</td>
                            <td className="py-4 px-4">
                              {row.valid ? (
                                <span className="text-foreground">{row.payer}</span>
                              ) : (
                                <Badge variant="outline" className="border-warning text-warning">
                                  {row.payer}
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div 
              variants={fadeInUp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-end gap-4"
            >
              <Button variant="outline" className="border-border text-foreground">
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary-hover">
                Validate & Import
              </Button>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
