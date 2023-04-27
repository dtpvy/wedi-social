import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const FILE = {
  vi: "public/locale/vi.json",
  en: "public/locale/en.json",
};

const translate = async (_: NextApiRequest, res: NextApiResponse) => {
  const translate = Object.keys(FILE).reduce(
    (translate: Record<string, Record<string, string>>, key: string) => {
      return {
        ...translate,
        [key]: JSON.parse(
          readFileSync(FILE[key as keyof typeof FILE], "utf8")
        ) as Record<string, string>,
      };
    },
    { vi: {}, en: {} }
  );
  res.status(200).send(translate);
};

export default translate;
