import { cloneElement, useEffect, useState } from 'react';
import useTranslation from '@/hooks/useTranslation';
import { Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import useSearchStore from '@/stores/search';
import { useRouter } from 'next/router';

const SORT_TYPE = [
  {
    fieldLabel: 'timePostText',
    field: 'createdAt',
    sort: 'asc',
    sortLabel: 'ascText',
  },
  {
    fieldLabel: 'timePostText',
    field: 'createdAt',
    sort: 'desc',
    sortLabel: 'descText',
  },
  {
    fieldLabel: 'nameText',
    field: 'name',
    sort: 'asc',
    sortLabel: 'ascText',
  },
  {
    fieldLabel: 'nameText',
    field: 'name',
    sort: 'desc',
    sortLabel: 'descText',
  },
  {
    fieldLabel: 'titleText',
    field: 'title',
    sort: 'asc',
    sortLabel: 'ascText',
  },
  {
    fieldLabel: 'titleText',
    field: 'title',
    sort: 'desc',
    sortLabel: 'descText',
  },
];

const TYPE = [
  {
    label: 'postText',
    value: 'post',
    sort: ['createdAt'],
  },
  {
    label: 'tripText',
    value: 'trip',
    sort: ['createdAt', 'name'],
  },
  {
    label: 'locationText',
    value: 'location',
    sort: ['createdAt', 'name'],
  },
];

const SearchLayout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  const { search, field, sort, type, privacy, setFilter, startDate, endDate, reset } =
    useSearchStore((state) => state);
  const { t, locale } = useTranslation();

  useEffect(() => {
    const typeSearch = router.pathname.split('/')[2];
    setFilter({ type: typeSearch as never, search: (router.query.search as string) || '' });
  }, [router.pathname, router.query.search, setFilter]);

  const sortField = TYPE.find((_type) => _type.value === type)?.sort || [];

  const sorts = SORT_TYPE.filter((sort) => sortField.includes(sort.field)).map((sort) => ({
    ...sort,
    label: `${t(sort.fieldLabel)} - ${t(sort.sortLabel)}`,
    value: `${sort.field}-${sort.sort}`,
  }));

  const handleChange = (type: string) => {
    router.push(`/search/${type}/${search}`);
    return;
  };

  return (
    <div className="pt-[100px] px-20 flex flex-col gap-6 pb-10">
      <div className="flex pl-4 rounded-lg shadow items-center bg-white gap-4 overflow-hidden">
        <Select
          value={`${field}-${sort}`}
          placeholder={t('sortText')}
          data={sorts}
          onChange={(value) => {
            const sort = sorts.find((sort) => sort.value === value);
            if (!sort) return;
            setFilter({ field: sort.field as never, sort: sort.sort as never });
          }}
        />

        <Select
          value={privacy}
          placeholder={t('privacyText')}
          data={[
            { value: 'all', label: t('allText') },
            { value: 'friend', label: t('friendModeText') },
            { value: 'public', label: t('publicModeText') },
          ]}
          onChange={(value) => setFilter({ privacy: value as never })}
        />

        <Select
          value={type}
          placeholder={t('typeText')}
          data={TYPE.map((type) => ({ ...type, label: t(type.label) }))}
          onChange={(value) => handleChange(value as string)}
        />

        <DatePickerInput
          className="ml-auto"
          onChange={([startDate, endDate]) => setFilter({ startDate, endDate })}
          value={[startDate, endDate]}
          locale={locale}
          type="range"
          placeholder={t('timePostText')}
          w={400}
        />
        <button
          onClick={reset}
          className="ml-auto h-[70px] w-[150px] bg-green-600 text-white font-bold"
        >
          {t('resetFilterText')}
        </button>
      </div>
      {cloneElement(children, { search, field, sort, privacy, startDate, endDate })}
    </div>
  );
};

export default SearchLayout;
