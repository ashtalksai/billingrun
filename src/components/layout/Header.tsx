"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-xl font-bold text-foreground">Billing</span>
            <span className="text-xl font-bold text-accent">Run</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-md px-4 py-2">
              Start Free Trial
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-surface border-border">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-border">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary-hover">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
