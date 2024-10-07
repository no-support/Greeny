import { PlantListRes } from '@/types/plant';
import { CoreErrorRes, MultiItem } from '@/types/response';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function fetchPlantsDetail<T>(id: string | undefined) {
  const url = `${SERVER}/products/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  const resJson = await res.json();
  return resJson.item;
}

export async function fetchPlantsLike<T>(accessToken: string | undefined) {
  const url = `${SERVER}/bookmarks/product`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const resJson = await res.json();

  return resJson.item;
}

// swagger - 상품 목록 조회
export async function fetchPlantList(id: string) {
  const url = `${SERVER}/products?seller_id=${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  const resJson: MultiItem<PlantListRes> | CoreErrorRes = await res.json();
  return resJson;
}
