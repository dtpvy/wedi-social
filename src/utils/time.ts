import dayjs from '@/utils/dayjs';

export const getTimePost = (postCreatedAt: Date) => {
  const postTimeAgo = dayjs(postCreatedAt).fromNow();

  if (dayjs().diff(postCreatedAt, 'month') >= 1) {
    return dayjs(postCreatedAt).format('DD/MM/YYYY');
  }
  return postTimeAgo;
};
