import loadable from '@loadable/component';

const shopRoutes = [
    {
        path: '/:userName/shop/purchase/:productId/success',
        component: loadable(() => import('../features/purchase/SuccessPage'))
    },
    {
        path: '/:userName/shop/purchase/:productId/:page',
        component: loadable(() => import('../features/purchase/PurchasePage'))
    },
    {
        path: '/:userName/shop/purchase/:productId',
        component: loadable(() => import('../features/purchase/PurchasePage'))
    },
    {
        path: '/:userName/shop/purchase',
        component: loadable(() => import('../features/purchase/PurchasePage'))
    },
    {
        path: '/:userName/shop/product/:productId',
        component: loadable(() => import('../features/shop/PublicShopPage'))
    },
    {
        path: '/:userName/shop',
        component: loadable(() => import('../features/shop/PublicShopPage'))
    },
];

export default shopRoutes;
