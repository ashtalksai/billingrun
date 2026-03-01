"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Upload, 
  FileText, 
  XCircle,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  },
  {
    href: "/dashboard/import",
    label: "Import",
    icon: Upload
  },
  {
    href: "/dashboard/claims/new",
    label: "Claims",
    icon: FileText
  },
  {
    href: "/dashboard/denials",
    label: "Denials",
    icon: XCircle
  }
];

const bottomNavItems = [
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings
  }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-surface">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">B</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-none">BillingRun</span>
              <span className="text-xs text-muted-foreground">NEMT Claims Automation</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary border-l-4 border-primary -ml-1 pl-3" 
                        : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-border px-4 py-4">
          <ul className="space-y-1">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-surface-hover hover:text-foreground transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
