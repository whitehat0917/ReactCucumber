import { takeLatest, select, call, put } from 'redux-saga/effects';
import httpClient, { UNAUTHORIZED } from 'services';
import _ from 'lodash';
import monitoringService from 'services/sentry';

import { privateArtworksFetchRequest } from 'features/privateGallery/privateGallerySlice';
import { applyFilter, applyFilterFailed } from '../artworkFilterSlice';

function* applyFilterSaga() {
    try {
        // yield put(actions.artworksClearAll());
        yield put(privateArtworksFetchRequest({ trigger: 'filter' }));
    } catch (error) {
        yield put(applyFilterFailed({ error }));
    }
}
  
function* watchApplyFilterRequest() {
    yield takeLatest(applyFilter, applyFilterSaga);
}

export default watchApplyFilterRequest;