import Link from "next/link";
import { getSortedPostsData, PostData } from "@/lib/posts";
import styles from "./page.module.css";

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div>
      <h1 className={styles.title}>Blog</h1>
      <ul className={styles.postList}>
        {allPostsData.map(({ id, date, title, description }: PostData) => (
          <li className={styles.postItem} key={id}>
            <div className={styles.postDate}>{date}</div>
            <h2 className={styles.postTitle}>
              <Link href={`/blog/${id}`}>{title}</Link>
            </h2>
            <p className={styles.postDescription}>{description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
