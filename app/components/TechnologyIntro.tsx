"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
const TAXONOMY = ["FIRE", "LANGUAGE", "TOOLS", "MATHEMATICS", "ASTRONOMY", "COMPUTATION"];

/* Pre-computed dust particle data — deterministic to avoid SSR/client hydration mismatch */
const DUST_PARTICLES = Array.from({ length: 18 }, (_, i) => {
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
   ANIMATION CONSTANTS — one physics language, used everywhere
   ════════════════════════════════════════════════════════════════ */
const SECTION_HIDDEN = { opacity: 0, y: 80 };
const SECTION_VISIBLE = { opacity: 1, y: 0, duration: 1.4, ease: "expo.out" };

const BLOCK_HIDDEN = { opacity: 0, y: 60, filter: "blur(12px)", scale: 0.96 };
const BLOCK_VISIBLE = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  scale: 1,
  duration: 1.3,
  ease: "expo.out",
};

const META_HIDDEN = { opacity: 0, y: 24, filter: "blur(8px)" };
const META_VISIBLE = { opacity: 0.55, y: 0, filter: "blur(0px)", duration: 1.1, ease: "expo.out" };

/* ════════════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════════════ */
export default function TechnologyIntro({ isReady }: { isReady: boolean }) {
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
  const m3RuleRef = useRef<HTMLDivElement>(null);
  const m3Para1InnerRef = useRef<HTMLDivElement>(null);
  const m3Para1Line2InnerRef = useRef<HTMLDivElement>(null);
  const m3Para2InnerRef = useRef<HTMLDivElement>(null);
  const m3AttribRef = useRef<HTMLDivElement>(null);

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

  /* Spotlight ref */
  const spotRef = useRef<HTMLDivElement>(null);

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
      if (!isReady || !wrapRef.current) return;

      console.log("SCROLL READY");

      const ctx = gsap.context(() => {
        /* ════════════════════════════════════════════
           PERFORMANCE HINT
           Every element that will be tweened gets a
           will-change hint up front.
        ════════════════════════════════════════════ */
        const allAnimatedEls = [
          m1Ref.current,
          m1Line1Ref.current,
          m1Line2Ref.current,
          m1MetaRef.current,
          m2Ref.current,
          m2Line1Ref.current,
          m2Line2Ref.current,
          m2Line3Ref.current,
          m3Ref.current,
          m3RuleRef.current,
          m3Para1InnerRef.current,
          m3Para1Line2InnerRef.current,
          m3Para2InnerRef.current,
          m3AttribRef.current,
          m4Ref.current,
          m4WordRef.current,
          m4SubRef.current,
          m4TaxRef.current,
          m4SweepRef.current,
          m5Ref.current,
          m5Line1Ref.current,
          m5Line2Ref.current,
          m5Line3Ref.current,
          m5CountRef.current,
          m5DoorRef.current,
        ].filter(Boolean) as HTMLElement[];

        gsap.set(allAnimatedEls, { willChange: "transform, opacity, filter" });

        /* ════════════════════════════════════════════
           HELPER — one timeline per section, wired to
           a single ScrollTrigger. Enter plays it forward,
           scrolling back up reverses it. Nothing chains
           beyond this.
        ════════════════════════════════════════════ */
        function createSectionTimeline(
          sectionEl: HTMLElement,
          build: (tl: gsap.core.Timeline) => void,
          start = "top 70%"
        ) {
          const tl = gsap.timeline({ paused: true });
          tl.fromTo(sectionEl, SECTION_HIDDEN, SECTION_VISIBLE, 0);
          build(tl);

          ScrollTrigger.create({
            trigger: sectionEl,
            start,
            markers: false,
            once: false,
            onEnter: () => tl.play(),
            onLeaveBack: () => tl.reverse(),
          });

          return tl;
        }

        /* ════════════════════════════════════════════
           MOMENT 1 — Opening statement
        ════════════════════════════════════════════ */
        if (m1Ref.current) {
          createSectionTimeline(
            m1Ref.current,
            (tl) => {
              if (m1Line1Ref.current) {
                tl.fromTo(m1Line1Ref.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.1);
              }
              if (m1Line2Ref.current) {
                tl.fromTo(m1Line2Ref.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.3);
              }
              if (m1MetaRef.current) {
                tl.fromTo(m1MetaRef.current, META_HIDDEN, META_VISIBLE, 0.7);
              }
              if (spotRef.current) {
                tl.fromTo(
                  spotRef.current,
                  { opacity: 0.08 },
                  { opacity: 0.14, duration: 1.6, ease: "power2.inOut" },
                  0.2
                );
              }
            },
            "top 82%"
          );
        }

        /* ════════════════════════════════════════════
           MOMENT 2 — Reframing
           Three complete sentences, staggered by beat.
        ════════════════════════════════════════════ */
        if (m2Ref.current) {
          createSectionTimeline(m2Ref.current, (tl) => {
            if (m2Line1Ref.current) {
              tl.fromTo(m2Line1Ref.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.1);
            }
            if (m2Line2Ref.current) {
              tl.fromTo(m2Line2Ref.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.32);
            }
            if (m2Line3Ref.current) {
              tl.fromTo(m2Line3Ref.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.54);
            }
          });
        }

        /* ════════════════════════════════════════════
           MOMENT 3 — Elegant paragraph (museum plaque)
           Bronze line expands → each line rises out of
           a masked container, top to bottom.
        ════════════════════════════════════════════ */
        if (m3Ref.current) {
          createSectionTimeline(m3Ref.current, (tl) => {
            if (m3RuleRef.current) {
              tl.fromTo(
                m3RuleRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 0.3, duration: 1.3, ease: "expo.out" },
                0
              );
            }
            if (m3Para1InnerRef.current) {
              tl.fromTo(
                m3Para1InnerRef.current,
                { yPercent: 100 },
                { yPercent: 0, duration: 1.2, ease: "expo.out" },
                0.35
              );
            }
            if (m3Para1Line2InnerRef.current) {
              tl.fromTo(
                m3Para1Line2InnerRef.current,
                { yPercent: 100 },
                { yPercent: 0, duration: 1.2, ease: "expo.out" },
                0.5
              );
            }
            if (m3Para2InnerRef.current) {
              tl.fromTo(
                m3Para2InnerRef.current,
                { yPercent: 100 },
                { yPercent: 0, duration: 1.2, ease: "expo.out" },
                0.7
              );
            }
            if (m3AttribRef.current) {
              tl.fromTo(m3AttribRef.current, META_HIDDEN, META_VISIBLE, 0.95);
            }
          });
        }

        /* ════════════════════════════════════════════
           MOMENT 4 — Monument word: INGENUITY
           The word is one indivisible unit. It fades
           from darkness, rises, and settles — then a
           single bronze sweep of light crosses it once.
        ════════════════════════════════════════════ */
        if (m4Ref.current) {
          createSectionTimeline(
            m4Ref.current,
            (tl) => {
              if (m4WordRef.current) {
                tl.fromTo(
                  m4WordRef.current,
                  { opacity: 0, scale: 0.92, filter: "blur(20px)", y: 40 },
                  {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    y: 0,
                    duration: 1.5,
                    ease: "expo.out",
                  },
                  0.1
                );
              }

              if (m4SubRef.current) {
                tl.fromTo(m4SubRef.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.6);
              }
              if (m4TaxRef.current) {
                tl.fromTo(m4TaxRef.current, META_HIDDEN, META_VISIBLE, 0.85);
              }
            },
            "top 75%"
          );
        }

        /* ════════════════════════════════════════════
           MOMENT 5 — The archive doorway
        ════════════════════════════════════════════ */
        if (m5Ref.current) {
          createSectionTimeline(m5Ref.current, (tl) => {
            if (m5DoorRef.current) {
              tl.fromTo(
                m5DoorRef.current,
                { scaleY: 0 },
                { scaleY: 1, duration: 1.3, ease: "expo.out" },
                0.1
              );
            }
            if (m5Line1Ref.current) {
              tl.fromTo(m5Line1Ref.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.3);
            }
            if (m5Line2Ref.current) {
              tl.fromTo(m5Line2Ref.current, BLOCK_HIDDEN, BLOCK_VISIBLE, 0.5);
            }
            if (m5CountRef.current) {
              tl.fromTo(m5CountRef.current, META_HIDDEN, META_VISIBLE, 0.8);
            }
            if (m5Line3Ref.current) {
              tl.fromTo(
                m5Line3Ref.current,
                { opacity: 0, y: 16 },
                { opacity: 0.45, y: 0, duration: 1, ease: "expo.out" },
                1.0
              );
            }
          });
        }

        /* ════════════════════════════════════════════
           MICRO MOTION — ambient only, never text.
           Light drifts, grain flickers, dust rises.
           Once a sentence lands it does not move again.
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

        /* Layout can shift once fonts/images settle in — resync ScrollTrigger */
        ScrollTrigger.refresh();
      }, wrapRef);

      return () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: wrapRef, dependencies: [isReady] }
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
            fontSize: 15,
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
          <span style={{ display: "block", overflow: "hidden" }}>
            <span ref={m3Para1InnerRef} style={{ display: "block" }}>
              Time forgets many things.
            </span>
          </span>
          <span style={{ display: "block", overflow: "hidden" }}>
            <span ref={m3Para1Line2InnerRef} style={{ display: "block" }}>
              But every invention is a message sent forward.
            </span>
          </span>
        </div>

        <div
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
          <span style={{ display: "block", overflow: "hidden" }}>
            <span ref={m3Para2InnerRef} style={{ display: "block" }}>
              A conversation between generations.
            </span>
          </span>
        </div>

        {/* Subtle attribution */}
        <div
          ref={m3AttribRef}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 10,
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
            fontSize: 15,
            letterSpacing: "0.5em",
            color: BRONZE,
            marginTop: 40,
            textAlign: "center",
          }}
        >
          THE HUMAN INSTINCT TO CREATE WHAT DOES NOT EXIST
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
          LOST INVENTIONS
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
          AWAITS TO BE DISCOVERED
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
            fontSize: 15,
            letterSpacing: "0.35em",
            color: BRONZE,
            textAlign: "center",
            marginTop: 32,
            lineHeight: 2.6,
          }}
        >
          SEVEN MACHINES 
          <br />
          <span style={{ color: STONE_DIM, fontSize: 12, letterSpacing: "0.4em" }}>
          SEVEN STORIES OF HUMAN POSSIBILITY HUMANS DREAM
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
