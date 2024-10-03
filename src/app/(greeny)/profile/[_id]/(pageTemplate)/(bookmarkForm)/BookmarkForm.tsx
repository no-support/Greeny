'use client';
import styles from './BookmarkForm.module.scss';
import type { PlantBookmark, UserBookmark } from '@/types/bookmark';
import Image from 'next/image';
import { Dispatch, SetStateAction, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/input/Input';
import { isPlantBookmark } from '@/types/bookmark';

interface PlantFormProps {
  followingList: PlantBookmark[] | UserBookmark[];
  setFollowingList: Dispatch<SetStateAction<PlantBookmark[] | UserBookmark[]>>;
}

interface FormValues {
  name: string;
}

export default function BookmarkForm({ followingList, setFollowingList }: PlantFormProps) {
  const initialFollowingList = useRef(followingList);
  const { handleSubmit, register } = useForm<FormValues>();

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    if (data.name === '') {
      setFollowingList(initialFollowingList.current);
      return;
    }
    const filteredData: PlantBookmark[] | UserBookmark[] = [];
    if (isPlantBookmark(followingList)) {
      filterPlant(followingList, data);
    } else {
      filterUser(followingList, data);
    }
    setFollowingList(filteredData);
  };

  return (
    <form className={styles.form_wrapper} onSubmit={handleSubmit(submitHandler)}>
      <Input placeholder="이름을 입력해주세요." type="search" {...register('name')} />
      <button className={styles.btn_submit}>
        <Image className={styles.image} src="/images/SearchIcon.svg" width={18} height={18} alt="search" />
      </button>
    </form>
  );
}

function filterPlant(followingList: PlantBookmark[], data: FormValues) {
  followingList.filter((item) => item.product.name.toLowerCase().includes(data.name.toLowerCase()));
}
function filterUser(followingList: UserBookmark[], data: FormValues) {
  followingList.filter((item) => item.user.name.toLowerCase().includes(data.name.toLowerCase()));
}
