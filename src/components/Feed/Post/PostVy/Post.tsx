import { ActionIcon, Avatar, Button, Card, Image, Text } from "@mantine/core";
import { IconDots, IconEye, IconIcons, IconMessage } from "@tabler/icons-react";
import { useState } from "react";
import Reaction from "./Reaction";

type Props = {
  post: any;
};
 
const Post = ({ post }: Props) => {
  const [opened, setOpened] = useState(false);
  const { avatar, userName, text, img,location } = post;
  return (
    <div className="shadow border rounded-lg p-4 w-[700px] h-[500px]">
      <div className="flex items-center gap-2 mb-4">
        <Avatar radius="xl" src = {avatar} /> 
        <div className="mr-auto">
          <div className="font-medium">{userName}</div>
          <div className="text-sm text-gray-400">
            20/03/2023, {location}
          </div>
        </div> 
        <ActionIcon color="green" radius="xl">
          <IconDots size="20" />
        </ActionIcon>  
      </div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={img}
            height={300}
            
            alt="Norway"
          />
        </Card.Section>
        
        <Text size="sm" lineClamp={5}>
          {text}
        </Text>
      </Card>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onMouseLeave={() => setOpened(false)}
          onMouseMove={() => setOpened(true)}
          variant="white"
          leftIcon={<IconIcons />}
          color="dark"
          className="relative"
        >
          100K
          {opened && <Reaction />}
        </Button>
        <Button variant="white" leftIcon={<IconMessage />} color="dark">
          100K
        </Button>
        <Button variant="white" leftIcon={<IconEye />} color="dark">
          100K
        </Button>
      </div>
    </div>
  );
};

export default Post;