import styles from "./page.module.css";
import { getSortedPostsData } from "@/lib/posts";
import HomePosts from "@/components/home/HomePosts";
import EmailCopy from "@/components/home/EmailCopy";
import resumeData from "@/data/resume.json";
import type { ResumeData } from "@/types/resume";

export default function Home() {
  const allPosts = getSortedPostsData();
  const { experiences } = resumeData as ResumeData;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            <img
              src="/avatar.jpeg"
              alt="Chancey"
              className={styles.avatarImage}
            />
          </div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.greeting}>Chancey</h1>
          <EmailCopy />
        </div>
      </section>

      {/* Bio Section */}
      <section className={styles.bio}>
        <p>一个前端工程师，写代码，解问题，也偶尔思考代码之外的事。</p>
        <p>
          没参与过改变世界的项目，但在自己接手的一亩三分地里，总想把它弄得结实点、好看点、好维护点。
        </p>
        {/* <p>
          生活上，喜欢爬山、拍照、或者漫无目的地骑车。
        </p> */}
        <p>
          这个博客算是我在数字世界的一片自留地。记点技术心得，写点跨界联想，偶尔发发呆。
        </p>
        <p>最近在看 AI、低代码和其他，如果你也对这些话题有兴趣，欢迎来聊聊。</p>
        {/* <p className={styles.easterEggHint}>
          P.S. 这个网站藏了一些小彩蛋 - 找到一个，把 emoji 放进邮件主题里发给我吧！
        </p> */}
      </section>

      {/* Posts Section */}
      <section className={styles.publicationsSection}>
        <h2 className={styles.sectionTitle}>最新文章</h2>
        <HomePosts posts={allPosts} />
      </section>

      {/* Resume Section */}
      <section id="resume" className={styles.resumeSection}>
        <h2 className={styles.sectionTitle}>简历</h2>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelinePoint}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h3 className={styles.timelineTitle}>{exp.organization}</h3>
                  <div className={styles.timelineMeta}>{exp.period}</div>
                </div>
                <div className={styles.timelineRole}>{exp.role}</div>
                {exp.location && (
                  <p className={styles.timelineLocation}>{exp.location}</p>
                )}
                <p className={styles.timelineDescription}>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
