"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TextPressureProps {
  text: string;
  flex?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  minFontSize?: number;
  textColor?: string;
  strokeColor?: string;
  className?: string;
}

export default function TextPressure({
  text = "CARTCODE",
  flex = true,
  stroke = true,
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  minFontSize = 42,
  textColor = "rgba(245, 245, 247, 0.95)",
  strokeColor = "rgba(224, 67, 43, 0.35)",
  className = "",
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState<number | null>(null);

  const chars = text.split("");

  // Smooth mouse tracking with damping
  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorRef.current.x = e.clientX;
    cursorRef.current.y = e.clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const t = e.touches[0];
    cursorRef.current.x = t.clientX;
    cursorRef.current.y = t.clientY;
  }, []);

  // Responsive scale calculation
  const setSize = useCallback(() => {
    if (!containerRef.current) return;

    const { width: containerW } = containerRef.current.getBoundingClientRect();
    if (containerW > 0) {
      const calculatedSize = Math.max(containerW / (chars.length * 0.72), minFontSize);
      setFontSize(calculatedSize);
    }
  }, [chars.length, minFontSize]);

  useEffect(() => {
    setSize();
    window.addEventListener("resize", setSize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let rafId: number;
    let autoTime = 0;

    const loop = () => {
      autoTime += 0.02;

      // Smooth damped lerp towards target pointer position
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.09;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.09;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const hasPointer = cursorRef.current.x > 0 && cursorRef.current.y > 0;

        // Gentle idle wave if mouse is outside
        const effectiveMouseX = hasPointer
          ? mouseRef.current.x
          : titleRect.left + titleRect.width * (0.5 + 0.35 * Math.sin(autoTime));

        const effectiveMouseY = hasPointer
          ? mouseRef.current.y
          : titleRect.top + titleRect.height * (0.5 + 0.25 * Math.cos(autoTime * 0.7));

        const maxDist = titleRect.width * 0.38;

        spansRef.current.forEach((span) => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };

          const d = Math.hypot(
            effectiveMouseX - charCenter.x,
            effectiveMouseY - charCenter.y
          );

          // Proximity factor (0 to 1) with cubic ease
          const norm = Math.max(0, Math.min(1, 1 - d / maxDist));
          const ease = norm * norm * (3 - 2 * norm);

          // 1. Google Font "Roboto Flex" Variable Settings:
          // Default: very thin (wght: 120, wdth: 50)
          // Hover near letter: very bold (wght: 880, wdth: 130)
          const wght = weight ? Math.round(120 + (880 - 120) * ease) : 200;
          const wdth = width ? Math.round(50 + (130 - 50) * ease) : 55;
          const ital = italic ? (ease * 0.3).toFixed(2) : "0";

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}, 'opsz' 144`;

          // 2. Proximity Lift & Subtle Scale (max 1.10)
          const charScaleY = 1 + ease * 0.10;
          const charScaleX = 1 + ease * 0.08;
          const charY = -ease * 14;

          span.style.transform = `translate3d(0, ${charY}px, 0) scale(${charScaleX}, ${charScaleY})`;

          if (alpha) {
            span.style.opacity = (0.75 + ease * 0.25).toString();
          } else {
            span.style.opacity = "1";
          }

          // 3. Soft, Elegant Red Glow (Not heavy neon)
          if (ease > 0.25) {
            span.style.filter = `drop-shadow(0 0 ${ease * 14}px rgba(224, 67, 43, ${ease * 0.50})) drop-shadow(0 0 ${ease * 26}px rgba(255, 112, 72, ${ease * 0.22}))`;
          } else {
            span.style.filter = "drop-shadow(0 0 5px rgba(224, 67, 43, 0.06))";
          }
        });
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(rafId);
    };
  }, [alpha, handleMouseMove, handleTouchMove, italic, setSize, weight, width]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none overflow-visible ${className}`}
      style={{
        fontFamily: "var(--font-roboto-flex), 'Roboto Flex', sans-serif",
      }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap");

        .tp-flex {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .tp-stroke span {
          position: relative;
          color: rgba(245, 245, 247, 0.95);
        }

        .tp-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 1px;
          -webkit-text-stroke-color: rgba(224, 67, 43, 0.35);
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${flex ? "tp-flex" : ""} ${
          stroke ? "tp-stroke" : ""
        } uppercase tracking-tighter`}
        style={{
          fontFamily: "var(--font-roboto-flex), 'Roboto Flex', sans-serif",
          fontSize: fontSize ? `${fontSize}px` : "clamp(3.5rem, 12.5vw, 9.5rem)",
          lineHeight: 1,
          transform: "scale(1, 1.12)",
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 120,
          width: "100%",
          opacity: 1,
          visibility: "visible",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block transition-all duration-75 will-change-transform opacity-100"
            style={{
              display: "inline-block",
              color: textColor,
              transformOrigin: "bottom center",
              opacity: 1,
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}
