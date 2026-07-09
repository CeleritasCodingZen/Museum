"use client";

import { useRef } from "react";
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

  const m5Ref = useRef<HTMLDivElement>(null);
  const m5Line1Ref = useRef<HTMLDivElement>(null);
  const m5Line2Ref = useRef<HTMLDivElement>(null);
  const m5Line3Ref = useRef<HTMLDivElement>(null);
  const m5CountRef = useRef<HTMLDivElement>(null);
  const m5DoorRef = useRef<HTMLDivElement>(null);

  /* Spotlight ref */
  const spotRef = useRef<HTMLDivElement>(null);

  /* ──────────── GSAP ORCHESTRATION ──────────── */
  useGSAP(
    () => {
      if (!wrapRef.current) return;

      const ctx = gsap.context(() => {
        /* ─── helper: premium character reveal ─── */
        function charReveal(
          el: HTMLElement,
          trigger: HTMLElement,
          start = "top 78%",
          stagger = 0.018,
          duration = 0.7
        ) {
          const split = new SplitText(el, { type: "chars" });
          gsap.set(split.chars, {
            opacity: 0,
            y: 30,
            filter: "blur(8px)",
            letterSpacing: "0.12em",
          });
          ScrollTrigger.create({
            trigger,
            start,
            onEnter: () => {
              gsap.to(split.chars, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "0em",
                duration,
                stagger,
                ease: "power3.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(split.chars, {
                opacity: 0,
                y: 30,
                filter: "blur(8px)",
                letterSpacing: "0.12em",
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
          duration = 0.6
        ) {
          const split = new SplitText(el, { type: "words" });
          gsap.set(split.words, {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
          });
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
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(split.words, {
                opacity: 0,
                y: 18,
                filter: "blur(4px)",
                duration: 0.35,
                stagger: { each: stagger * 0.5, from: "end" },
                ease: "power2.in",
              });
            },
          });
          return split;
        }

        const splits: { revert: () => void }[] = [];

        /* ════════════════════════════════════════════
           MOMENT 1 — Opening statement
           "WE DID NOT INVENT TOOLS. WE INVENTED POSSIBILITY."
        ════════════════════════════════════════════ */
        if (m1Line1Ref.current && m1Line2Ref.current && m1Ref.current) {
          splits.push(charReveal(m1Line1Ref.current, m1Ref.current, "top 70%", 0.025, 0.8));
          splits.push(charReveal(m1Line2Ref.current, m1Ref.current, "top 60%", 0.022, 0.8));
        }
        if (m1MetaRef.current && m1Ref.current) {
          gsap.set(m1MetaRef.current, { opacity: 0, y: 12 });
          ScrollTrigger.create({
            trigger: m1Ref.current,
            start: "top 50%",
            onEnter: () => {
              gsap.to(m1MetaRef.current!, { opacity: 0.5, y: 0, duration: 1, ease: "power2.out" });
            },
            onLeaveBack: () => {
              gsap.to(m1MetaRef.current!, { opacity: 0, y: 12, duration: 0.5, ease: "power2.in" });
            },
          });
        }

        /* ════════════════════════════════════════════
           MOMENT 2 — Reframing
           "Technology is not electricity. It is curiosity."
        ════════════════════════════════════════════ */
        if (m2Line1Ref.current && m2Line2Ref.current && m2Line3Ref.current && m2Ref.current) {
          splits.push(charReveal(m2Line1Ref.current, m2Ref.current, "top 75%", 0.02, 0.7));
          splits.push(charReveal(m2Line2Ref.current, m2Ref.current, "top 65%", 0.02, 0.7));
          splits.push(charReveal(m2Line3Ref.current, m2Ref.current, "top 55%", 0.025, 0.8));
        }

        /* ════════════════════════════════════════════
           MOMENT 3 — Elegant paragraph
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
          splits.push(wordReveal(m3Para1Ref.current, m3Ref.current, "top 65%", 0.025, 0.5));
        }
        if (m3Para2Ref.current && m3Ref.current) {
          splits.push(wordReveal(m3Para2Ref.current, m3Ref.current, "top 50%", 0.03, 0.55));
        }

        /* ════════════════════════════════════════════
           MOMENT 4 — Monument word: INGENUITY
        ════════════════════════════════════════════ */
        if (m4WordRef.current && m4Ref.current) {
          const bigSplit = new SplitText(m4WordRef.current, { type: "chars" });
          splits.push(bigSplit);
          gsap.set(bigSplit.chars, {
            opacity: 0,
            y: 60,
            filter: "blur(12px)",
            letterSpacing: "0.15em",
          });

          // Scrubbed parallax — the word scales subtly as user scrolls through
          gsap.fromTo(
            m4WordRef.current,
            { scale: 0.92 },
            {
              scale: 1.04,
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
              gsap.to(bigSplit.chars, {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                letterSpacing: "0.06em",
                duration: 1,
                stagger: 0.04,
                ease: "power3.out",
              });
            },
            onLeaveBack: () => {
              gsap.to(bigSplit.chars, {
                opacity: 0,
                y: 60,
                filter: "blur(12px)",
                letterSpacing: "0.15em",
                duration: 0.5,
                stagger: { each: 0.02, from: "end" },
                ease: "power2.in",
              });
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
        ════════════════════════════════════════════ */
        if (m5Ref.current) {
          if (m5Line1Ref.current) splits.push(charReveal(m5Line1Ref.current, m5Ref.current, "top 72%", 0.022, 0.7));
          if (m5Line2Ref.current) splits.push(charReveal(m5Line2Ref.current, m5Ref.current, "top 62%", 0.02, 0.7));
          if (m5Line3Ref.current) splits.push(charReveal(m5Line3Ref.current, m5Ref.current, "top 52%", 0.02, 0.7));

          if (m5CountRef.current) {
            gsap.set(m5CountRef.current, { opacity: 0, y: 14 });
            ScrollTrigger.create({
              trigger: m5Ref.current,
              start: "top 42%",
              onEnter: () => {
                gsap.to(m5CountRef.current!, { opacity: 0.6, y: 0, duration: 0.8, ease: "power2.out" });
              },
              onLeaveBack: () => {
                gsap.to(m5CountRef.current!, { opacity: 0, y: 14, duration: 0.4, ease: "power2.in" });
              },
            });
          }
          if (m5DoorRef.current) {
            gsap.set(m5DoorRef.current, { scaleY: 0 });
            ScrollTrigger.create({
              trigger: m5Ref.current,
              start: "top 50%",
              onEnter: () => {
                gsap.to(m5DoorRef.current!, { scaleY: 1, duration: 1.6, ease: "power3.inOut" });
              },
              onLeaveBack: () => {
                gsap.to(m5DoorRef.current!, { scaleY: 0, duration: 0.6, ease: "power2.in" });
              },
            });
          }
        }

        /* ════════════════════════════════════════════
           WARM SPOTLIGHT — slow drift
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
          WE DID NOT INVENT
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
          POSSIBILITY
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
          WE INVENTED THE FUTURE
          <br />
          BEFORE WE KNEW WHAT IT WAS
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
          ELECTRICITY
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
          IT IS CURIOSITY
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
          Every civilization leaves behind its stories.
          <br />
          Most are told in language.
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
          Some leave behind machines.
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
          MUSEUM ARCHIVE — SECTION II
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
          }}
        >
          INGENUITY
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
          }}
        >
          THE DEFINING TRAIT OF EVERY ERA
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
          OPENS
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
          7 LOST TECHNOLOGIES
          <br />
          <span style={{ color: STONE_DIM, fontSize: 8, letterSpacing: "0.4em" }}>
            WAIT BEYOND THIS POINT
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
          SCROLL TO ENTER
        </div>
      </section>
    </div>
  );
}