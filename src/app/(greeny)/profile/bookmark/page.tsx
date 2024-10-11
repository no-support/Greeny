import { auth } from '@/auth';
import PageTemplate from './(pageTemplate)/PageTemplate';
import { getMyBookmarks } from '@/app/api/fetch/bookmarkFetch';

export default async function Page() {
  const session = await auth();
  const [myBookmarkPlantsData, myBookmarkPostData] = await Promise.all([getMyBookmarks('product', session!.accessToken), getMyBookmarks('post', session?.accessToken!)]);
  return <PageTemplate plantBookmarks={myBookmarkPlantsData.item} postBookmarks={myBookmarkPostData.item} />;
}
