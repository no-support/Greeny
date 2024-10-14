import { http, HttpHandler, HttpResponse } from 'msw';

export const getMockPlantDetail: HttpHandler = http.get('https://api.fesp.shop/products/:productId', ({ params }) => {
  console.log(`getMockPlantDetail exec - productId ID: ${params.productId}`);
  return HttpResponse.json({
    ok: 1,
    item: {
      _id: 6,
      price: 999,
      quantity: 999,
      name: '모킹 - 김전수',
      scientificName: '모킹 - 금전수 (Zamioculcas zamiifolia)',
      introduction: '모킹 - 돈전수입니다!!',
      humidity: '모킹 - 40 ~ 70%',
      grwhTp: '모킹 - 16~20℃',
      light: '모킹 - 중간 광도(800~1,500 Lux)',
      adoptionDate: '모킹 - 2024-08-01',
      waterCycle: '모킹 - 5',
      content: '모킹 - 그늘진 곳에서 잘 견디지만, 실내 밝은 간접광이 더 좋다',
      mainImages: [
        {
          path: '/files/03-Greeny/money_plant.webp',
          name: 'money_plant.webp',
        },
      ],
      show: true,
      shippingFees: 0,
      seller_id: 3,
      active: true,
      buyQuantity: 0,
      createdAt: '2024.08.21 14:38:39',
      updatedAt: '2024.08.22 16:23:39',
      seller: {
        _id: 3,
        email: '모킹 - p3@plant.com',
        name: '모킹 - 금전수 장인',
        phone: '모킹 - 01011111111',
        address: '모킹 - 서울시 강남구 역삼로 101-1',
        image: '/files/03-Greeny/xNVBMnGlB.png',
      },
      replies: [],
      bookmarks: 0,
      options: [],
    },
  });
});
