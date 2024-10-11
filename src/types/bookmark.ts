import { ImageRes } from './image';
import { UserSimple } from './user';

export interface User {
  _id: number;
  name: string;
  email: string;
  image: string;
  type: 'seller';
}

export interface Plant {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  buyQuantity: number;
  mainImages: ImageRes[];
}

export interface Post {
  _id: number;
  // images: ImageRes[];
  image: ImageRes[];
  type: 'post';
  title: string;
  user: UserSimple;
}

interface BookmarkHeader {
  _id: number;
  createdAt: string;
}

export interface UserBookmark extends BookmarkHeader {
  user: User;
}

export interface PlantBookmark extends BookmarkHeader {
  product: Plant;
}
export interface PostBookmark extends BookmarkHeader {
  post: Post;
  memo?: string;
}

export type BookmarkType = UserBookmark | PlantBookmark | PostBookmark;

export interface Bookmark {
  byUser: { user_id: number; name: string; emai: string; image: string }[];
  user: UserBookmark[];
  product: PlantBookmark[];
  post: PostBookmark[];
}

export function isPlantBookmark(bookmarkList: PlantBookmark[] | UserBookmark[] | undefined): bookmarkList is PlantBookmark[] {
  return bookmarkList !== undefined && (bookmarkList as PlantBookmark[])[0]?.product !== undefined;
}

export function isUserBookmark(bookmarkList: PlantBookmark[] | UserBookmark[] | undefined): bookmarkList is UserBookmark[] {
  return bookmarkList !== undefined && (bookmarkList as UserBookmark[])[0]?.user !== undefined;
}

export interface AddBookmarkRes extends BookmarkHeader {
  type: 'product' | 'user' | 'post';
  user_id: number;
  target_id: number;
  user: Partial<User>;
}
