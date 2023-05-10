import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

const FILE = {
  vi: 'public/locale/vi.json',
  en: 'public/locale/en.json',
};

const language = async (req: NextApiRequest, res: NextApiResponse) => {
  const { language } = req.query;

  const locale = JSON.parse(readFileSync(FILE[language as keyof typeof FILE], 'utf8'));
  res.status(200).send(locale as Record<string, string>);
};

export default language;
