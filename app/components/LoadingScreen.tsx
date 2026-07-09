"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(TextPlugin, ScrambleTextPlugin);

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const warmLightRef = useRef<HTMLDivElement>(null);

  // Phase refs
  const phase1Ref = useRef<HTMLDivElement>(null);
  const offlineLineRef = useRef<HTMLDivElement>(null);
  const connectionLineRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const phase2Ref = useRef<HTMLDivElement>(null);
  const restoringTextRef = useRef<HTMLDivElement>(null);
  const progressBlocksRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLDivElement>(null);

  const phase3Ref = useRef<HTMLDivElement>(null);
  const counterNumRef = useRef<HTMLDivElement>(null);
  const counterLabelRef = useRef<HTMLDivElement>(null);
  const flashContainerRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  const phase4Ref = useRef<HTMLDivElement>(null);
  const restoredTextRef = useRef<HTMLDivElement>(null);

  const phase5Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        /* ═══════════════════════════════════════════
           EXIT — Archive doors open with warm light
           ═══════════════════════════════════════════ */
        const exit = gsap.timeline({ onComplete });

        // Content fades
        exit.to(contentRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        });

        // Warm museum light bleeds through
        exit.to(
          warmLightRef.current,
          {
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          0.2
        );
    
      },
    });



    /* ═══════════════════════════════════════════════════════════
       PHASE 3 — ARCHIVE COUNTER (5–7.5s)
       "Mechanical counter / archive scanner"
       ═══════════════════════════════════════════════════════════ */

    tl.set(phase3Ref.current, { opacity: 1 });

    // Counter label fades in
    tl.fromTo(
      counterLabelRef.current,
      { opacity: 0 },
      { opacity: 0.6, duration: 0.3, ease: "power2.out" }
    );

    // Scanline sweep — analog measuring device feel
    tl.set(scanlineRef.current, { opacity: 0.3 });

    const nums = ["000000", "000147", "004821", "019942", "047000"];
    const counterEl = counterNumRef.current;
    const flashEl = flashContainerRef.current;

    if (counterEl && flashEl) {
      const flashKids = flashEl.querySelectorAll(".flash-item");

      nums.forEach((n, i) => {
        // Number scrambles — mechanical counter feel
        tl.to(counterEl, {
          scrambleText: { text: n, chars: "0123456789", speed: 0.6 },
          duration: 0.35,
          ease: "none",
        });

        // Subliminal artifact flash — milliseconds only
        if (flashKids[i]) {
          tl.set(flashKids[i], { opacity: 0.8 });
          tl.to(flashKids[i], { opacity: 0, duration: 0.08 }, "+=0.03");
        }
      });
    }

    // Scanline fades
    tl.to(scanlineRef.current, { opacity: 0, duration: 0.2 });

    // Phase 3 exits
    tl.to(phase3Ref.current, { opacity: 0, duration: 0.3, ease: "power2.in" });

    /* ═══════════════════════════════════════════════════════════
       PHASE 4 — ARCHIVE RESTORED (7.5–8.5s)
       "Old scientific equipment turning on"
       Subtle analog interference — NOT gaming glitch
       ═══════════════════════════════════════════════════════════ */

    tl.set(phase4Ref.current, { opacity: 1 });

    if (restoredTextRef.current) {
      // Text materializes from blur — old monitor powering on
      tl.fromTo(
        restoredTextRef.current,
        { opacity: 0, filter: "blur(12px)", y: 5 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.5, ease: "power3.out" }
      );

      // Subtle analog interference — horizontal displacement + flicker (0.3s max)
      tl.to(restoredTextRef.current, {
        x: 3,
        opacity: 0.6,
        duration: 0.04,
        ease: "none",
      });
      tl.to(restoredTextRef.current, {
        x: -2,
        opacity: 0.9,
        duration: 0.04,
        ease: "none",
      });
      tl.to(restoredTextRef.current, {
        x: 1,
        opacity: 0.5,
        duration: 0.03,
        ease: "none",
      });
      tl.to(restoredTextRef.current, {
        x: -1,
        opacity: 0.8,
        duration: 0.04,
        ease: "none",
      });
      tl.to(restoredTextRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      });
    }

    // Hold — signal stabilizes
    tl.to({}, { duration: 0.5 });

    // Phase 4 exits
    tl.to(phase4Ref.current, { opacity: 0, duration: 0.3, ease: "power2.in" });

    /* ═══════════════════════════════════════════════════════════
       PHASE 5 — FINAL STATE (8.5–10s)
       "Welcome to the archive"
       ═══════════════════════════════════════════════════════════ */

    tl.set(phase5Ref.current, { opacity: 1 });

    const finalLines = phase5Ref.current?.querySelectorAll(".final-line");
    if (finalLines) {
      finalLines.forEach((line, i) => {
        tl.fromTo(
          line,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          i === 0 ? undefined : "-=0.15"
        );
      });
    }

    // Hold — anticipation before the archive opens
    tl.to({}, { duration: 0.8 });
  }, { scope: containerRef });

  /* ═══════════════════════════════════════════════════════════
     MEMORY BLOCK INDICATORS — 10 blocks for progress display
     ═══════════════════════════════════════════════════════════ */
  const BLOCK_COUNT = 10;

  return (
    <div ref={containerRef} className="loading-screen">
      {/* ──── Curtain panels ──── */}
      <div ref={leftRef} className="loading-panel loading-panel-left">
        {/* Warm light leak — visible when doors open */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40px",
            height: "100%",
            background:
              "linear-gradient(to left, rgba(176, 141, 87, 0.15), transparent)",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </div>
      <div ref={rightRef} className="loading-panel loading-panel-right">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "40px",
            height: "100%",
            background:
              "linear-gradient(to right, rgba(176, 141, 87, 0.15), transparent)",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ──── Warm museum light behind the curtain ──── */}
      <div
        ref={warmLightRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10000,
          opacity: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(176, 141, 87, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* ──── Paper grain overlay ──── */}
      <div
        style={{
          position: "absolute",
          inset: "-50%",
          width: "200%",
          height: "200%",
          opacity: 0.025,
          pointerEvents: "none",
          zIndex: 10003,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: "grain 0.4s steps(8) infinite",
        }}
      />

      {/* ──── Analog scanline overlay ──── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 10003,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 6px)",
          opacity: 0.5,
        }}
      />

      {/* ──── Content area ──── */}
      <div ref={contentRef} className="loading-content">
        {/* ══════════════════════════════
           PHASE 1 — SYSTEM AWAKENING
           ══════════════════════════════ */}
        <div
          ref={phase1Ref}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          {/* ARCHIVE SYSTEM / OFFLINE */}
          <div
            ref={offlineLineRef}
            style={{
              textAlign: "center",
              opacity: 0,
            }}
          >
            <div
              className="t-mono"
              style={{
                color: "var(--bronze)",
                fontSize: "11px",
                letterSpacing: "0.4em",
                marginBottom: "12px",
              }}
            >
              ARCHIVE SYSTEM
            </div>
            <div
              className="t-mono"
              style={{
                color: "var(--ivory-dim)",
                fontSize: "10px",
                letterSpacing: "0.5em",
              }}
            >
              OFFLINE
            </div>
          </div>

          {/* CONNECTION ESTABLISHED — typewriter target */}
          <div
            ref={connectionLineRef}
            className="t-mono"
            style={{
              position: "absolute",
              opacity: 0,
              color: "var(--bronze)",
              fontSize: "10px",
              letterSpacing: "0.4em",
              textAlign: "center",
            }}
          />

          {/* Blinking cursor */}
          <span
            ref={cursorRef}
            className="t-mono"
            style={{
              position: "absolute",
              bottom: "calc(50% - 30px)",
              opacity: 0,
              color: "var(--bronze)",
              fontSize: "12px",
              animation: "blink 0.8s ease-in-out infinite",
            }}
          >
            _
          </span>
        </div>

        {/* ══════════════════════════════
           PHASE 2 — RESTORATION PROCESS
           ══════════════════════════════ */}
        <div
          ref={phase2Ref}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            opacity: 0,
          }}
        >
          {/* "RESTORING HISTORICAL DATABASE..." — typewriter */}
          <div
            ref={restoringTextRef}
            className="t-mono"
            style={{
              color: "var(--ivory-dim)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              minHeight: "14px",
            }}
          />

          {/* Memory block progress — scientific instrument reading */}
          <div style={{ textAlign: "center" }}>
            <div
              ref={progressLabelRef}
              className="t-mono-sm"
              style={{
                color: "var(--bronze)",
                fontSize: "8px",
                letterSpacing: "0.5em",
                marginBottom: "10px",
                opacity: 0,
              }}
            >
              MEMORY BLOCK
            </div>
            <div
              ref={progressBlocksRef}
              style={{
                display: "flex",
                gap: "3px",
                justifyContent: "center",
              }}
            >
              {Array.from({ length: BLOCK_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className="mem-block"
                  style={{
                    width: "18px",
                    height: "8px",
                    border: "1px solid var(--bronze)",
                    opacity: 0.2,
                    backgroundColor: "transparent",
                    transition: "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
           PHASE 3 — ARCHIVE COUNTER
           ══════════════════════════════ */}
        <div
          ref={phase3Ref}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          {/* Counter label */}
          <div
            ref={counterLabelRef}
            className="t-mono-sm"
            style={{
              color: "var(--bronze)",
              fontSize: "8px",
              letterSpacing: "0.6em",
              marginBottom: "16px",
              opacity: 0,
            }}
          >
            ARCHIVE RECORDS
          </div>

          {/* Counter number — mechanical / analog feel */}
          <div style={{ position: "relative" }}>
            <div
              ref={counterNumRef}
              className="t-display"
              style={{
                fontSize: "clamp(60px, 12vw, 160px)",
                letterSpacing: "0.08em",
                color: "var(--ivory)",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              000000
            </div>

            {/* Subliminal artifact name flashes — behind the numbers */}
            <div
              ref={flashContainerRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              {[
                "ANTIKYTHERA",
                "BABBAGE",
                "COLOSSUS",
                "VOYAGER",
                "APOLLO",
              ].map((txt, i) => (
                <div
                  key={i}
                  className="flash-item t-mono"
                  style={{
                    position: "absolute",
                    opacity: 0,
                    fontSize: "14px",
                    letterSpacing: "0.3em",
                    color: "var(--gold)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {txt}
                </div>
              ))}
            </div>
          </div>

          {/* Thin scanline — analog measuring device */}
          <div
            ref={scanlineRef}
            style={{
              width: "200px",
              height: "1px",
              marginTop: "20px",
              background:
                "linear-gradient(to right, transparent, var(--bronze), transparent)",
              opacity: 0,
            }}
          />
        </div>

        {/* ══════════════════════════════
           PHASE 4 — ARCHIVE RESTORED
           Subtle analog interference
           ══════════════════════════════ */}
        <div
          ref={phase4Ref}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          <div
            ref={restoredTextRef}
            className="t-display"
            style={{
              fontSize: "clamp(30px, 6vw, 70px)",
              letterSpacing: "0.05em",
              color: "var(--ivory)",
              whiteSpace: "nowrap",
              opacity: 0,
            }}
          >
            ARCHIVE RESTORED
          </div>
        </div>

        {/* ══════════════════════════════
           PHASE 5 — FINAL STATE
           ══════════════════════════════ */}
        <div
          ref={phase5Ref}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0",
            opacity: 0,
          }}
        >
          <div
            className="final-line t-mono"
            style={{
              opacity: 0,
              color: "var(--gold)",
              fontSize: "11px",
              letterSpacing: "0.4em",
              marginBottom: "10px",
            }}
          >
            ARCHIVE ONLINE
          </div>

          {/* Thin divider */}
          <div
            className="final-line"
            style={{
              opacity: 0,
              width: "40px",
              height: "1px",
              background: "var(--bronze)",
              marginBottom: "14px",
            }}
          />

          <div
            className="final-line t-mono"
            style={{
              opacity: 0,
              color: "var(--ivory-dim)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              marginBottom: "6px",
            }}
          >
            7 ARTIFACTS RECOVERED
          </div>

          <div
            className="final-line t-mono"
            style={{
              opacity: 0,
              color: "var(--ivory-dim)",
              fontSize: "9px",
              letterSpacing: "0.4em",
              marginBottom: "18px",
            }}
          >
            2000 YEARS RESTORED
          </div>

          <div
            className="final-line t-mono"
            style={{
              opacity: 0,
              color: "var(--ivory)",
              fontSize: "12px",
              letterSpacing: "0.6em",
            }}
          >
            WELCOME
          </div>
        </div>
      </div>
    </div>
  );
}
