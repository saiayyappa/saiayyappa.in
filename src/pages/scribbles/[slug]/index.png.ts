import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { generateOgImageForScribble } from "@utils/generateOgImages";
import { slugifyStr } from "@utils/slugify";

export async function getStaticPaths() {
  const scribbles = await getCollection("blog").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return scribbles.map(scribble => ({
    params: { slug: slugifyStr(scribble.data.title) },
    props: scribble,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForScribble(props as CollectionEntry<"blog">), {
    headers: { "Content-Type": "image/png" },
  });
