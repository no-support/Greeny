import styles from './CardItem.module.scss';
import type { PlantJson } from '@/types/plant';
import Image from 'next/image';
import Link from 'next/link';

export default function CardItem({ card }: { card: PlantJson }) {
  return (
    <li>
      <div className={styles.card_wrapper}>
        <Link className={styles.card_image_wrapper} href={`/books/${card._id}`}>
          <Image className={styles.card_image} src={card.rtnFileUrl} fill sizes="100%" alt="식물 썸네일" />
        </Link>

        <div className={styles.card_content_wrapper}>
          <Link href={`/books/${card._id}`}>
            <p className={styles.card_title}>{card.name}</p>
          </Link>
          <Link href={`/books/${card._id}`}>
            <span className={styles.card_subtitle}>{card.plntbneNm}</span>
          </Link>
        </div>
      </div>
    </li>
  );
}
