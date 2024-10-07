import styles from '../page.module.scss';
import { auth } from '@/auth';
import Tab from '@/components/tab/Tab';
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import PlantList from '../PlantList';
import PostList from '../PostList';
import Profile from '../Profile';
import Bookmark from './Bookmark';
import { getUserInfo } from '@/app/api/fetch/userFetch';

export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const userId = params.id;
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: 'Profile',
    openGraph: {
      title: `Profile`,
      description: `${userId}의 프로필 페이지`,
      images: [...previousImages],
      url: `/profile/${params.id}`,
    },
  };
}

export default async function Page({ params }: { params: { _id: string } }) {
  const session = await auth();
  // 세션 아이디가 params.id와 같으면 /profile로 보내버림
  if (session!.user?.id === params._id) {
    redirect('/profile');
  }

  const urlParam = params._id;
  const userData = await getUserInfo(urlParam);

  const [firstContent, secondContent] = await Promise.all([PlantList(params._id, false), PostList(params._id, false)]);

  return (
    <div className={styles.page_container}>
      <Profile userInfo={userData} userId={params._id} />
      <Bookmark />

      <div className={styles.tab_container}>
        <Tab firstContent={firstContent} secondContent={secondContent} firstSrOnly="식물" secondSrOnly="포스트" />
      </div>
    </div>
  );
}
