"use client";
import { Application, extend } from "@pixi/react"; // ← import Sprite too
import { Assets, Texture, Sprite } from "pixi.js";
import { PixelateFilter } from "pixi-filters";
import { useEffect, useState } from "react";
export function PixiPixelImage({
  src,
  hovered,
}: {
  src: string;
  hovered: boolean;
}) {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    let active = true;

    Assets.load(src)
      .then((loadedTexture) => {
        if (active) setTexture(loadedTexture);
      })
      .catch((err) => {
        console.error("Failed to load image:", src, err);
        // optional: setTexture(Texture.WHITE); or some fallback
      });

    return () => {
      active = false;
    };
  }, [src]);

  const filter = new PixelateFilter(hovered ? 12 : 0);

  if (!texture) {
    return null; // or a loading spinner
  }

  return (
    <Application
      width={300}
      height={450}
      className="absolute inset-0 pointer-events-none bg-white"
    >
      <pixiSprite
        texture={texture}
        filters={[filter]}
        anchor={0.5} // or 0.5 if you want center
      />
    </Application>
  );
}
