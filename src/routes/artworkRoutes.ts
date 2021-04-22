import loadable from '@loadable/component';

const artworkRoutes = [
    {
        path: '/:userName/collections/:collectionUrl/artwork/:artworkId',
        // exact: true,
        component: loadable(() => import(/* webpackChunkName: "ArtworksSlider" */ '../features/artwork/ArtworksSlider')),
    },
    // {
    //     path: '/profile/uploader',
    //     exact: true,
    //     component: loadable(() => import(/* webpackChunkName: "ImageUploader" */ '../features/core/ImageUploader')),
    // },
    // {
    //     path: '/:userName',
    //     exact: true,
    //     component: loadable(() => import('../features/artwork/ArtworksPublicGallery')),
    //     onLoad: (match) => artworksFetchRequest(match.params.userName)
    // },
];

export default artworkRoutes;