import useEditForm, { EditForm } from '@/hooks/useEditForm';
import useLocation from '@/hooks/useLocation';
import useTranslation from '@/hooks/useTranslation';
import useProfileStore from '@/stores/store';
import { trpc } from '@/utils/trpc';
import { Button, Select, TextInput, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAt, IconCheck, IconLanguage, IconPhone, IconX } from '@tabler/icons-react';
import { useMemo } from 'react';
import ChangePassword from './ChangePassword';
import Header from './Header';

const Edit = () => {
  const { t } = useTranslation();
  const { isOwner } = useProfileStore.use.profile();

  const update = trpc.user.updateInfo.useMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const { getInputProps, onSubmit, values, setValues } = useEditForm();

  const { data: language } = trpc.location.languages.useQuery({});

  const languages = useMemo(() => {
    return (language || []).map((d) => ({
      value: `${d.id}`,
      label: d.name,
    }));
  }, [language]);

  const { countries, cities, districts, wards } = useLocation({
    countryId: typeof values.countryId === 'string' ? +values.countryId : values.countryId,
    cityId: typeof values.cityId === 'string' ? +values.cityId : values.cityId,
    districtId: typeof values.districtId === 'string' ? +values.districtId : values.districtId,
  });

  const utils = trpc.useContext();

  const handleSubmit = async (values: EditForm) => {
    try {
      const { cityId, countryId, wardId, districtId, languageId } = values;
      await update.mutateAsync({
        ...values,
        languageId: languageId !== null ? +languageId : null,
        countryId: countryId !== null ? +countryId : null,
        cityId: cityId !== null ? +cityId : null,
        wardId: wardId !== null ? +wardId : null,
        districtId: districtId !== null ? +districtId : null,
      });
      notifications.show({
        message: t('addsuccessText'),
        color: 'green',
        icon: <IconCheck />,
      });
      utils.user.findUser.refetch();
    } catch (e: any) {
      notifications.show({
        message: t('errorTryAgainText'),
        color: 'red',
        icon: <IconX />,
      });
    }
  };

  return (
    <div className="w-full bg-white h-full shadow-md rounded p-4">
      {!isOwner ? (
        <div className="text-center">{t('')}</div>
      ) : (
        <>
          <form onSubmit={onSubmit(handleSubmit)} className="flex flex-col gap-3">
            <Header />
            <div className="flex gap-3 flex-wrap">
              <TextInput
                icon={<IconAt />}
                className="flex-1"
                placeholder="Email"
                label="Email"
                withAsterisk
                disabled
                {...getInputProps('email')}
              />
              <TextInput
                className="flex-1"
                placeholder={t('yourNameText')}
                label={t('yourNameText')}
                withAsterisk
                {...getInputProps('name')}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <TextInput
                icon={<IconPhone />}
                className="flex-1"
                placeholder={t('phoneText')}
                label={t('phoneText')}
                withAsterisk
                {...getInputProps('phone')}
              />
              <Select
                icon={<IconLanguage />}
                className="flex-1"
                placeholder={t('languageText ')}
                label={t('languageText')}
                data={languages}
                {...getInputProps('languageId')}
                withAsterisk
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select
                className="flex-1"
                placeholder={t('countryText')}
                label={t('countryText')}
                data={countries}
                {...getInputProps('countryId')}
                onChange={(value) => {
                  if (values.countryId === value) return;
                  setValues((prev) => ({
                    ...prev,
                    countryId: value,
                    cityId: null,
                    districtId: null,
                    wardId: null,
                  }));
                }}
              />
              <Select
                className="flex-1"
                placeholder={t('cityText')}
                label={t('cityText')}
                data={cities}
                {...getInputProps('cityId')}
                onChange={(value) => {
                  if (values.cityId === value) return;
                  setValues((prev) => ({
                    ...prev,
                    cityId: value,
                    districtId: null,
                    wardId: null,
                  }));
                }}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select
                className="flex-1"
                placeholder={t('districtText')}
                label={t('districtText')}
                data={districts}
                {...getInputProps('districtId')}
                onChange={(value) => {
                  if (values.districtId === value) return;
                  setValues((prev) => ({
                    ...prev,
                    districtId: value,
                    wardId: null,
                  }));
                }}
              />
              <Select
                className="flex-1"
                placeholder={t('wardText')}
                label={t('wardText')}
                data={wards}
                {...getInputProps('wardId')}
              />
            </div>
            <TextInput
              className="flex-1"
              placeholder={t('streetText')}
              label={t('streetText')}
              {...getInputProps('street')}
            />
            <Textarea
              placeholder={t('detaileddescriptionText')}
              label={t('detaileddescriptionText')}
              {...getInputProps('bio')}
            />
            <div className="flex item-center mt-3 gap-2 justify-end">
              <Button onClick={open} color="green" variant="outline">
                {t('changepasswordText')}
              </Button>
              <Button type="submit" color="green">
                {t('updateText')}
              </Button>
            </div>
          </form>
          <ChangePassword opened={opened} close={close} />
        </>
      )}
    </div>
  );
};

export default Edit;
