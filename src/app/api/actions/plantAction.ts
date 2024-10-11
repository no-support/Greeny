'use server';

import { auth } from '@/auth';
import { ImageRes } from '@/types/image';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '../fetch/fileFetch';
import { patchPost, postPost } from '../fetch/postFetch';
import { patchPlant, postPlant, deletePlant } from '../fetch/plantFetch';

//다이어리 추가
export async function DiaryNew(formData: FormData, id: string) {
  const session = await auth();
  const diaryObj = {
    type: formData.get('type') || 'diary',
    product_id: Number(id),
    seller_id: session?.user && session?.user.id,
    title: formData.get('title'),
    content: formData.get('content'),
    extra: { plantState: formData.get('plantState'), action: formData.get('action'), actionDate: formData.get('actionDate') },
    image: [{ path: '', name: '' }],
  };
  const attach = formData.get('attach') as File;

  if (attach && attach?.size > 0) {
    const fileData = await uploadImage(formData);
    diaryObj.image = fileData.item.map((image) => ({
      path: image.path,
      name: image.originalname,
    }));
  }

  const data = await postPost(session?.accessToken!, diaryObj);
  return data;
}

// 다이어리 수정
export async function DiaryEdit(diaryId: number, plantId: number | undefined, formData: FormData, originImage: ImageRes[]) {
  const session = await auth();
  const mainImages = formData.getAll('attach') as File[];

  const imgFormData = new FormData();
  Array.from(mainImages).forEach((imageFile) => {
    imgFormData.append('attach', imageFile);
  });

  const fileData = await uploadImage(imgFormData);
  const newImages = fileData.item.map((file: ImageRes) => ({
    path: file.path,
    name: file.name,
  }));

  const diaryObj = {
    type: 'diary',
    title: formData.get('title'),
    content: formData.get('content'),
    extra: { plantState: formData.get('plantState'), action: formData.get('action'), actionDate: formData.get('actionDate') },
    image: [...originImage, ...newImages],
  };

  const data = await patchPost(diaryId, session?.accessToken!, diaryObj);

  revalidatePath(`/plant/${diaryId}/diaryEdit`);
  revalidatePath(`/plant/${plantId}`);
  return data;
}

//식물 추가
export async function plantNew(formData: FormData) {
  const session = await auth();
  const plantObj = {
    price: 999,
    quantity: 999,
    name: formData.get('name'),
    scientificName: formData.get('scientificName'),
    light: formData.get('light'),
    grwhTp: formData.get('grwhTp'),
    humidity: formData.get('humidity'),
    adoptionDate: formData.get('adoptionDate'),
    waterCycle: formData.get('waterCycle'),
    content: formData.get('content'),
    mainImages: [{ path: '', name: '' }],
  };
  const attach = formData.get('attach') as File;

  if (attach?.size > 0) {
    const fileData = await uploadImage(formData);
    plantObj.mainImages = [
      {
        path: fileData.item[0].path,
        name: fileData.item[0].name,
      },
    ];
  }
  const data = await postPlant(session?.accessToken!, plantObj);
  revalidatePath('/plant');
  return data;
}

//식물 삭제
export async function plantsDelete(id: number) {
  const session = await auth();
  const data = await deletePlant(id, session?.accessToken!);
  revalidatePath('/plant');
  return data;
}

export async function plantEdit(id: number | undefined, formData: FormData) {
  const session = await auth();

  const mainImages = formData.get('mainImages');
  const parsedMainImages = mainImages ? JSON.parse(mainImages as string) : null;

  const plantObj = {
    name: formData.get('name'),
    scientificName: formData.get('scientificName'),
    light: formData.get('light'),
    grwhTp: formData.get('grwhTp'),
    humidity: formData.get('humidity'),
    adoptionDate: formData.get('adoptionDate'),
    waterCycle: formData.get('waterCycle'),
    content: formData.get('content'),
    mainImages: parsedMainImages,
  };
  const data = await patchPlant(id!, session?.accessToken!, plantObj);
  revalidatePath(`/plant/${id}/edit`);
  revalidatePath('/plant');
  return data;
}
