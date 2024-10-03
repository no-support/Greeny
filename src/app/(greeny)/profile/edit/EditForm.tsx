'use client';
import styles from './Edit.module.scss';
import Image from 'next/image';
import { ComponentProps, useEffect, useState } from 'react';
import { Control, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserInfo } from '@/types/user';
import Button from '@/components/button/Button';
import photoAdd from '@images/PhotoAddIcon.svg';
import { editUser } from '@/app/api/actions/userAction';
import { signOut } from 'next-auth/react';
import Input from '@/components/input/Input';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

const userFormSchema = z.object({
  name: z.string().min(2, '이름을 2글자 이상 입력하세요.'),
  password: z.string().min(8, '비밀번호 형식이 올바르지 않습니다.'),
  phone: z.string().min(10, '전화번호를 10자리 이상 입력하세요.'),
  address: z.string().min(10, '주소는 10자 이상이어야 합니다.'),
  // 'use client'를 통해 클라이언트에서만 수행되지만, 빌드 타임에 window가 없어서 에러가 발생하는 것을 방지하기 위해 조건부로 추가
  attach: typeof window !== 'undefined' && typeof FileList !== 'undefined' ? z.instanceof(FileList).optional() : z.any(),
});

type FormValues = z.infer<typeof userFormSchema>;

export default function EditForm({ user }: { user: UserInfo }) {
  const { register, handleSubmit, setError, watch, control } = useForm<FormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      address: user.address,
    },
  });

  //프로필 미리보기
  const [imagePreview, setImagePreview] = useState<string>();
  const attachFile = watch('attach');

  useEffect(() => {
    if (attachFile && attachFile.length > 0) {
      const file = attachFile[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [attachFile]);

  const onSubmit = async (formData: FormValues) => {
    const userForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'attach' && value !== undefined) {
        userForm.append(key, value as string);
      }
    });
    if (formData.attach instanceof FileList) {
      userForm.append('attach', formData.attach[0]);
    }

    const resData = await editUser(userForm);
    if (resData.ok) {
      alert(`프로필 수정이 완료되었습니다.\n재로그인 해주세요.`);
      signOut({
        callbackUrl: '/login',
      });
    } else {
      if ('errors' in resData) {
        resData.errors.forEach((error) => setError(error.path as keyof FormValues, { message: error.msg }));
      } else if (resData.message) {
        alert(resData.message);
      }
    }
  };

  return (
    <div className={styles.edit_form_container}>
      <form className={styles.edit_form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.heading}>프로필 수정</h2>
        <ul className={styles.form_list}>
          <li className={styles.file_container}>
            <h3 className={styles.profile_image_title}>프로필 이미지</h3>
            <label htmlFor="attach" className={styles.photo_add}>
              <div className={styles.photo_cover}>
                <Image className={styles.image} src={imagePreview ? imagePreview : user.image ? `${SERVER}/${user.image}` : photoAdd} alt="프로필 사진 선택" width={120} height={120} priority />
                <input type="file" id="attach" {...register('attach')} />
              </div>
            </label>
          </li>
          <TextInput control={control} label="이름" name="name" type="text" placeholder="이름을 입력하세요." required />
          <TextInput control={control} label="비밀번호" name="password" type="password" placeholder="비밀번호를 입력하세요." required />
          <TextInput control={control} label="전화번호" name="phone" type="text" placeholder="전화번호를 입력하세요." />
          <TextInput control={control} label="주소" name="address" type="text" placeholder="주소를 입력하세요." />
        </ul>

        <Button bgColor="fill" btnSize="lg" type="submit">
          저장하기
        </Button>
      </form>
    </div>
  );
}

type TextInputProps = ComponentProps<typeof Input> & {
  control: Control<any>;
  label: string;
  name: string;
  required?: boolean;
};

const TextInput = ({ control, label, name, required, ...inputProps }: TextInputProps) => {
  const {
    formState: { errors },
  } = useController({ name, control });

  return (
    <li className={styles.input_container}>
      <label className={styles.input_label} htmlFor={name}>
        {label}
        {required && <span className={styles.asterisk}>*</span>}
      </label>
      <Input {...control.register(name)} {...inputProps} />
      {errors[name] && <p className={styles.error_message}>{errors[name].message?.toString()}</p>}
    </li>
  );
};
