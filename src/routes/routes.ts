// import LoadablePages from 'molecules/LoadablePages';
{/* <Route path="/login" exact component={LoadablePages.LoginPage} />
<Route path="/signup" exact component={LoadablePages.SignUpPage} />
<Route path="/reset_password" exact component={LoadablePages.ResetPasswordPage} />
<Route path="/change_password" exact component={LoadablePages.ChangePasswordPage} />
<Route path="/magic-login" exact component={LoadablePages.MagicLoginPage} />
<PrivateRoute exact path="/:artworkId/edit" component={LoadablePages.ArtworkEditPage} />
<PrivateRoute path="/" exact component={LoadablePages.ArtworksPage} />
<PrivateRoute path="/admin/:tab(feed|discover)" roles={['staff']} exact component={LoadablePages.FeedAdminPage} />
<Route path="/openmarcel/:username" exact component={LoadablePages.EmailLinkRedirectPage} />
<Route path="/:userName/artwork/:artworkId" exact component={LoadablePages.PublicGalleryPage} />
<Route path="/:userName" exact component={LoadablePages.PublicGalleryPage} />
<Route path="/:userName/about" exact component={LoadablePages.PublicArtistBioPage} />
<Route path="/:userName/collections" exact component={LoadablePages.PublicCollectionsPage} />
<Route path="/:userName/:collectionUrl" exact component={PublicCollectionsViewPage} />
<Route path="/:userName/collections/:collectionUrl/artwork/:artworkId" exact component={PublicGalleryPage} />
<Route path="*" render={() => 'not found'} /> */}

import userRoutes from './userRoutes';
import collectionRoutes from './collectionRoutes';
import artworkRoutes from './artworkRoutes';
import shopRoutes from './shopRoutes';

const routes = [
    // {
    //     path: '/:artworkId/edit',
    //     exact: true,
    //     component: LoadablePages.ArtworkEditPage,
    //     private: true
    // },
    // {
    //     path: '/admin/:tab(feed|discover)',
    //     exact: true,
    //     component: LoadablePages.ArtworksPage,
    //     private: true
    // },
    // {
    //     path: '/openmarcel/:username',
    //     exact: true,
    //     component: LoadablePages.FeedAdminPage,
    // },
    // {
    //     path: '/:userName/artwork/:artworkId',
    //     exact: true,
    //     component: LoadablePages.PublicGalleryPage,
    // },
    // {
    //     path: '/:userName',
    //     exact: true,
    //     component: LoadablePages.PublicGalleryPage,
    //     onLoad: (match) => console.log('/:userName -> ', match)
    // },
    ...userRoutes,
    ...shopRoutes,
    ...collectionRoutes,
    ...artworkRoutes,
    // {
    //     path: '/:userName/art',
    //     exact: true,
    //     component: loadable(() => import('../features/artwork')),
    //     // onLoad: (match) => userPublicInfoRequest(match.params.userName)
    // },
    // {
    //     path: '/:userName/collections/:collectionUrl/artwork/:artworkId',
    //     exact: true,
    //     component: LoadablePages.PublicGalleryPage,
    // },
];

export default routes;
