import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import scribbleOgImage from "./og-templates/scribble";
import siteOgImage from "./og-templates/site";

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

export async function generateOgImageForScribble(scribble: CollectionEntry<"blog">) {
  const svg = await scribbleOgImage(scribble);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await siteOgImage();
  return svgBufferToPngBuffer(svg);
}
