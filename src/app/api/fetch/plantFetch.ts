import { PlantListRes, PlantRes } from '@/types/plant';
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
