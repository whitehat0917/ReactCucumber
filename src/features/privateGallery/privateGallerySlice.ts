import { createSlice } from '@reduxjs/toolkit';
import { initialStatus } from '../../store/utils';
import { TPGState } from './pg-types';
import reducers from './reducers';

const initialState: TPGState = {
  status: {
    fetch: initialStatus,
    fetch_more: initialStatus,
  },
  artworks: [],
  artworksUpdateId: 0,
  isPrivate: true,
};

const privateGallerySlice = createSlice({
  name: 'privateGallery',
  initialState,
  reducers: {
    ...reducers,
    resetGalleryState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('uploader/fileUploadSuccess', (state, action: any) => {
      return {
        ...state,
        artworks: state.artworks.map((art) => {
          const uploadedImage = action.payload.uploadedImage;
          if ((art as any).id === uploadedImage.artworkId) {
            let artworkImages = art.images || [];
            const hasImage = artworkImages.find((img) => img.id === uploadedImage.id);

            return {
              ...art,
              images: hasImage ? artworkImages : [...artworkImages, { ...uploadedImage }],
            };
          } else {
            return art;
          }
        }),
      };
    });
  },
});

export const {
  privateArtworksFetchRequest,
  privateArtworksFetchSuccess,
  privateArtworksFetchError,
  privateArtworksLoaded,
  resetGalleryState,
} = privateGallerySlice.actions;

export default privateGallerySlice.reducer;
