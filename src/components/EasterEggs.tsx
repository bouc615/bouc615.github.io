"use client";

import { useEffect, useState } from "react";

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  // Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === konamiCode[konamiProgress].toLowerCase()) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);

        if (newProgress === konamiCode.length) {
          setShowSecret(true);
          setKonamiProgress(0);

          // Create matrix rain effect
          createMatrixRain();

          setTimeout(() => {
            setShowSecret(false);
          }, 5000);
        }
      } else {
        setKonamiProgress(0);
      }
    };

    // Cursor trail effect
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.9) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [konamiProgress]);

  const createSparkle = (x: number, y: number) => {
    const sparkle = document.createElement("div");
    sparkle.style.position = "fixed";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.width = "4px";
    sparkle.style.height = "4px";
    sparkle.style.borderRadius = "50%";
    sparkle.style.background = `linear-gradient(135deg, #10b981, #a855f7)`;
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "9999";
    sparkle.style.animation = "sparkleFloat 1s ease-out forwards";

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  };

  const createMatrixRain = () => {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "01アイウエオカキクケコサシスセソタチツテト";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let frame = 0;
    const maxFrames = 200;

    const draw = () => {
      ctx.fillStyle = "rgba(26, 29, 35, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    };

    draw();
  };

  return (
    <>
      <style jsx global>{`
        @keyframes sparkleFloat {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
          }
        }
      `}</style>

      {showSecret && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(26, 29, 35, 0.95)",
            padding: "2rem 3rem",
            borderRadius: "1rem",
            border: "2px solid #10b981",
            zIndex: 10000,
            textAlign: "center",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
          <div
            style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#10b981" }}
          >
            你找到彩蛋了！
          </div>
          <div style={{ marginTop: "0.5rem", color: "#9ca3af" }}>
            Konami Code 解锁成功
          </div>
        </div>
      )}
    </>
  );
}
