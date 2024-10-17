import { AddBookmarkRes, PlantBookmark, PostBookmark, Type, UserBookmark } from '@/types/bookmark';
import { SingleItem, List, CoreSuccessRes } from '@/types/response';

export const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
export const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function getMyBookmarks<T extends Type>(type: T, token: string): Promise<List<T extends 'user' ? UserBookmark : T extends 'product' ? PlantBookmark : PostBookmark>> {
  const url = `${SERVER}/bookmarks/${type}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const data = await res.json();
    console.error(data);
    throw new Error(data.message);
  }
  return res.json();
}

export async function removeBookmark(bookmarkId: number, token: string): Promise<CoreSuccessRes> {
  const url = `${SERVER}/bookmarks/${bookmarkId}`;
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

export async function addBookmark(type: Type, targetId: number, token: string, memo?: string): Promise<SingleItem<AddBookmarkRes>> {
  const url = `${SERVER}/bookmarks/${type}`;
  const body = memo ? { target_id: targetId, memo } : { target_id: targetId };
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
    const data = await res.json();
    console.error(data);
    throw new Error(data.message);
  }
  return res.json();
}
