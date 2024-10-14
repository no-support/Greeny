import { HttpHandler, HttpResponse, http } from 'msw';

export const getMockMyBookmarks: HttpHandler = http.get('https://api.fesp.shop/bookmarks/user', () => {
  console.log('getMockMyBookmarks exec');
  return HttpResponse.json({
    ok: 1,
    item: [
      {
        _id: 92,
        createdAt: '2024.10.06 20:38:16',
        user: {
          _id: 5,
          name: '모킹',
          email: '모킹 - hello@world.com',
          image: '/files/03-Greeny/plant2.webp',
          type: 'seller',
        },
      },
    ],
  });
});
