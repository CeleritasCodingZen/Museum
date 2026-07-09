"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);


const INK = "#080604";
const STONE = "#E8DDC7";
const STONE_DIM = "rgba(232,221,199,0.44)";
const BRONZE = "#B08D57";
const OXIDE = "#527A65";
const ARCHIVE_RED = "#8B2E2E";


const TAXONOMY = [
  "FIRE",
  "LANGUAGE",
  "TOOLS",
  "MATHEMATICS",

  "ASTRONOMY",
  "COMPUTATION",
];

/* Fixed positions for ambient dust motes — deliberate, not random-on-every-render */
const DUST = [
  { top: "18%", left: "22%", size: 2, dur: 9 },
  { top: "34%", left: "78%", size: 1.5, dur: 11 },
  { top: "62%", left: "14%", size: 2, dur: 13 },
  { top: "72%", left: "84%", size: 1.5, dur: 10 },
  { top: "48%", left: "50%", size: 1, dur: 14 },
  { top: "12%", left: "60%", size: 1.5, dur: 8 },
];

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function TechnologyIntro() {
  const wrapRef = useRef<HTMLDivElement>(null);

  /* Moment refs */
  const m1Ref = useRef<HTMLDivElement>(null);
  const m1Line1Ref = useRef<HTMLDivElement>(null);
  const m1Line2Ref = useRef<HTMLDivElement>(null);
  const m1MetaRef = useRef<HTMLDivElement>(null);
  const m1SpotRef = useRef<HTMLDivElement>(null);

  const m2Ref = useRef<HTMLDivElement>(null);
  const m2Line1Ref = useRef<HTMLDivElement>(null);
  const m2Line2Ref = useRef<HTMLDivElement>(null);
  const m2Line3Ref = useRef<HTMLDivElement>(null);

  const m3Ref = useRef<HTMLDivElement>(null);
  const m3Para1Ref = useRef<HTMLDivElement>(null);
  const m3Para2Ref = useRef<HTMLDivElement>(null);
  const m3RuleRef = useRef<HTMLDivElement>(null);

  const m4Ref = useRef<HTMLDivElement>(null);
  const m4WordWrapRef = useRef<HTMLDivElement>(null);
  const m4WordRef = useRef<HTMLDivElement>(null);
  const m4SweepRef = useRef<HTMLDivElement>(null);
  const m4SubRef = useRef<HTMLDivElement>(null);
  const m4TaxRef = useRef<HTMLDivElement>(null);
  const m4DimRef = useRef<HTMLDivElement>(null);

  const m5Ref = useRef<HTMLDivElement>(null);
  const m5Line1Ref = useRef<HTMLDivElement>(null);
  const m5Line2Ref = useRef<HTMLDivElement>(null);
  const m5Line3Ref = useRef<HTMLDivElement>(null);
  const m5CountRef = useRef<HTMLDivElement>(null);
  const m5DoorRef = useRef<HTMLDivElement>(null);

  /* Spotlight + atmosphere refs */
  const spotRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);

  /* ──────────── GSAP ORCHESTRATION ──────────── */
  useGSAP(
    () => {
      if (!wrapRef.current) return;

      const ctx = gsap.context(() => {
        /* ═══════════════════════════════════════════════════════
           HELPER — cinematic "camera" entrance for a whole section
           scale 0.96→1 · opacity 0.4→1 · blur(10px)→0 · power4.out
        ═══════════════════════════════════════════════════════ */
        function cameraReveal(el: HTMLElement, trigger: HTMLElement, start = "top 82%") {
          gsap.set(el, {
            scale: 0.96,
            opacity: 0.4,
            filter: "blur(10px)",
            transformOrigin: "center center",
          });
          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => {
              gsap.to(el, {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.6,
                ease: "power4.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(el, {
                scale: 0.96,
                opacity: 0.4,
                filter: "blur(10px)",
                duration: 0.7,
                ease: "power2.in",
              });
            },
          });
        }

        /* ─── helper: premium line reveal (editorial style) ─── */
        function lineReveal(
          el: HTMLElement,
          trigger: HTMLElement,
          {
            start = "top 78%",
            duration = 0.9,
            fromVars = {},
            ease = "power4.out",
            onComplete,
          }: {
            start?: string;
            duration?: number;
            fromVars?: gsap.TweenVars;
            ease?: string;
            onComplete?: () => void;
          } = {}
        ) {
          const base = {
            opacity: 0,
            y: 32,
            filter: "blur(10px)",
            scale: 0.985,
          };
          const from = { ...base, ...fromVars };
          gsap.set(el, from);

          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                duration,
                ease,
                onComplete,
              });
            },
            onLeaveBack: () => {
              gsap.to(el, {
                ...from,
                duration: 0.4,
                ease: "power2.in",
              });
            },
          });
          return { revert: () => { } };
        }

        /* ─── helper: word reveal (for body text), with tracking-in ─── */
        function wordReveal(
          el: HTMLElement,
          trigger: HTMLElement,
          {
            start = "top 80%",
            stagger = 0.03,
            duration = 0.6,
            delay = 0,
            trackingFrom = "0.02em",
          }: {
            start?: string;
            stagger?: number;
            duration?: number;
            delay?: number;
            trackingFrom?: string;
          } = {}
        ) {
          const split = new SplitText(el, { type: "words" });
          gsap.set(split.words, {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
            letterSpacing: trackingFrom,
          });
          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => {
              gsap.to(split.words, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "0em",
                duration,
                delay,
                stagger,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(split.words, {
                opacity: 0,
                y: 18,
                filter: "blur(4px)",
                letterSpacing: trackingFrom,
                duration: 0.35,
                stagger: { each: stagger * 0.5, from: "end" },
                ease: "power2.in",
              });
            },
          });
          return split;
        }

        /* ─── helper: slow ambient "breathing" scale, gated to when a
             trigger section is in view — never fights another scale tween
             since it targets a wrapping wrapper element, not the same node
             a scroll-scrubbed tween is driving ─── */
        function breathe(el: HTMLElement, trigger: HTMLElement, start = "top 60%") {
          let tween: gsap.core.Tween | null = null;
          ScrollTrigger.create({
            trigger,
            start,
            end: "bottom top",
            onEnter: () => {
              tween = gsap.to(el, {
                scale: 1.01,
                duration: 6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            },
            onLeave: () => tween?.kill(),
            onEnterBack: () => {
              tween = gsap.to(el, {
                scale: 1.01,
                duration: 6,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            },
            onLeaveBack: () => tween?.kill(),
          });
        }

        const splits: { revert: () => void }[] = [];

        /* ════════════════════════════════════════════
           GLOBAL — every section gets the camera move
        ════════════════════════════════════════════ */
        [m1Ref, m2Ref, m3Ref, m4Ref, m5Ref].forEach((ref) => {
          if (ref.current) cameraReveal(ref.current, ref.current);
        });

        /* ════════════════════════════════════════════
           MOMENT 1 — Opening statement
           "AN ANCIENT INSCRIPTION BEING UNCOVERED"
        ════════════════════════════════════════════ */
        if (m1SpotRef.current && m1Ref.current) {
          gsap.set(m1SpotRef.current, { opacity: 0, scale: 0.7 });
          ScrollTrigger.create({
            trigger: m1Ref.current,
            start: "top 85%",
            onEnter: () => {
              gsap.to(m1SpotRef.current!, {
                opacity: 1,
                scale: 1,
                duration: 2.2,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(m1SpotRef.current!, { opacity: 0, scale: 0.7, duration: 0.8, ease: "power2.in" });
            },
          });
        }
        if (m1Line1Ref.current && m1Ref.current) {
          splits.push(
            lineReveal(m1Line1Ref.current, m1Ref.current, {
              start: "top 68%",
              duration: 1.1,
              fromVars: { y: 32, filter: "blur(10px)" },
            })
          );
        }
        if (m1Line2Ref.current && m1Ref.current) {
          splits.push(
            lineReveal(m1Line2Ref.current, m1Ref.current, {
              start: "top 56%",
              duration: 1.1,
              fromVars: { y: 32, filter: "blur(10px)" },
            })
          );
        }
        if (m1MetaRef.current && m1Ref.current) {
          gsap.set(m1MetaRef.current, { opacity: 0, y: 12 });
          ScrollTrigger.create({
            trigger: m1Ref.current,
            start: "top 46%",
            onEnter: () => {
              gsap.to(m1MetaRef.current!, { opacity: 0.5, y: 0, duration: 1, ease: "power2.out" });
            },
            onLeaveBack: () => {
              gsap.to(m1MetaRef.current!, { opacity: 0, y: 12, duration: 0.5, ease: "power2.in" });
            },
          });
        }
        if (m1Line1Ref.current) breathe(m1Line1Ref.current, m1Ref.current!, "top 40%");
        if (m1Line2Ref.current) breathe(m1Line2Ref.current, m1Ref.current!, "top 30%");

        /* ════════════════════════════════════════════
           MOMENT 2 — Reframing, three chapter-title lines
        ════════════════════════════════════════════ */
        if (m2Line1Ref.current && m2Ref.current) {
          splits.push(
            lineReveal(m2Line1Ref.current, m2Ref.current, {
              start: "top 75%",
              duration: 1.0,
              fromVars: { y: 32, filter: "blur(10px)" },
            })
          );
        }
        if (m2Line2Ref.current && m2Ref.current) {
          splits.push(
            lineReveal(m2Line2Ref.current, m2Ref.current, {
              start: "top 63%",
              duration: 0.85,
              fromVars: { y: 32, filter: "blur(10px)" },
            })
          );
        }
        if (m2Line3Ref.current && m2Ref.current) {
          splits.push(
            lineReveal(m2Line3Ref.current, m2Ref.current, {
              start: "top 51%",
              duration: 0.95,
              fromVars: { y: 32, filter: "blur(10px)" },
              onComplete: () => {
                // subtle brightness pulse — never a flash
                gsap.to(m2Line3Ref.current!, {
                  opacity: 0.85,
                  duration: 0.35,
                  ease: "power1.inOut",
                  yoyo: true,
                  repeat: 1,
                });
              },
            })
          );
        }
        if (m2Line3Ref.current) breathe(m2Line3Ref.current, m2Ref.current!, "top 35%");

        /* ════════════════════════════════════════════
           MOMENT 3 — Museum plaque
           rule expands → sentence one → pause → sentence two
        ════════════════════════════════════════════ */
        if (m3RuleRef.current && m3Ref.current) {
          gsap.set(m3RuleRef.current, { scaleX: 0 });
          ScrollTrigger.create({
            trigger: m3Ref.current,
            start: "top 70%",
            onEnter: () => {
              gsap.to(m3RuleRef.current!, {
                scaleX: 1,
                duration: 1.4,
                ease: "power3.inOut",
              });
            },
            onLeaveBack: () => {
              gsap.to(m3RuleRef.current!, { scaleX: 0, duration: 0.6, ease: "power2.in" });
            },
          });
        }
        if (m3Para1Ref.current && m3Ref.current) {
          splits.push(
            wordReveal(m3Para1Ref.current, m3Ref.current, {
              start: "top 62%",
              stagger: 0.028,
              duration: 0.65,
              trackingFrom: "0.05em",
            })
          );
        }
        if (m3Para2Ref.current && m3Ref.current) {
          splits.push(
            wordReveal(m3Para2Ref.current, m3Ref.current, {
              start: "top 46%",
              stagger: 0.035,
              duration: 0.7,
              delay: 0.35,
              trackingFrom: "0.05em",
            })
          );
        }

        /* ════════════════════════════════════════════
           MOMENT 4 — Monument word: INGENUITY
           "carved from stone" · camera push · dim world
        ════════════════════════════════════════════ */
        if (m4DimRef.current && m4Ref.current) {
          gsap.set(m4DimRef.current, { opacity: 0 });
          ScrollTrigger.create({
            trigger: m4Ref.current,
            start: "top 60%",
            onEnter: () => gsap.to(m4DimRef.current!, { opacity: 0.35, duration: 1.4, ease: "power2.out" }),
            onLeaveBack: () => gsap.to(m4DimRef.current!, { opacity: 0, duration: 0.6, ease: "power2.in" }),
          });
        }
        if (m4WordRef.current && m4Ref.current) {
          gsap.set(m4WordRef.current, {
            opacity: 0,
            y: 32,
            scale: 0.985,
            filter: "blur(10px)",
          });

          // Scrubbed parallax — the word scales subtly as user scrolls through (camera push)
          gsap.fromTo(
            m4WordWrapRef.current,
            { scale: 0.98 },
            {
              scale: 1.05,
              ease: "none",
              scrollTrigger: {
                trigger: m4Ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            }
          );

          ScrollTrigger.create({
            trigger: m4Ref.current,
            start: "top 65%",
            onEnter: () => {
              gsap.to(m4WordRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.1,
                ease: "power4.out",
                onComplete: () => {
                  // signature effect: bronze light sweep, once, no glow
                  if (m4SweepRef.current) {
                    gsap.fromTo(
                      m4SweepRef.current,
                      { xPercent: -130, opacity: 0 },
                      {
                        xPercent: 130,
                        opacity: 1,
                        duration: 2.5,
                        ease: "power1.inOut",
                        onComplete: () => gsap.set(m4SweepRef.current!, { opacity: 0 }),
                      }
                    );
                  }
                },
              });
            },
            onLeaveBack: () => {
              gsap.to(m4WordRef.current, {
                opacity: 0,
                y: 32,
                scale: 0.985,
                filter: "blur(10px)",
                duration: 0.6,
                ease: "power2.in",
              });
              if (m4SweepRef.current) gsap.set(m4SweepRef.current, { opacity: 0, xPercent: -130 });
            },
          });
        }
        if (m4SubRef.current && m4Ref.current) {
          gsap.set(m4SubRef.current, { opacity: 0, y: 20 });
          ScrollTrigger.create({
            trigger: m4Ref.current,
            start: "top 45%",
            onEnter: () => {
              gsap.to(m4SubRef.current!, { opacity: 0.55, y: 0, duration: 0.9, ease: "power2.out" });
            },
            onLeaveBack: () => {
              gsap.to(m4SubRef.current!, { opacity: 0, y: 20, duration: 0.4, ease: "power2.in" });
            },
          });
        }
        if (m4TaxRef.current && m4Ref.current) {
          gsap.set(m4TaxRef.current, { opacity: 0 });
          ScrollTrigger.create({
            trigger: m4Ref.current,
            start: "top 40%",
            onEnter: () => {
              gsap.to(m4TaxRef.current!, { opacity: 1, duration: 1.2, ease: "power2.out" });
            },
            onLeaveBack: () => {
              gsap.to(m4TaxRef.current!, { opacity: 0, duration: 0.5, ease: "power2.in" });
            },
          });
        }

        /* ════════════════════════════════════════════
           MOMENT 5 — The archive doorway
           door line grows → THE ARCHIVE → AWAITS → metadata
        ════════════════════════════════════════════ */
        if (m5DoorRef.current && m5Ref.current) {
          gsap.set(m5DoorRef.current, { scaleY: 0 });
          ScrollTrigger.create({
            trigger: m5Ref.current,
            start: "top 74%",
            onEnter: () => {
              gsap.to(m5DoorRef.current!, { scaleY: 1, duration: 1.6, ease: "power3.inOut" });
            },
            onLeaveBack: () => {
              gsap.to(m5DoorRef.current!, { scaleY: 0, duration: 0.6, ease: "power2.in" });
            },
          });
        }
        if (m5Line1Ref.current && m5Ref.current) {
          splits.push(
            lineReveal(m5Line1Ref.current, m5Ref.current, {
              start: "top 64%",
              duration: 1.0,
              fromVars: { y: 32, filter: "blur(10px)" },
            })
          );
        }
        if (m5Line2Ref.current && m5Ref.current) {
          splits.push(
            lineReveal(m5Line2Ref.current, m5Ref.current, {
              start: "top 54%",
              duration: 0.9,
              fromVars: { y: 32, filter: "blur(10px)" },
            })
          );
        }
        if (m5CountRef.current && m5Ref.current) {
          gsap.set(m5CountRef.current, { opacity: 0, y: 14 });
          ScrollTrigger.create({
            trigger: m5Ref.current,
            start: "top 40%",
            onEnter: () => {
              gsap.to(m5CountRef.current!, { opacity: 0.6, y: 0, duration: 0.8, ease: "power2.out" });
            },
            onLeaveBack: () => {
              gsap.to(m5CountRef.current!, { opacity: 0, y: 14, duration: 0.4, ease: "power2.in" });
            },
          });
        }
        if (m5Line3Ref.current && m5Ref.current) {
          splits.push(
            lineReveal(m5Line3Ref.current, m5Ref.current, {
              start: "top 32%",
              duration: 0.6,
              fromVars: { y: 14, filter: "blur(6px)" },
            })
          );
        }
        if (m5Line1Ref.current) breathe(m5Line1Ref.current, m5Ref.current!, "top 30%");

        /* ════════════════════════════════════════════
           AMBIENT — warm spotlight drift
        ════════════════════════════════════════════ */
        if (spotRef.current) {
          gsap.to(spotRef.current, {
            "--spot-x": "70%",
            "--spot-y": "60%",
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 2,
            },
          });
        }

        /* ─── film grain — slow, subtle drift, never still ─── */
        if (grainRef.current) {
          gsap.to(grainRef.current, {
            backgroundPosition: "137px 91px",
            duration: 9,
            ease: "none",
            repeat: -1,
            yoyo: true,
          });
        }

        /* ─── dust motes — tiny, slow, independent drifting ─── */
        gsap.utils.toArray<HTMLElement>(".dust-mote").forEach((mote, i) => {
          gsap.to(mote, {
            y: i % 2 === 0 ? -16 : 16,
            x: i % 3 === 0 ? 8 : -8,
            opacity: 0.5,
            duration: 6 + i,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: i * 0.4,
          });
        });

        return () => {
          splits.forEach((s) => s.revert());
        };
      }, wrapRef);

      return () => ctx.revert();
    },
    { scope: wrapRef }
  );

  /* ════════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════════ */
  return (
    <div ref={wrapRef} style={{ background: INK, position: "relative" }}>
      {/* ─── Warm spotlight ─── */}
      <div
        ref={spotRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          opacity: 0.08,
          background:
            "radial-gradient(ellipse 700px 900px at var(--spot-x, 30%) var(--spot-y, 30%), rgba(176,141,87,0.35) 0%, transparent 70%)",
        }}
      />

      {/* ─── Film grain — barely-there texture, always in motion ─── */}
      <div
        ref={grainRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          opacity: 0.035,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ─── Dust motes — ambient, fixed positions, slow independent drift ─── */}
      {DUST.map((d, i) => (
        <div
          key={i}
          className="dust-mote pointer-events-none"
          style={{
            position: "fixed",
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: BRONZE,
            opacity: 0.25,
            zIndex: 2,
          }}
        />
      ))}

      {/* ─── Thin vertical grid rule (left) ─── */}
      <div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: "12%",
          width: "1px",
          background: BRONZE,
          opacity: 0.07,
          zIndex: 1,
        }}
      />
      {/* ─── Thin vertical grid rule (right) ─── */}
      <div
        className="pointer-events-none"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          right: "12%",
          width: "1px",
          background: BRONZE,
          opacity: 0.07,
          zIndex: 1,
        }}
      />

      {/* ════════════════════════════════════════════
         MOMENT 1 — WE DID NOT INVENT TOOLS
      ════════════════════════════════════════════ */}
      <section
        ref={m1Ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "60px 40px",
        }}
      >
        {/* Soft warm spotlight passing behind the inscription */}
        <div
          ref={m1SpotRef}
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 600px 400px at 50% 45%, rgba(176,141,87,0.16) 0%, transparent 72%)",
            zIndex: 0,
          }}
        />

        {/* Corner metadata */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 8,
            letterSpacing: "0.4em",
            color: OXIDE,
            opacity: 0.55,
          }}
        >
          PROLOGUE
        </div>
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            fontFamily: "var(--font-mono), monospace",
            fontSize: 8,
            letterSpacing: "0.4em",
            color: BRONZE,
            opacity: 0.4,
          }}
        >
          EST. HUMANITY
        </div>

        <div
          ref={m1Line1Ref}
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(42px, 8.5vw, 140px)",
            lineHeight: 0.88,
            textTransform: "uppercase",
            color: STONE,
            textAlign: "center",
            letterSpacing: "-0.02em",
            perspective: 700,
          }}
        >
          BEFORE THERE WERE MACHINES
        </div>
        <div
          ref={m1Line2Ref}
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(42px, 8.5vw, 140px)",
            lineHeight: 0.88,
            textTransform: "uppercase",
            color: BRONZE,
            textAlign: "center",
            letterSpacing: "-0.02em",
            marginTop: "0.08em",
            perspective: 700,
          }}
        >
          THERE WERE QUESTIONS
        </div>

        <div
          ref={m1MetaRef}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9,
            letterSpacing: "0.35em",
            color: STONE_DIM,
            marginTop: 48,
            textAlign: "center",
            lineHeight: 2.2,
          }}
        >
          HUMANITY&apos;S FIRST CREATION
          <br />
          WAS AN IDEA
        </div>
      </section>

      {/* ════════════════════════════════════════════
         MOMENT 2 — TECHNOLOGY IS NOT ELECTRICITY
      ════════════════════════════════════════════ */}
      <section
        ref={m2Ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "60px 40px",
        }}
      >
        <div
          ref={m2Line1Ref}
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(36px, 7vw, 110px)",
            lineHeight: 0.9,
            textTransform: "uppercase",
            color: STONE,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          TECHNOLOGY IS NOT
        </div>
        <div
          ref={m2Line2Ref}
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(36px, 7vw, 110px)",
            lineHeight: 0.9,
            textTransform: "uppercase",
            color: STONE,
            textAlign: "center",
            letterSpacing: "-0.01em",
            marginTop: "0.12em",
          }}
        >
          WHAT WE CREATE
        </div>
        <div
          ref={m2Line3Ref}
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(36px, 7vw, 110px)",
            lineHeight: 0.9,
            textTransform: "uppercase",
            color: BRONZE,
            textAlign: "center",
            letterSpacing: "-0.01em",
            marginTop: "0.2em",
          }}
        >
          IT IS WHY WE CREATE
        </div>

        {/* Thin horizontal rule */}
        <div
          style={{
            width: 60,
            height: 1,
            background: `linear-gradient(to right, transparent, ${BRONZE}, transparent)`,
            opacity: 0.25,
            marginTop: 56,
          }}
        />
      </section>

      {/* ════════════════════════════════════════════
         MOMENT 3 — Elegant paragraph
      ════════════════════════════════════════════ */}
      <section
        ref={m3Ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "60px 40px",
        }}
      >
        {/* Expanding horizontal rule */}
        <div
          ref={m3RuleRef}
          style={{
            width: "min(420px, 70vw)",
            height: 1,
            background: `linear-gradient(to right, transparent, ${BRONZE}, transparent)`,
            opacity: 0.3,
            marginBottom: 52,
            transformOrigin: "center",
          }}
        />

        <div
          ref={m3Para1Ref}
          style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "clamp(16px, 2.2vw, 24px)",
            lineHeight: 1.9,
            color: STONE_DIM,
            textAlign: "center",
            maxWidth: 580,
            letterSpacing: "0.01em",
          }}
        >
          Time forgets many things.
          <br />
          But every invention is a message sent forward.
        </div>

        <div
          ref={m3Para2Ref}
          style={{
            fontFamily: "var(--font-body), system-ui, sans-serif",
            fontSize: "clamp(17px, 2.4vw, 26px)",
            lineHeight: 1.9,
            color: STONE,
            textAlign: "center",
            maxWidth: 580,
            marginTop: 36,
            letterSpacing: "0.01em",
            fontWeight: 500,
          }}
        >
          A conversation between generations.
        </div>

        {/* Subtle attribution */}
        <div
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 8,
            letterSpacing: "0.35em",
            color: ARCHIVE_RED,
            opacity: 0.45,
            marginTop: 64,
          }}
        >
          MUSEUM ARCHIVE — FRAGMENTS OF IMAGINATION
        </div>
      </section>

      {/* ════════════════════════════════════════════
         MOMENT 4 — Monument word
      ════════════════════════════════════════════ */}
      <section
        ref={m4Ref}
        style={{
          minHeight: "110vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "60px 40px",
        }}
      >
        {/* World dims slightly as the monument takes the stage */}
        <div
          ref={m4DimRef}
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
            background: INK,
            zIndex: 0,
          }}
        />

        <div
          ref={m4WordWrapRef}
          style={{ position: "relative", overflow: "hidden", display: "inline-block", zIndex: 1 }}
        >
          <div
            ref={m4WordRef}
            style={{
              fontFamily: "var(--font-display), system-ui, sans-serif",
              fontSize: "clamp(70px, 16vw, 260px)",
              lineHeight: 0.82,
              textTransform: "uppercase",
              color: STONE,
              textAlign: "center",
              letterSpacing: "0.06em",
            }}
          >
            INGENUITY
          </div>

          {/* Signature effect — bronze light sweeping across engraved stone, once */}
          <div
            ref={m4SweepRef}
            className="pointer-events-none"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "60%",
              opacity: 0,
              background:
                "linear-gradient(115deg, transparent 30%, rgba(176,141,87,0.5) 50%, transparent 70%)",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        <div
          ref={m4SubRef}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.5em",
            color: BRONZE,
            marginTop: 40,
            textAlign: "center",
            zIndex: 1,
          }}
        >
          THE FORCE THAT TURNED IMPOSSIBILITY INTO REALITY
        </div>

        {/* Taxonomy labels */}
        <div
          ref={m4TaxRef}
          style={{
            display: "flex",
            gap: "clamp(16px, 3vw, 48px)",
            marginTop: 64,
            flexWrap: "wrap",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          {TAXONOMY.map((label, i) => (
            <span
              key={label}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 8,
                letterSpacing: "0.3em",
                color: i % 2 === 0 ? OXIDE : BRONZE,
                opacity: 0.4,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
         MOMENT 5 — The archive doorway
      ════════════════════════════════════════════ */}
      <section
        ref={m5Ref}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "60px 40px",
        }}
      >
        <div
          ref={m5Line1Ref}
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(36px, 7vw, 110px)",
            lineHeight: 0.9,
            textTransform: "uppercase",
            color: STONE,
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
        >
          THE ARCHIVE
        </div>
        <div
          ref={m5Line2Ref}
          style={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontSize: "clamp(36px, 7vw, 110px)",
            lineHeight: 0.9,
            textTransform: "uppercase",
            color: BRONZE,
            textAlign: "center",
            letterSpacing: "-0.01em",
            marginTop: "0.1em",
          }}
        >
          AWAITS
        </div>

        {/* Vertical door line */}
        <div
          ref={m5DoorRef}
          style={{
            width: 1,
            height: 100,
            background: `linear-gradient(to bottom, ${BRONZE}, transparent)`,
            opacity: 0.5,
            marginTop: 44,
            transformOrigin: "top",
          }}
        />

        <div
          ref={m5CountRef}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.35em",
            color: BRONZE,
            textAlign: "center",
            marginTop: 32,
            lineHeight: 2.6,
          }}
        >
          SEVEN MACHINES THAT CHANGED
          <br />
          <span style={{ color: STONE_DIM, fontSize: 8, letterSpacing: "0.4em" }}>
            HOW HUMANS DREAM
          </span>
        </div>

        <div
          ref={m5Line3Ref}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 8,
            letterSpacing: "0.4em",
            color: OXIDE,
            opacity: 0.45,
            marginTop: 60,
            textAlign: "center",
          }}
        >
          SCROLL TO ENTER THE ARCHIVE
        </div>
      </section>
    </div>
  );
}
