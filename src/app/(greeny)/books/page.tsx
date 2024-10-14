import styles from './page.module.scss';
import CardList from './CardList';
import Dialog from './Dialog';
import SearchForm from './SearchForm';
import plantList from '@/app/data/plantList';

const isEmptyOrIncludes = (param: string | string[] | undefined, value: string) => {
  return !param || (Array.isArray(param) ? param : [param]).includes(value);
};

export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const plants = plantList.filter((plant) => {
    return (
      isEmptyOrIncludes(searchParams.grwhstleCode, plant.grwhstleCode) &&
      isEmptyOrIncludes(searchParams.flclrCode, plant.flclrCode) &&
      isEmptyOrIncludes(searchParams.fmldecolrCode, plant.fmldecolrCode) &&
      isEmptyOrIncludes(searchParams.lefmrkCode, plant.lefmrkCode) &&
      isEmptyOrIncludes(searchParams.lighttdemanddoCode, plant.lighttdemanddoCode) &&
      isEmptyOrIncludes(searchParams.waterCycleCode, plant.waterCycleCode) &&
      (!searchParams.keyword || plant.cntntsSj.includes(searchParams.keyword as string))
    );
  });

  return (
    <div className={styles.page_container}>
      <div className={styles.search_container}>
        <div className={styles.heading_container}>
          <h2 className={styles.heading}>
            어떤 종류의
            <br />
            식물을 찾고 있나요?
          </h2>
        </div>

        <div className={styles.search_form}>
          <div className={styles.btn_wrapper}>
            <SearchForm />
            <Dialog />
          </div>
        </div>
      </div>
      <CardList cards={plants} />
    </div>
  );
}
