// 서버 액션 정의
'use server';

import { auth } from '@/auth';
import { ApiResWithValidation, SingleItem } from '@/types/response';
import { UserData, UserForm, UserInfo } from '@/types/user';
import { addUser, updateUserInfo } from '../fetch/userFetch';
import { uploadImage } from '../fetch/fileFetch';

export async function signup(formData: FormData): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const userObj: Partial<UserForm> = {
    type: 'seller',
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
    phone: formData.get('phone')?.toString(),
    address: formData.get('address')?.toString(),
    image: '',
  };
  userObj.image = await handleImageUpload(formData);
  return addUser(userObj);
}

export async function editUser(formData: FormData): Promise<SingleItem<UserInfo>> {
  const session = await auth();

  const image = await handleImageUpload(formData);
  const userObj: Partial<UserForm> = {
    name: formData.get('name')?.toString(),
    password: formData.get('password')?.toString(),
    phone: formData.get('phone')?.toString(),
    address: formData.get('address')?.toString(),
  };
  image !== '' ? (userObj.image = image) : null;
  return updateUserInfo(session?.user?.id!, session?.accessToken!, userObj);
}

const handleImageUpload = async (formData: FormData): Promise<string> => {
  const attach = formData.get('attach') as File;
  if (attach?.size > 0) {
    const fileData = await uploadImage(formData);
    return fileData.item[0].path;
  }
  return '';
};
