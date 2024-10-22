import { auth } from '@/auth';
import { DBNAME, LIMIT, SERVER } from '@/constant';
import { DiaryForm, DiaryRes, PostComment, PostRes } from '@/types/post';
import { ApiResWithValidation, CoreErrorRes, CoreSuccessRes, MultiItem, SingleItem } from '@/types/response';

async function getAuthHeader() {
  const session = await auth();
  const authorizationHeader: { Authorization: string } | {} = session ? { Authorization: `Bearer ${session.accessToken}` } : {};

  return authorizationHeader;
}

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

export async function fetchDiaries(params?: { page?: string; keyword?: string }, token?: string, limit?: number) {
  const searchParams = new URLSearchParams();
  params?.page && searchParams.set('page', params.page);
  params?.keyword && searchParams.set('keyword', params.keyword);
  const url = `${SERVER}/posts?type=diary&limit=${limit ?? LIMIT}&${searchParams.toString()}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const resJson: MultiItem<DiaryRes> | CoreErrorRes = await res.json();
  if (!resJson.ok) throw new Error(resJson.message);

  return resJson;
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
  const itemRemovedContentHash = resJson.item.map((item) => ({ ...item, content: item.content.slice(0, -1) }));

  return itemRemovedContentHash;
}

export async function getPostsByUserId(userId: string) {
  const url = `${SERVER}/posts/users/${userId}?type=post`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  const resJson: MultiItem<PostRes> | CoreErrorRes = await res.json();
  return resJson;
}

export async function removeReply(postId: string, replyId: number, token: string): Promise<CoreSuccessRes> {
  const url = `${SERVER}/posts/${postId}/replies/${replyId}`;
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

export async function patchReply(postId: string, replyId: number, token: string, body: { content: string }) {
  const url = `${SERVER}/posts/${postId}/replies/${replyId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function postReply(postId: string, token: string, body: { content: string }) {
  const url = `${SERVER}/posts/${postId}/replies`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function removePost(postId: string, token: string) {
  const url = `${SERVER}/posts/${postId}`;
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

export async function patchPost(postId: number, token: string, body: any) {
  const url = `${SERVER}/posts/${postId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function postPost(token: string, body: any): Promise<ApiResWithValidation<SingleItem<DiaryRes>, DiaryForm>> {
  const url = `${SERVER}/posts`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
