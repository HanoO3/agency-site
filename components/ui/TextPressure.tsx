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
  className?: string;
}

export default function TextPressure({
  text = "CARTCODE",
  flex = true,
  stroke = false,
  width = true,
  weight = true,
  italic = false,
  alpha = false,
  minFontSize = 36,
  textColor = "#F4F1EC",
  className = "",
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState<number | null>(null);

  const chars = text.split("");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorRef.current.x = e.clientX;
    cursorRef.current.y = e.clientY;
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const t = e.touches[0];
    cursorRef.current.x = t.clientX;
    cursorRef.current.y = t.clientY;
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current) return;

    const { width: containerW } = containerRef.current.getBoundingClientRect();
    if (containerW > 0) {
      const calculatedSize = Math.max(containerW / (chars.length * 0.68), minFontSize);
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

      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.08;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const hasPointer = cursorRef.current.x > 0 && cursorRef.current.y > 0;

        const effectiveMouseX = hasPointer
          ? mouseRef.current.x
          : titleRect.left + titleRect.width * (0.5 + 0.35 * Math.sin(autoTime));

        const effectiveMouseY = hasPointer
          ? mouseRef.current.y
          : titleRect.top + titleRect.height * (0.5 + 0.25 * Math.cos(autoTime * 0.7));

        const maxDist = titleRect.width * 0.42;

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

          const norm = Math.max(0, Math.min(1, 1 - d / maxDist));
          const ease = norm * norm * (3 - 2 * norm);

          // Default: thin & elegant weight 200–300 (wght: 220, wdth: 65)
          // Hover: bold morph (wght: 850, wdth: 130)
          const wght = weight ? Math.round(220 + (850 - 220) * ease) : 250;
          const wdth = width ? Math.round(65 + (130 - 65) * ease) : 70;
          const ital = italic ? (ease * 0.25).toFixed(2) : "0";

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;

          const charScaleY = 1 + ease * 0.08;
          const charScaleX = 1 + ease * 0.06;
          const charY = -ease * 12;

          span.style.transform = `translate3d(0, ${charY}px, 0) scale(${charScaleX}, ${charScaleY})`;

          if (alpha) {
            span.style.opacity = (0.75 + ease * 0.25).toString();
          } else {
            span.style.opacity = "1";
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
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
      className={className}
    >
      <style jsx global>{`
        .tp-flex {
          display: flex;
          justify-content: space-between;
          width: 100%;
        }

        .text-pressure-title {
          color: #f4f1ec;
          letter-spacing: -0.03em;
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${flex ? "tp-flex" : ""}`}
        style={{
          fontFamily: "var(--font-roboto-flex), 'Roboto Flex', sans-serif",
          textTransform: "uppercase",
          fontSize: fontSize ? `${fontSize}px` : "clamp(3.5rem, 12.5vw, 9.5rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 250,
          width: "100%",
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block transition-transform duration-75 will-change-transform opacity-100"
            style={{
              display: "inline-block",
              color: textColor,
              transformOrigin: "bottom center",
              fontVariationSettings: "'wght' 220, 'wdth' 65",
              fontWeight: 250,
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