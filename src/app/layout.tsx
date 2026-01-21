import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import EasterEggs from "@/components/EasterEggs";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Chancey's Blog",
  description: "Personal blog and portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${ibmPlexMono.variable}`}>
        <EasterEggs />
        <div
          className="container"
          style={{ fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          {/* <Navbar /> */}
          <main>{children}</main>
          <footer
            style={{
              marginTop: "4rem",
              padding: "2rem 0",
              borderTop: "1px solid var(--border)",
              textAlign: "center",
              color: "var(--muted)",
              fontSize: "0.9rem",
            }}
          >
            © {new Date().getFullYear()} Chancey. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
