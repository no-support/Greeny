import { auth } from '@/auth';
import EditForm from './EditForm';
import { Metadata } from 'next';
import { fetchUserInfo } from '@/app/api/fetch/userFetch';

export const metadata: Metadata = {
  title: 'Profile Edit',
  openGraph: {
    title: 'Profile Edit',
    description: 'User 프로필 수정 페이지',
    images: 'images/MetaImage.png',
    url: '/profile/edit',
  },
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error('No session or user found');
  }

  const userInfo = await fetchUserInfo(session.user.id!);

  return <EditForm user={userInfo.item} />;
}
