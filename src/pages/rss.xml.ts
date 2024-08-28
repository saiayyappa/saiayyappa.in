import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedScribbles from "@utils/getSortedScribbles";
import { SITE } from "@config";

export async function GET() {
  const scribbles = await getCollection("blog");
  const sortedScribbles = getSortedScribbles(scribbles);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedScribbles.map(({ data, slug }) => ({
      link: `scribbles/${slug}/`,
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
