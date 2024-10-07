import { CoreErrorRes, SingleItem } from '@/types/response';
import { UserInfo } from '@/types/user';

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

export async function getUserInfo(userId: string): Promise<SingleItem<UserInfo> | CoreErrorRes> {
  const url = `${SERVER}/users/${userId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });
  return res.json();
}

export async function fetchUserInfo(userId: string): Promise<SingleItem<UserInfo>> {
  const url = `${SERVER}/users/${userId}`;
  const res = await fetch(url, {
    headers: {
      'client-id': `${DBNAME}`,
    },
  });

  const resJson: SingleItem<UserInfo> | CoreErrorRes = await res.json();
  if (!resJson.ok) {
    throw new Error(resJson.message);
  }
  return resJson;
}
