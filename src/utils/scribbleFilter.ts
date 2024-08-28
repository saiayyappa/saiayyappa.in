import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const scribbleFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledScribbleMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default scribbleFilter;
