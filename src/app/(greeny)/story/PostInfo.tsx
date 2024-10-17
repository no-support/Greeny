import styles from '@greeny/story/Community.module.scss';
import { formatAgo } from '@/utils/format';
import Like from '@greeny/story/Like';
import { PostRes } from '@/types/post';

type Props = {
  post: PostRes;
  likeBookmarkId?: number;
};

export default async function PostInfo({ post, likeBookmarkId }: Props) {
  return (
    <div className={styles.post_info}>
      <Like number={post.bookmarks} targetId={post._id.toString()} bookmarkId={likeBookmarkId} content={post.content} />
      <div className={styles.time_and_views}>
        <div>{formatAgo(post.createdAt)}</div>
        <div>조회수 {post.views}</div>
      </div>
    </div>
  );
}
