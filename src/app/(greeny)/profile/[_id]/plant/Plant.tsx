import styles from './Plant.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { PlantBookmark } from '@/types/bookmark';
import NormalProfile from '@images/NormalProfile.svg';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default function Plant(plant: PlantBookmark & { children: React.ReactNode }) {
  return (
    <li className={styles.item_wrapper}>
      <div className={styles.user_info_wrapper}>
        <Link href={`/plant/${plant.product._id}`}>
          <div className={styles.thumbnail_wrapper}>
            <Image className={styles.image} src={!plant.product.mainImages[0]?.path ? NormalProfile : `${SERVER}${plant.product.mainImages[0]?.path}`} alt="썸네일" width={50} height={50} />
            <div className={styles.user_data}>
              <p className={styles.title}>{plant.product.name}</p>
              <span className={styles.subtitle}>{plant.createdAt}</span>
            </div>
          </div>
        </Link>

        {plant.children}
      </div>
    </li>
  );
}
