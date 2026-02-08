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
        if (isUserScrollingRef.current && Math.abs(scrollDelta) > 0.5) {
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
          // AUTO-SCROLL SPEED: Lower value = slower scroll
          // Try 0.3 for very slow, 0.5 for slow, 1.0 for medium, 2.0+ for fast
          const scrollSpeed = 0.5; // <-- ADJUST THIS VALUE TO CHANGE AUTO-SCROLL SPEED
          
          lenisRef.current.scrollTo(
            lenisRef.current.scroll + directionRef.current * scrollSpeed,
            { immediate: true }
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
      
      // Detect direction from wheel event directly
      if (Math.abs(e.deltaY) > 0) {
        directionRef.current = e.deltaY > 0 ? 1 : -1;
      }
      
      // Clear existing timeout
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }

      // SCALE DOWN ANIMATION - ONLY WHEN USER SCROLLS
      // Scale down images when user scrolls
      const images = gsap.utils.toArray(".car-item img");
      gsap.to(images, {
        scale: 0.8,
        duration: 0.3, // <-- ADJUST THIS: How fast images scale down (in seconds)
        ease: "power2.out",
        overwrite: true,
      });

      // SCROLL STOP DETECTION DELAY: Higher value = waits longer before resuming auto-scroll
      // Resume auto-scroll after user stops scrolling
      userScrollTimeoutRef.current = setTimeout(() => {
        isUserScrollingRef.current = false;
        
        // SCALE UP ANIMATION SPEED: Higher duration = slower return to normal
        // Scale back to 1 when scrolling stops
        const images = gsap.utils.toArray(".car-item img");
        gsap.to(images, {
          scale: 1,
          duration: 0.5, // <-- ADJUST THIS: How fast images scale back up (in seconds)
          ease: "power2.out",
          overwrite: true,
        });
      }, 150); // <-- ADJUST THIS: Delay in milliseconds before considering scroll "stopped"
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