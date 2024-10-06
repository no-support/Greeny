import { auth } from '@/auth';
import PageTemplate from '../(pageTemplate)/PageTemplate';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const userId = params.id;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: 'Plant Following',
    openGraph: {
      title: `Plant Following`,
      description: `${userId}의 식물 팔로잉 페이지`,
      url: `/profile/${params.id}/plant`,
      images: [...previousImages],
    },
  };
}

export default async function Page({ params }: { params: { _id: string } }) {
  const session = await auth();

  const isMe = session!.user?.id === params._id;

  return <PageTemplate headingMsg="식물 친구" isMe={isMe} userId={params._id} type="plant" />;
}
