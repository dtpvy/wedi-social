import { FeedLayout, MainLayout } from '@/components/Layout';

import { type ReactElement } from 'react';

const Search = () => {
  return <></>;
};

Search.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Search;
