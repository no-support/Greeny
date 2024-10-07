import styles from './PlantList.module.scss';
import Link from 'next/link';
import PlantThumbnail from './PlantThumbnail';
import Button from '@/components/button/Button';
import { fetchPlantList } from '@/app/api/fetch/plantFetch';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export default async function PlantList(id: string, isMe: boolean) {
  const plantData = await fetchPlantList(id);
  if (!plantData.ok) return plantData.message;

  if (isMe && plantData.item.length === 0) {
    return (
      <div className={styles.zero_item_noti_container}>
        <div className={styles.zero_item_noti}>
          <div className={styles.zero_item_noti_msg}>
            <p>지금 여러분의 식물 정원이 비어있네요.</p>
            <p>식물 친구를 초대해주세요!</p>
          </div>
          <Link href="/plant" className={styles.zero_item_noti_link}>
            <Button btnSize="sm">식물 추가하기</Button>
          </Link>
        </div>
      </div>
    );
  }
  const firstItem = plantData.item.map((plant) => {
    const src = plant.mainImages.at(0)?.path === '' ? '' : `${SERVER}${plant.mainImages.at(0)?.path}`;
    return <PlantThumbnail key={plant._id} href={`/plant/${plant._id}`} src={src} />;
  });
  const plantList = <ul className={styles.list_wrapper}>{firstItem}</ul>;
  return plantList;
}
