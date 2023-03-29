import { ActionIcon, Avatar, Button, Card, Image, Text } from "@mantine/core";
import { IconDots, IconEye, IconIcons, IconMessage } from "@tabler/icons-react";
import { useState } from "react";
import Reaction from "./Reaction";

const Post = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="shadow border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Avatar radius="xl" />
        <div className="mr-auto">
          <div className="font-medium">Quang Nguyen</div>
          <div className="text-sm text-gray-400">
            20/03/2023, TP HCM, VietNam
          </div>
        </div>
        <ActionIcon color="green" radius="xl">
          <IconDots size="20" />
        </ActionIcon>
      </div>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={300}
            alt="Norway"
          />
        </Card.Section>

        <Text size="sm" lineClamp={5}>
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
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
