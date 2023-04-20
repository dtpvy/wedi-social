import useUserStore from "@/stores/user";
import axios from "axios";
import i18next from "i18next";
import { useEffect } from "react";
import { initReactI18next } from "react-i18next";

const translateUrl = "http://localhost:3000/api/translate";

const useLocale = () => {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const language = user?.language.code || "vi";
    axios
      .get(translateUrl, {
        params: { language },
      })
      .then((res) => {
        console.log(res.data);
        i18next.use(initReactI18next).init({
          resources: {
            [language]: {
              translation: res.data,
            },
          },
          lng: language,
          fallbackLng: language,
          interpolation: {
            escapeValue: false,
          },
        });
      });
  }, [user?.language?.code]);
};

export default useLocale;
