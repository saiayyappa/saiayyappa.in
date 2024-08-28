import { SITE } from "@config";

const getPageNumbers = (numberOfScribbles: number) => {
  const numberOfPages = numberOfScribbles / Number(SITE.scribblePerPage);

  let pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
    pageNumbers = [...pageNumbers, i];
  }

  return pageNumbers;
};

export default getPageNumbers;
