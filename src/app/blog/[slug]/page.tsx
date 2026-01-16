import { getSortedPostsData, getPostData } from "@/lib/posts";
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
      <h1 className={styles.title}>{postData.title}</h1>
      <div className={styles.date}>{postData.date}</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
      />
    </article>
  );
}
