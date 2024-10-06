'use client';
import styles from './BookmarkForm.module.scss';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/components/input/Input';
import { useBookmarkedSearchFormStore } from '@/store/store';

interface FormValues {
  name: string;
}

export default function BookmarkForm() {
  const { handleSubmit, register } = useForm<FormValues>();

  const setKeyword = useBookmarkedSearchFormStore((state) => state.setKeyword);

  const submitHandler: SubmitHandler<FormValues> = (formValues) => {
    setKeyword(formValues.name);
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
