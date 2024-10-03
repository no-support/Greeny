'use client';
import { useTransition } from 'react';
import Button, { ButtonProps } from '@/components/button/Button';

interface AsyncButtonProps extends ButtonProps {
  action: (...args: any[]) => Promise<any>;
  args: any[];
  refresh?: boolean;
}

export default function AsyncButton({ action, args, children, refresh = false, ...rest }: AsyncButtonProps) {
  const { className, ...restProps } = rest;
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      const resData = await action(...args);
      if (resData.ok) {
        // 성공 시 실행할 로직 (예: 페이지 리디렉션)
        console.log('success');
        refresh && window.location.reload();
      } else {
        console.error('error');
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} {...restProps}>
      {children}
    </Button>
  );
}
