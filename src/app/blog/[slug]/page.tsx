import { getSortedPostsData, getPostData } from "@/lib/posts";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./post.module.css";

// Generate valid static paths for export
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <article className={styles.article}>
      <Link href="/" className={styles.backButton}>
        <ArrowLeft size={16} />
      </Link>

      <h1 className={styles.title}>{postData.title}</h1>
      <div className={styles.meta}>
        <span className={styles.date}>{postData.date}</span>
        {postData.category && (
          <>
            <span className={styles.separator}>•</span>
            <span className={styles.category}>{postData.category}</span>
          </>
        )}
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
      />
    </article>
  );
}
