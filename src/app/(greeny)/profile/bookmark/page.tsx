import { auth } from '@/auth';
import PageTemplate from './PageTemplate';
import { List } from '@/types/response';
import { PlantBookmark, PostBookmark } from '@/types/bookmark';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export default async function Page() {
  const session = await auth();

  const [myBookmarkPlantsData, myBookmarkPostData]: [List<PlantBookmark>, List<PostBookmark>] = await Promise.all([
    fetchBookmarks('product', session!.accessToken),
    fetchBookmarks('post', session!.accessToken),
  ]);

  if (!myBookmarkPlantsData.ok || !myBookmarkPostData.ok) return 'error';
  return <PageTemplate plantBookmarks={myBookmarkPlantsData.item} postBookmarks={myBookmarkPostData.item} />;
}

async function fetchBookmarks(url: string, token: string) {
  const res = await fetch(`${SERVER}/bookmarks/${url}`, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
