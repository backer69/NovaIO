import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Conference Registration",
    description: "Webinar Registration & Admin Dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-slate-50 text-slate-800">
                {children}
            </body>
        </html>
    );
}
