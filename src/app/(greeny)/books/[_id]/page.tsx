import styles from './page.module.scss';
import Image from 'next/image';
import { getBookDetail } from '@/app/api/fetch/plantFetch';

export default async function Page({ params: { _id } }: { params: { _id: string } }) {
  const { item: plant } = await getBookDetail(_id);
  if (!plant) return <div>데이터가 없습니다.</div>;

  return (
    <div className={styles.page_container}>
      <div className={styles.title_container}>
        <h2 className={styles.title}>{plant.name}</h2>
        <p className={styles.subtitle}>{plant.content}</p>
      </div>

      <div className={styles.image_wrapper}>
        <Image src={plant.rtnFileUrl} alt="식물 이미지" className={styles.img} fill sizes="100%" />
      </div>

      <div className={styles.content_container}>
        <div className={styles.content_item}>
          <h4>물주기</h4>
          <p>{plant.waterCycle === '' ? '자료 없음' : plant.waterCycle}</p>
        </div>
        <div className={styles.content_item}>
          <h4>온도</h4>
          <p>{plant.grwhTpCodeNm === '' ? '자료 없음' : plant.grwhTpCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>습도</h4>
          <p>{plant.hdCodeNm === '' ? '자료 없음' : plant.hdCodeNm}</p>
        </div>

        <div className={styles.content_item}>
          <h4>일조량</h4>
          <p>{plant.lighttdemanddoCodeNm === '' ? '자료 없음' : plant.lighttdemanddoCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>비료</h4>
          <p>{plant.frtlzrInfo === '' ? '자료 없음' : plant.frtlzrInfo}</p>
        </div>
        <div className={styles.content_item}>
          <h4>관리수준</h4>
          <p>{plant.managelevelCodeNm === '' ? '자료 없음' : plant.managelevelCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>관리요구도</h4>
          <p>{plant.managedemanddoCodeNm === '' ? '자료 없음' : plant.managedemanddoCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>병해충</h4>
          <p>{plant.dlthtsCodeNm === '' ? '자료 없음' : plant.dlthtsCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>생육형태</h4>
          <p>{plant.grwhstleCodeNm === '' ? '자료 없음' : plant.grwhstleCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>생태</h4>
          <p>{plant.eclgyCodeNm === '' ? '자료 없음' : plant.eclgyCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>번식방법</h4>
          <p>{plant.prpgtEraInfo === '' ? '자료 없음' : plant.prpgtEraInfo}</p>
        </div>
        <div className={styles.content_item}>
          <h4>꽃색</h4>
          <p>{plant.flclrCodeNm === '' ? '자료 없음' : plant.flclrCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>열매색</h4>
          <p>{plant.fmldecolrCodeNm === '' ? '자료 없음' : plant.fmldecolrCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>잎색</h4>
          <p>{plant.lefcolrCodeNm === '' ? '자료 없음' : plant.lefcolrCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>잎무늬</h4>
          <p>{plant.lefmrkCodeNm === '' ? '자료 없음' : plant.lefmrkCodeNm}</p>
        </div>
        <div className={styles.content_item}>
          <h4>발화계절</h4>
          <p>{plant.prpgtEraInfo === '' ? '자료 없음' : plant.prpgtEraInfo}</p>
        </div>
      </div>
    </div>
  );
}
