import { FileRes } from '@/types/image';
import { List } from '@/types/response';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const DBNAME = process.env.NEXT_PUBLIC_DB_NAME;

export async function uploadImage(formData: FormData): Promise<List<FileRes>> {
  const url = `${SERVER}/files`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'client-id': `${DBNAME}`,
    },
    body: formData,
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}
