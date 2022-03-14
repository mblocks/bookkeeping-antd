import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    default: 'en-US',
    antd: true,
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [{ path: '/', component: '@/pages/index' }],
    },
  ],
  fastRefresh: {},
});
