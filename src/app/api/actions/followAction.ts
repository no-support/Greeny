'use server';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

//식물 북마크
export async function followPlant(id: string | undefined) {
  const session = await auth();
  const url = `${SERVER}/bookmarks/product`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'client-id': `${DBNAME}`,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ target_id: Number(id) }),
  });
  revalidatePath(`/plant/${id}`);
  return res.json();
}

export async function unFollowPlant(id: number | undefined) {
  const session = await auth();
  const url = `${SERVER}/bookmarks/${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'client-id': `${DBNAME}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  revalidatePath(`/plant/${id}`);
  return res.json();
}
