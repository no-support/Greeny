import styles from '../page.module.scss';
import { auth } from '@/auth';
import { CoreErrorRes, List, SingleItem } from '@/types/response';
import Tab from '@/components/tab/Tab';
import { UserInfo } from '@/types/user';
import { UserBookmark } from '@/types/bookmark';
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import AsnycButton from './AsyncButton';
import PlantList from '../PlantList';
import PostList from '../PostList';
import Profile from '../Profile';
import { addUser, deleteBookmark } from '@/app/api/actions/followAction';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

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

  const response = await fetch(`${SERVER}/users/${urlParam}`, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  const userData: SingleItem<UserInfo> | CoreErrorRes = await response.json();

  const myBookmarkedUsersRes = await fetch(`${SERVER}/bookmarks/user`, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${session!.accessToken}`,
    },
  });
  const myBookmarkedUsersData: List<UserBookmark> | CoreErrorRes = await myBookmarkedUsersRes.json();

  let bookmarkId;
  const bookmarkUser = params._id && !!myBookmarkedUsersData.ok && myBookmarkedUsersData.item.find((item) => String(item.user._id) === params._id);

  if (bookmarkUser && typeof bookmarkUser === 'object') {
    bookmarkId = bookmarkUser._id;
  }

  const [firstContent, secondContent] = await Promise.all([PlantList(params._id, false), PostList(params._id, false)]);
  return (
    <div className={styles.page_container}>
      <Profile userInfo={userData} userId={params._id} />
      <div style={{ textAlign: 'center', padding: '6px' }}>
        {bookmarkId ? (
          <AsnycButton action={deleteBookmark} args={[bookmarkId, `/profile/${bookmarkId}`]} btnSize="xs" bgColor="line" radiusStyle="curve">
            언팔로
          </AsnycButton>
        ) : (
          <AsnycButton action={addUser} args={[Number(params._id)]} btnSize="xs" bgColor="fill" radiusStyle="curve">
            팔로우
          </AsnycButton>
        )}
      </div>

      <div className={styles.tab_container}>
        <Tab firstContent={firstContent} secondContent={secondContent} firstSrOnly="식물" secondSrOnly="포스트" />
      </div>
    </div>
  );
}
