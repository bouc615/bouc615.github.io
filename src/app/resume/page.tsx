import styles from "./page.module.css";

export default function Resume() {
  return (
    <div>
      <h1 className={styles.title}>Résumé</h1>

      <div className={styles.timeline}>
        <div className={styles.item}>
          <div className={styles.timelinePoint}></div>
          <div className={styles.content}>
            <h3>
              University of Oxford{" "}
              <span className={styles.role}>DPhil in Machine Learning</span>
            </h3>
            <div className={styles.meta}>Oct 2024 - Present</div>
            <p>Exploring the scaling laws of AI Safety.</p>
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.timelinePoint}></div>
          <div className={styles.content}>
            <h3>
              Spotify{" "}
              <span className={styles.role}>Research Scientist Intern</span>
            </h3>
            <div className={styles.meta}>Jun 2025 - Aug 2025</div>
            <p className={styles.location}>London, UK • Hybrid</p>
            <p>
              Investigating mechanistic interpretability for long-context
              reasoning in LLMs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
