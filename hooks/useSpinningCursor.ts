"use client";

import { useEffect, useRef } from "react";

interface UseSpinningCursorOptions {
  /** Lerp smoothing factor (default: 0.1) */
  lerp?: number;
  /** Spin speed in deg/frame (default: 1.5) */
  spinSpeed?: number;
  /** Optional container ref to restrict bounds */
  containerRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Standalone custom hook to bind a spinning follower element to mouse movement.
 * Attach `targetRef` to your spinning element and `dotRef` to an optional center dot.
 */
export function useSpinningCursor({
  lerp = 0.1,
  spinSpeed = 1.5,
  containerRef,
}: UseSpinningCursorOptions = {}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasTouch || isMobile || prefersReducedMotion) return;

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
        isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const render = () => {
      currentX += (mouseX - currentX) * lerp;
      currentY += (mouseY - currentY) * lerp;
      currentRotation = (currentRotation + spinSpeed) % 360;

      if (targetRef.current) {
        targetRef.current.style.opacity = isInside ? "1" : "0";
        targetRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentRotation}deg)`;
      }

      if (dotRef.current) {
        dotRef.current.style.opacity = isInside ? "1" : "0";
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [containerRef, lerp, spinSpeed]);

  return { targetRef, dotRef };
}
