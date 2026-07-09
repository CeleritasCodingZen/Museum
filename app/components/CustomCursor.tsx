"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const move = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
      gsap.to(label, { x: e.clientX, y: e.clientY, duration: 0.2, ease: "power2.out" });
    };

    const addHover = () => document.body.classList.add("cursor-hover");
    const removeHover = () => document.body.classList.remove("cursor-hover");

    window.addEventListener("mousemove", move);

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractives = document.querySelectorAll("a, button, [data-cursor]");
      newInteractives.forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={labelRef} className="custom-cursor-label">SCAN</div>
    </>
  );
}
