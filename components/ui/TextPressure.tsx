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
  textColor = "rgba(255, 255, 255, 0.95)",
  strokeColor = "#E0432B",
  className = "",
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState<number | null>(null);

  const chars = text.split("");

  // Smooth mouse movement with damping
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
      autoTime += 0.025;

      // Smooth damped lerp towards target mouse position
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.09;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.09;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const hasPointer = cursorRef.current.x > 0 && cursorRef.current.y > 0;

        // Auto-orbit idle wave if mouse is outside
        const effectiveMouseX = hasPointer
          ? mouseRef.current.x
          : titleRect.left + titleRect.width * (0.5 + 0.4 * Math.sin(autoTime));

        const effectiveMouseY = hasPointer
          ? mouseRef.current.y
          : titleRect.top + titleRect.height * (0.5 + 0.3 * Math.cos(autoTime * 0.8));

        const maxDist = titleRect.width * 0.45;

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

          // Proximity factor (0 to 1)
          const norm = Math.max(0, Math.min(1, 1 - d / maxDist));
          const ease = norm * norm * (3 - 2 * norm); // Smooth cubic ease

          // Variable font settings
          const wght = weight ? Math.round(100 + (900 - 100) * ease) : 400;
          const wdth = width ? Math.round(40 + (135 - 40) * ease) : 100;
          const ital = italic ? (ease * 0.4).toFixed(2) : "0";

          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;

          // Dynamic scale, lift, and specular brightness
          const charScaleY = 1 + ease * 0.18;
          const charScaleX = 1 + ease * 0.12;
          const charY = -ease * 22;

          span.style.transform = `translate3d(0, ${charY}px, 0) scale(${charScaleX}, ${charScaleY})`;

          if (alpha) {
            span.style.opacity = (0.45 + ease * 0.55).toString();
          } else {
            span.style.opacity = "1";
          }

          // Dynamic glowing red-orange specular reflection on hovered letters
          if (ease > 0.35) {
            span.style.filter = `drop-shadow(0 0 ${ease * 25}px rgba(224, 67, 43, ${ease * 0.9})) drop-shadow(0 0 ${ease * 50}px rgba(255, 112, 72, ${ease * 0.5}))`;
          } else {
            span.style.filter = "drop-shadow(0 0 15px rgba(224, 67, 43, 0.18))";
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
        fontFamily: "var(--font-roboto-flex), 'Space Grotesk', sans-serif",
      }}
    >
      <style jsx global>{`
        .tp-flex {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .tp-stroke span {
          position: relative;
          color: rgba(255, 255, 255, 0.95);
        }

        .tp-stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 2.5px;
          -webkit-text-stroke-color: rgba(224, 67, 43, 0.55);
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${flex ? "tp-flex" : ""} ${
          stroke ? "tp-stroke" : ""
        } uppercase tracking-tighter`}
        style={{
          fontFamily: "var(--font-roboto-flex), 'Space Grotesk', sans-serif",
          fontSize: fontSize ? `${fontSize}px` : "clamp(3.5rem, 12.5vw, 9.5rem)",
          lineHeight: 1,
          transform: "scale(1, 1.12)",
          transformOrigin: "center top",
          margin: 0,
          textAlign: "center",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontWeight: 100,
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
