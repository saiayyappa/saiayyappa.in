import type { CollectionEntry } from "astro:content";
import getSortedScribbles from "./getSortedScribbles";
import { slugifyAll } from "./slugify";

const getScribblesByTag = (scribbles: CollectionEntry<"blog">[], tag: string) =>
  getSortedScribbles(
    scribbles.filter(scribble => slugifyAll(scribble.data.tags).includes(tag))
  );

export default getScribblesByTag;
