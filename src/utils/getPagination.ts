import { SITE } from "@config";
import getPageNumbers from "./getPageNumbers";

interface GetPaginationProps<T> {
  scribbles: T;
  page: string | number;
  isIndex?: boolean;
}

const getPagination = <T>({
  scribbles,
  page,
  isIndex = false,
}: GetPaginationProps<T[]>) => {
  const totalPagesArray = getPageNumbers(scribbles.length);
  const totalPages = totalPagesArray.length;

  const currentPage = isIndex
    ? 1
    : page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))
      ? Number(page)
      : 0;

  const lastScribble = isIndex ? SITE.scribblePerPage : currentPage * SITE.scribblePerPage;
  const startScribble = isIndex ? 0 : lastScribble - SITE.scribblePerPage;
  const paginatedScribbles = scribbles.slice(startScribble, lastScribble);

  return {
    totalPages,
    currentPage,
    paginatedScribbles,
  };
};

export default getPagination;
