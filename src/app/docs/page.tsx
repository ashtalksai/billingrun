"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText,
  ExternalLink,
  Search,
  BarChart3,
  Target,
  Megaphone,
  Palette,
  Presentation
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const sections = [
  {
    id: "research",
    name: "Research",
    description: "Market data and user insights",
    icon: BarChart3
  },
  {
    id: "gtm",
    name: "GTM",
    description: "Go-to-market strategy",
    icon: Target
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Messaging and campaigns",
    icon: Megaphone
  },
  {
    id: "brand",
    name: "Brand",
    description: "Design system and assets",
    icon: Palette
  },
  {
    id: "pitch",
    name: "Pitch",
    description: "Investor materials",
    icon: Presentation
  }
];

const documents: Record<string, Array<{ title: string; subtitle: string; description: string; link: string }>> = {
  research: [
    {
      title: "IdeaBrowser Analysis — BillingRun",
      subtitle: "Market Analysis",
      description: "Comprehensive analysis of current market trends, potential growth areas, and key demographics for the BillingRun platform.",
      link: "https://docs.google.com/document/d/1MGlAicSglnh_fklam1yD7h2ajhAcQ1y8M3_ivfW9RvU/edit"
    },
    {
      title: "IdeaBrowser Analysis — BillingRun",
      subtitle: "Competitor Research",
      description: "Detailed breakdown of primary and secondary competitors, including feature comparison, pricing strategies, and market share.",
      link: "https://docs.google.com/document/d/1MGlAicSglnh_fklam1yD7h2ajhAcQ1y8M3_ivfW9RvU/edit"
    },
    {
      title: "IdeaBrowser Analysis — BillingRun",
      subtitle: "User Interviews",
      description: "Qualitative feedback from potential users, highlighting pain points, feature requests, and overall product perception.",
      link: "https://docs.google.com/document/d/1MGlAicSglnh_fklam1yD7h2ajhAcQ1y8M3_ivfW9RvU/edit"
    }
  ],
  gtm: [
    {
      title: "Go-to-Market Strategy",
      subtitle: "Launch Plan",
      description: "Comprehensive go-to-market strategy including target segments, channel strategy, and launch timeline.",
      link: "#"
    },
    {
      title: "Sales Playbook",
      subtitle: "Sales Strategy",
      description: "Sales process, objection handling, and closing techniques for the BillingRun platform.",
      link: "#"
    }
  ],
  marketing: [
    {
      title: "Messaging Guide",
      subtitle: "Brand Voice",
      description: "Core messaging framework, value propositions, and tone guidelines for all communications.",
      link: "#"
    },
    {
      title: "Content Calendar",
      subtitle: "Content Strategy",
      description: "Planned content across blog, social media, and email for the next quarter.",
      link: "#"
    }
  ],
  brand: [
    {
      title: "Brand & Design Spec",
      subtitle: "Design System",
      description: "Complete brand guidelines including colors, typography, components, and UI patterns.",
      link: "https://docs.google.com/document/d/180-Lc8z5BV2fopnC5buX75OSqLCrAbyc3Rd-vsfrfKA/edit"
    },
    {
      title: "Logo & Assets",
      subtitle: "Brand Assets",
      description: "Logo files, social media templates, and marketing assets in various formats.",
      link: "#"
    }
  ],
  pitch: [
    {
      title: "Pitch Deck",
      subtitle: "Investor Presentation",
      description: "12-slide pitch deck covering problem, solution, market, traction, and ask.",
      link: "/pitch"
    },
    {
      title: "Pitch Script",
      subtitle: "Presentation Notes",
      description: "Speaker notes and talking points for each slide of the pitch deck.",
      link: "#"
    }
  ]
};

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("research");
  const [searchQuery, setSearchQuery] = useState("");

  const activeDocs = documents[activeSection] || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-64px)] border-r border-border bg-surface sticky top-16 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-foreground">BillingRun</h2>
            <p className="text-sm text-muted-foreground">— document center</p>
          </div>
          
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-primary text-primary-foreground border-l-4 border-accent -ml-1 pl-3"
                    : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12">
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
                {sections.find(s => s.id === activeSection)?.name}
              </h1>
              <p className="text-muted-foreground">
                {sections.find(s => s.id === activeSection)?.description}
              </p>
            </motion.div>

            {/* Search */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="relative max-w-md">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents..."
                  className="bg-surface border-border text-foreground pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>

            {/* Documents Grid */}
            <motion.div
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeDocs
                .filter(doc => 
                  doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  doc.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((doc, index) => (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="bg-surface border-border border-l-4 border-l-accent hover:bg-surface-hover transition-colors h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{doc.title}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {doc.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm font-medium text-foreground">{doc.subtitle}</span>
                          <a
                            href={doc.link}
                            target={doc.link.startsWith("http") ? "_blank" : undefined}
                            rel={doc.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="text-accent hover:text-accent-hover text-sm flex items-center gap-1"
                          >
                            Open in Google Docs
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </motion.div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
