"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { verticalLoop } from "@/helpers/verticalLoop";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const isUserScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const directionRef = useRef(1); // 1 for forward, -1 for reverse

  useGSAP(
    () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smoother-wrapper",
        content: "#smoother-content",
        smooth: 1.5,
        effects: true,
      });

      const boxes = gsap.utils.toArray(".car-item");
      if (boxes.length === 0) return;

      const loop = verticalLoop(boxes, {
        repeat: -1,
        speed: 1, // Base speed for auto-scroll
        paused: false,
        paddingBottom: 8,
      });

      let scrollVelocity = 0;
      let autoScrollSpeed = 0.3;

      // Handle wheel events for manual scrolling
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        isUserScrollingRef.current = true;

        // Detect direction
        if (Math.abs(e.deltaY) > 0) {
          directionRef.current = e.deltaY > 0 ? 1 : -1;
        }

        // Accumulate scroll velocity for smooth scrolling
        scrollVelocity += e.deltaY * 0.01;

        // Manually progress the timeline based on wheel delta
        const currentProgress = loop.progress();
        const newProgress = currentProgress + (e.deltaY * 0.0001);
        loop.progress(newProgress);

        // Scale down effect
        const images = gsap.utils.toArray(".car-item img");
        gsap.to(images, {
          scale: 0.85,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true,
        });

        // Clear existing timeout
        if (userScrollTimeoutRef.current) {
          clearTimeout(userScrollTimeoutRef.current);
        }

        // Resume auto-scroll after user stops
        userScrollTimeoutRef.current = setTimeout(() => {
          isUserScrollingRef.current = false;
          scrollVelocity = 0;

          // Resume with detected direction
          if (directionRef.current === -1) {
            loop.timeScale(-autoScrollSpeed);
            loop.play();
          } else {
            loop.timeScale(autoScrollSpeed);
            loop.play();
          }

          // Scale back to normal
          gsap.to(images, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          });
        }, 150);
      };

      container.current?.addEventListener("wheel", handleWheel, {
        passive: false,
      });

      return () => {
        container.current?.removeEventListener("wheel", handleWheel);
        if (userScrollTimeoutRef.current) {
          clearTimeout(userScrollTimeoutRef.current);
        }
      };
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      id="smoother-wrapper"
      className="max-h-dvh h-dvh overflow-hidden relative p-2"
    >
      <div id="smoother-content" className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((item, i) => (
          <div
            className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-2"
            key={i}
          >
            {Array.from({ length: 6 }).map((item, j) => (
              <Link
                href={`/cars/${j}`}
                key={j}
                className="car-item rounded-2xl overflow-hidden block w-full h-100"
              >
                <Image
                  src={`/test.jpg`}
                  alt={`Image ${j}`}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
