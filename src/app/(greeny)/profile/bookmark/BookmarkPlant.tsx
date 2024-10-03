'use client';
import Skeleton from '@/components/skeleton/Skeleton';
import styles from './BookmarkPlant.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

export default function BookmarkPlant({ name, href, src }: { name: string; href: string; src: string }) {
  const [isLoading, setIsLoading] = useState(true);

  if (src === '') {
    return (
      <li>
        <Link href={href}>
          <div className={styles.default_thumbnail}></div>
        </Link>
      </li>
    );
  }

  return (
    <li>
      {isLoading && (
        <Skeleton w={100} wUnit="%" h={100} hUnit="%" radius={2} rUnit="rem">
          <div className={styles.thumbnail_wrapper}></div>
        </Skeleton>
      )}
      <Link href={href} className={clsx(styles.thumbnail_wrapper, isLoading && styles.none)}>
        <div className={styles.img_wrapper}>
          <Image className={styles.image} src={src} fill sizes="100%" alt="식물 썸네일" priority onLoad={() => setIsLoading(false)} />
        </div>
        <p className={styles.thumbnail_name}>{name}</p>
      </Link>
    </li>
  );
}
