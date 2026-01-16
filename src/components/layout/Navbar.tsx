"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        {/* Placeholder for Logo Image if user wants one */}
        <div
          style={{
            width: 32,
            height: 32,
            background:
              "linear-gradient(135deg, var(--secondary), var(--primary))",
            borderRadius: 8,
          }}
        ></div>
        <Link href="/" className={styles.logo}>
          Bouc615
        </Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          About
        </Link>
        <Link href="/blog" className={styles.navLink}>
          Blog
        </Link>
        <Link href="/resume" className={styles.navLink}>
          Résumé
        </Link>

        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </nav>
    </header>
  );
}
