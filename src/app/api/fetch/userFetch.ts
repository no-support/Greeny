import { Bookmark } from '@/types/bookmark';
import { ApiResWithValidation, SingleItem } from '@/types/response';
import { UserData, UserForm, UserInfo } from '@/types/user';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function fetchAccessToken(refreshToken: string) {
  const url = `${SERVER}/auth/refresh`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  return res.json();
}

export async function getUserInfo(userId: string): Promise<SingleItem<UserInfo>> {
  const url = `${SERVER}/users/${userId}`;
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

export async function addUser(userObj: Partial<UserForm>): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const res = await fetch(`${SERVER}/users`, {
    method: 'POST',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function updateUserInfo(userId: string, token: string, userObj: Partial<UserForm>): Promise<SingleItem<UserInfo>> {
  const url = `${SERVER}/users/${userId}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

export async function getBookmarksByUserId(userId: string): Promise<SingleItem<Bookmark>> {
  const url = `${SERVER}/users/${userId}/bookmarks`;
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
