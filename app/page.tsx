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
  const lenisRef = useRef<Lenis | null>(null);
  const autoScrollRef = useRef<number | null>(null);
  const directionRef = useRef(1); // 1 for down, -1 for up
  const isUserScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scaleAnimationsRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      infinite: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wrapper: container.current!,
      content: container.current!.querySelector(".scroll-content"),
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track user scrolling
    let lastScrollY = 0;
    lenis.on("scroll", (e: any) => {
      ScrollTrigger.update();

      // Detect scroll direction from user input
      const currentScrollY = e.scroll;
      if (currentScrollY !== lastScrollY) {
        const scrollDelta = currentScrollY - lastScrollY;

        // Only change direction if user is actively scrolling
        if (isUserScrollingRef.current && Math.abs(scrollDelta) > 1) {
          directionRef.current = scrollDelta > 0 ? 1 : -1;
        }

        lastScrollY = currentScrollY;
      }
    });

    // Auto-scroll function
    const startAutoScroll = () => {
      if (autoScrollRef.current) return;

      const scroll = () => {
        if (!isUserScrollingRef.current && lenisRef.current) {
          lenisRef.current.scrollTo(
            lenisRef.current.scroll + directionRef.current * 0.5,
            { immediate: true },
          );
        }
        autoScrollRef.current = requestAnimationFrame(scroll);
      };

      autoScrollRef.current = requestAnimationFrame(scroll);
    };

    startAutoScroll();

    // Handle wheel events to detect user scrolling
    const handleWheel = (e: WheelEvent) => {
      isUserScrollingRef.current = true;

      // Clear existing timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }

      // Scale down images when user scrolls
      scaleAnimationsRef.current.forEach((anim) => {
        anim.pause();
        gsap.to(anim.targets(), {
          scale: 0.8,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      });

      // Resume auto-scroll after user stops scrolling
      userScrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;

        // Scale back to 1 when scrolling stops
        scaleAnimationsRef.current.forEach((anim) => {
          gsap.to(anim.targets(), {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          });
        });
      }, 150);
    };

    container.current?.addEventListener("wheel", handleWheel);

    return () => {
      lenis.destroy();
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
      container.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".car-item img");
      scaleAnimationsRef.current = [];

      items.forEach((img: any) => {
        const anim = gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              scroller: container.current,
              start: "bottom 75%",
              end: "50% 25%",
              scrub: true,
              markers: false,
            },
            paused: true,
          },
        );

        scaleAnimationsRef.current.push(anim);
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="max-h-dvh h-dvh overflow-hidden scroll-auto relative p-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-2 single-board-lines scroll-content">
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
