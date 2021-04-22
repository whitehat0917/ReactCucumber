import loadable from '@loadable/component';

// <PrivateRoute exact path="/:artworkId/edit" component={LoadablePages.ArtworkEditPage} />
//       <PrivateRoute path="/" exact component={LoadablePages.ArtworksPage} />
//       <PrivateRoute path="/admin/:tab(feed|discover)" roles={['staff']} exact component={LoadablePages.FeedAdminPage} />

const userRoutes = [
  {
    path: '/404',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "Page404" */ '../features/Page404')),
  },
  {
    path: '/',
    exact: true,
    component: loadable(
      () => import(/* webpackChunkName: "ArtworksPrivateGallery" */ '../features/privateGallery/PrivateGalleryPage'),
    ),
    // private: true,
    // exact: true,
    // onLoad: (match) => privateArtworksFetchRequest(match)
  },
  {
    path: '/uploader',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "ImageUploader" */ '../features/uploader/ImageUploader')),
  },
  {
    path: '/signup',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "SignUp" */ '../features/core/SignUp')),
  },
  {
    path: '/reset_password',
    exact: true,
    component: loadable(
      () => import(/* webpackChunkName: "ResetPasswordPage" */ '../features/resetPassword/ResetPasswordPage'),
    ),
  },
  {
    path: '/change_password',
    exact: true,
    component: loadable(
      () => import(/* webpackChunkName: "ChangePasswordPage" */ '../features/resetPassword/ChangePasswordPage'),
    ),
  },
  {
    path: '/magic-login',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "MagicLogin" */ '../features/core/MagicLogin')),
  },
  {
    path: '/login',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "Login" */ '../features/core/Login')),
  },
  {
    path: '/:userName/contact',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "ArtistContact" */ '../features/user/ArtistContact')),
  },
  {
    path: '/:userName/contact/:artworkId',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "ArtistContact" */ '../features/user/ArtistContact')),
  },
  {
    path: '/:userName',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "ArtistHome" */ '../features/user/ArtistHome')),
    //component: loadable(() => import(/* webpackChunkName: "ArtistHome" */ '../v2/pages/artist/about/about.page')),
    // onLoad: (match) => artworksFetchRequest(match.params.userName)
  },

  {
    path: '/:userName/about',
    exact: true,
    component: loadable(() => import(/* webpackChunkName: "ArtistPublicBio" */ '../features/user/ArtistPublicBio')),
  },
];

export default userRoutes;
