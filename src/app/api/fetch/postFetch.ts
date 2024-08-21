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
    headers: { 'client-id': `${DBNAME}` },
  });
  const resJson: MultiItem<PostRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson.item;
}

export async function fetchDiaries(page?: string, keyword?: string) {
  const searchParams = new URLSearchParams();
  page && searchParams.set('page', page);
  keyword && searchParams.set('keyword', keyword);
  const url = `${SERVER}/posts?type=diary&limit=${LIMIT}&${searchParams.toString()}`;
  const res = await fetch(url, {
    headers: { 'client-id': `${DBNAME}` },
  });
  const resJson: MultiItem<DiaryRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson.item;
}

export async function fetchPost(id: string) {
  const url = `${SERVER}/posts/${id}`;
  const res = await fetch(url, {
    headers: { 'client-id': `${DBNAME}` },
  });
  const resJson: SingleItem<PostRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson.item;
}

export async function fetchDiary(id: string) {
  const url = `${SERVER}/posts/${id}?type=diary`;
  const res = await fetch(url, {
    headers: { 'client-id': `${DBNAME}` },
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