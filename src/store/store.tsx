import { PlantBookmark, UserBookmark } from '@/types/bookmark';
import { create } from 'zustand';

type BookmarkedPlantSearchStore = {
  bookmarkList: PlantBookmark[] | UserBookmark[];
  keyword: string;
  setBookmarkList: (bookmarkList: PlantBookmark[] | UserBookmark[]) => void;
  setKeyword: (keyworkd: string) => void;
  resetKeyword: () => void;
};

export const useBookmarkedSearchFormStore = create<BookmarkedPlantSearchStore>((set) => ({
  bookmarkList: [],
  keyword: '',
  setBookmarkList: (bookmarkList) => {
    set(() => ({ bookmarkList }));
  },
  setKeyword: (keyword) => {
    set(() => ({ keyword }));
  },
  resetKeyword: () => {
    set(() => ({ keyword: '' }));
  },
}));
