import { ImageRes } from './image';
import { UserSimple } from './user';

export type Type = 'product' | 'user' | 'post';
interface User {
  _id: number;
  name: string;
  email: string;
  image: string;
  type: 'seller';
}

interface Plant {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  buyQuantity: number;
  mainImages: ImageRes[];
}

interface Post {
  _id: number;
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

export interface Bookmark {
  byUser: { user_id: number; name: string; emai: string; image: string }[]; // 안 쓰임
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
  type: Type;
  user_id: number;
  target_id: number;
  user: Partial<User>;
}
