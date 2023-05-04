import { LocationDetail } from '@/types/location';
import classNames from '@/utils/classNames';
import { getName } from '@/utils/location';
import { Carousel } from '@mantine/carousel';
import { CloseButton, Image } from '@mantine/core';
import { Location } from '@prisma/client';
import React from 'react';
import useTranslation from '@/hooks/useTranslation';

export type LocationSeletionProps = {
  readonly?: boolean;
  locations: LocationDetail[];
  className?: string;
  onDeleteLocation: (location: Location) => void;
};

const LocationSeletion = ({
  readonly,
  locations,
  className,
  onDeleteLocation,
}: LocationSeletionProps) => {
  
  const { t } = useTranslation();

  return (
    <div
      className={classNames('h-[200px] flex items-center justify-center relative mt-3', className)}
    >
      <Image
        alt="location"
        width={300}
        height={200}
        className="opacity-30"
        src="https://ik.imagekit.io/0o9nfg6a3/wedi/bg.png?updatedAt=1682238085594"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-[rgba(96,173,100,0.5)] flex items-center justify-center">
        {!!locations?.length ? (
          <Carousel
            slideSize="33.333333%"
            slideGap="md"
            loop
            align="start"
            slidesToScroll={3}
            className="px-4 w-full"
            withControls={locations.length > 3}
          >
            {locations.map((data) => (
              <Carousel.Slide key={data.id} className="relative">
                <div className="p-2 bg-gray-100 bg-opacity-50 cursor-pointer h-[150px] flex flex-col justify-center rounded-lg">
                  <div className="font-bold">{data.name}</div>
                  <div className="text-sm font-medium">{data.address}</div>
                </div>
                {!readonly && (
                  <CloseButton
                    onClick={() => onDeleteLocation(data)}
                    title= {t('closePopoverText')}
                    size="md"
                    iconSize={20}
                    radius="xl"
                    className="absolute top-2 right-6"
                  />
                )}
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : (
          <div className="text-center font-bold">{t('youDontChooseAnyAddressText')}</div>
        )}
      </div>
    </div>
  );
};

export default LocationSeletion;
