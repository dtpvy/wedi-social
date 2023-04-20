import useTranslator from "@/stores/translator";
import useUserStore from "@/stores/user";
import axios from "axios";

import { useEffect } from "react";

const translateUrl = "http://localhost:3000/api/translate";

const useLocale = () => {
  const user = useUserStore((state) => state.user);
  const setTranslator = useTranslator.use.setTranslator();

  useEffect(() => {
    axios.get(translateUrl).then((res) => {
      setTranslator(res.data);
    });
  }, [setTranslator, user?.language?.code]);
};

export default useLocale;
