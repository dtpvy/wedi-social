import { readFileSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

const FILE = {
  vi: "public/locale/vi.json",
  en: "public/locale/en.json",
};

const translate = async (req: NextApiRequest, res: NextApiResponse) => {
  const language = req.query.language;
  const file = readFileSync(FILE[language as keyof typeof FILE], "utf8");
  res.status(200).send(JSON.parse(file));
};

export default translate;
