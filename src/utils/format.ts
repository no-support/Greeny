import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatAgo(createdAt: string) {
  return formatDistance(new Date(createdAt), new Date(), { locale: ko, addSuffix: true });
}
export function toArray(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : value ? [value] : [];
}
