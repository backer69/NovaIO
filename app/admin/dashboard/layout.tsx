"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { logout } from "@/lib/auth";

const navItems = [
    { href: "/admin/dashboard", label: "Overview", icon: "📊" },
    { href: "/admin/dashboard/members", label: "Members", icon: "👥" },
    { href: "/admin/dashboard/analytics", label: "Analytics", icon: "📈" },
    { href: "/admin/dashboard/finance", label: "Finance", icon: "💰" },
    { href: "/admin/dashboard/calendar", label: "Calendar", icon: "📅" },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-16 items-center border-b border-slate-200 px-6 justify-between">
                    <span className="text-lg font-bold text-teal-600">NovaIO Admin</span>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="md:hidden text-slate-500 hover:text-slate-700"
                    >
                        ✕
                    </button>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                pathname === item.href
                                    ? "bg-teal-50 text-teal-700"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-4 left-4 right-4">
                    <form action={logout}>
                        <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                            <span className="mr-2">🚪</span> Log Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-full md:pl-64 transition-all">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="mr-2 text-slate-500 md:hidden hover:text-slate-700"
                        >
                            <span className="text-2xl">☰</span>
                        </button>
                        <h1 className="text-xl font-semibold text-slate-800">
                            {navItems.find(i => i.href === pathname)?.label || "Dashboard"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
