import { twMerge } from 'tailwind-merge';

const cc = (names: unknown) => {
  if (typeof names === 'string' || typeof names === 'number') return '' + names;

  let out = '';

  if (Array.isArray(names)) {
    for (let i = 0, tmp: unknown; i < names.length; i++) {
      if ((tmp = cc(names[i])) !== '') {
        out += (out && ' ') + tmp;
      }
    }
  } else {
    const obj = names as object;
    for (const k in obj) {
      if (obj[k as keyof typeof obj]) out += (out && ' ') + k;
    }
  }

  return out;
};

const classNames = (...classes: unknown[]) => twMerge(cc(classes));

export default classNames;
