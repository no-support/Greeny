'use server';

import { auth } from '@/auth';
import { ImageRes } from '@/types/image';
import { PostComment } from '@/types/post';
import { CoreErrorRes, SingleItem } from '@/types/response';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addBookmark, removeBookmark } from '../fetch/bookmarkFetch';
import { patchPost, patchReply, postPost, postReply, removePost, removeReply } from '@/app/api/fetch/postFetch';
import { uploadImage } from '../fetch/fileFetch';

export async function addPost(formData: FormData) {
  const session = await auth();
  const category = formData.get('category');

  const imageFiles = formData.getAll('attach') as File[];
  const images = imageFiles[0]?.size > 0 ? await uploadFile(imageFiles) : [];

  const body = {
    type: 'post',
    image: images,
    title: formData.get('title'),
    content: formData.get('content'),
    extra: { category },
  };
  await postPost(session?.accessToken!, body);
  revalidatePath('/story/community');
  redirect('/story/community');
}

export async function updatePost(postId: number, originalImage: ImageRes[], formData: FormData, ...rest: any) {
  const session = await auth();
  const category = formData.get('category')?.toString();

  const imageFiles = formData.getAll('attach') as File[];
  const images = imageFiles[0]?.size > 0 ? await uploadFile(imageFiles) : [];

  const body = {
    image: [...originalImage, ...images!],
    title: formData.get('title')?.toString(),
    content: formData.get('content')?.toString(),
    extra: { category },
  };
  await patchPost(postId, session?.accessToken!, body);
  revalidatePath('/story/community');
  redirect('/story/community');
}

async function uploadFile(imageFiles: File[]) {
  const imgFormData = new FormData();
  imageFiles.forEach((imageFile) => imgFormData.append('attach', imageFile));
  const fileResList = await uploadImage(imgFormData);
  return fileResList.item.map((fileRes) => ({
    path: fileRes.path,
    name: fileRes.originalname,
  }));
}

export async function deletePost(postId: string) {
  const session = await auth();
  await removePost(postId, session?.accessToken!);
  revalidatePath(`/story/community`);
  redirect('/story/community');
}

export async function deleteDiary(postId: string) {
  const session = await auth();
  await removePost(postId, session?.accessToken!);
  revalidatePath(`/story/diaries`);
  redirect('/story/diaries');
}

export async function addReply(postId: string, formData: FormData): Promise<SingleItem<PostComment> | CoreErrorRes> {
  const session = await auth();
  const body = {
    content: formData.get('content')?.toString()!,
  };
  const data = await postReply(postId, session?.accessToken!, body);
  revalidatePath(`/story/community/${postId}`);
  return data;
}

export async function updateReply(postId: string, replyId: number, formData: FormData): Promise<SingleItem<PostComment> | CoreErrorRes> {
  const session = await auth();
  const body = {
    content: formData.get('content')?.toString()!,
  };
  const data = await patchReply(postId, replyId, session?.accessToken!, body);
  revalidatePath(`/story/community/${postId}`);
  return data;
}

export async function deleteReply(postId: string, replyId: number) {
  const session = await auth();
  const data = await removeReply(postId, replyId, session?.accessToken!);
  revalidatePath(`/story/community/${postId}`);
  return data;
}

export async function likePost(targetId: string, content: string) {
  const session = await auth();
  const data = await addBookmark('post', Number(targetId), session?.accessToken!, content);
  revalidatePath(`/story/community/${targetId}`);
  revalidatePath(`/story/diaries/${targetId}`);
  revalidatePath(`/story/diaries`);
  return data;
}

export async function cancelLikePost(bookmarkId: number) {
  const session = await auth();
  const data = await removeBookmark(Number(bookmarkId), session?.accessToken!);
  revalidatePath(`/story/community`);
  revalidatePath(`/story/diaries`);
  return data;
}

export async function followPlant(targetId: number) {
  const session = await auth();
  const data = await addBookmark('product', targetId, session?.accessToken!);
  revalidatePath(`/story/diaries/${targetId}`);
  return data;
}

export async function unfollowPlant(bookmarkId: number) {
  const session = await auth();
  const data = await removeBookmark(bookmarkId, session?.accessToken!);
  revalidatePath(`/story/diaries`);
  return data;
}
