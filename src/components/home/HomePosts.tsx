"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PostData } from "@/lib/posts";
import { Calendar, ArrowRight } from "lucide-react";

interface HomePostsProps {
  posts: PostData[];
}

export default function HomePosts({ posts }: HomePostsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Extract unique categories
  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(
      posts
        .map((p) => p.category)
        .filter((c): c is string => typeof c === "string")
    );
    return ["All", ...Array.from(cats)];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") return posts;
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div className="py-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none"
            style={{
              color:
                selectedCategory === category
                  ? "var(--background)"
                  : "var(--muted)",
            }}
          >
            {selectedCategory === category && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: "var(--foreground)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* Post List */}
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.article
              layout
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl border border-[var(--border)] hover:border-[var(--primary)] transition-colors bg-[var(--background)] hover:shadow-lg dark:hover:shadow-primary/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--border)] text-[var(--foreground)]">
                    {post.category || "General"}
                  </span>
                  <div className="flex items-center text-xs text-[var(--muted)]">
                    <Calendar size={12} className="mr-1" />
                    {post.date}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                  <Link
                    href={`/blog/${post.id}`}
                    className="focus:outline-none"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h3>

                <p className="text-[var(--muted)] text-sm line-clamp-3 mb-4">
                  {post.description}
                </p>
              </div>

              <div className="flex items-center text-[var(--primary)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-300">
                Read more <ArrowRight size={16} className="ml-1" />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
