import { PlantJson, PlantListRes, PlantRes, TParams } from '@/types/plant';
import { CoreSuccessRes, MultiItem, SingleItem } from '@/types/response';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function getPlantListBySellerId(sellerId: string): Promise<MultiItem<PlantListRes>> {
  const url = `${SERVER}/products?seller_id=${sellerId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getPlantDetail(productId: string): Promise<SingleItem<PlantRes>> {
  const url = `${SERVER}/products/${productId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getAllPlants(token: string): Promise<MultiItem<PlantRes>> {
  const url = `${SERVER}/seller/products`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function postPlant(token: string, plantObj: any): Promise<SingleItem<PlantRes>> {
  const ul = `${SERVER}/seller/products`;
  const res = await fetch(ul, {
    method: 'POST',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plantObj),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function patchPlant(id: number, token: string, plantObj: any): Promise<SingleItem<PlantRes>> {
  const url = `${SERVER}/seller/products/${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plantObj),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function deletePlant(id: number, token: string): Promise<CoreSuccessRes> {
  const url = `${SERVER}/seller/products/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
export async function getBookList(pageParam: number, searchParams: TParams): Promise<MultiItem<PlantJson>> {
  /**
   * books?keyword=%EB%93%9C&grwhstleCode=054001&grwhstleCode=054002&fmldecolrCode=081001
   * fetch to
   * /products?seller_id=777&limit=15&sort={"name":1}&page=${pageParam}
   * & custom={ "$and": [{ "$or": [{ "grwhstleCode": "054001" }, { "grwhstleCode": "054002" }] },
   * { "$or": [{ "fmldecolrCode": "081001" }] } ] }
   */

  const queryString = createBackendQuery(searchParams);

  const url = `${SERVER}${queryString}&page=${pageParam}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();

  function createBackendQuery(searchParams: TParams) {
    const { grwhstleCode, flclrCode, fmldecolrCode, lefmrkCode, lighttdemanddoCode, waterCycleCode, keyword } = searchParams;

    const customQuery = {
      $and: [
        grwhstleCode.length > 0 && {
          $or: grwhstleCode.map((code) => ({ grwhstleCode: code })),
        },
        flclrCode.length > 0 && {
          $or: flclrCode.map((code) => ({ flclrCode: code })),
        },
        fmldecolrCode.length > 0 && {
          $or: fmldecolrCode.map((code) => ({ fmldecolrCode: code })),
        },
        lefmrkCode.length > 0 && {
          $or: lefmrkCode.map((code) => ({ lefmrkCode: code })),
        },
        lighttdemanddoCode.length > 0 && {
          $or: lighttdemanddoCode.map((code) => ({ lighttdemanddoCode: code })),
        },
        waterCycleCode.length > 0 && {
          $or: waterCycleCode.map((code) => ({ waterCycleCode: code })),
        },
      ].filter(Boolean), // 조건이 없는 항목은 필터링
    };
    let queryString = `/products?seller_id=777&limit=15&sort={"name":1}&keyword=${encodeURIComponent(keyword || '')}`;
    if (customQuery['$and'].length > 0) {
      queryString += `&custom=${encodeURIComponent(JSON.stringify(customQuery))}`;
    }
    return queryString;
  }
}

export async function getBookDetail(productId: string): Promise<SingleItem<PlantJson>> {
  const url = `${SERVER}/products/${productId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
