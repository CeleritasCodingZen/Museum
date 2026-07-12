"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ════════════════════════════════════════════════════════════════
   ARTIFACT DATA
   ════════════════════════════════════════════════════════════════ */
const artifacts = [
  {
    id: "001",
    name: "ANTIKYTHERA MECHANISM",
    tagline: "THE FIRST COMPUTER WAS BUILT 2000 YEARS AGO.",
    year: "~100 BCE",
    origin: "ANCIENT GREECE",
    classification: "RECOVERED",
    image: "/antikythera.png",
    description: "An ancient Greek hand-powered orrery, described as the oldest known example of an analogue computer. Used to predict astronomical positions and eclipses decades in advance.",
    style: "bronze", // warm mechanical
  },
  {
    id: "002",
    name: "VOYNICH MANUSCRIPT",
    tagline: "A LANGUAGE THAT HAS NEVER BEEN DECODED.",
    year: "~1404 CE",
    origin: "UNKNOWN",
    classification: "UNSOLVED",
    image: "/voynich.png",
    description: "An illustrated codex hand-written in an otherwise unknown writing system, referred to as 'Voynichese'. The manuscript has been carbon-dated to the early 15th century.",
    style: "paper", // organic parchment
  },
  {
    id: "003",
    name: "BABBAGE ENGINE",
    tagline: "A COMPUTER BEFORE ELECTRICITY.",
    year: "1837 CE",
    origin: "UNITED KINGDOM",
    classification: "UNFINISHED",
    image: "/babbage.png",
    description: "Charles Babbage's Analytical Engine — a proposed mechanical general-purpose computer. It was the first design for a Turing-complete machine, over a century before electronic computers.",
    style: "mechanical", // gears and precision
  },
  {
    id: "004",
    name: "ENIAC",
    tagline: "30 TONS. 17,468 VACUUM TUBES. THE DAWN OF COMPUTATION.",
    year: "1945 CE",
    origin: "UNITED STATES",
    classification: "DECLASSIFIED",
    image: "/eniac.png",
    description: "The Electronic Numerical Integrator and Computer — the first programmable, electronic, general-purpose digital computer. Originally classified, built to calculate artillery firing tables.",
    style: "terminal", // 1940s lab
  },
  {
    id: "005",
    name: "COLOSSUS",
    tagline: "DECLASSIFIED AFTER 50 YEARS.",
    year: "1943 CE",
    origin: "BLETCHLEY PARK",
    classification: "TOP SECRET",
    image: "/antikythera.png",
    description: "The world's first programmable electronic digital computer, used by British codebreakers to help read encrypted German messages during World War II. Its existence was kept secret until the 1970s.",
    style: "classified", // military redacted
  },
  {
    id: "006",
    name: "APOLLO GUIDANCE COMPUTER",
    tagline: "64KB TOOK HUMANITY TO THE MOON.",
    year: "1966 CE",
    origin: "NASA",
    classification: "MISSION CRITICAL",
    image: "/apollo.png",
    description: "The AGC was the first computer to use integrated circuits. With only 74KB of memory and a 1MHz processor, it guided Apollo 11 to the lunar surface.",
    style: "mission", // NASA terminal
  },
  {
    id: "007",
    name: "VOYAGER GOLDEN RECORD",
    tagline: "WE SENT A MESSAGE TO THE UNKNOWN.",
    year: "1977 CE",
    origin: "EARTH",
    classification: "IN TRANSIT",
    image: "/voyager.png",
    description: "A phonograph record included aboard both Voyager spacecraft, containing sounds and images selected to portray the diversity of life and culture on Earth. Currently 15 billion miles from home.",
    style: "cosmic", // gold + black
  },
];

/* ════════════════════════════════════════════════════════════════
   SINGLE ARTIFACT SECTION
   ════════════════════════════════════════════════════════════════ */
function ArtifactSection({ artifact, index, isReady }: { artifact: typeof artifacts[0]; index: number; isReady: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const floatTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!isReady || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set(numRef.current, { opacity: 0, y: 20 });
      gsap.set(titleRef.current, { opacity: 0, y: 80, filter: "blur(8px)", scale: 0.96 });
      gsap.set(taglineRef.current, { opacity: 0, y: 20 });
      gsap.set(metaRef.current, { opacity: 0, y: 20 });
      gsap.set(descRef.current, { opacity: 0, y: 40 });
      gsap.set(imageContainerRef.current, { opacity: 0, scale: 0.92, y: 40, filter: "blur(15px)" });

      // Enter animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Starts animating when section is 60% down the viewport
          toggleActions: "play none none reverse", // Optional: re-plays if scrolling back up.
        }
      });

      tl.to(numRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
        .to(titleRef.current, { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power4.out" }, "-=0.2")
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.8")
        .to(metaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .to(imageContainerRef.current, {
          opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "power3.out",
          onComplete: () => {
            // start floating on the inner image wrapping div
            if (!floatTweenRef.current && imageRef.current) {
              floatTweenRef.current = gsap.to(imageRef.current, {
                y: -10,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }
          }
        }, "-=1.5");

      // Exit transition (turning page)
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.98,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // when this section's top hits top of viewport
          end: "bottom top", // when it scrolls completely out
          scrub: true,
        }
      });
    }, sectionRef);

    return () => {
      if (floatTweenRef.current) floatTweenRef.current.kill();
      ctx.revert();
    };
  }, { scope: sectionRef, dependencies: [isReady] });

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    // We attach the mouse follow slightly wrapping the floating image
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = (clientX / innerWidth - 0.5) * 10; // max 5px left/right
    const yPos = (clientY / innerHeight - 0.5) * 10; // max 5px up/down

    // We apply it to imageContainerRef to not override the floating y on imageRef
    gsap.to(imageContainerRef.current, {
      x: xPos,
      y: yPos,
      duration: 1,
      ease: "power2.out"
    });
  };

  // Style variations per artifact type
  const styleMap: Record<string, { accent: string; bg: string }> = {
    bronze: { accent: "var(--bronze)", bg: "var(--bg-deep)" },
    paper: { accent: "var(--aged-paper)", bg: "#0a0806" },
    mechanical: { accent: "var(--gold)", bg: "var(--bg-deep)" },
    terminal: { accent: "#4ade80", bg: "#030503" },
    classified: { accent: "var(--warning)", bg: "#050303" },
    mission: { accent: "#4ade80", bg: "#020503" },
    cosmic: { accent: "var(--gold)", bg: "#030303" },
  };

  const s = styleMap[artifact.style] || styleMap.bronze;

  // Render subtle specific unique details per artifact type
  const renderUniqueDetail = () => {
    switch (artifact.style) {
      case "bronze": // Antikythera
        return (
          <div style={{ position: 'absolute', top: '10%', right: '10%', opacity: 0.1, pointerEvents: 'none' }}>
            <svg width="200" height="200" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="var(--bronze)" strokeWidth="1" fill="none" strokeDasharray="4 4" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="var(--bronze)" strokeWidth="1" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="var(--bronze)" strokeWidth="1" />
            </svg>
          </div>
        );
      case "paper": // Voynich
        return (
          <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}>
            <svg width="100%" height="100%">
              <filter id={`noise-${artifact.id}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter={`url(#noise-${artifact.id})`} />
            </svg>
          </div>
        );
      case "mechanical": // Babbage
        return (
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        );
      case "terminal": // ENIAC
        return (
          <div style={{ position: 'absolute', top: '5%', left: '5%', opacity: 0.2, color: '#4ade80', fontFamily: 'monospace', fontSize: '12px' }}>
            SYS.INIT // 0x00F8<br />
            TUBES: 17468<br />
            STATUS: ONLINE
          </div>
        );
      case "classified": // Colossus
        return (
          <div style={{ position: 'absolute', bottom: '10%', right: '5%', opacity: 0.2, background: 'black', padding: '10px' }}>
            <div style={{ width: '150px', height: '12px', background: 'var(--warning)', marginBottom: '8px' }}></div>
            <div style={{ width: '100px', height: '12px', background: 'var(--warning)' }}></div>
          </div>
        );
      case "mission": // Apollo
        return (
          <div style={{ position: 'absolute', top: '50%', left: '2%', opacity: 0.2, color: '#4ade80', fontFamily: 'monospace', fontSize: '10px', writingMode: 'vertical-rl' }}>
            LAT: 0° 40′ 26.69″ N | LON: 23° 28′ 22.69″ E
          </div>
        );
      case "cosmic": // Voyager
        return (
          <div style={{ position: 'absolute', top: '50%', right: '0', width: '100px', height: '2px', background: 'var(--gold)', opacity: 0.3 }} />
        );
    }
    return null;
  };

  return (
    <section
      ref={sectionRef}
      className="artifact-page"
      style={{
        height: "100vh",
        width: "100%",
        background: s.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
      id={`artifact-${artifact.id}`}
      onMouseMove={handleMouseMove}
    >
      {renderUniqueDetail()}

      <div ref={containerRef} style={{
        display: "flex",
        width: "100%",
        height: "100%",
        maxWidth: "1800px",
        margin: "0 auto",
        flexWrap: "wrap", // For responsive stacking if needed
      }}>
        {/* LEFT 45% */}
        <div style={{
          flex: "1 1 45%",
          minWidth: "400px",
          padding: "6% 8%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}>
          <div ref={numRef} className="t-mono" style={{ color: s.accent, marginBottom: "40px" }}>
            ARTIFACT NO. {artifact.id}
          </div>

          <h2 ref={titleRef} style={{
            fontSize: "clamp(48px, 6vw, 96px)",
            fontFamily: "var(--font-display)",
            fontWeight: "bold",
            lineHeight: 0.9,
            textTransform: "uppercase",
            margin: "0 0 32px 0",
            color: "#ffffff"
          }}>
            {artifact.name}
          </h2>

          <div ref={taglineRef} style={{
            fontSize: "clamp(20px, 2vw, 32px)",
            fontFamily: "var(--font-display)",
            color: s.accent,
            marginBottom: "48px",
            lineHeight: 1.2,
            maxWidth: "90%",
          }}>
            {artifact.tagline}
          </div>

          <div ref={metaRef} style={{ display: "flex", gap: "32px", marginBottom: "48px" }}>
            <div>
              <div className="t-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>YEAR</div>
              <div className="t-mono" style={{ color: s.accent }}>{artifact.year}</div>
            </div>
            <div>
              <div className="t-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>ORIGIN</div>
              <div className="t-mono" style={{ color: s.accent }}>{artifact.origin}</div>
            </div>
            <div>
              <div className="t-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>CLASSIFICATION</div>
              <div className="t-mono" style={{ color: artifact.style === "classified" ? "var(--warning)" : s.accent }}>
                {artifact.classification}
              </div>
            </div>
          </div>

          <div ref={descRef} className="t-body" style={{
            maxWidth: "85%",
            fontSize: "clamp(16px, 1.2vw, 20px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.8)"
          }}>
            {artifact.description}
          </div>
        </div>

        {/* RIGHT 55% */}
        <div style={{
          flex: "1 1 55%",
          minWidth: "400px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          padding: "5%",
        }}>
          <div ref={imageContainerRef} style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}>
            <div ref={imageRef} style={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxHeight: "800px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Image
                src={artifact.image}
                alt={artifact.name}
                fill
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))"
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   EXPORT ALL ARTIFACTS
   ════════════════════════════════════════════════════════════════ */
export default function ArtifactPages({ isReady }: { isReady: boolean }) {
  return (
    <>
      {artifacts.map((artifact, index) => (
        <ArtifactSection key={artifact.id} artifact={artifact} index={index} isReady={isReady} />
      ))}

      {/* Final ending */}
      <section className="section-full" style={{
        background: "linear-gradient(to bottom, var(--bg-deep), #000)",
        padding: "120px 40px",
        height: "100vh",
      }}>
        <div style={{ textAlign: "center" }}>
          <div className="t-mono" style={{ color: "var(--bronze)", marginBottom: "40px" }}>
            END OF ARCHIVE
          </div>
          <div className="t-display t-large" style={{ marginBottom: "24px" }}>
            WHAT ELSE
          </div>
          <div className="t-display t-large" style={{ color: "var(--bronze)", margin: "0 0 60px 0" }}>
            HAVE WE FORGOTTEN?
          </div>

          <div style={{
            width: "1px", height: "80px",
            background: "linear-gradient(to bottom, var(--bronze), transparent)",
            margin: "0 auto 40px",
          }} />

          <div className="t-mono-sm" style={{ marginBottom: "8px" }}>
            MUSEUM OF LOST TECHNOLOGY
          </div>
          <div className="t-mono-sm">
            DIGITAL ARCHIVE SYSTEM — EST. MMXXVI
          </div>
        </div>
      </section>
    </>
  );
}

export { artifacts };

