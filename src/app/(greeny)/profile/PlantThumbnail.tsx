'use client';
import Skeleton from '@/components/skeleton/Skeleton';
import styles from './PlantThumbnail.module.scss';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function PlantThumbnail({ href, src }: { href: string; src: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <li>
      {isLoading ? (
        <Skeleton w={100} wUnit="%" h={100} hUnit="%">
          <Link href={href} className={styles.thumbnail_wrapper}>
            <Image className={clsx(styles.thumbnail, isLoading && styles.none)} src={src} fill sizes="100%" alt="식물 썸네일" priority onLoad={() => setIsLoading(false)} />
          </Link>
        </Skeleton>
      ) : (
        <Link href={href} className={styles.thumbnail_wrapper}>
          <Image className={clsx(styles.thumbnail, isLoading && styles.none)} src={src} fill sizes="100%" alt="식물 썸네일" priority onLoad={() => setIsLoading(false)} />
        </Link>
      )}
    </li>
  );
}
