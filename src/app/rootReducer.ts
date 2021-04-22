import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import history from '../store/history';

import coreReducer from '../features/core/coreSlice';
import artworkReducer from '../features/artwork/artworkSlice';
import userReducer from '../features/user/userSlice';
import collectionReducer from '../features/collection/collectionSlice';
import shopReducer from '../features/shop/shopSlice';
import purchaseReducer from '../features/purchase/purchaseSlice';
import uploaderReducer from '../features/uploader/uploaderSlice';
import artworkEditorReducer from '../features/artworkEditor/editArtworkSlice';
import privateGalleryReducer from 'features/privateGallery/privateGallerySlice';
import artistInfoReducer from 'features/artistInfo/artistInfoSlice';
import resetPasswordReducer from 'features/resetPassword/resetPasswordSlice';
import notifyReducer from 'features/notify/notifySlice';
import artworkFilterReducer from 'features/artworkFilter/artworkFilterSlice';

// LEGACY ----------------------------------------------------------------------

// import authReducer from 'store/auth/reducer';
// import artworkReducer from 'store/artworks/reducer';
// import collectionsReducer from 'store/collections/reducer';
// import modalReducer from 'store/modal/reducer';
// import notificationsReducer from 'store/notifications/reducer';
// import registrationReducer from 'store/registration/reducer';
// import userReducer from 'store/user/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  core: coreReducer,
  collections: collectionReducer,
  shop: shopReducer,
  purchase: purchaseReducer,
  // auth: authReducer,
  artistInfo: artistInfoReducer,
  artworks: artworkReducer,
  artworkEditor: artworkEditorReducer,
  privateGallery: privateGalleryReducer,
  // collections: collectionsReducer,
  // modal: modalReducer,
  // notifications: notificationsReducer,
  // registration: registrationReducer,
  user: userReducer,
  uploader: uploaderReducer,
  resetPassword: resetPasswordReducer,
  notify: notifyReducer,
  filter: artworkFilterReducer,
});

const rootReducer = createRootReducer(history);

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
