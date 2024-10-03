import { auth } from '@/auth';
import EditForm from './EditForm';
import { CoreErrorRes, SingleItem } from '@/types/response';
import { UserInfo } from '@/types/user';
import { Metadata } from 'next';
const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

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

  const userInfo = await fetchUserInfo(session.user.id!, session.accessToken);

  return <EditForm user={userInfo.item} />;
}

async function fetchUserInfo(userId: string, accessToken: string): Promise<SingleItem<UserInfo>> {
  const res = await fetch(`${SERVER}/users/${userId}`, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const resJson: SingleItem<UserInfo> | CoreErrorRes = await res.json();
  if (!resJson.ok) {
    throw new Error((resJson as CoreErrorRes).message);
  }
  return resJson as SingleItem<UserInfo>;
}
