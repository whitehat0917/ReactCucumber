import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/atoms/PrivateRoute';
import Notify from 'features/notify/Notify';
import LoadablePages from 'molecules/LoadablePages';

import PublicCollectionsViewPage from '../components/pages/PublicCollectionsViewPage';
import PublicGalleryPage from '../components/pages/PublicGalleryPage';

const GlobalRoutes = () => (
  <Fragment>
    <Switch>
      <Route path="/login" exact component={LoadablePages.LoginPage} />
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
      <Route path="*" render={() => 'not found'} />
    </Switch>
    <Notify />
  </Fragment>
);

export default GlobalRoutes;
