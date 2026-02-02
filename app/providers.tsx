"use client";
import gsap from "gsap";
import ReactLenis, { LenisRef } from "lenis/react";
import React, { useEffect, useRef } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = () => {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
    </>
  );
};

export default Providers;
