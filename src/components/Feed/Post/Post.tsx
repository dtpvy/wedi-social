import React from "react"
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { Avatar } from '@mantine/core';
import { IconStar } from '@tabler/icons-react';
type Props = {
    post: any;
  };
  
  const Post = ({ post }: Props) => {
    const { avatar, userName, text, img,location } = post;
    
  
    return (
     <div className="" >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={img}
          height={450}
          width={1000}
          alt="Norway"
        />
      </Card.Section>
        
      <Group  mt="md" mb="xs" className="flex columns-2 justify-between ">
        <div className="flex flex-row gap-x-2">
            <Avatar src={avatar} alt="it's me" />
            <Text weight={500}>
                {userName}
                </Text>
            <Button color="pink" variant="light">
                ...
            </Button>
        </div>
        <div>{location}</div>
        </Group>

      <Text size="sm" color="black">
        {text}
      </Text>
        <div className="flex flex-row ">
      <Button variant="light" color="blue"  mt="md" radius="md" >
        Like
      </Button>
      <Button variant="light" color="blue"  mt="md" radius="md">
        Comment
      </Button>
      </div>
    </Card>
     </div>
    );
  };
  

  
  export default Post;