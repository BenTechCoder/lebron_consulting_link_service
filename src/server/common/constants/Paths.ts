export default {
  origin: 'https://www.lebronconsulting.tech/',
  base: '/:linkId',
  Admin: {
    Base: '/admin',
    Api: {
      Get: '/all',
      Add: '/add',
      Update: '/update',
      Delete: '/delete/:id',
    },
  },
  wp: '/wp/',
} as const;
