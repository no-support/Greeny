'use client';
import { PlantBookmark } from '@/types/bookmark';
import styles from './MyPlantDetail.module.scss';
import { followPlant, unFollowPlant } from '@/app/api/actions/bookmarkAction';

export default function FollowButton({ id, plantBookmarks }: { id: string; plantBookmarks: PlantBookmark[] }) {
  const isFollowed = plantBookmarks.some((num) => Number(id) === num.product._id);
  const LikeId = plantBookmarks.find((num) => Number(id) === num.product._id);

  return (
    <>
      <button type="button" className={isFollowed ? styles.unFollowBtn : styles.followBtn} onClick={() => (isFollowed ? unFollowPlant(LikeId?._id) : followPlant(id))}>
        {isFollowed ? '관찰 끊기' : '관찰 하기'}
      </button>
    </>
  );
}
