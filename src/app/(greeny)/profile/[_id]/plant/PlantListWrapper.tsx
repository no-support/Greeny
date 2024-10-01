import styles from './PlantListWrapper.module.scss';
import { PlantBookmark } from '@/types/bookmark';
import Plant from './Plant';
import DeleteButton from '../DeleteButton';
import Image from 'next/image';
// import DeleteButton from './DeleteButton';

export default function FollowingListWrapper({ followingList, isMe, userId }: { followingList: PlantBookmark[]; isMe: boolean; userId: string }) {
  return (
    <ul className={styles.follow_list}>
      {followingList?.map((item) => (
        <Plant key={item._id} {...item}>
          {isMe && (
            <DeleteButton _id={item._id} pathToRevalidate={`/profile/${userId}/plant`} bgColor="fill" btnSize="sm" radiusStyle="curve">
              <Image src="/images/FollowerDelete.svg" width={16} height={16} alt="닫기" />
            </DeleteButton>
          )}
        </Plant>
      ))}
    </ul>
  );
}
