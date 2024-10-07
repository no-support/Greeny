import { Bookmark, PlantBookmark, PostBookmark, UserBookmark } from '@/types/bookmark';
import { SingleItem, CoreErrorRes, List } from '@/types/response';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function getBookmarksByUserId(userId: string) {
  const url = `${SERVER}/users/${userId}/bookmarks`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  const data: SingleItem<Bookmark> | CoreErrorRes = await res.json();
  if (!data.ok) {
    console.error(data);
    throw new Error('북마크 목록 조회 실패');
  }
  return data.item;
}

export async function getMyBookmarksByUser(token: string) {
  const url = `${SERVER}/bookmarks/user`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  const data: List<UserBookmark> | CoreErrorRes = await res.json();
  if (!data.ok) {
    console.error(data);
  }
  return data;
}

export async function getMyBookmarksByProduct(token: string) {
  const url = `${SERVER}/bookmarks/product`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  const data: List<PlantBookmark> | CoreErrorRes = await res.json();
  if (!data.ok) {
    console.error(data);
  }
  return data;
}

export async function getMyBookmarksByPost(token: string) {
  const url = `${SERVER}/bookmarks/post`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  const data: List<PostBookmark> | CoreErrorRes = await res.json();
  if (!data.ok) {
    console.error(data);
  }
  return data;
}

export async function removeBookmark(bookmarkId: number, token: string) {
  const url = `${SERVER}/bookmarks/${bookmarkId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function addBookmarkByUserId(userId: number, token: string) {
  const url = `${SERVER}/bookmarks/user`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      target_id: userId,
    }),
  });
  return res.json();
}
