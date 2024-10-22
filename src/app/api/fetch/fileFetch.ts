import { DBNAME, SERVER } from '@/constant';
import { FileRes } from '@/types/image';
import { List } from '@/types/response';

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
