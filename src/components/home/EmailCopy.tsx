"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import styles from "./EmailCopy.module.css";

export default function EmailCopy() {
  const [showCopyTip, setShowCopyTip] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("934230729@qq.com");
      setShowCopyTip(true);
      setTimeout(() => setShowCopyTip(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleCopyEmail} className={styles.emailButton}>
        <Mail size={18} />
        <span>934230729@qq.com</span>
      </button>
      {showCopyTip && <span className={styles.copyTip}>已复制到剪贴板 ✓</span>}
    </div>
  );
}
