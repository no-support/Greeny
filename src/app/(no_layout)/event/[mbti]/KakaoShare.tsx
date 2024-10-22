'use client';
import Image from 'next/image';
import styles from './KakaoShare.module.scss';
import { useEffect } from 'react';
import kakao from '@images/Social_KaKao.svg';
import resultData from '@/app/data/resultList';
import { DBNAME, KAKAO_API_KEY, SERVER } from '@/constant';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoShare({ mbti }: { mbti: string }) {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_API_KEY);
    }
  }, []);

  const result = resultData.find((item) => item.mbti === mbti);

  const onShareClick = () => {
    const { Kakao } = window;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${result?.resultTitle}`,
        description: `${result?.resultIntroduction}`,
        imageUrl: `${SERVER}/files/${DBNAME}/Share${mbti}.png`,
        link: {
          mobileWebUrl: 'https://greeny.vercel.app/event',
          webUrl: 'https://greeny.vercel.app/event',
        },
      },
    });
  };

  return (
    <button type="button" onClick={onShareClick} className={styles.kakapBtn}>
      <Image src={kakao} alt="카카오톡 아이콘" width={40} height={40} />
      공유하기
    </button>
  );
}
