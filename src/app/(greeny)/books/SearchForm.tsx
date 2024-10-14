'use client';
import styles from './SearchForm.module.scss';
import Input from '@/components/input/Input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import SearchIcon from '@images/SearchIcon.svg';
import { useRouter, useSearchParams } from 'next/navigation';

interface FormData {
  keyword: string;
}

export default function SearchForm() {
  const { register, handleSubmit } = useForm<FormData>();
  const params = useSearchParams();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        // 이미 있었을 수 있는 queryString에 keyword를 추가한다. 단, 이미 keyword가 있었을 수 있으므로 지우고 추가한다.
        const urlParam = new URLSearchParams();

        for (const [key, value] of Array.from(params.entries())) {
          urlParam.append(key, value);
        }
        urlParam.delete('keyword');
        formData.keyword.length > 0 && urlParam.append('keyword', formData.keyword);

        router.push(`/books?${urlParam.toString()}`);
      })}
      className={styles.search_form}
    >
      <Input type="search" placeholder="식물명을 입력해주세요" {...register('keyword')} />
      <button type="submit" className={styles.search_btn}>
        <Image src={SearchIcon} width={18} height={18} alt="search" />
      </button>
    </form>
  );
}
