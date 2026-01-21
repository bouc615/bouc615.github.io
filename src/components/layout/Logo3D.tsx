"use client";

import { useState } from "react";
import styles from "./Logo3D.module.css";

export default function Logo3D() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (y / rect.height) * 30;
    const rotateY = (x / rect.width) * 30;

    setRotation({ x: -rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      className={styles.logoContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={styles.logo3D}
        style={{
          transform: `perspective(500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Multiple layers for 3D depth */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles.layer}
            style={{
              transform: `translateZ(${-i * 3}px)`,
              opacity: 1 - i * 0.08,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M 24 8 A 10 10 0 0 0 24 24"
                stroke={
                  i === 0
                    ? "url(#gradient)"
                    : `hsl(${150 - i * 15}, 70%, ${50 + i * 3}%)`
                }
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              {i === 0 && (
                <>
                  <circle cx="24" cy="8" r="2" fill="#10b981" />
                  <circle cx="24" cy="24" r="2" fill="#a855f7" />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="14"
                      y1="8"
                      x2="24"
                      y2="24"
                    >
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </>
              )}
            </svg>
          </div>
        ))}

        {/* Glow effect */}
        <div className={styles.glow}></div>
      </div>
    </div>
  );
}
