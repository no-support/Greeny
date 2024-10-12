'use client';

import { ImageRes } from '@/types/image';
import post from '@greeny/story/community/Post.module.scss';
import Image from 'next/image';
import CloseIcon from '@images/CloseIcon.svg';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

function ImageModal({ image, closeModal }: { image: ImageRes; closeModal: () => void }) {
  return (
    <div className={post.image_modal_bg}>
      <button onClick={closeModal} type="button">
        <Image src={CloseIcon} width={18} height={18} alt="닫기" />
      </button>
      <div className={post.image_modal}>
        <div className={post.image_container}>
          <Image src={`${SERVER}${image.path}`} sizes="100%" fill={true} alt={image.name} />
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
