import { redirect } from 'next/navigation';
import { Bookmark } from '@/types/bookmark';
import { CoreErrorRes, SingleItem } from '@/types/response';
import { auth } from '@/auth';

import { Metadata, ResolvingMetadata } from 'next';
import PageTemplate from '../(pageTemplate)/PageTemplate';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const userId = params.id;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: 'User Following',
    openGraph: {
      title: `User Following`,
      description: `${userId}의 팔로잉 페이지`,
      images: [...previousImages],
      url: `/profile/${params.id}/user`,
    },
  };
}

export default async function Page({ params }: { params: { _id: string } }) {
  const session = await auth();
  const bookmarksRes = await fetch(`${SERVER}/users/${params._id}/bookmarks/`, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  const bookmark: SingleItem<Bookmark> | CoreErrorRes = await bookmarksRes.json();
  if (!bookmark.ok) {
    redirect('/');
  }

  const isMe = session!.user?.id === params._id;

  return <PageTemplate headingMsg="식집사 친구" list={bookmark.item.user} isMe={isMe} userId={session!.user?.id!} />;
}
