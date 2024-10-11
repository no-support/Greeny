import { AddBookmarkRes, BookmarkType } from '@/types/bookmark';
import { SingleItem, List, CoreSuccessRes } from '@/types/response';

export const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
export const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function getMyBookmarks<T extends BookmarkType>(type: 'user' | 'product' | 'post', token: string): Promise<List<T>> {
  const url = `${SERVER}/bookmarks/${type}`;
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

export async function addBookmark(type: 'product' | 'user' | 'post', userId: number, token: string, memo?: string): Promise<SingleItem<AddBookmarkRes>> {
  const url = `${SERVER}/bookmarks/${type}`;
  const body = memo ? { target_id: userId } : { target_id: userId, memo: memo };
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
