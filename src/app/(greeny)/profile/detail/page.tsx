import styles from './page.module.scss';
import ProfileEditIcon from '@images/ProfileEditIcon.svg';
import LikeIcon from '@images/LikeIcon_nor.svg';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { Metadata } from 'next';
import Profile from '../Profile';
import LogoutButton from './LogoutButton';
import { getUserInfo } from '@/app/api/fetch/userFetch';

export const metadata: Metadata = {
  title: 'Profile',
  openGraph: {
    title: 'Profile',
    description: 'User 프로필 페이지',
    images: 'images/MetaImage.png',
    url: '/profile/detail',
  },
};

export default async function Page() {
  const session = await auth();
  const loginUserData = await getUserInfo(session!.user?.id!);

  return (
    <div className={styles.page_container}>
      <Profile userInfo={loginUserData} userId={session!.user?.id!} isMovable />
      <ul className={styles.list_wrapper}>
        <li>
          <Link href="/profile/edit">
            <Option image={ProfileEditIcon} title="프로필 수정" />
          </Link>
        </li>
        <li>
          <Link href="/profile/bookmark">
            <Option image={LikeIcon} title="좋아요한 게시글" />
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}

function Option({ image = ProfileEditIcon, title = '' }) {
  return (
    <button className={styles.option_wrapper}>
      <Image src={image.src} alt={title} width={18} height={18} />
      <p>{title}</p>
    </button>
  );
}
