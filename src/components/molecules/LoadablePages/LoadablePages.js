import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import LoadingOverlay from 'molecules/LoadingOverlay';
import PageTemplate from 'templates/PageTemplate';

const LoadingTemplate = ({ pastDelay }) => {
  if (pastDelay) {
    return (
      <PageTemplate>
        <LoadingOverlay />
      </PageTemplate>
    );
  }
  return null;
};

LoadingTemplate.propTypes = {
  pastDelay: PropTypes.bool,
};

const base = {
  loading: LoadingTemplate,
  delay: 200,
};

export default {
  // LoginPage: loadable({
  //   loader: () => import(/* webpackChunkName: "LoginPage" */ '../../pages/LoginPage'),
  //   loading: LoadingOverlay,
  // }),
  // SignUpPage: loadable({
  //   loader: () => import(/* webpackChunkName: "SignUpPage" */ '../../pages/SignUpPage'),
  //   loading: LoadingOverlay,
  // }),
  // ResetPasswordPage: loadable({
  //   loader: () => import(/* webpackChunkName: "ResetPasswordPage" */ '../../pages/ResetPasswordPage'),
  //   loading: LoadingOverlay,
  // }),
  // ChangePasswordPage: loadable({
  //   loader: () => import(/* webpackChunkName: "ChangePasswordPage" */ '../../pages/ChangePasswordPage'),
  //   loading: LoadingOverlay,
  // }),
  // ArtworkEditPage: loadable({
  //   loader: () => import(/* webpackChunkName: "ArtworkEditPage" */ '../../../containers/ArtworkEditPage'),
  //   loading: LoadingOverlay,
  // }),
  // ArtworksPage: loadable({
  //   loader: () => import(/* webpackChunkName: "ArtworksPage" */ '../../../containers/ArtworksPage'),
  //   loading: LoadingOverlay, 
  // }),
  // FeedAdminPage: loadable({
  //   loader: () => import(/* webpackChunkName: "FeedAdminPage" */ '../../pages/AdminPage'),
  //   loading: LoadingOverlay,
  // }),
  // PublicGalleryPage: loadable({
  //   loader: () => import(/* webpackChunkName: "PublicGalleryPage" */ '../../pages/PublicGalleryPage'),
  //   loading: LoadingOverlay,
  // }),
  // PublicArtistBioPage: loadable({
  //   loader: () => import(/* webpackChunkName: "PublicArtistBioPage" */ '../../pages/PublicArtistBioPage'),
  //   loading: LoadingOverlay,
  // }),
  // PublicCollectionsPage: loadable({
  //   loader: () => import(/* webpackChunkName: "PublicCollectionsPage" */ '../../pages/PublicCollectionsPage'),
  //   loading: LoadingOverlay,
  // }),
  // PublicCollectionsViewPage: loadable({
  //   loader: () => import(/* webpackChunkName: "PublicCollectionsViewPage" */ '../../pages/PublicCollectionsViewPage'),
  //   loading: LoadingOverlay,
  // }),
  // EmailLinkRedirectPage: loadable({
  //   loader: () => import(/* webpackChunkName: "EmailLinkRedirectPage" */ '../EmailLinkRedirect'),
  //   loading: LoadingOverlay,
  // }),
  // MagicLoginPage: loadable({
  //   loader: () => import(/* webpackChunkName: "MagicLoginPage" */ '../../../containers/MagicLogin'),
  //   loading: LoadingOverlay,
  // }),
};
