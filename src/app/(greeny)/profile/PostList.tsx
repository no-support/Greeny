import styles from './PostList.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/button/Button';
import { fetchPostsByUserId } from '@/app/api/fetch/postFetch';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default async function PostList(id: string, isMe: boolean) {
  const postData = await fetchPostsByUserId(id);
  if (!postData.ok) {
    return postData.message;
  }

  if (isMe && postData.item.length === 0) {
    return (
      <div className={styles.zero_item_noti_container}>
        <div className={styles.zero_item_noti}>
          <div className={styles.zero_item_noti_msg}>
            <p>아직 작성된 게시글이 없어요!</p>
            <p>첫 글을 올려보세요!</p>
          </div>
          <Link href="/story/community/new" className={styles.zero_item_noti_link}>
            <Button btnSize="sm">게시글 작성하기</Button>
          </Link>
        </div>
      </div>
    );
  }
  const postItem = postData.item.map((post) => {
    return (
      <li className={styles.contents_item} key={post._id}>
        <Link href={`/story/community/${post._id}`}>
          <div className={styles.contents_main}>
            <div className={styles.contents_info}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
            <div className={styles.contents_cover}>{post.image?.length > 0 ? <Image src={`${SERVER}${post.image.at(0)?.path}`} alt="식물 사진" sizes="100%" fill /> : ''}</div>
          </div>
        </Link>
      </li>
    );
  });

  const secondTabContent = <ul className={styles.list_wrapper}>{postItem}</ul>;
  return secondTabContent;
}
