import type { CollectionEntry } from "astro:content";
import scribbleFilter from "./scribbleFilter";

const getSortedScribbles = (scribbles: CollectionEntry<"blog">[]) => {
  return scribbles
    .filter(scribbleFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedScribbles;
