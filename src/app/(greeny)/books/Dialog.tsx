'use client';
import styles from './Dialog.module.scss';
import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import FilterIcon from '@images/FilterIcon.svg';
import Image from 'next/image';
import CheckboxGroup from './CheckboxGroup';
import { flclrOptions, fmldecolrOptions, grwhstleOptions, lefmrkOptions, lighttdemanddoOptions, waterCycleOptions } from '@/app/data/BookFilterOption';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/button/Button';

export default function Dialog() {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParam = new URLSearchParams();
    const keyword = params.get('keyword');
    keyword && urlParam.append('keyword', keyword);
    const formData = new FormData(e.currentTarget);
    const formDataArray = Array.from(formData.entries());
    formDataArray.forEach(([key, value]) => {
      urlParam.append(key, value as string);
    });
    router.push(`/books?${urlParam.toString()}`);
    setOpen(false);
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button type="button" className={styles.filter_btn}>
          <Image src={FilterIcon} width={18} height={18} alt="filter" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={styles.Overlay} />
        <AlertDialog.Content className={styles.Content}>
          <VisuallyHidden.Root>
            <AlertDialog.Title>식물 백과 검색 필터</AlertDialog.Title>
            <AlertDialog.Description>식물의 종류, 꽃 색, 열매 색, 잎무늬, 필요한 광량, 물 주기 빈도를 기준으로 식물들을 검색합니다.</AlertDialog.Description>
          </VisuallyHidden.Root>
          <form className={styles.filter_wrapper} onSubmit={handleSubmit}>
            <div className={styles.filter_group}>
              <CheckboxGroup groupNm="grwhstleCode" options={grwhstleOptions} title="식물의 종류를 선택해주세요." />
              <CheckboxGroup groupNm="flclrCode" options={flclrOptions} title="식물의 꽃 색을 선택해주세요." />
              <CheckboxGroup groupNm="fmldecolrCode" options={fmldecolrOptions} title="식물의 열매색을 선택해주세요." />
              <CheckboxGroup groupNm="lefmrkCode" options={lefmrkOptions} title="식물의 잎무늬를 선택해주세요." />
              <CheckboxGroup groupNm="lighttdemanddoCode" options={lighttdemanddoOptions} title="식물이 필요한 햇빛의 양을 선택해주세요." />
              <CheckboxGroup groupNm="waterCycleCode" options={waterCycleOptions} title="식물의 물 주기 빈도를 선택해주세요." />
            </div>
            <div className={styles.btn_wrapper}>
              <AlertDialog.Cancel asChild>
                <Button type="button" bgColor="line">
                  취소
                </Button>
              </AlertDialog.Cancel>
              <Button type="submit">검색</Button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
