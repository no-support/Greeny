import { ImageRes } from './image';
import { UserSimple } from './user';

export interface PlantForm {
  name: string;
  scientificName: string;
  introduction: string;
  attach: File[];
  grwhTp: string;
  humidity: string;
  waterCycle: number;
  adoptionDate: Date | null;
  light: string;
  content: string;
  price: number;
  quantity: number;
}

export interface PlantSimple {
  name: string;
  mainImages: ImageRes[][];
}

export interface PlantRes extends PlantForm {
  _id: number;
  seller_id: number;
  feature: string;
  show: boolean;
  active: boolean;
  buyQuantity: number;
  createdAt: string;
  updatedAt: string;
  mainImages: ImageRes[];
  myBookmarkId?: number;
}
export interface PlantDetailRes {
  _id: number;
  type: 'diary';
  product_id: number;
  seller_id: number;
  views: number;
  title: string;
  content: string;
  extra: { plantState: string; action: string; actionDate: string };
  image: ImageRes[];
  user: UserSimple;
  createdAt: string;
  updatedAt: string;
  product: { name: string; mainImages: null };
  repliesCount: 0;
  bookmarks: number;
  myBookmarkId?: number;
}

export interface PlantJson {
  _id: number;
  show: true;
  active: true;
  seller_id: 1;
  price: 999;
  quantity: 999;
  name: string;
  content: string;
  cntntsNo: string;
  cntntsSj: string;
  dlthtsCodeNm: string;
  eclgyCodeNm: string;
  flclrCodeNm: string;
  fmldeSeasonCodeNm: string;
  fmldecolrCodeNm: string;
  fncltyInfo: string;
  frtlzrInfo: string;
  grwhTpCodeNm: string;
  grwhstleCodeNm: string;
  hdCodeNm: string;
  indoorpsncpacompositionCodeNm: string;
  lefStleInfo: string;
  lefcolrCodeNm: string;
  lefmrkCodeNm: string;
  lighttdemanddoCodeNm: string;
  managedemanddoCodeNm: string;
  managelevelCodeNm: string;
  orgplceInfo: string;
  plntbneNm: string;
  postngplaceCodeNm: string;
  prpgtEraInfo: string;
  prpgtmthCodeNm: string;
  soilInfo: string;
  waterCycle: string;
  waterCycleDay: string;
  rtnOrginlFileNm: string;
  rtnStreFileNm: string;
  rtnThumbFileNm: string;
  rtnFileUrl: string;
  grwhstleCode: string;
  flclrCode: string;
  fmldecolrCode: string;
  lefmrkCode: string;
  lighttdemanddoCode: string;
  waterCycleCode: string;
}
export interface PlantListRes extends PlantRes {
  mainImages: ImageRes[];
  seller: {
    _id: number;
    email: string;
    name: string;
    phone: string;
    address: string;
    mainImages: string;
  };
  replies: number;
  bookmarks: number;
  options: number;
  orders: number;
  ordersQuantity: number;
  shippingFees: number;
}

export type TSearchParams = {
  [key: string]: string | string[] | undefined;
};

export type TParams = {
  grwhstleCode: string[];
  flclrCode: string[];
  fmldecolrCode: string[];
  lefmrkCode: string[];
  lighttdemanddoCode: string[];
  waterCycleCode: string[];
  keyword: string | null;
};
