import loadable from '@loadable/component';

const collectionRoutes = [
    {
        path: '/:artworkId/edit',
        exact: true,
        private: true,
        component: loadable(() => import(/* webpackChunkName: "ArtworkEditorPage" */ '../features/artworkEditor/ArtworkEditorPage')),
        // onLoad: (match) => fetchArtwork(match.params.artworkId)
    },
    {
        path: '/:userName/collections',
        exact: true,
        component: loadable(() => import(/* webpackChunkName: "PublicCollectionsPage" */ '../features/collections/PublicCollectionsPage')),
        // onLoad: (match) => collectionsFetchRequest({
        //     offset: 0,
        //     collectionsLimit: 8,
        //     artworksLimit: 1000,
        // })
    },
    {
        path: '/:userName/collections/:collectionUrl',
        component: loadable(() => import(/* webpackChunkName: "SingleCollectionPage" */ '../features/collection/SingleCollectionPage')),
        // onLoad: (match) =>  selectedCollectionFetchRequest({
        //     userName: match.params.userName, 
        //     collectionUrl: match.params.collectionUrl
        // })
    },
    // {
    //     path: '/:userName/:collectionUrl',
    //     component: Redirect,
    //     // onLoad: (match) =>  selectedCollectionFetchRequest({
    //     //     userName: match.params.userName, 
    //     //     collectionUrl: match.params.collectionUrl
    //     // })
    // },
];

export default collectionRoutes;