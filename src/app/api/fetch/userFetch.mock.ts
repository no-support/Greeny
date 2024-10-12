import { HttpHandler, HttpResponse, http } from 'msw';

export const getMockUserInfo: HttpHandler = http.get('https://api.fesp.shop/users/:userId', ({ params }) => {
  console.log(`getMockUserInfo exec - user ID: ${params.userId}`);
  return HttpResponse.json({
    _id: 3,
    email: 'jennie.nichols@example.com',
    name: 'jennie.nichols',
    phone: '010-1234-5678',
    address: 'lorem ipsum',
    type: 'seller',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    createdAt: '1970.01.01 11:10:45',
    updatedAt: '1970.01.01 11:10:45',
    posts: 77,
    bookmark: {
      products: 77,
      users: 77,
      posts: 77,
    },
    bookmarkedBy: {
      users: 77,
    },
    postViews: 77,
  });
});
export const getMockMyBookmarksByUserID: HttpHandler = http.get('https://api.fesp.shop/users/:userId/bookmarks', ({ params }) => {
  console.log(`getMockMyBookmarksByUserID exec - user ID: ${params.userId}`);
  return HttpResponse.json({
    ok: 1,
    item: {
      byUser: [{}, {}, {}, {}],
      user: [
        {
          _id: 92,
          createdAt: '1970.11.01 20:38:16',
          user: {
            _id: 5,
            name: '경제에 협약이 임금이',
            email: '정치가 단시일이 갑이',
            image: '/files/03-Greeny/plant2.webp',
            type: 'seller',
          },
        },
      ],
      product: [
        {
          _id: 8,
          createdAt: '1970.01.01 14:38:39',
          product: {
            _id: 2,
            name: '치르다 이번이 인기는',
            price: 999,
            quantity: 999,
            buyQuantity: 0,
            mainImages: [
              {
                path: '/files/03-Greeny/begonia.webp',
                name: 'begonia.webp',
              },
            ],
          },
        },
        {
          _id: 113,
          createdAt: '1970.11.01 20:13:16',
          product: {
            _id: 8,
            name: '동안을 폐건전지가',
            price: 999,
            quantity: 999,
            buyQuantity: 0,
            mainImages: [
              {
                path: '/files/03-Greeny/jaran.webp',
                name: 'jaran.webp',
              },
            ],
          },
        },
        {
          _id: 158,
          createdAt: '1970.11.01 17:44:13',
          product: {
            _id: 9,
            name: '위장의 국산이',
            price: 999,
            quantity: 999,
            buyQuantity: 0,
            mainImages: [
              {
                path: '/files/03-Greeny/ivy.webp',
                name: 'ivy.webp',
              },
            ],
          },
        },
      ],
      post: [
        {
          _id: 26,
          memo: '기업에서 전세가',
          createdAt: '1970.01.01 14:38:39',
          post: {
            _id: 46,
            image: [
              {
                path: '/files/03-Greeny/post_planterior_9.webp',
                name: 'post_planterior_9.webp',
              },
            ],
            type: 'post',
            title: '앞두고 올라가다',
            user: {
              _id: 1,
              name: 'Greeny',
              image: '/files/03-Greeny/greeny.webp',
            },
          },
        },
      ],
    },
  });
});
