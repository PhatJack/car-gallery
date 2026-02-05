"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container, Graphics, Sprite } from "pixi.js";

import { extend } from "@pixi/react";
import { PixiPixelImage } from "@/components/PixiPixelImage";
import { Assets } from "pixi.js";

gsap.registerPlugin(ScrollTrigger);

extend({
  Container,
  Graphics,
  Sprite,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    Assets.load("https://picsum.photos/id/1015/600/900");
  }, []);

  const verticalLoop = (elements: HTMLElement[], speed: number) => {
    elements = gsap.utils.toArray(elements);
    let firstBounds = elements[0].getBoundingClientRect(),
      lastBounds = elements[elements.length - 1].getBoundingClientRect(),
      top =
        firstBounds.top -
        firstBounds.height -
        Math.abs(elements[1].getBoundingClientRect().top - firstBounds.bottom),
      bottom = lastBounds.top,
      distance = bottom - top,
      duration = Math.abs(distance / speed),
      tl = gsap.timeline({ repeat: -1 }),
      plus = speed < 0 ? "-=" : "+=",
      minus = speed < 0 ? "+=" : "-=";
    elements.forEach((el) => {
      let bounds = el.getBoundingClientRect(),
        ratio = Math.abs((bottom - bounds.top) / distance);
      if (speed < 0) {
        ratio = 1 - ratio;
      }
      tl.to(
        el,
        {
          y: plus + distance * ratio,
          duration: duration * ratio,
          ease: "none",
        },
        0,
      );
      tl.fromTo(
        el,
        {
          y: minus + distance,
        },
        {
          y: plus + (1 - ratio) * distance,
          ease: "none",
          duration: (1 - ratio) * duration,
          immediateRender: false,
        },
        duration * ratio,
      );
    });
    return tl;
  };

  useGSAP(
    () => {
      gsap.utils.toArray(".single-board-lines").forEach((line: any, i) => {
        // const links = line.querySelectorAll("a"),
        //   tl = verticalLoop(links, 50);
        // tl.progress(i ? 1 : 0);
        // tl.timeScale(i ? -1 : 1);
        // i && tl.eventCallback("onReverseComplete", reverseCompleteHandler);
        // function reverseCompleteHandler() {
        //   console.log("reverseComplete");
        //   tl.progress(1);
        // }
        // links.forEach((link: any) => {
        //   link.addEventListener("mouseenter", () =>
        //     gsap.to(tl, { timeScale: 0, overwrite: true }),
        //   );
        //   link.addEventListener("mouseleave", () =>
        //     gsap.to(tl, { timeScale: i ? -1 : 1, overwrite: true }),
        //   );
        // });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="scrollbar-hide">
      <div className="relative w-72 h-112.5 mx-auto my-20">
        {hoveredIndex && <PixiPixelImage src={`/test.jpg`} hovered={true} />}
        <Image
          src={`/test.jpg`}
          alt={`Image`}
          width={600}
          height={600}
          onMouseEnter={() => setHoveredIndex(1)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
        />
      </div>
      {/* <div className="grid grid-cols-6 p-2 gap-2 will-change-transform single-board-lines scrollbar-hide">
        {Array.from({ length: 42 }).map((item, i) => (
          <Link
            href={`/cars/${i}`}
            key={i}
            className="w-full h-full relative car-item rounded-2xl overflow-hidden"
          >
            {hoveredIndex === i && (
              <PixiPixelImage
                src={`https://picsum.photos/id/1015/600/900`}
                hovered={true}
              />
            )}
            <Image
              src={`https://picsum.photos/id/1015/600/900`}
              alt={`Image ${i}`}
              width={600}
              height={600}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full h-auto rounded-lg shadow-lg transition-all duration-300"
            />
          </Link>
        ))}
      </div> */}
    </div>
  );
}
