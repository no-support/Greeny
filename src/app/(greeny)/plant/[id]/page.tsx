import styles from './MyPlantDetail.module.scss';
import { getPlantDetail } from '@/app/api/fetch/plantFetch';
import { differenceInDays } from 'date-fns';
import { auth } from '@/auth';
import FollowButton from './FollowButton';
import Tab from '@/components/tab/Tab';
import PlantInfo from './PlantInfo';
import PlantDiray from './PlantDiary';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import plantEdit from '@images/PlantEdit.svg';
import Link from 'next/link';
import { getMyBookmarks } from '@/app/api/fetch/bookmarkFetch';
import { SERVER } from '@/constant';

export async function generateMetadata({ params }: { params: { id: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const plantId = params.id;
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: 'Plant Detail',
    openGraph: {
      title: `Plant Detail`,
      description: `${plantId}식물 상세 페이지`,
      url: `/plant/${params.id}`,
      images: [...previousImages],
    },
  };
}

export default async function MyPlantDetail({ params }: { params: { id: string } }) {
  const session = await auth();
  const { item } = await getPlantDetail(params.id);
  const { item: plantBookmarks } = await getMyBookmarks('product', session?.accessToken!);
  const adoptionDate = item.adoptionDate;
  const toDay = new Date();
  const diffDays = differenceInDays(toDay, adoptionDate!);

  return (
    <div className={styles.plantDetail_wrapper}>
      <div className={styles.plantDetail_head}>
        <h2>{item.name}</h2>

        {Number(session?.user?.id) === item.seller_id && (
          <div className={styles.plantDetail_edit}>
            <Image src={plantEdit} alt="식물 수정 버튼" width={20} height={20} />
            <Link href={`/plant/${item._id}/edit`}>정보 수정</Link>
          </div>
        )}
      </div>
      <div className={styles.plant}>
        <div className={styles.plant_photo}>
          <Image src={`${item.mainImages!.length > 0 ? `${SERVER}${item.mainImages![0].path}` : ''}`} alt="식물 사진" fill sizes="100%" />
        </div>

        <div className={styles.plant_info}>
          <div className={styles.plant_name}>
            <h2>{item.name}</h2>
            <h3>식물 학명</h3>
            <span>{item.scientificName}</span>
          </div>

          <div className={styles.plant_gardeningPc}>
            <div className={styles.plant_head}>
              <h3>가드닝 정보</h3>
            </div>
            <ul>
              <li>
                <span>온도</span>
                <p>{item.grwhTp}</p>
              </li>
              <li>
                <span>습도</span>
                <p>{item.humidity}</p>
              </li>
              <li>
                <span>물주기</span>
                <p>{item.waterCycle}일에 한번씩</p>
              </li>
              <li>
                <span>일조량</span>
                <p>{item.light}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {session?.user?.id == String(item.seller_id) ? (
        <p className={styles.plant_with}>
          `{item.name}`와 함께한지 {diffDays}일째에요!
        </p>
      ) : (
        <FollowButton id={params.id} plantBookmarks={plantBookmarks} />
      )}

      <div className={styles.plantContentPc}>
        <PlantInfo item={item} user={session} />
        <PlantDiray item={item} user={session} />
      </div>

      <div className={styles.plantContentMo}>
        <Tab firstContent={<PlantInfo item={item} user={session} />} secondContent={<PlantDiray item={item} user={session} />} firstSrOnly="식물정보" secondSrOnly="식물다이어리" />
      </div>
    </div>
  );
}
