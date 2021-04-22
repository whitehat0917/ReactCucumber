import {
    put, call, takeLatest, take
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import monitoringService from 'services/sentry';

import { deleteArtwork, deleteSuccess, deleteFailed } from "../editArtworkSlice";
import httpClient from "services";
import { push } from "connected-react-router";
import { privateArtworksFetchRequest, privateArtworksFetchSuccess, privateArtworksFetchError } from 'features/privateGallery/privateGallerySlice';

export const deleteArtworkRequest = ({ artworkId }) => {
    return httpClient({
        url: `artworks/${artworkId}/`,
        method: 'DELETE',
        data: {
            withToken: true,
        },
    });
}

function* deleteArtworkSaga({ payload }) {
    try {
        const { artworkId } = payload;

        yield call(deleteArtworkRequest, { artworkId });
        
        // console.log('deleteArtworkSaga -> ', data);

        yield put(privateArtworksFetchRequest({}));
        yield put(push('/'));

        yield take([privateArtworksFetchSuccess, privateArtworksFetchError]);

        yield put(deleteSuccess({ artworkId }));

        yield toast.success('Artwork has been deleted 👍');

    //   yield put(modalActions.modalClose('delete_artwork_confirm'));
    //   yield put(notificationCreate({ type: 'deleteSuccess' }));
  
    //   logEvent(analyticsEvents.DELETE_ARTWORK_VIA_METADATA_PAGE, { artworkId: selectedId });
  
    } catch (error) {
        monitoringService.logError(error);

        yield put(deleteFailed({ error }));

    //   yield put(modalActions.modalClose('delete_artwork_confirm'));

    //   yield put(notificationCreate({
    //     type: 'deleteError',
    //     timeout: 5000,
    //     action: { type: types.ARTWORKS_DELETE_REQUEST },
    //   }));
  
    //   logEvent(analyticsEvents.DELETE_ARTWORK_VIA_METADATA_PAGE, { error });
    }
  }
  
function* watchArtworksDeleteRequest() {
    yield takeLatest(deleteArtwork, deleteArtworkSaga);
}

export default watchArtworksDeleteRequest;