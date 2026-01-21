"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PostData } from "@/lib/posts";
import { Calendar, ArrowRight } from "lucide-react";
import styles from "./HomePosts.module.css";

interface HomePostsProps {
  posts: PostData[];
}

export default function HomePosts({ posts }: HomePostsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(
      posts
        .map((p) => p.category)
        .filter((c): c is string => typeof c === "string"),
    );
    return ["All", ...Array.from(cats)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div className={styles.container}>
      {/* Category Filter */}
      <div className={styles.categoryFilter}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ""
            }`}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className={styles.activeBackground}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={styles.categoryText}>{category}</span>
          </button>
        ))}
      </div>

      {/* Post List */}
      <motion.div layout className={styles.postGrid}>
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.article
              layout
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.postCard}
            >
              <Link href={`/blog/${post.id}`} className={styles.postLink}>
                <div className={styles.postHeader}>
                  <span className={styles.postCategory}>
                    {post.category || "General"}
                  </span>
                  <div className={styles.postDate}>
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className={styles.postTitle}>{post.title}</h3>

                <p className={styles.postDescription}>{post.description}</p>

                <div className={styles.readMore}>
                  <span>阅读更多</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
