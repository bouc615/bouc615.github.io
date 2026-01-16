import styles from "./page.module.css";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.avatar}>
          {/* Placeholder for avatar */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(45deg, #ccc, #999)",
            }}
          />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Hi I'm Bouc!</h1>
          <div className={styles.socials}>
            <Link
              href="https://github.com/bouc615"
              target="_blank"
              className={styles.socialLink}
            >
              <Github size={20} /> GitHub
            </Link>
            <Link href="#" className={styles.socialLink}>
              <Twitter size={20} /> Twitter
            </Link>
            <Link href="#" className={styles.socialLink}>
              <Linkedin size={20} /> LinkedIn
            </Link>
            <Link href="mailto:email@example.com" className={styles.socialLink}>
              <Mail size={20} /> Email
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.bio}>
        <p>
          I'm a developer passionate about open source and building cool things.
          This is my personal blog where I share my thoughts and projects.
        </p>
        <p>
          Currently, I'm focusing on web development, AI agents, and system
          design. I enjoy solving complex problems and learning new
          technologies.
        </p>
        <p>
          Feel free to check out my{" "}
          <Link href="/blog" style={{ textDecoration: "underline" }}>
            blog
          </Link>{" "}
          or{" "}
          <Link href="/resume" style={{ textDecoration: "underline" }}>
            résumé
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
