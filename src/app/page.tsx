import styles from "./page.module.css";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import HomePosts from "@/components/home/HomePosts";

export default function Home() {
  const allPosts = getSortedPostsData();

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.avatar}>
          {/* Placeholder for avatar */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(45deg, var(--secondary), var(--primary))",
            }}
          />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Hi I&apos;m{" "}
            <span
              style={{
                background:
                  "linear-gradient(to right, var(--primary), var(--secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Bouc
            </span>
            !
          </h1>
          <p className={styles.tagline}>
            Developer, Writer, & Open Source Enthusiast.
          </p>
          <div className={styles.socials}>
            <Link
              href="https://github.com/bouc615"
              target="_blank"
              className={styles.socialLink}
            >
              <Github size={20} />
            </Link>
            <Link href="#" className={styles.socialLink}>
              <Twitter size={20} />
            </Link>
            <Link href="#" className={styles.socialLink}>
              <Linkedin size={20} />
            </Link>
            <Link href="mailto:email@example.com" className={styles.socialLink}>
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.bio}>
        <p>
          Welcome to my digital garden. Here I share my experiments with web
          development, AI agents, and system design. Stick around to learn
          something new!
        </p>
      </section>

      <div style={{ marginTop: "3rem" }}>
        <h2 className={styles.sectionTitle}>Latest Writings</h2>
        <HomePosts posts={allPosts} />
      </div>
    </div>
  );
}
