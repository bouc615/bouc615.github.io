"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";
import Logo3D from "./Logo3D";

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    // Always set dark theme
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle smooth scroll on homepage
    if (pathname === "/") {
      e.preventDefault();
      const resumeSection = document.getElementById("resume");
      if (resumeSection) {
        resumeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoWrapper}>
          <Logo3D />
          <span className={styles.logo}>Chancy</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          About
        </Link>
        <Link href="/publications" className={styles.navLink}>
          Publications
        </Link>
        <a
          href={pathname === "/" ? "#resume" : "/#resume"}
          className={styles.navLink}
          onClick={handleResumeClick}
        >
          Résumé
        </a>
      </nav>
    </header>
  );
}
