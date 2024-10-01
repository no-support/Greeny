import styles from './UserListWrapper.module.scss';
import { UserBookmark } from '@/types/bookmark';
import User from './User';
import DeleteButton from '../DeleteButton';
import Image from 'next/image';

export default function UserListWrapper({ followingList, isMe, userId }: { followingList: UserBookmark[]; isMe: boolean; userId: string }) {
  return (
    <ul className={styles.follow_list}>
      {followingList?.map((item) => (
        <User key={item._id} user={item} userId={userId}>
          {isMe && (
            <DeleteButton _id={item._id} pathToRevalidate={`/profile/${userId}/user`} bgColor="fill" btnSize="sm" radiusStyle="curve">
              <Image src="/images/FollowerDelete.svg" width={16} height={16} alt="닫기" />
            </DeleteButton>
          )}
        </User>
      ))}
    </ul>
  );
}
