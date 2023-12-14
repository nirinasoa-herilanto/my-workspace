/**
 * Use to get a portion of a paragraph.
 */
export const truncate = (paragraph: string, nb: number) => {
  return paragraph.length > nb ? `${paragraph.slice(0, nb - 1)}...` : paragraph;
};
