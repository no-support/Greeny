import styles from './BookmarkItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import NormalProfile from '@images/NormalProfile.svg';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

interface BookmarkItemProps {
  href: string;
  imgSrc: string;
  name: string;
  createdAt: string;
  children: React.ReactNode;
}

export default function BookmarkItem({ href: href, imgSrc, name, createdAt, children }: BookmarkItemProps) {
  return (
    <li className={styles.item_wrapper}>
      <div className={styles.user_info_wrapper}>
        <Link href={`${href}`}>
          <div className={styles.thumbnail_wrapper}>
            <Image className={styles.image} src={!imgSrc ? NormalProfile : `${SERVER}${imgSrc}`} alt="썸네일" width={50} height={50} />
            <div className={styles.user_data}>
              <p className={styles.title}>{name}</p>
              <span className={styles.subtitle}>{createdAt}</span>
            </div>
          </div>
        </Link>
        {children}
      </div>
    </li>
  );
}
