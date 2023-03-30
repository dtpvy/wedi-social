import { FeedLayout } from "@/components/Layout";
import { PostTrip } from "@/components/Post";
import { Trip as TripWidget } from "@/components/Trip";
import { posts } from "@/mocks/post";
import { Carousel } from "@mantine/carousel";

const Trip = () => {
  return (
    <FeedLayout className="pt-8 px-16 w-full">
      <Carousel
        withIndicators
        height={200}
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
        <Carousel.Slide>
          <TripWidget />
        </Carousel.Slide>
        <Carousel.Slide>
          <TripWidget />
        </Carousel.Slide>
        <Carousel.Slide>
          <TripWidget />
        </Carousel.Slide>
      </Carousel>
      <div className="grid grid-cols-2 gap-8 pb-8">
        {posts.map((post) => (
          <PostTrip key={post.id} />
        ))}
      </div>
    </FeedLayout>
  );
};

export default Trip;
