import type { Tab } from '@/types/tab';
import classNames from '@/utils/classNames';
import { Badge } from '@mantine/core';
import { type ReactNode } from 'react';

type Props = {
  className?: string;
  activeClass?: string;
  titleClass?: string;
  active?: boolean;
  items: Record<string, Tab>;
  tab: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showBadgeNumber?: boolean;
  onChange?: (tab: Tab) => void;
};

const Menu = ({
  className,
  activeClass = '',
  titleClass = '',
  active = false,
  items,
  tab,
  leftIcon,
  rightIcon,
  showBadgeNumber = false,
  onChange,
}: Props) => {
  const onChangeTab = (tab: keyof typeof items) => {
    onChange?.(items[tab]);
  };

  return (
    <>
      {Object.keys(items).map((key) => (
        <button
          onClick={() => onChangeTab(key)}
          key={key}
          className={classNames('cursor-pointer uppercase flex items-center', className, {
            [activeClass]: active || tab === items[key].name,
          })}
        >
          {leftIcon}
          <div
            className={classNames('font-bold uppercase', titleClass, {
              'ml-2': !!leftIcon,
              'mr-auto': !!rightIcon || showBadgeNumber,
            })}
          >
            {items[key].name}
          </div>

          {rightIcon ??
            (showBadgeNumber && !!items[key].badgeNumber && (
              <Badge color="green">{items[key].badgeNumber}</Badge>
            ))}
        </button>
      ))}
    </>
  );
};

export default Menu;
