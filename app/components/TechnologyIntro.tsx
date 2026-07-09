"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ════════════════════════════════════════════════════════════════
   DESIGN TOKENS — shared palette with the rest of the museum
   ════════════════════════════════════════════════════════════════ */
const INK = "#080604";
const STONE = "#E8DDC7";
const STONE_DIM = "rgba(232,221,199,0.44)";
const BRONZE = "#B08D57";
const OXIDE = "#527A65";
const ARCHIVE_RED = "#8B2E2E";

/* ════════════════════════════════════════════════════════════════
   METADATA LABELS — museum-catalog taxonomy, deliberately quiet
   ════════════════════════════════════════════════════════════════ */
const TAXONOMY = [
  "FIRE",
  "LANGUAGE",
  "TOOLS",
  "MATHEMATICS",
  "ASTRONOMY",
  "COMPUTATION",
];

/* Pre-computed dust particle data — deterministic to avoid SSR/client hydration mismatch */
const DUST_PARTICLES = Array.from({ length: 18 }, (_, i) => {
  // Simple seeded pseudo-random per index (golden ratio hash)
  const seed = (i: number, offset: number) => {
    const v = ((i + offset) * 2654435761) >>> 0;
    return (v % 10000) / 10000;
  };
  return {
    w: 1 + seed(i, 1) * 2,
    h: 1 + seed(i, 2) * 2,
    opacity: 0.08 + seed(i, 3) * 0.12,
    left: seed(i, 4) * 100,
    top: 60 + seed(i, 5) * 40,
    driftY: 40 + seed(i, 6) * 60,
    driftX: -20 + seed(i, 7) * 40,
    dur: 8 + seed(i, 8) * 12,
    del: seed(i, 9) * 10,
  };
});

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

  const m2Ref = useRef<HTMLDivElement>(null);
  const m2Line1Ref = useRef<HTMLDivElement>(null);
  const m2Line2Ref = useRef<HTMLDivElement>(null);
  const m2Line3Ref = useRef<HTMLDivElement>(null);

  const m3Ref = useRef<HTMLDivElement>(null);
  const m3Para1Ref = useRef<HTMLDivElement>(null);
  const m3Para2Ref = useRef<HTMLDivElement>(null);
  const m3RuleRef = useRef<HTMLDivElement>(null);

  const m4Ref = useRef<HTMLDivElement>(null);
  const m4WordRef = useRef<HTMLDivElement>(null);
  const m4SubRef = useRef<HTMLDivElement>(null);
  const m4TaxRef = useRef<HTMLDivElement>(null);
  const m4SweepRef = useRef<HTMLDivElement>(null);

  const m5Ref = useRef<HTMLDivElement>(null);
  const m5Line1Ref = useRef<HTMLDivElement>(null);
  const m5Line2Ref = useRef<HTMLDivElement>(null);
  const m5Line3Ref = useRef<HTMLDivElement>(null);
  const m5CountRef = useRef<HTMLDivElement>(null);
  const m5DoorRef = useRef<HTMLDivElement>(null);

  

  /* Film grain canvas */
  const grainRef = useRef<HTMLCanvasElement>(null);

  /* Dust container */
  const dustRef = useRef<HTMLDivElement>(null);

  /* ──────────── FILM GRAIN — subtle analog texture ──────────── */
  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 256;
    const h = 256;
    canvas.width = w;
    canvas.height = h;

    function renderGrain() {
      const imgData = ctx!.createImageData(w, h);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 14; // very subtle
      }
      ctx!.putImageData(imgData, 0, 0);
      animId = requestAnimationFrame(renderGrain);
    }
    renderGrain();
    return () => cancelAnimationFrame(animId);
  }, []);

  /* ──────────── GSAP ORCHESTRATION ──────────── */
  useGSAP(
    () => {
      if (!wrapRef.current) return;

      const ctx = gsap.context(() => {
        const splits: { revert: () => void }[] = [];

        /* ─── helper: cinematic section entrance ("camera movement") ─── */


        /* ─── helper: premium character reveal (cinematic version) ─── */
        function charReveal(
          el: HTMLElement,
          trigger: HTMLElement,
          start = "top 78%",
          duration = 1.04, 
          stagger = 0.018,
          
          fromVars: gsap.TweenVars = {}
        ) {
          const split = new SplitText(el, { type: "chars" });
          const defaults = {
            opacity: 0,
            y: 100,
            rotateX: 35,
            filter: "blur(18px)",
            letterSpacing: "0.25em",
          };
          gsap.set(split.chars, { ...defaults, ...fromVars });
          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => {
              gsap.to(split.chars, {
                opacity: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0px)",
                letterSpacing: "0em",
                duration: 1.04,
                stagger,
                ease: "power3.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(split.chars, {
                ...defaults,
                ...fromVars,
                duration: 0.4,
                stagger: { each: stagger * 0.5, from: "end" },
                ease: "power2.in",
              });
            },
          });
          return split;
        }

        /* ─── helper: word reveal (for body text) ─── */
        function wordReveal(
          el: HTMLElement,
          trigger: HTMLElement,
          start = "top 80%",
          stagger = 0.03,
          duration = 0.8,
          fromVars: gsap.TweenVars = {}
        ) {
          const split = new SplitText(el, { type: "words" });
          const defaults = {
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
          };
          gsap.set(split.words, { ...defaults, ...fromVars });
          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => {
              gsap.to(split.words, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration,
                stagger,
                ease: "power3.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(split.words, {
                ...defaults,
                ...fromVars,
                duration: 0.4,
                stagger: { each: stagger * 0.5, from: "end" },
                ease: "power3.in",
              });
            },
          });
          return split;
        }

        /* ════════════════════════════════════════════
           MOMENT 1 — Opening statement
        ════════════════════════════════════════════ */
        if (m1Line1Ref.current && m1Line2Ref.current && m1Ref.current) {
          splits.push(
            charReveal(m1Line1Ref.current, m1Ref.current, "top 70%", 0.03, 1.1)
          );
          splits.push(
            charReveal(m1Line2Ref.current, m1Ref.current, "top 60%", 0.03, 1.1)
          );
        }
        if (m1MetaRef.current && m1Ref.current) {
          gsap.set(m1MetaRef.current, { opacity: 0, y: 20, filter: "blur(4px)" });
          ScrollTrigger.create({
            trigger: m1Ref.current,
            start: "top 50%",
            onEnter: () => {
              gsap.to(m1MetaRef.current!, {
                opacity: 0.5,
                y: 0,
                filter: "blur(0px)",
                duration: 1.4,
                ease: "power4.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(m1MetaRef.current!, {
                opacity: 0,
                y: 20,
                filter: "blur(4px)",
                duration: 0.5,
                ease: "power2.in",
              });
            },
          });
        }

        /* ════════════════════════════════════════════
           MOMENT 2 — Reframing
        ════════════════════════════════════════════ */
        if (
          m2Line1Ref.current &&
          m2Line2Ref.current &&
          m2Line3Ref.current &&
          m2Ref.current
        ) {
          splits.push(
            charReveal(m2Line1Ref.current, m2Ref.current, "top 75%", 0.035, 1.1)
          );
          splits.push(
            charReveal(m2Line2Ref.current, m2Ref.current, "top 65%", 0.03, 1.0)
          );
          splits.push(
            charReveal(m2Line3Ref.current, m2Ref.current, "top 55%", 0.025, 1.1)
          );
        }

        /* ════════════════════════════════════════════
           MOMENT 3 — Elegant paragraph
        ════════════════════════════════════════════ */
        if (m3RuleRef.current && m3Ref.current) {
          gsap.set(m3RuleRef.current, { scaleX: 0, opacity: 0 });
          ScrollTrigger.create({
            trigger: m3Ref.current,
            start: "top 75%",
            onEnter: () => {
              gsap.to(m3RuleRef.current!, {
                scaleX: 1,
                opacity: 0.3,
                duration: 1.8,
                ease: "power3.inOut",
              });
            },
            onLeaveBack: () => {
              gsap.to(m3RuleRef.current!, {
                scaleX: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in",
              });
            },
          });
        }
        if (m3Para1Ref.current && m3Ref.current) {
          splits.push(
            wordReveal(m3Para1Ref.current, m3Ref.current, "top 65%", 0.04, 0.8)
          );
        }
        if (m3Para2Ref.current && m3Ref.current) {
          splits.push(
            wordReveal(m3Para2Ref.current, m3Ref.current, "top 48%", 0.045, 0.8)
          );
        }

        /* ════════════════════════════════════════════
           MOMENT 4 — Monument word
        ════════════════════════════════════════════ */
        if (m4WordRef.current && m4Ref.current) {
          const bigSplit = new SplitText(m4WordRef.current, { type: "chars" });
          splits.push(bigSplit);
          gsap.set(bigSplit.chars, {
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
          });

          ScrollTrigger.create({
            trigger: m4Ref.current,
            start: "top 65%",
            onEnter: () => {
              gsap.to(bigSplit.chars, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.4,
                stagger: 0.04,
                ease: "power3.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(bigSplit.chars, {
                opacity: 0,
                y: 40,
                filter: "blur(8px)",
                duration: 0.6,
                stagger: { each: 0.02, from: "end" },
                ease: "power3.in",
              });
            },
          });
        }
        if (m4SubRef.current && m4Ref.current) {
          gsap.set(m4SubRef.current, {
            opacity: 0,
            y: 30,
            filter: "blur(6px)",
          });
          ScrollTrigger.create({
            trigger: m4Ref.current,
            start: "top 40%",
            onEnter: () => {
              gsap.to(m4SubRef.current!, {
                opacity: 0.55,
                y: 0,
                filter: "blur(0px)",
                duration: 1.4,
                ease: "power4.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(m4SubRef.current!, {
                opacity: 0,
                y: 30,
                filter: "blur(6px)",
                duration: 0.4,
                ease: "power2.in",
              });
            },
          });
        }
        if (m4TaxRef.current && m4Ref.current) {
          gsap.set(m4TaxRef.current, { opacity: 0, y: 10 });
          ScrollTrigger.create({
            trigger: m4Ref.current,
            start: "top 35%",
            onEnter: () => {
              gsap.to(m4TaxRef.current!, {
                opacity: 1,
                y: 0,
                duration: 1.4,
                ease: "power4.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(m4TaxRef.current!, {
                opacity: 0,
                y: 10,
                duration: 0.5,
                ease: "power2.in",
              });
            },
          });
        }

        /* ════════════════════════════════════════════
           MOMENT 5 — The archive doorway
        ════════════════════════════════════════════ */
        if (m5Ref.current) {
          if (m5DoorRef.current) {
            gsap.set(m5DoorRef.current, { scaleY: 0 });
            ScrollTrigger.create({
              trigger: m5Ref.current,
              start: "top 78%",
              onEnter: () => {
                gsap.to(m5DoorRef.current!, {
                  scaleY: 1,
                  duration: 1.8,
                  ease: "power3.inOut",
                });
              },
              onLeaveBack: () => {
                gsap.to(m5DoorRef.current!, {
                  scaleY: 0,
                  duration: 0.6,
                  ease: "power2.in",
                });
              },
            });
          }

          if (m5Line1Ref.current) {
            splits.push(
              charReveal(m5Line1Ref.current, m5Ref.current, "top 68%", 0.03, 1.1)
            );
          }
          if (m5Line2Ref.current) {
            splits.push(
              charReveal(m5Line2Ref.current, m5Ref.current, "top 58%", 0.03, 1.1)
            );
          }

          if (m5CountRef.current) {
            gsap.set(m5CountRef.current, {
              opacity: 0,
              y: 20,
              filter: "blur(4px)",
            });
            ScrollTrigger.create({
              trigger: m5Ref.current,
              start: "top 42%",
              onEnter: () => {
                gsap.to(m5CountRef.current!, {
                  opacity: 0.6,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 1.2,
                  ease: "power4.out",
                });
              },
              onLeaveBack: () => {
                gsap.to(m5CountRef.current!, {
                  opacity: 0,
                  y: 20,
                  filter: "blur(4px)",
                  duration: 0.4,
                  ease: "power2.in",
                });
              },
            });
          }

          if (m5Line3Ref.current) {
            gsap.set(m5Line3Ref.current, { opacity: 0, y: 12 });
            ScrollTrigger.create({
              trigger: m5Ref.current,
              start: "top 35%",
              onEnter: () => {
                gsap.to(m5Line3Ref.current!, {
                  opacity: 0.45,
                  y: 0,
                  duration: 1.2,
                  ease: "power4.out",
                });
              },
              onLeaveBack: () => {
                gsap.to(m5Line3Ref.current!, {
                  opacity: 0,
                  y: 12,
                  duration: 0.4,
                  ease: "power2.in",
                });
              },
            });
          }
        }

        if (dustRef.current) {
          const dustEls = dustRef.current.children;
          for (let i = 0; i < dustEls.length; i++) {
            const p = DUST_PARTICLES[i];
            const el = dustEls[i] as HTMLElement;
            gsap.to(el, {
              y: `-=${p.driftY}`,
              x: `+=${p.driftX}`,
              opacity: 0,
              duration: p.dur,
              ease: "none",
              repeat: -1,
              delay: p.del,
            });
          }
        }

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
      {/* ─── Film grain canvas ─── */}
      <canvas
        ref={grainRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          width: "100%",
          height: "100%",
          opacity: 0.35,
          mixBlendMode: "overlay",
        }}
      />

      {/* ─── Dust particles ─── */}
      <div
        ref={dustRef}
        className="pointer-events-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {DUST_PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: p.w,
              height: p.h,
              borderRadius: "50%",
              background: BRONZE,
              opacity: p.opacity,
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
          />
        ))}
      </div>

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
         MOMENT 1 — BEFORE THERE WERE MACHINES
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
            position: "relative",
            overflow: "hidden",
          }}
        >
          INGENUITY

        </div>

        <div
          ref={m4SubRef}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 20,
            letterSpacing: "0.5em",
            color: BRONZE,
            marginTop: 40,
            textAlign: "center",
          }}
        >
          THE HUMAN IMPULSE TO CREATE
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
