"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ============================================================
   DESIGN TOKENS
============================================================ */

const INK = "#080604";
const STONE = "#E8DDC7";
const BRONZE = "#B08D57";
const OXIDE = "#527A65";
const ARCHIVE_RED = "#8B2E2E";

interface HeroSectionProps {
  isReady: boolean;
}

interface HeroRefs {
  section: HTMLElement;
  scene: HTMLDivElement;
  ring: SVGSVGElement;
  ringCircle: SVGCircleElement;
  museum: HTMLDivElement;
  of: HTMLDivElement;
  lostTechnology: HTMLDivElement;
  evolution: HTMLDivElement;
  evolutionSub: HTMLDivElement;
  labels: HTMLDivElement[];
}

/* Deterministic pseudo-disorder — never Math.random, always a
   function of index, so the misalignment is reproducible and
   the calibration animation reverses to the exact same state. */
const misalignX = (i: number) => Math.sin(i * 2.1) * 22;
const misalignY = (i: number) => Math.cos(i * 1.7) * 16;
const misalignR = (i: number) => Math.sin(i * 3.3) * 9;

/* ============================================================
   CALIBRATION TIMELINE
   The typography starts as a malfunctioning archive record —
   wide tracking, letters adrift, the ring cracked open. A single
   pass corrects it, like an old machine finding its register.
============================================================ */

function calibrationTimeline(
  refs: HeroRefs,
  museumChars: Element[],
  lostTechChars: Element[]
) {
  const tl = gsap.timeline({ delay: 0.1 });

  gsap.set([refs.museum, refs.lostTechnology], { letterSpacing: "80px" });
  gsap.set(museumChars, {
    x: (i) => misalignX(i),
    y: (i) => misalignY(i),
    rotate: (i) => misalignR(i),
  });
  gsap.set(lostTechChars, {
    x: (i) => misalignX(i + 4),
    y: (i) => misalignY(i + 4),
    rotate: (i) => misalignR(i + 4),
  });
  gsap.set(refs.of, { rotate: -14, letterSpacing: "0.8em" });
  gsap.set(refs.ring, { rotate: -20, opacity: 0 });
  gsap.set(refs.labels, { x: -10 });

  tl.to([refs.museum, refs.lostTechnology], {
    letterSpacing: "0.01em",
    duration: 2.2,
    ease: "power3.out",
  }, 0)
    .to(museumChars, {
      x: 0, y: 0, rotate: 0,
      duration: 2.2,
      ease: "power3.out",
      stagger: { each: 0.02, from: "random" },
    }, 0)
    .to(lostTechChars, {
      x: 0, y: 0, rotate: 0,
      duration: 2.2,
      ease: "power3.out",
      stagger: { each: 0.02, from: "random" },
    }, 0.05)
    .to(refs.of, {
      rotate: 0,
      letterSpacing: "0.35em",
      duration: 1.6,
      ease: "power3.out",
    }, 0.2)
    .to(refs.ring, { rotate: 0, opacity: 0.35, duration: 1.8, ease: "power2.out" }, 0.3)
    .to(refs.labels, { x: 0, duration: 1.2, ease: "power2.out", stagger: 0.1 }, 0.5);

  return tl;
}

/* ============================================================
   SCROLL TIMELINE
   One scrubbed timeline, driven by a perspective wrapper. The
   poster bends in 3D, the words separate along their own axes,
   then compress toward center and morph into the evolution title.
   The broken ring completes itself. Every property is a transform —
   nothing fades, nothing is removed, so scrolling up rebuilds
   the calibrated state exactly.
============================================================ */

function scrollTimeline(refs: HeroRefs) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: refs.section,
      start: "top top",
      end: "+=240%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  // PHASE 1 — the poster bends. Words separate along their own axis.
  tl.to(refs.scene, { rotateX: 7, rotateY: -9, duration: 1, ease: "none" }, 0)
    .to(refs.museum, { x: -70, y: -20, duration: 1, ease: "none" }, 0)
    .to(refs.lostTechnology, { x: 60, y: 30, duration: 1, ease: "none" }, 0)
    .to(refs.of, { y: -10, duration: 1, ease: "none" }, 0)
    .to(refs.ring, { rotate: 24, scale: 1.08, duration: 1, ease: "none" }, 0);

  // PHASE 2 — the composition flattens back, words converge toward center.
  // The ring rotates further, the 3D bend deepens before resolving.
  tl.to(refs.scene, { rotateX: 14, rotateY: -20, duration: 1, ease: "none" }, 1).to(
    refs.ring,
    { rotate: 55, scale: 1.22, duration: 1, ease: "none" },
    1
  );

  // PHASE 3 — The title compresses. The museum words shrink and converge
  // into center. The evolution title scales up from 0 in their place.
  // The broken ring completes — its dasharray smooths to a full circle.
  tl.to(
    [refs.museum, refs.of, refs.lostTechnology],
    { scale: 0.18, opacity: 0, duration: 1, ease: "none" },
    2
  )
    .to(refs.museum, { x: 0, y: 0, duration: 1, ease: "none" }, 2)
    .to(refs.lostTechnology, { x: 0, y: 0, duration: 1, ease: "none" }, 2)
    .to(refs.of, { y: 0, duration: 1, ease: "none" }, 2)
    // Flatten the 3D bend as the transition resolves
    .to(refs.scene, { rotateX: 0, rotateY: 0, duration: 1, ease: "none" }, 2)
    // The ring completes — rotation resolves to 0, it settles
    .to(refs.ring, { rotate: 0, scale: 1, opacity: 0.5, duration: 1, ease: "none" }, 2)
    // Complete the ring by animating strokeDasharray to a full circle
    .to(refs.ringCircle, {
      attr: { "stroke-dasharray": "1200 0" },
      duration: 1,
      ease: "none",
    }, 2)
    // The evolution title emerges
    .to(refs.evolution, { scale: 1, opacity: 1, duration: 1, ease: "none" }, 2.15)
    .to(refs.evolutionSub, { scale: 1, opacity: 1, duration: 1, ease: "none" }, 2.3);

  return tl;
}

/* ============================================================
   COMPONENT
============================================================ */

export default function HeroSection({ isReady }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const ringCircleRef = useRef<SVGCircleElement>(null);
  const museumRef = useRef<HTMLDivElement>(null);
  const ofRef = useRef<HTMLDivElement>(null);
  const lostTechnologyRef = useRef<HTMLDivElement>(null);
  const evolutionRef = useRef<HTMLDivElement>(null);
  const evolutionSubRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement[]>([]);

  const addLabelRef = (el: HTMLDivElement | null) => {
    if (el && !labelsRef.current.includes(el)) {
      labelsRef.current.push(el);
    }
  };

  useGSAP(
    () => {
      if (
        !isReady ||
        !sectionRef.current ||
        !museumRef.current ||
        !lostTechnologyRef.current
      )
        return;

      console.log("HERO INITIALIZED");

      labelsRef.current = [];

      const ctx = gsap.context(() => {
        const museumSplit = new SplitText(museumRef.current!, { type: "chars" });
        const lostTechSplit = new SplitText(lostTechnologyRef.current!, { type: "chars" });

        const refs: HeroRefs = {
          section: sectionRef.current!,
          scene: sceneRef.current!,
          ring: ringRef.current!,
          ringCircle: ringCircleRef.current!,
          museum: museumRef.current!,
          of: ofRef.current!,
          lostTechnology: lostTechnologyRef.current!,
          evolution: evolutionRef.current!,
          evolutionSub: evolutionSubRef.current!,
          labels: labelsRef.current,
        };

        // Evolution title starts invisible and small
        gsap.set([refs.evolution, refs.evolutionSub], { scale: 0.6, opacity: 0 });

        calibrationTimeline(refs, museumSplit.chars, lostTechSplit.chars);
        scrollTimeline(refs);

        return () => {
          museumSplit.revert();
          lostTechSplit.revert();
        };
      }, sectionRef);

      return () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    },
    { scope: sectionRef, dependencies: [isReady] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: INK, perspective: "1400px" }}
    >
      {/* HUGE FAINT ARCHIVE NUMBER — behind everything */}
      <div
        className="absolute left-[-4%] top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
        style={{
          color: STONE,
          opacity: 0.045,
          fontSize: "clamp(320px,42vw,760px)",
          lineHeight: 0.8,
        }}
      >
        001
      </div>

      {/* SWISS GRID HAIRLINES — an anti-design structural device */}
      <div
        className="absolute left-[32%] top-0 bottom-0 w-px pointer-events-none"
        style={{ backgroundColor: BRONZE, opacity: 0.18 }}
      />
      <div
        className="absolute top-[22%] left-0 right-0 h-px pointer-events-none"
        style={{ backgroundColor: BRONZE, opacity: 0.18 }}
      />

      {/* SCENE — the 3D-bending poster surface */}
      <div
        ref={sceneRef}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* BROKEN INSTRUMENT RING — deliberately incomplete, completes on scroll */}
        <svg
          ref={ringRef}
          viewBox="0 0 400 400"
          className="absolute left-[38%] top-[46%] -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[900px] pointer-events-none"
        >
          <circle
            ref={ringCircleRef}
            cx="200"
            cy="200"
            r="188"
            fill="none"
            stroke={BRONZE}
            strokeWidth="1"
            strokeDasharray="120 26 60 40 90 18"
          />
        </svg>

        {/* TITLE — asymmetric, unexpected placement */}
        <div
          ref={museumRef}
          className="absolute left-[6%] top-[12%] font-black uppercase leading-[0.8]"
          style={{ color: STONE, fontSize: "clamp(64px,11vw,180px)" }}
        >
          MUSEUM
        </div>

        <div
          ref={ofRef}
          className="absolute left-[34%] top-[46%] font-mono text-xs md:text-sm"
          style={{ color: BRONZE }}
        >
          OF
        </div>

        <div
          ref={lostTechnologyRef}
          className="absolute right-[4%] bottom-[10%] text-right font-black uppercase leading-[0.8] whitespace-nowrap"
          style={{ color: STONE, fontSize: "clamp(50px,8.5vw,160px)" }}
        >
          LOST TECHNOLOGY
        </div>

        {/* EVOLUTION TITLE — emerges as the museum title compresses away */}
        <div
          ref={evolutionRef}
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 text-center font-black uppercase leading-[0.82]"
          style={{
            color: STONE,
            fontSize: "clamp(48px,9vw,150px)",
            whiteSpace: "nowrap",
          }}
        >
          THE EVOLUTION
        </div>
        <div
          ref={evolutionSubRef}
          className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-center font-black uppercase leading-[0.82]"
          style={{
            color: BRONZE,
            fontSize: "clamp(25px,4.5vw,80px)",
            whiteSpace: "nowrap",
          }}
        >
          OF TECHNOLOGY
        </div>
      </div>

      {/* SMALL ARCHIVE LABELS — subtle, catalog-style, unfaded */}
      <div
        ref={addLabelRef}
        className="absolute left-[6%] bottom-[6%] font-mono text-[10px] tracking-[0.3em]"
        style={{ color: BRONZE, opacity: 0.65 }}
      >
        ARCHIVE 001
      </div>
      <div
        ref={addLabelRef}
        className="absolute right-[6%] top-[8%] font-mono text-[10px] tracking-[0.3em]"
        style={{ color: ARCHIVE_RED, opacity: 0.65 }}
      >
        RECOVERED
      </div>
      <div
        ref={addLabelRef}
        className="absolute left-[6%] top-[8%] font-mono text-[10px] tracking-[0.3em]"
        style={{ color: OXIDE, opacity: 0.65 }}
      >
        EST. MMXXVI
      </div>
    </section>
  );
}
