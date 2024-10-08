import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import scribbleFilter from "./scribbleFilter";

interface Tag {
  tag: string;
  tagName: string;
}

const getUniqueTags = (scribbles: CollectionEntry<"blog">[]) => {
  const tags: Tag[] = scribbles
    .filter(scribbleFilter)
    .flatMap(scribble => scribble.data.tags)
    .map(tag => ({ tag: slugifyStr(tag), tagName: tag }))
    .filter(
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));
  return tags;
};

export default getUniqueTags;
