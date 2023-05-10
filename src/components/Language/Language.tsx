import { LanguageConfig } from '@/constants/default';
import useTranslation from '@/hooks/useTranslation';
import { Popover } from '@mantine/core';
import { IconLanguage } from '@tabler/icons-react';

const Language = () => {
  const { t, locale, update, languages } = useTranslation();

  const { flag, label } = LanguageConfig[locale as keyof typeof LanguageConfig] || {};

  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <div className="bg-white p-3 rounded flex items-center gap-2">
          <IconLanguage />
          {`${flag} ${t(label)}`}
        </div>
      </Popover.Target>
      <Popover.Dropdown className="p-1">
        <div>
          {languages?.map((language) => (
            <div
              key={language.id}
              onClick={() => update(language)}
              className="hover:bg-gray-100 p-2 cursor-pointer"
            >
              {`${LanguageConfig[language.code as keyof typeof LanguageConfig].flag} ${t(
                LanguageConfig[language.code as keyof typeof LanguageConfig].label
              )}`}
            </div>
          ))}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Language;
