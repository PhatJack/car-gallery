"use client";
import Masonry from "@/components/masonry";
import { useRouter } from "next/navigation";

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
];

export default function Home() {
  return <Masonry items={items} />;
}
