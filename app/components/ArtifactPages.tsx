"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
function ArtifactSection({ artifact, index }: { artifact: typeof artifacts[0]; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Tagline letter-by-letter reveal
    if (taglineRef.current) {
      const split = new SplitText(taglineRef.current, { type: "chars,words" });
      gsap.set(split.chars, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(split.chars, {
            opacity: 1, y: 0, duration: 0.4,
            stagger: 0.015, ease: "power2.out",
          });
        },
        once: true,
      });
    }

    // Title reveal
    if (titleRef.current) {
      const titleSplit = new SplitText(titleRef.current, { type: "chars" });
      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 80,
        rotationX: -90,
        filter: "blur(8px)",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(titleSplit.chars, {
            opacity: 1, y: 0, rotationX: 0, filter: "blur(0px)",
            duration: 0.8, stagger: 0.03, ease: "power3.out",
          });
        },
        once: true,
      });
    }

    // Image parallax
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 1.15, filter: "blur(15px)" },
        {
          opacity: 0.3, scale: 1, filter: "blur(0px)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // Info panel
    if (infoRef.current) {
      gsap.fromTo(infoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Divider
    if (dividerRef.current) {
      gsap.fromTo(dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2,
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }

  }, { scope: sectionRef });

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

  return (
    <section
      ref={sectionRef}
      className="artifact-page"
      style={{ background: s.bg }}
      id={`artifact-${artifact.id}`}
    >
      {/* Intro — full screen tagline */}
      <div className="artifact-intro">
        {/* Corner labels */}
        <div className="artifact-number">
          <span className="t-mono" style={{ color: s.accent }}>ARTIFACT NO. {artifact.id}</span>
        </div>
        <div className="artifact-classification">
          <span className="t-mono" style={{ color: artifact.style === "classified" ? "var(--warning)" : s.accent }}>
            {artifact.classification}
          </span>
        </div>

        {/* Background image */}
        <div ref={imageRef} className="artifact-image">
          <Image
            src={artifact.image}
            alt={artifact.name}
            width={800}
            height={800}
            style={{ width: "60%", maxWidth: "700px", height: "auto" }}
          />
        </div>

        {/* Tagline — appears letter by letter */}
        <div ref={taglineRef} className="t-display" style={{
          fontSize: "clamp(24px, 5vw, 60px)",
          maxWidth: "900px",
          textAlign: "center",
          lineHeight: 1.1,
          color: s.accent,
          position: "relative",
          zIndex: 2,
          marginBottom: "32px",
        }}>
          {artifact.tagline}
        </div>

        {/* Title */}
        <div ref={titleRef} className="t-display t-huge" style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}>
          {artifact.name}
        </div>

        {/* Year + Origin */}
        <div style={{
          display: "flex", alignItems: "center", gap: "16px",
          marginTop: "32px", position: "relative", zIndex: 2,
        }}>
          <span className="t-mono" style={{ color: s.accent }}>{artifact.year}</span>
          <span className="divider-v" style={{ height: "12px" }} />
          <span className="t-mono-sm">{artifact.origin}</span>
        </div>
      </div>

      {/* Description block */}
      <div style={{
        padding: "80px 40px",
        display: "flex",
        justifyContent: "center",
      }}>
        <div ref={infoRef} style={{ maxWidth: "600px", opacity: 0 }}>
          <div className="t-body" style={{ marginBottom: "40px" }}>
            {artifact.description}
          </div>

          {/* Classification badge */}
          {artifact.style === "classified" && (
            <div style={{
              border: "1px solid var(--warning)",
              padding: "16px 24px",
              display: "inline-block",
            }}>
              <span className="t-mono" style={{ color: "var(--warning)" }}>
                ██████ CLASSIFIED ██████
              </span>
            </div>
          )}

          {artifact.style === "terminal" && (
            <div style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              color: "#4ade80",
              background: "#0a0f0a",
              border: "1px solid rgba(74, 222, 128, 0.15)",
              padding: "20px",
              lineHeight: 2,
            }}>
              {">"} STATUS: OPERATIONAL<br />
              {">"} VACUUM TUBES: 17,468<br />
              {">"} WEIGHT: 30 TONS<br />
              {">"} CALCULATIONS/SEC: 5,000<br />
              {">"} ████████████████ COMPLETE
            </div>
          )}

          {artifact.style === "mission" && (
            <div style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "11px",
              color: "#4ade80",
              background: "#020503",
              border: "1px solid rgba(74, 222, 128, 0.1)",
              padding: "20px",
              lineHeight: 2,
            }}>
              PROGRAM ALARM 1202<br />
              MEMORY: 74KB<br />
              CLOCK: 1.024 MHz<br />
              MISSION: APOLLO 11<br />
              STATUS: <span style={{ color: "#fff" }}>LUNAR LANDING CONFIRMED</span>
            </div>
          )}

          {artifact.style === "cosmic" && (
            <div style={{
              textAlign: "center",
              padding: "40px 0",
            }}>
              <div className="t-mono" style={{ color: "var(--gold)", marginBottom: "16px" }}>
                CURRENT DISTANCE FROM EARTH
              </div>
              <div className="t-display" style={{ fontSize: "clamp(30px, 5vw, 60px)", color: "var(--gold)" }}>
                15,341,000,000 MI
              </div>
              <div className="t-mono-sm" style={{ marginTop: "12px" }}>
                AND STILL TRANSMITTING
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Transition divider */}
      {index < artifacts.length - 1 && (
        <div ref={dividerRef} className="divider-h" style={{
          width: "80%",
          maxWidth: "600px",
          margin: "0 auto",
          transformOrigin: "center",
        }} />
      )}
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   EXPORT ALL ARTIFACTS
   ════════════════════════════════════════════════════════════════ */
export default function ArtifactPages() {
  return (
    <>
      {artifacts.map((artifact, index) => (
        <ArtifactSection key={artifact.id} artifact={artifact} index={index} />
      ))}

      {/* Final ending */}
      <section className="section-full" style={{
        background: "linear-gradient(to bottom, var(--bg-deep), #000)",
        padding: "120px 40px",
      }}>
        <div style={{ textAlign: "center" }}>
          <div className="t-mono" style={{ color: "var(--bronze)", marginBottom: "40px" }}>
            END OF ARCHIVE
          </div>
          <div className="t-display t-large" style={{ marginBottom: "24px" }}>
            WHAT ELSE
          </div>
          <div className="t-display t-large" style={{ color: "var(--bronze)", marginBottom: "60px" }}>
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
