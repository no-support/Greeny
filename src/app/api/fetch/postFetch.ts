import { auth } from '@/auth';
import { PlantRes } from '@/types/plant';
import { DiaryRes, PostComment, PostRes } from '@/types/post';
import { CoreErrorRes, MultiItem, SingleItem } from '@/types/response';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function fetchPosts(params?: { page?: string; keyword?: string; category?: string }) {
  const searchParams = new URLSearchParams();
  params?.page && searchParams.set('page', params.page);
  params?.keyword && searchParams.set('keyword', params.keyword);
  const url = `${SERVER}/posts?limit=${LIMIT}&${searchParams.toString()}` + (params?.category ? `&custom={"extra":{"category":"${params.category}"}}` : '');

  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      ...(await getAuthHeader()),
    },
  });
  const resJson: MultiItem<PostRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);
  return resJson;
}

export async function fetchDiaries(params?: { page?: string; keyword?: string }, noLimit?: true) {
  const searchParams = new URLSearchParams();
  params?.page && searchParams.set('page', params.page);
  params?.keyword && searchParams.set('keyword', params.keyword);
  const url = `${SERVER}/posts?type=diary&limit=${noLimit ? 0 : LIMIT}&${searchParams.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      ...(await getAuthHeader()),
    },
  });
  const resJson: MultiItem<DiaryRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson.item;
}

export async function fetchPost(id: string) {
  const url = `${SERVER}/posts/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      ...(await getAuthHeader()),
    },
  });
  const resJson: SingleItem<PostRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);
  return resJson.item;
}

export async function fetchDiary(id: string) {
  const url = `${SERVER}/posts/${id}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      ...(await getAuthHeader()),
    },
  });
  const resJson: SingleItem<DiaryRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson.item;
}

export async function fetchReply(id: string) {
  const url = `${SERVER}/posts/${id}/replies`;
  const res = await fetch(url, {
    headers: { 'client-id': `${DBNAME}` },
  });
  const resJson: MultiItem<PostComment> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson.item;
}

export async function fetchPlant(plantId: string) {
  const url = `${SERVER}/products/${plantId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      ...(await getAuthHeader()),
    },
  });
  const resJson: SingleItem<PlantRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson.item;
}

async function getAuthHeader() {
  const session = await auth();
  const authorizationHeader: { Authorization: string } | {} = session ? { Authorization: `Bearer ${session.accessToken}` } : {};

  return authorizationHeader;
}

export async function fetchPostsByUserId(userId: string) {
  const url = `${SERVER}/posts/users/${userId}?type=post`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  const resJson: MultiItem<PostRes> | CoreErrorRes = await res.json();
  return resJson;
}
