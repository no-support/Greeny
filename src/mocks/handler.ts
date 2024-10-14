import { getMockMyBookmarks } from '@/app/api/fetch/bookmarkFetch.mock';
import { getMockPlantDetail } from '@/app/api/fetch/plantFetch.mock';
import { fetchMockReply } from '@/app/api/fetch/postFetch.mock';
import { getMockMyBookmarksByUserID, getMockUserInfo } from '@/app/api/fetch/userFetch.mock';

export const handlers = [getMockUserInfo, getMockMyBookmarks, getMockMyBookmarksByUserID, getMockPlantDetail, fetchMockReply];
