import { LanguageConfig } from "@/constants/default";
import useTranslation from "@/hooks/useTranslation";
import useTranslator from "@/stores/translator";
import { Popover } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";

const Language = () => {
  const setLocale = useTranslator.use.setLocale();
  const { t, locale } = useTranslation();

  const { flag, label } = LanguageConfig[locale];

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
          {Object.keys(LanguageConfig).map((language) => (
            <div
              key={language}
              onClick={() => setLocale(language as keyof typeof LanguageConfig)}
              className="hover:bg-gray-100 p-2 cursor-pointer"
            >
              {`${
                LanguageConfig[language as keyof typeof LanguageConfig].flag
              } ${t(
                LanguageConfig[language as keyof typeof LanguageConfig].label
              )}`}
            </div>
          ))}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Language;
