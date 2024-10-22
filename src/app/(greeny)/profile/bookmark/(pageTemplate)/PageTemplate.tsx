import styles from './PageTemplate.module.scss';
import type { PlantBookmark, PostBookmark } from '@/types/bookmark';
import Link from 'next/link';
import Image from 'next/image';
import Tab from '@/components/tab/Tab';
import BookmarkPlant from './(bookmarkPlant)/BookmarkPlant';
import { SERVER } from '@/constant';

interface PageTemplateProps {
  plantBookmarks: PlantBookmark[];
  postBookmarks: PostBookmark[];
}

export default function PageTemplate({ plantBookmarks, postBookmarks }: PageTemplateProps) {
  const firstTabItem = plantBookmarks.map((plantBookmark) => {
    return <BookmarkPlant key={plantBookmark._id} name={plantBookmark.product.name} href={`/plant/${plantBookmark.product._id}`} src={`${SERVER}${plantBookmark.product.mainImages.at(0)?.path}`} />;
  });
  const firstContent = <ul className={styles.tab_body}>{firstTabItem}</ul>;

  const secondTabItem = postBookmarks.map((post) => {
    return (
      <li className={styles.contents_item} key={post._id}>
        <Link href={`/story/community/${post.post._id}`}>
          <div className={styles.contents_main}>
            <div className={styles.contents_info}>
              <h3>{post.post.title}</h3>
              <p>{post.memo}</p>
            </div>
            <div className={styles.contents_cover}>{post.post.image.length > 0 ? <Image fill sizes="100%" src={`${SERVER}${post.post.image[0].path}`} alt="식물 사진" /> : ''}</div>
          </div>
        </Link>
      </li>
    );
  });
  const secondContent = <ul className={styles.list_wrapper}>{secondTabItem}</ul>;

  return (
    <div className={styles.template_container}>
      <div className={styles.heading_container}>
        <h2 className={styles.heading}>좋아요한 게시글</h2>
      </div>
      <Tab firstContent={firstContent} secondContent={secondContent} firstSrOnly="식물" secondSrOnly="포스트" />
    </div>
  );
}
