import styles from '@greeny/story/Community.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { UserSimple } from '@/types/user';
import { SERVER } from '@/constant';

type Props = {
  user: UserSimple;
  fontStyle: 'sm_regular' | 'sm_medium' | 'md_semibold';
  component?: React.ReactNode;
};

export default function UserProfile({ user, fontStyle, component }: Props) {
  return (
    <div className={styles.user_profile}>
      <Link href={`/profile/${user._id}`}>
        <div className={styles.basic}>
          <div className={styles.profile_image}>
            <Image src={user.image ? `${SERVER}${user.image}` : '/images/NormalProfile.svg'} sizes="100%" fill alt="프로필" />
          </div>
          <p className={styles[fontStyle]}>{user.name}</p>
        </div>
      </Link>
      {component}
    </div>
  );
}
