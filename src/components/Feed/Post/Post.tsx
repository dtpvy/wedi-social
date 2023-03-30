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
     <div className="flex flex-row w-8/11 " >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={img}
          height={450}
          width={800} 
          alt="Norway"
        />
      </Card.Section>
        
      <Group  mt="md" mb="xs" className="flex columns-2 justify-between ">
        <div className="flex flex-wrap  gap-x-2">
            <Avatar src={avatar} alt="it's me" />
            <Text weight={500}>
                {userName}
                </Text>
            <Button color="pink" variant="light">
                ...
            </Button>
        </div>
        <div className="flex flex-col font-thin antialiased">
          <div>
            {location}
          </div>
          <div>
            5 Hours ago
          </div>
        </div>
        </Group>

      <Text size="sm" color="black">
        {text}
      </Text>
        <div className="flex flex-row ">
          <div >
            <Button variant="light" color="blue"  mt="md" radius="md" >
            Like
            </Button>
            <Button variant="light" color="blue"  mt="md" radius="md">
            Comment
            </Button>
          </div>
          
      </div>
    </Card>
     </div>
    );
  };
  

  
  export default Post;