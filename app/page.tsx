"use client";

import { useState } from "react";
import SmoothScroll from "./components/SmoothScroll";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./components/HeroSection";
import TechnologyIntro from "./components/TechnologyIntro";
import ArtifactPages from "./components/ArtifactPages";
import FilmGrain from "./components/FilmGrain";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <SmoothScroll>
      {/* Atmospheric overlays */}
      <FilmGrain />
      <div className="scan-lines" aria-hidden="true" />
      <CustomCursor />

      {/* Loading — Archive Awakening */}
      {!loadingComplete && (
        <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      )}

      <main>
        {/* Hero — THE MUSEUM OF LOST TECHNOLOGY → THE EVOLUTION OF TECHNOLOGY */}
        <HeroSection isReady={loadingComplete} />

        {/* Museum manifesto — emotional preparation before the archive */}
        <TechnologyIntro />

        {/* 7 Artifact pages — each a unique cinematic experience */}
        <ArtifactPages />
      </main>
    </SmoothScroll>
  );
}
