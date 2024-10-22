import { SERVER } from '@/constant';
import { ImageRes } from '@/types/image';
import Image from 'next/image';

export default function ImageItem({ image, onClick }: { image: ImageRes; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}>
      <Image src={`${SERVER}${image.path}`} alt={image.name} sizes="100%" fill />
    </button>
  );
}
