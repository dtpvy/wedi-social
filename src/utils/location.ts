import { decode } from 'he';

export const getName = (title: string) => {
  const decodedText = decode(title);
  const regex = /<[^>]+>/g;
  return decodedText.replace(regex, '');
};
