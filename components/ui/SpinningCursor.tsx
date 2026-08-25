"use client";

import { useEffect, useRef, useState } from "react";

interface SpinningCursorProps {
  /** Size of the spinning ring in pixels (default: 64) */
  size?: number;
  /** Primary accent color (default: "#E0432B") */
  color?: string;
  /** Glow secondary color (default: "#FF7048") */
  glowColor?: string;
  /** Lerp factor for smooth mouse trailing (0.05 to 0.2, default: 0.1) */
  lerp?: number;
  /** Spin speed in degrees per frame (default: 1.5) */
  spinSpeed?: number;
  /** Optional container ref to restrict cursor bounds to a specific section */
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function SpinningCursor({
  size = 64,
  color = "#E0432B",
  glowColor = "#FF7048",
  lerp = 0.1,
  spinSpeed = 1.5,
  containerRef,
}: SpinningCursorProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices, screens < 768px, or reduced motion preference
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasTouch || isMobile || prefersReducedMotion) {
      return;
    }

    setIsVisible(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let currentRotation = 0;
    let isInside = !containerRef;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          isInside = true;
          mouseX = e.clientX;
          mouseY = e.clientY;
        } else {
          isInside = false;
        }
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }

      // Fast precision center dot update
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      isInside = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (!containerRef) isInside = true;
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const renderLoop = () => {
      // Smooth lerp trailing
      currentX += (mouseX - currentX) * lerp;
      currentY += (mouseY - currentY) * lerp;
      currentRotation = (currentRotation + spinSpeed) % 360;

      if (ringRef.current) {
        ringRef.current.style.opacity = isInside ? "1" : "0";
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentRotation}deg)`;
      }

      if (dotRef.current) {
        dotRef.current.style.opacity = isInside ? "1" : "0";
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, lerp, spinSpeed]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Precision Center Anchor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none transition-opacity duration-300 will-change-transform"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}, 0 0 20px ${glowColor}`,
        }}
      />

      {/* Continuously Spinning Glowing Ring Follower */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none flex items-center justify-center transition-opacity duration-300 will-change-transform"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {/* Outer Volumetric Glow Bloom */}
        <div
          className="absolute inset-0 rounded-full blur-[14px] opacity-40"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, ${color} 50%, transparent 75%)`,
          }}
        />

        {/* Spinning Segmented / Dashed Glowing Ring */}
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Faint base track ring */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity="0.25"
          />

          {/* Intense spinning orbital arc 1 */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="45 120"
            style={{
              filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 12px ${glowColor})`,
            }}
          />

          {/* Symmetrical orbital arc 2 */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={glowColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="25 140"
            strokeDashoffset="90"
            style={{
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }}
          />

          {/* Subtle orbiting micro indicator dot */}
          <circle
            cx="50"
            cy="6"
            r="2.5"
            fill={color}
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>
      </div>
    </div>
  );
}
