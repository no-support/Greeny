import styles from './page.module.scss';
import { auth } from '@/auth';
import Tab from '@/components/tab/Tab';
import { Metadata } from 'next';
import PlantList from './PlantList';
import PostList from './PostList';
import Profile from './Profile';
import { getUserInfo } from '@/app/api/fetch/userFetch';

export const metadata: Metadata = {
  title: 'Profile',
  openGraph: {
    title: 'Profile',
    description: 'User 프로필 페이지',
    images: 'images/MetaImage.png',
    url: '/profile',
  },
};

export default async function Page() {
  const session = await auth();
  const urlParam = session!.user!.id;

  const loginUserData = await getUserInfo(urlParam!);
  const [myPlant, myPost] = await Promise.all([PlantList(urlParam!, true), PostList(urlParam!, true)]);

  return (
    <div className={styles.page_container}>
      <Profile userInfo={loginUserData} userId={session!.user?.id!} isMovable />
      <div className={styles.tab_container}>
        <Tab firstContent={myPlant} secondContent={myPost} firstSrOnly="식물" secondSrOnly="포스트" />
      </div>
    </div>
  );
}
