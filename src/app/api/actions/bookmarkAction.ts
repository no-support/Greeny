'use server';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { addBookmark, removeBookmark } from '../fetch/bookmarkFetch';

//식물 북마크
export async function followPlant(id: string) {
  const session = await auth();
  const data = await addBookmark('product', Number(id), session?.accessToken!);
  revalidatePath(`/plant/${id}`);
  return data;
}

export async function unFollowPlant(id: number | undefined) {
  const session = await auth();
  const data = await removeBookmark(id!, session?.accessToken!);
  revalidatePath(`/plant/${id}`);
  return data;
}
