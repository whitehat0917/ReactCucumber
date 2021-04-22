import { push } from 'connected-react-router';
import { privateArtworksFetchRequest, privateArtworksFetchSuccess } from 'features/privateGallery/privateGallerySlice';
import { toast } from 'react-toastify';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';
import httpClient from 'services';
import { caseOf } from 'utils/case.of';
import { saveArtwork, updateFailed, updateSuccess } from '../editArtworkSlice';
import artworkSelector from '../selectors';

export const updateArtwork = ({ artwork, preparedArtwork }) =>
  httpClient.patch(`/artworks/${artwork.id}/`, {
    withToken: true,
    ...preparedArtwork,
  });

function getFieldDefaultValue(fieldName: string) {
  return (
    caseOf()
      .case(
        (field: string) => ['edition', 'current_location', 'sub_category'].indexOf(field) >= 0,
        () => '',
      )
      //
      .case(
        (field: string) =>
          ['price', 'volume', 'year', 'depth', 'width', 'height', 'status', 'category'].indexOf(field) >= 0,
        () => null,
      )
      .defaultCase(() => undefined)
      .eval(fieldName)
  );
}
function* updateArtworkSaga({ payload }) {
  const { updatedArtwork } = payload;

  try {
    const { artwork } = yield select(artworkSelector);

    const preparedArtwork = Object.keys(updatedArtwork).reduce((prev: any, current) => {
      return {
        ...prev,
        [current]: updatedArtwork[current] || getFieldDefaultValue(current),
      };

      return prev;
    }, {});

    const result = yield call(updateArtwork, { artwork, preparedArtwork });
    //console.log('updated', res);

    // yield put(fetchArtwork({ artworkId: artwork.id }));
    yield put(privateArtworksFetchRequest({}));

    // yield take(fetchArtworkSuccess);
    yield take(privateArtworksFetchSuccess);

    yield put(updateSuccess({ artwork: result.data }));
    yield put(push('/'));

    toast.success('Artwork successfully updated 👍');
  } catch (error) {
    yield put(updateFailed({ error }));

    toast.error('Update error... 🙁');
  }
}

function* watchUpdateRequest() {
  yield takeLatest(saveArtwork, updateArtworkSaga);
}

export default watchUpdateRequest;
