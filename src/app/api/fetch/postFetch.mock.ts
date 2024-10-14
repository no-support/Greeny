import { http, HttpHandler, HttpResponse } from 'msw';

export const fetchMockReply: HttpHandler = http.get('https://api.fesp.shop/posts/:postId/replies', ({ params }) => {
  console.log(`fetchMockReply exec - productId ID: ${params.postId}`);
  return HttpResponse.json({
    ok: 1,
    item: [
      {
        _id: 16,
        user: {
          _id: 7,
          name: '모킹 - 스프링',
          image: '/files/03-Greeny/spring.webp',
        },
        content: '모킹 - 오오?사진 완전 이쁘게 찍으셨다~',
        createdAt: '2024.09.29 15:38:40',
        updatedAt: '2024.09.29 20:38:40',
      },
      {
        _id: 17,
        user: {
          _id: 8,
          name: '모킹 - 식물 농부',
          image: '/files/03-Greeny/peasant.webp',
        },
        content: '모킹 - 역시 식물만큼 빈자리 채워주는건 없죠!',
        createdAt: '2024.09.29 15:38:40',
        updatedAt: '2024.09.29 20:38:40',
      },
      {
        _id: 18,
        user: {
          _id: 8,
          name: '모킹 - 식물 농부',
          image: '/files/03-Greeny/peasant.webp',
        },
        content: '모킹 - 식물이 답답해 할 수 있으니 햇빛 많이 보게해주세요^^',
        createdAt: '2024.09.29 15:38:40',
        updatedAt: '2024.09.29 20:38:40',
      },
    ],
    pagination: {
      page: 1,
      limit: 0,
      total: 5,
      totalPages: 1,
    },
  });
});
