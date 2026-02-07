"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<any>(null);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      // infinite: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wrapper: container.current!,
      content: container.current!.querySelector(".scroll-content"),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    return () => lenis.destroy();
  }, []);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".car-item img");

      items.forEach((img: any) => {
        gsap.fromTo(
          img,
          { scale: 1 }, // Starting state
          {
            scale: 0.8, // Ending state (scaled down)
            ease: "none",
            scrollTrigger: {
              trigger: img,
							scroller: container.current,
              start: "top top", // When the top of the image hits the top of the viewport
              end: "bottom top", // When the bottom of the image hits the top
              scrub: true, // Links animation progress to scroll distance
							markers: true,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="max-h-dvh h-dvh overflow-hidden scroll-auto relative p-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2 single-board-lines scroll-content ">
        {Array.from({ length: 42 }).map((item, i) => (
          <Link
            href={`/cars/${i}`}
            key={i}
            className="w-full h-full relative car-item rounded-2xl overflow-hidden"
          >
            <Image
              src={`/test.jpg`}
              alt={`Image ${i}`}
              width={600}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
