import { auth } from '@/auth';
import PageTemplate from './(pageTemplate)/PageTemplate';
import { getMyBookmarksByPost, getMyBookmarksByProduct } from '@/app/api/fetch/bookmarkFetch';

export default async function Page() {
  const session = await auth();

  const [myBookmarkPlantsData, myBookmarkPostData] = await Promise.all([getMyBookmarksByProduct(session!.accessToken), getMyBookmarksByPost(session!.accessToken)]);

  if (!myBookmarkPlantsData.ok || !myBookmarkPostData.ok) return 'error';
  return <PageTemplate plantBookmarks={myBookmarkPlantsData.item} postBookmarks={myBookmarkPostData.item} />;
}
