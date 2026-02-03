"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  {
    id: "1",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2",
    img: "https://picsum.photos/id/1011/600/750",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "5",
    img: "https://picsum.photos/id/1011/600/750",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "6",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "7",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "8",
    img: "https://picsum.photos/id/1011/600/750",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "9",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "10",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "11",
    img: "https://picsum.photos/id/1011/600/750",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "12",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "13",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "14",
    img: "https://picsum.photos/id/1011/600/750",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "15",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "16",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "17",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "18",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "19",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "20",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "21",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "22",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "23",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "24",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "25",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "26",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "27",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "28",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "29",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "30",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "31",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "32",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "33",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "34",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "35",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "36",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "37",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "38",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "39",
    img: "https://picsum.photos/id/1020/600/800",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "40",
    img: "https://picsum.photos/id/1015/600/900",
    url: "https://example.com/one",
    height: 400,
  },
];
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
			ScrollTrigger.create({
				start: 1,
				end: "max",
				onLeaveBack: (self) => {
					self.scroll(ScrollTrigger.maxScroll(window) - 2);
				},
				onLeave: (self) => {
					self.scroll(2);
				},
			}).scroll(2)
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-5 p-4 gap-4">
      {items.map((item, i) => (
        <Link
          href={`/cars/${i}`}
          key={i}
          className="w-full h-full relative car-item"
        >
          <Image
            src={item.img}
            alt={`Image ${item.id}`}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </Link>
      ))}
      {/* <div ref={observerRef} className="col-span-5 h-10" /> */}
    </div>
  );
}
