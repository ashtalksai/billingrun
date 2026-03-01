"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Upload, 
  Plus, 
  AlertTriangle,
  Download,
  RefreshCw,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

// Mock data for dashboard
const stats = [
  {
    title: "Total Claims",
    value: "342",
    change: "Last 30 days",
    icon: FileText,
    color: "text-foreground",
    bgColor: "bg-surface",
    trend: <TrendingUp className="w-4 h-4 text-success" />
  },
  {
    title: "Approved",
    value: "287",
    percentage: "(84%)",
    icon: CheckCircle2,
    color: "text-success",
    bgColor: "bg-success/10",
    trend: <TrendingUp className="w-4 h-4 text-success" />
  },
  {
    title: "Denied",
    value: "38",
    percentage: "(11%)",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    trend: <XCircle className="w-4 h-4 text-destructive" />
  },
  {
    title: "Pending",
    value: "17",
    percentage: "(5%)",
    icon: Clock,
    color: "text-warning",
    bgColor: "bg-warning/10",
    trend: <Clock className="w-4 h-4 text-warning" />
  }
];

const recentClaims = [
  { id: "NEMT-10920", date: "Oct 24, 2024", patient: "Sarah Johnson", payer: "Medicaid", status: "approved", amount: "$85.50" },
  { id: "NEMT-10919", date: "Oct 24, 2024", patient: "Robert Davis", payer: "Aetna", status: "denied", amount: "$120.00" },
  { id: "NEMT-10918", date: "Oct 23, 2024", patient: "Emily Wilson", payer: "UnitedHealthcare", status: "pending", amount: "$65.75" },
  { id: "NEMT-10917", date: "Oct 23, 2024", patient: "James Brown", payer: "Medicaid", status: "approved", amount: "$92.10" },
  { id: "NEMT-10916", date: "Oct 22, 2024", patient: "Michael Lee", payer: "Blue Cross", status: "denied", amount: "$145.20" },
  { id: "NEMT-10915", date: "Oct 22, 2024", patient: "Maria Garcia", payer: "Cigna", status: "pending", amount: "$78.90" },
  { id: "NEMT-10914", date: "Oct 21, 2024", patient: "David Miller", payer: "Humana", status: "approved", amount: "$103.45" },
  { id: "NEMT-10913", date: "Oct 21, 2024", patient: "Jennifer Thomas", payer: "Medicaid", status: "pending", amount: "$56.30" },
  { id: "NEMT-10912", date: "Oct 20, 2024", patient: "Charles Jackson", payer: "Molina Healthcare", status: "denied", amount: "$112.60" },
  { id: "NEMT-10911", date: "Oct 20, 2024", patient: "Elizabeth White", payer: "WellCare", status: "approved", amount: "$88.95" },
];

const quickActions = [
  {
    title: "Import New Trips",
    description: "Upload and process trip data directly.",
    icon: Upload,
    href: "/dashboard/import",
    color: "text-accent"
  },
  {
    title: "Create Manual Claim",
    description: "Generate a claim from scratch.",
    icon: Plus,
    href: "/dashboard/claims/new",
    color: "text-primary"
  },
  {
    title: "View Denials",
    description: "Analyze and resubmit rejected claims.",
    icon: AlertTriangle,
    href: "/dashboard/denials",
    color: "text-destructive"
  }
];

function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    approved: { bg: "bg-success/20", text: "text-success", border: "border-success" },
    denied: { bg: "bg-destructive/20", text: "text-destructive", border: "border-destructive" },
    pending: { bg: "bg-warning/20", text: "text-warning", border: "border-warning" }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  
  return (
    <Badge className={`${config.bg} ${config.text} border ${config.border} capitalize`}>
      {status}
    </Badge>
  );
}

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Stats Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className={`${stat.bgColor} border-border`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.title}</span>
                  {stat.trend}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-bold font-mono ${stat.color}`}>{stat.value}</span>
                  {stat.percentage && (
                    <span className={`text-sm ${stat.color}`}>{stat.percentage}</span>
                  )}
                </div>
                {stat.change && (
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                )}
                {/* Mini sparkline placeholder */}
                <div className="h-8 mt-4 flex items-end gap-1">
                  {[40, 65, 45, 70, 55, 80, 60, 85, 75, 90].map((height, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-sm ${stat.color.replace('text-', 'bg-')}/30`}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Claims Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="bg-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Recent Claims</CardTitle>
                <p className="text-sm text-muted-foreground">Cabinet Grotesk</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Claim ID</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Patient Name</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payer</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentClaims.map((claim) => (
                      <tr key={claim.id} className="border-b border-border/50 hover:bg-surface-hover transition-colors">
                        <td className="py-4 px-4">
                          <Link href={`/dashboard/claims/${claim.id}`} className="text-foreground hover:text-accent font-mono">
                            {claim.id}
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{claim.date}</td>
                        <td className="py-4 px-4 text-foreground">{claim.patient}</td>
                        <td className="py-4 px-4 text-muted-foreground">{claim.payer}</td>
                        <td className="py-4 px-4">
                          <StatusBadge status={claim.status} />
                        </td>
                        <td className="py-4 px-4 text-foreground font-mono">{claim.amount}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <FileText className="w-4 h-4" />
                            </Button>
                            {claim.status === "approved" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                            {claim.status === "denied" && (
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <RefreshCw className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-surface border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Card className="bg-background border-border hover:bg-surface-hover transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-surface flex items-center justify-center ${action.color}`}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
