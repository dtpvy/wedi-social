import useUserStore from "@/stores/user";
import { trpc } from "@/utils/trpc";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { User } from "@prisma/client";
import { useEffect } from "react";

export type EditForm = {
  email: string;
  name: string;
  cityId: string | null;
  countryId: string | null;
  languageId: string | null;
  districtId: string | null;
  wardId: string | null;
  street: string | null;
  bio: string | null;
  phone: string;
};

const useEditForm = () => {
  const user = useUserStore((state) => state.user);

  const form = useForm<EditForm>({
    validate: {
      phone: (value) =>
        value
          ? value.match("^[0-9-+]{9,15}$")
            ? null
            : "Invalidate"
          : "Require",
      name: (value) => (value ? null : "Require"),
      languageId: (value) => (value ? null : "Require"),
    },
  });

  useEffect(() => {
    const {
      email,
      name,
      cityId,
      countryId,
      languageId,
      districtId,
      wardId,
      street,
      bio,
      phone,
    } = user || ({} as User);
    form.setValues({
      email,
      name,
      cityId: `${cityId}`,
      countryId: `${countryId}`,
      languageId: `${languageId}`,
      districtId: `${districtId}`,
      wardId: `${wardId}`,
      street,
      bio,
      phone,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return form;
};

export default useEditForm;
