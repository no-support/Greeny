import { getMockMyBookmarks } from '@/app/api/fetch/bookmarkFetch.mock';
import { getMockMyBookmarksByUserID, getMockUserInfo } from '@/app/api/fetch/userFetch.mock';

export const handlers = [getMockUserInfo, getMockMyBookmarks, getMockMyBookmarksByUserID];
