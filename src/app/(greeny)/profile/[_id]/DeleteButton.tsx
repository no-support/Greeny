'use client';
import { useTransition } from 'react';
import { deleteBookmark } from '@/app/api/actions/followAction';
import Button, { ButtonProps } from '@/components/button/Button';

interface DeleteButtonProps extends ButtonProps {
  _id: number;
  pathToRevalidate: string;
}

export default function DeleteButton({ _id, pathToRevalidate, children, ...rest }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      const resData = await deleteBookmark(_id, pathToRevalidate);
      if (!resData.ok) {
        console.error(resData);
        alert('삭제 실패');
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} {...rest}>
      {children}
    </Button>
  );
}
