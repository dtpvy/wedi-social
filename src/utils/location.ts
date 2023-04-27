export const getName = (title: string) => {
  return title.replace(/<[^>]*>/g, "");
};
