import { Badge, Button, Card, Group, Image, ActionIcon, Avatar } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconDots } from '@tabler/icons-react';
import React from 'react';
import dayjs from '@/utils/dayjs';
import { useEffect, useState } from 'react';

type Props = {
  props: any;
};

const ComponentBox = ({ props }: Props) => {
  const { id, input2, input3, input4, status, type, statusVisibility } = props;
  const router = useRouter();
  let day = dayjs(input4).format('DD/MM/YYYY');
  const onNavigaTopropsDetail = () => {
    router.push(`/admin/${type}/${id}`);
  };
  function badgeColor() {
    let color;
    if (status == 'Đã phản hồi' || status == 'NOTVERIFIED' || status == 'ACTIVE') {
      color = 'green';
    } else {
      color = 'yellow';
    }
    return color;
  }
  const [visibility, setVisibility] = useState('');
  // let visibility = "visible";

  useEffect(() => {
    if (statusVisibility == 'All' || statusVisibility == '') {
      setVisibility('');
    } else {
      setVisibility(statusVisibility == status ? '' : 'hidden');
    }
  }, [status, statusVisibility]);

  return (
    <div
      className={`flex justify-start items-center font-semibold rounded-lg py-3 hover:bg-gray-200 bg-gray-50 mt-1 ${visibility}`}
    >
      <div className="w-1/12 ml-12">{id}</div>
      <div className="w-3/12 flex items-center">
        {type == 'user' && <Avatar radius="xl" />}
        {input2}
      </div>
      <div className="w-3/12 flex items-center ml-1">
        {type == 'request' && <Avatar radius="xl" />}
        {input3}
      </div>
      {/* <div className="w-2/12">Nội dung</div> */}
      <div className={`w-2/12 ${type === 'location' && 'text-center pr-6'}`}>
        {type != 'location' ? day : `${input4}`}
      </div>
      <div className="w-1/12 mx-3">
        <Badge color={badgeColor()}>{status}</Badge>
      </div>
      <ActionIcon
        color="cyan"
        size="lg"
        radius="lg"
        variant="light"
        onClick={onNavigaTopropsDetail}
        className="bg-gray-100 hover:bg-gray-200 ml-2"
      >
        <IconDots size="1.625rem" />
      </ActionIcon>
    </div>
  );
};

export default ComponentBox;
