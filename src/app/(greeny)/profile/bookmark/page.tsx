import { auth } from '@/auth';
import PageTemplate from './(pageTemplate)/PageTemplate';
import { getMyBookmarks } from '@/app/api/fetch/bookmarkFetch';
import { PlantBookmark, PostBookmark } from '@/types/bookmark';

export default async function Page() {
  const session = await auth();
  const [myBookmarkPlantsData, myBookmarkPostData] = await Promise.all([getMyBookmarks<PlantBookmark>('product', session!.accessToken), getMyBookmarks<PostBookmark>('post', session?.accessToken!)]);
  return <PageTemplate plantBookmarks={myBookmarkPlantsData.item} postBookmarks={myBookmarkPostData.item} />;
}
