import { auth } from '@/auth';

import { Metadata, ResolvingMetadata } from 'next';
import PageTemplate from '../(pageTemplate)/PageTemplate';

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

  const isMe = session!.user?.id === params._id;

  return <PageTemplate headingMsg="식집사 친구" isMe={isMe} userId={params._id} type="user" />;
}
