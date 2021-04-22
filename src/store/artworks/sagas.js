/* eslint-disable dot-notation */
import {
  put, call, fork, takeLatest, takeEvery, all, select, take, race,
} from 'redux-saga/effects';
import { fromArtworks, fromUser } from 'store/selectors';
import { push } from 'connected-react-router';
import transform from 'lodash/transform';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import toLower from 'lodash/toLower';
import omit from 'lodash/omit';
import moment from 'moment';
import { saveAs } from 'file-saver';
import authService from 'services/auth';
import csvparserService from 'services/csvparser';
import { notificationCreate, notificationClearAll } from 'store/notifications/actions';
import { getImageDimensionsFromBlob } from 'utils/artworks';
import analyticsService from 'services/analytics';
import customAnalytics from 'services/custom_analytics';
import monitoringService from 'services/sentry';
import {
  CATEGORIES, STATUSES, CSV_CATEGORIES_MAPPING, METRICS, BE_MIME_TYPES_MAP, MIME_EXTENSIONS_MAP, ARTWORK_IMAGE_STATES,
} from 'constants/artworks';
import { generateId } from 'store/utils';
import { objectToArray } from 'utils/common';
import * as analyticsEvents from 'constants/analytics';
import * as actions from './actions';
import * as modalActions from '../modal/actions';
import * as filesActions from '../files/actions';
import * as filesTypes from '../files/constants';
import * as types from './constants';
import { buildFilterQuery, buildSortingQuery } from './utils';

const RETRY_DELAY = 2000;
const CHECK_FOR_UPDATES_INTERVAL = 60000;

const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(true), ms));
const getName = (fileName) => (fileName.includes('.')
  ? fileName.split('.').slice(0, -1).join('.').replace('_', ' ') : fileName);
const removeNulls = (obj) => Object.keys(obj).reduce((accum, key) => ({
  ...accum,
  [key]: obj[key] === null ? '' : obj[key],
}), {});

function* reflect(saga, api, payload, ...rest) {
  try {
    return { v: yield call(saga, api, payload, ...rest), status: 'fulfilled' };
  } catch (err) {
    return { e: err, status: 'rejected' };
  }
}


const logEvent = (type, data) => {
  if (!authService.isImpersonated()) {
    analyticsService.logEvent(type, data);
    customAnalytics.trackAmplitude(type, data);
  }
};

const difference = (object, base) => {
// eslint-disable-next-line no-shadow
  function changes(object, base) {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        // eslint-disable-next-line no-param-reassign
        result[key] = (isObject(value) && isObject(base[key]))
          ? changes(value, base[key])
          : value;
      }
    });
  }
  return changes(object, base);
};

function* artworksCheckUpdates(api) {
  while (true) {
    try {
      const lastUpdated = yield select(fromArtworks.getLastUpdated);
      const { id: userId } = yield select(fromUser.getInfo);
      if (lastUpdated && userId) {
        const revisionDate = moment(lastUpdated).utc().format('YYYY-MM-DDTHH:mm');
        const { count: changesCount } = yield call([api, api.get], `versions/?revision__user=${userId}&revision__date_created__gt=${revisionDate}`);
        if (changesCount) {
          yield put(actions.artworksFetchRequest({ silently: true }));
        }
      }
      yield call(delay, CHECK_FOR_UPDATES_INTERVAL);
    // eslint-disable-next-line no-empty
    } catch (err) {}
  }
}

function* watchArtworksCheckUpdates(api) {
  while (true) {
    yield take(types.ARTWORKS_POLL_UPDATES_START);
    yield race([
      call(artworksCheckUpdates, api),
      take(types.ARTWORKS_POLL_UPDATES_STOP),
    ]);
  }
}

function* artworksFetchRequest(api, { payload }) {
  const PAGE_SIZE = 20;

  try {
    const meta = yield select(fromArtworks.getMeta);
    let query = `artworks/?limit=${PAGE_SIZE}&offset=${meta.page * PAGE_SIZE}`;

    const filter = yield select(fromArtworks.getFilter);
    const filterQuery = buildFilterQuery(filter);
    if (filterQuery) query = `${query}&${filterQuery}`;

    const sorting = yield select(fromArtworks.getSorting);
    const sortingQuery = buildSortingQuery(sorting);
    if (sortingQuery) query = `${query}&${sortingQuery}`;

    const { results, next } = yield call([api, api.get], query);
    yield put(actions.artworksFetchSuccess({ artworks: results, updatedAt: Date.now(), hasMore: Boolean(next) }));

    if (payload.trigger === 'filter') {
      yield put(actions.artworksApplyFilterSuccess());
    } else if (payload.trigger === 'sorting') {
      yield put(actions.artworksChangeSortingSuccess());
    }
    // yield put(actions.artworksPollUpdatesStart());
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.artworksFetchError(error));
  }
}

function* watchArtworksFetchRequest(api) {
  yield takeLatest([types.ARTWORKS_FETCH_REQUEST, types.ARTWORKS_APPLY_FILTER_REQUEST], artworksFetchRequest, api);
}

function* artworksSingleArtworkFetchRequest(api, { payload }) {
  try {
    const query = `artworks/${payload.artworkId}/`;
    const artwork = yield call([api, api.get], query);

    yield put(actions.artworksSingleArtworkFetchSuccess(artwork));
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.artworksSingleArtworkFetchError(error));
  }
}

function* watchArtworksSingleArtworkFetchRequest(api) {
  yield takeLatest(types.ARTWORKS_SINGLE_ARTWORK_FETCH_REQUEST, artworksSingleArtworkFetchRequest, api);
}

function* applyFilterRequest() {
  try {
    yield put(actions.artworksClearAll());
    yield put(actions.artworksFetchRequest({ trigger: 'filter' }));
  } catch (error) {
    yield put(actions.artworksApplyFilterError(error));
  }
}

function* watchApplyFilterRequest() {
  yield takeLatest(types.ARTWORKS_APPLY_FILTER_REQUEST, applyFilterRequest);
}

function* changeSorting() {
  try {
    yield put(actions.artworksClearAll());
    yield put(actions.artworksFetchRequest({ trigger: 'sorting' }));
  } catch (error) {
    yield put(actions.artworksChangeSortingError(error));
  }
}

function* watchChangeSorting(api) {
  yield takeLatest(types.ARTWORKS_CHANGE_SORTING, changeSorting, api);
}

function* artworksCheckImagesAvailability(api, { payload }) {
  const maxAttempts = 20;
  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      const imageObjects = payload;
      const promises = imageObjects.map((imageObject) => call([api, api.get], `artworks/${imageObject.artworkId}/images/${imageObject.id}`));
      const results = yield all(promises);
      if (results.some((image) => image.state === ARTWORK_IMAGE_STATES.UPLOADING)) {
        if (i < maxAttempts - 1) {
          yield call(delay, RETRY_DELAY);
        }
      } else {
        yield put(actions.artworksCheckImagesAvailabilitySuccess());
        return;
      }
    } catch (error) {
      if (i < maxAttempts - 1) {
        yield call(delay, RETRY_DELAY);
      }
    }
  }
  yield put(actions.artworksCheckImagesAvailabilityError());
}

function* watchArtworksCheckImagesAvailability(api) {
  yield takeLatest(types.ARTWORKS_CHECK_IMAGES_AVAILABILITY, artworksCheckImagesAvailability, api);
}
const downloadImage = (url, name, id, fileMeta) => new Promise((resolve, reject) => {
  fetch(url, { method: 'GET' })
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
      const error = new Error(`${response.status} ${response.statusText}`);
      error.response = response;
      throw error;
    })
    .then((blob) => {
      const ext = MIME_EXTENSIONS_MAP[blob.type];
      if (!ext) {
        reject(new Error(`Unsupported image type: ${blob.type}`));
      }
      const blobMeta = { type: blob.type };
      const file = new File([blob], name ? `${name}.${ext}` : `artwork-${id}.${ext}`, blobMeta);
      if (fileMeta && fileMeta.image_original_width) { // we already know dimensions
        resolve({
          file,
          metadata: {
            ...blobMeta,
            image_original_width: fileMeta.image_original_width,
            image_original_height: fileMeta.image_original_height,
          },
        });
      } if (blob.type === 'image/tiff') {
        // don't compute dimensions because it requires Tiff.js to be included which is too heavy
        resolve({ file, metadata: blobMeta });
      } else {
        getImageDimensionsFromBlob(blob).then((dimensions) => {
          const metadata = {
            ...blobMeta,
            image_original_width: dimensions.width,
            image_original_height: dimensions.height,
          };
          resolve({ file, metadata });
        });
      }
    })
    .catch((err) => { reject(err); });
});

function* uploadImage(api, { file: fileObject, artworkId, order = 0 }) {
  const maxAttempts = 5;
  let lastError;

  if (!BE_MIME_TYPES_MAP[fileObject.type]) {
    const errorMessage = `Image uploading failed. Unsupported file type: ${fileObject.type}`;
    const error = new Error(errorMessage);
    error.name = 'UploadImageError';
    error.meta = { artworkId };
    throw error;
  }

  const imageStub = yield call([api, api.put], `artworks/${artworkId}/images/presignedurl/`,
    {
      order,
      extension: BE_MIME_TYPES_MAP[fileObject.type],
      image_original_width: fileObject.image_original_width,
      image_original_height: fileObject.image_original_height,
    });

  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      yield fetch(imageStub.presigned_url, {
        method: 'PUT',
        headers: { 'content-type': fileObject.type },
        body: fileObject.file,
      });

      return imageStub.image_data;
    } catch (err) {
      lastError = err;
      if (i < maxAttempts - 1) {
        yield call(delay, RETRY_DELAY);
      }
    }
  }

  monitoringService.logError(lastError);
  const errorMessage = (lastError && lastError.message) ? lastError.message.image : 'Image uploading failed';
  const error = new Error(errorMessage);
  error.name = 'UploadImageError';
  error.meta = { artworkId };
  throw error;
}

function* createNewArtwork(api, fileObject) {
  const maxAttempts = 5;
  let lastError;

  for (let i = 0; i < maxAttempts; i += 1) {
    try {
      const newArtwork = yield call([api, api.post], 'artworks/', {
        title: fileObject.file.name ? getName(fileObject.file.name) : fileObject.name,
      });
      return newArtwork;
    } catch (err) {
      lastError = err;
      if (i < maxAttempts - 1) {
        yield call(delay, RETRY_DELAY);
      }
    }
  }
  monitoringService.logError(lastError);
  const errorMessage = (lastError && lastError.message) ? lastError.message.artwork : 'Artwork creation failed';
  const error = new Error(errorMessage);
  error.name = 'CreateArtworkError';
  throw error;
}

function* createArtworkAndUploadImage(api, file) {
  try {
    yield put(filesActions.fileUploadRequest(file.id));
    const newArtwork = yield call(createNewArtwork, api, file);

    let fileObject = file;
    if (fileObject.source === 'dropbox' || fileObject.source === 'gdrive') {
      const imageFile = yield call(downloadImage, fileObject.file.url, fileObject.file.name, fileObject);
      fileObject = {
        file: imageFile.file,
        ...imageFile.metadata,
      };
    }

    const uploadedImage = yield call(uploadImage, api, { file: fileObject, artworkId: newArtwork.id });
    yield put(filesActions.fileUploadSuccess(file.id));

    logEvent(analyticsEvents.ARTWORK_CREATE, {
      artworkId: newArtwork.id,
    });

    // logEvent(analyticsEvents.ARTWORK_IMAGE_SUCCESSFULLY_UPLOADED, {
    //   fileId: file.id,
    // });

    return { ...uploadedImage, artworkId: newArtwork.id };

  } catch (err) {
    monitoringService.logError(err);
    logEvent(analyticsEvents.ARTWORK_CREATE_ERROR, {
      error: err.toString(),
    });

    yield put(filesActions.fileUploadError(file.id));

    if (err && err.meta && err.name === 'UploadImageError') {
      // try to remove failed artworks
      try {
        yield call([api, api.delete], `artworks/${err.meta.artworkId}/`);
      } catch (error) {
        monitoringService.logError(error);
      }
    }

    const errorMessage = err ? err.message || 'Image uploading failed' : 'Image uploading failed';
    yield put(notificationCreate({
      type: 'uploadError',
      timeout: 5000,
      text: errorMessage,
    }));
    throw new Error(errorMessage);
  }
}

const parseCSV = csvparserService.parse;

function* csvUploadAdditionalImages(api, artworkId, images = [], highestOrder = 0) {
  const imageFilePromises = images.map((imageUrl) => call(downloadImage, imageUrl, null, generateId()));
  const imageFiles = yield all(imageFilePromises);
  const uploadedImages = [];
  for (let i = 0; i < imageFiles.length; i += 1) {
    const fileObject = {
      file: imageFiles[i].file,
      ...imageFiles[i].metadata,
    };
    const res = yield call(reflect, uploadImage, api, { file: fileObject, artworkId, order: highestOrder + i + 1 });
    uploadedImages.push(res);
  }

  const erred = uploadedImages.filter(({ status }) => status === 'rejected');
  if (erred.length) {
    throw erred;
  }
}

function* createArtworkFromCSV(api, row) {
  let artworkId;
  try {
    const id = row['Piece Id'];
    const imageURL = row['Primary Image Url'];
    const name = row['Name'];
    const { file, metadata } = yield call(downloadImage, imageURL, name, id);
    const fileObject = {
      id: row['Piece Id'],
      file,
      name: row['Name'] || 'Untitled artwork',
      type: file.type,
      ...metadata,
    };
    const createdArtwork = yield call(createArtworkAndUploadImage, api, fileObject);
    // eslint-disable-next-line prefer-destructuring
    artworkId = createdArtwork.artworkId;

    const additionalImagesField = row['Additional Image Urls'] || '';
    const additionalImages = additionalImagesField.split(' ').filter((imgUrl) => /^https?:\/\//.test(imgUrl));

    yield csvUploadAdditionalImages(api, createdArtwork.artworkId, additionalImages);

    const categories = objectToArray(CATEGORIES);
    const statuses = objectToArray(STATUSES);
    let category = null;
    if (row['Type']) {
      const label = CSV_CATEGORIES_MAPPING[row['Type']];
      category = categories.find((cat) => {
        if (label) {
          return toLower(cat.label) === toLower(label) || toLower(cat.label) === toLower(row['Type']);
        }
        return toLower(cat.label) === toLower(row['Type']) || toLower(cat.label) === 'multimedia';
      });
    }
    const status = statuses.find((stat) => toLower(stat.label) === toLower(row['Status']));

    const tags = row['Notes'] ? String(row['Notes']).split(':').map((tag) => tag.trim()) : [];
    const addNotesPromises = tags.map((note) => call([api, api.post], `artworks/${createdArtwork.artworkId}/notes/`, { body: note }));
    yield all(addNotesPromises);

    const priceFiled = row['Price (USD)'];
    let price;
    if (Number.isFinite(priceFiled)) {
      price = priceFiled;
    } else {
      const digitsOnly = priceFiled.replace(/[^\d.]+/g, '');
      if (digitsOnly.length) {
        price = +digitsOnly;
      }
    }

    const metricField = row['Dimension Type'] || '';
    const metricList = Object.values(METRICS);
    const metricObject = metricList.find(({ csvValue }) => csvValue === metricField);
    const metric = metricObject ? metricObject.value : 2; // Inches by default

    const columnNames = Object.keys(row);
    const heightColumn = columnNames.find((columnName) => /Height\s*\((?:in|cm)\)/igm.test(columnName)) || '';
    const widthColumn = columnNames.find((columnName) => /Width\s*\((?:in|cm)\)/igm.test(columnName)) || '';
    const depthColumn = columnNames.find((columnName) => /Depth\s*\((?:in|cm)\)/igm.test(columnName)) || '';

    const dateField = row['Date is Circa'] || row['Creation Date'];
    const artworkData = {
      year: dateField ? moment(dateField).year() : null,
      sub_category: [row['Subject Matter'], row['Medium']].filter((val) => val).join('. '),
      category: category ? category.value : null,
      height: row[heightColumn] || 0,
      width: row[widthColumn] || 0,
      depth: row[depthColumn] || 0,
      metric,
      status: status ? status.value : null,
      price,
      edition: row['Edition'] || '',
      current_location: row['Current Location Name'],
    };
    yield call([api, api.patch], `artworks/${createdArtwork.artworkId}`, artworkData);

    return createdArtwork;
  } catch (err) {
    if (artworkId) { // we successfully created the artwork, but error occurred while updating. Delete this artwork and throw error
      try {
        yield call([api, api.delete], `artworks/${artworkId}/`);
      } catch (error) {
        monitoringService.logError(error);
      }
    }
    throw new Error(err);
  }
}

function* uploadCsvFile(api) {
  try {
    const data = yield select(fromArtworks.getCsv);

    const results = [];
    for (let i = 0; i < data.length; i += 1) {
      const res = yield call(reflect, createArtworkFromCSV, api, data[i]);
      yield put(actions.artworksUpdateCsvRecord({
        name: data[i].Name,
        uploadStatus: res.status === 'fulfilled' ? 'success' : 'error',
        error: res.e ? (res.e.message || res.e.toString()) : null,
      }));
      results.push(res);
    }

    const successful = results.filter((row) => row.status === 'fulfilled');
    if (successful.length > 0) {
      yield put(actions.artworksClearAll());
      yield put(actions.artworksFetchRequest());
      yield put(actions.artworksCheckImagesAvailability(successful.map(({ v }) => v)));
      yield put(actions.artworksUploadSuccess());
    }

    const failedRows = results.filter((row) => row.status === 'rejected');
    if (failedRows.length > 0) {
      throw new Error(`CSV uploading finished with ${failedRows.length} errors`);
    }

    yield put(modalActions.modalClose('upload'));
  } catch (error) {
    yield put(actions.artworksUploadError(error));
    yield put(notificationCreate({
      type: 'uploadError',
      timeout: 5000,
      text: error ? error.message : '',
    }));
    monitoringService.logError(error);
  }
}

function* artworksUploadRequest(api, { payload }) {
  try {
    logEvent(analyticsEvents.SELECT_UPLOAD_BUTTON);

    const files = payload;

    if (files && files.length > 0 && files[0].type === 'csv') {
      yield call(uploadCsvFile, api, files[0].file);
      return;
    }

    const filesToUpload = files.filter((file) => !file.status.isSuccess);
    const uploadedImages = [];

    for (let i = 0; i < filesToUpload.length; i += 1) {
      const res = yield call(reflect, createArtworkAndUploadImage, api, filesToUpload[i]);
      uploadedImages.push(res);
    }

    const successful = uploadedImages.filter(({ status }) => status === 'fulfilled');
    if (successful.length > 0) {
      yield put(actions.artworksClearAll());
      yield put(actions.artworksFetchRequest());
      yield put(actions.artworksCheckImagesAvailability(successful.map(({ v }) => v)));
    }

    const failed = uploadedImages.filter(({ status }) => status === 'rejected');
    if (failed.length > 0) throw new Error(`${failed.length} images are not uploaded`);

    yield put(modalActions.modalClose('upload'));
    yield put(actions.artworksUploadSuccess());
    yield put(filesActions.filesClearAll());
    yield put(notificationCreate({ type: 'uploadSuccess' }));
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.artworksUploadError(error));
    yield put(notificationClearAll());
    yield put(notificationCreate({
      type: 'uploadError',
      timeout: 5000,
      text: error ? error.message : '',
    }));
  }
}

function* watchArtworksUploadRequest(api) {
  yield takeLatest(types.ARTWORKS_UPLOAD_REQUEST, artworksUploadRequest, api);
}

function* artworksCommitRequest(api) {
  try {
    const selectedArtwork = yield select(fromArtworks.getSelected);
    let persistedArtwork = yield select(fromArtworks.getPersistedArtwork, selectedArtwork.id);
    if (!persistedArtwork) { // there is no such artwork in the collection, it was loaded individually
      const query = `artworks/${selectedArtwork.id}/`;
      persistedArtwork = yield call([api, api.get], query);
    }
    const changedData = difference(selectedArtwork, persistedArtwork);
    const {
      imagesToDelete = [], images, notes, ...dataToPatch
    } = changedData;

    const oldNotesIds = persistedArtwork.notes.map((note) => note.id);
    const newNotesIds = selectedArtwork.notes.map((note) => note.id);
    const notesToDelete = persistedArtwork.notes.filter((note) => !newNotesIds.includes(note.id));
    const notesToAdd = selectedArtwork.notes.filter((note) => !oldNotesIds.includes(note.id));
    const notesToPatch = selectedArtwork.notes.filter((note) => {
      if (!oldNotesIds.includes(note.id)) {
        return false;
      }
      const oldNote = persistedArtwork.notes.find(({ id }) => id === note.id);
      return oldNote && oldNote.body !== note.body;
    });

    const deleteImagesPromises = imagesToDelete.map((imageId) => call([api, api.delete],
      `artworks/${selectedArtwork.id}/images/${imageId}/`));
    const deleteNotesPromises = notesToDelete.map(({ id }) => call([api, api.delete],
      `artworks/${selectedArtwork.id}/notes/${id}/`));
    const addNotesPromises = notesToAdd.map((note) => call([api, api.post],
      `artworks/${selectedArtwork.id}/notes/`, note));
    const patchNotesPromises = notesToPatch.map((note) => call([api, api.patch],
      `artworks/${selectedArtwork.id}/notes/${note.id}/`, note));

    yield all(deleteImagesPromises);
    yield all(deleteNotesPromises);
    yield all(addNotesPromises);
    yield all(patchNotesPromises);

    const patchedArtwork = yield call([api, api.patch], `artworks/${selectedArtwork.id}/`, dataToPatch);

    const deletedImages = persistedArtwork.images
      .filter((image) => imagesToDelete.includes(image.id))
      .map((image) => JSON.stringify(image));
    const deletedNotes = notesToDelete
      .map((note) => JSON.stringify(note));
    const updatedNotes = notesToPatch
      .map((note) => JSON.stringify(note));
    const addedNotes = patchedArtwork.notes
      .filter((note) => !oldNotesIds.includes(note.id))
      .map((note) => JSON.stringify(note));
    const eventData = { ...removeNulls(dataToPatch) };
    const nestedArrays = {
      deletedImages,
      deletedNotes,
      updatedNotes,
      addedNotes,
    };
    const arraysToAdd = Object.keys(nestedArrays).reduce((accum, key) => (
      nestedArrays[key].length ? { ...accum, [key]: nestedArrays[key] } : accum), {});
    logEvent(analyticsEvents.ARTWORK_UPDATE, {
      ...eventData,
      ...arraysToAdd,
    });
    yield put(actions.artworksCommitSuccess(patchedArtwork));
    yield put(notificationCreate({ type: 'saveChangesSuccess' }));
  } catch (error) {
    monitoringService.logError(error);
    logEvent(analyticsEvents.ARTWORK_UPDATE_ERROR, {
      error: error ? (error.message || error.toString()) : '',
    });
    yield put(actions.artworksCommitError(error.message));
    yield put(notificationCreate({
      type: 'saveChangesError',
      timeout: 5000,
      action: { type: types.ARTWORKS_COMMIT_REQUEST },
    }));
  }
}

function* watchArtworksCommitRequest(api) {
  yield takeLatest(types.ARTWORKS_COMMIT_REQUEST, artworksCommitRequest, api);
}

function* safelyUploadImage(api, { file, ...payload }) {
  try {
    yield put(filesActions.fileUploadRequest(file.id));
    let fileObject = file;
    if (fileObject.source === 'dropbox' || fileObject.source === 'gdrive') {
      const imageFile = yield call(downloadImage, fileObject.file.url, fileObject.file.name, fileObject);
      fileObject = {
        file: imageFile.file,
        ...imageFile.metadata,
      };
    }
    const uploadedImage = yield call(uploadImage, api, { file: fileObject, ...payload });
    yield put(filesActions.fileUploadSuccess(file.id));
    return uploadedImage;
  } catch (err) {
    yield put(filesActions.fileUploadError(file.id));
    const errorMessage = err ? err.message || 'Image uploading failed' : 'Image uploading failed';
    yield put(notificationCreate({
      type: 'uploadError',
      timeout: 5000,
      text: errorMessage,
    }));
    throw new Error(errorMessage);
  }
}

function* artworksUploadImagesRequest(api, { payload }) {
  try {
    const files = payload;

    let highestOrder = 0;
    const { images, id: selectedId } = yield select(fromArtworks.getSelected);
    if (images) {
      highestOrder = images.reduce((prev, cur) => Math.max(prev, cur.order), highestOrder);
    }

    const filesToUpload = files.filter((file) => !file.status.isSuccess);
    const uploadedImages = [];
    for (let i = 0; i < filesToUpload.length; i += 1) {
      const res = yield call(reflect, safelyUploadImage, api, { file: filesToUpload[i], artworkId: selectedId, order: highestOrder + i + 1 });
      uploadedImages.push(res);
    }

    const successful = uploadedImages.filter(({ status }) => status === 'fulfilled');
    if (successful.length > 0) {
      const result = successful.map(({ v }) => ({ ...v, artworkId: selectedId }));
      yield put(actions.artworksImagesUploadSuccess(result));
      yield put(actions.artworksCheckImagesAvailability(result));

      const addedImages = result.map((image) => JSON.stringify(image));
      logEvent(analyticsEvents.ARTWORK_UPDATE, {
        addedImages,
      });
    }

    const failed = uploadedImages.filter(({ status }) => status === 'rejected');
    if (failed.length > 0) throw new Error(`${failed.length} images are not uploaded`);

    yield put(modalActions.modalClose('upload_images'));
    yield put(filesActions.filesClearAll());
  } catch (error) {
    monitoringService.logError(error);
    logEvent(analyticsEvents.ARTWORK_UPDATE_ERROR, {
      error: error ? error.message || error.toString() : '',
    });
    yield put(actions.artworksImagesUploadError(error));
    yield put(notificationCreate({
      type: 'uploadError',
      timeout: 5000,
      text: error ? error.message : '',
    }));
  }
}

function* watchArtworksUploadImagesRequest(api) {
  yield takeLatest(types.ARTWORKS_IMAGES_UPLOAD_REQUEST, artworksUploadImagesRequest, api);
}

function* artworksDeleteRequest(api) {
  try {
    const { id: selectedId } = yield select(fromArtworks.getSelected);
    yield call([api, api.delete], `artworks/${selectedId}/`);
    yield put(push('/'));
    yield put(actions.artworksDeleteSuccess(selectedId));
    yield put(modalActions.modalClose('delete_artwork_confirm'));
    yield put(notificationCreate({ type: 'deleteSuccess' }));

    logEvent(analyticsEvents.DELETE_ARTWORK_VIA_METADATA_PAGE, { artworkId: selectedId });

  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.artworksDeleteError(error));
    yield put(modalActions.modalClose('delete_artwork_confirm'));
    yield put(notificationCreate({
      type: 'deleteError',
      timeout: 5000,
      action: { type: types.ARTWORKS_DELETE_REQUEST },
    }));

    logEvent(analyticsEvents.DELETE_ARTWORK_VIA_METADATA_PAGE, { error });
  }
}

function* watchArtworksDeleteRequest(api) {
  yield takeLatest(types.ARTWORKS_DELETE_REQUEST, artworksDeleteRequest, api);
}

function* artworksPublicProfileRequest(api) {
  const PAGE_SIZE = 20;
  try {
    // console.log('PAGE_SIZE -> ', PAGE_SIZE);

    const userInfo = yield select(fromUser.getPublicInfo);
    const meta = yield select(fromArtworks.getMeta);

    // console.log('userInfo -> ', userInfo);

    const { results, next } = yield call([api, api.get], `users/${userInfo.id}/public-gallery-artworks/?limit=${PAGE_SIZE}&offset=${meta.page * PAGE_SIZE}`);
    yield put(actions.artworksPublicProfileSuccess({ artworks: results, hasMore: Boolean(next) }));
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.artworksPublicProfileError(error));
  }
}

function* watchArtworksPublicProfileRequest(api) {
  yield takeLatest(types.ARTWORKS_PUBLIC_PROFILE_REQUEST, artworksPublicProfileRequest, api);
}

function* filesAdd({ payload }) {
  if (payload.length) {
    const { file, type } = payload[0];

    logEvent(analyticsEvents.SELECT_UPLOAD_IMAGES, file);

    if (type === 'csv') {
      const csvData = yield parseCSV(file);
      yield put(actions.artworksCsvParsed(csvData.data));
    }
  }
}

function* watchFilesAdd() {
  yield takeLatest(filesTypes.FILES_ADD, filesAdd);
}

function* exportCsvErred() {
  const csvData = yield select(fromArtworks.getCsv);
  const erredRows = csvData
    .filter((row) => row.uploadStatus === 'error')
    .map((row) => omit(row, 'uploadStatus'));
  const csv = csvparserService.unparse(erredRows);
  saveAs(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'erredRows.csv');
}

function* watchExportCsvErred() {
  yield takeLatest(types.ARTWORKS_EXPORT_CSV_ERRED, exportCsvErred);
}

function* applyBulkAction(api, { payload }) {
  try {
    const { actionType, ids } = payload;
    if (actionType === 'delete') {
      const uuidsQuery = ids.map((id) => `uuids=${id}`).join('&');
      yield call([api, api.delete], `artworks/bulk-delete/?${uuidsQuery}`);

      yield put(actions.artworksBulkActionsSuccess());
      yield put(actions.artworksClearAll());
      yield put(actions.artworksFetchRequest());
      yield put(modalActions.modalClose('bulk_actions_confirm'));
      yield put(notificationCreate({
        type: 'commonSuccess',
        text: 'Artworks deleted',
      }));
    }
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.artworksBulkActionsError(error));
    yield put(modalActions.modalClose('bulk_actions_confirm'));
    yield put(notificationCreate({
      type: 'commonError',
      text: error.message,
    }));
  }
}

function* watchBulkActionsRequest(api) {
  yield takeLatest(types.ARTWORKS_BULK_ACTIONS_REQUEST, applyBulkAction, api);
}

function* sendAmplitude({ type, payload }) {
  if (type === types.UPLOAD_VIA) {
    switch(payload.source) {
      case 'dropbox':
        logEvent(analyticsEvents.SELECT_DROPBOX_IN_UPLOAD_IMAGES);
        break;
      case 'gdrive':
        logEvent(analyticsEvents.SELECT_G_DRIVE_IN_UPLOAD_IMAGES);
        break;
      default:
        return null;
    }
  }

  if (type === types.ARTWORKS_CLICK_TO_VIEW_METADATA) {
    logEvent(analyticsEvents.ARTWORKS_CLICK_TO_VIEW_METADATA);
  }

  if (type === types.DELETE_MULTIPLE_ARTWORKS) {
    logEvent(analyticsEvents.DELETE_MULTIPLE_ARTWORKS);
  }
}

function* watchUserActions() {
  yield all([
    takeLatest(types.ARTWORKS_CLICK_TO_VIEW_METADATA, sendAmplitude),
    takeLatest(types.UPLOAD_VIA, sendAmplitude),
    takeLatest(types.DELETE_MULTIPLE_ARTWORKS, sendAmplitude),
  ]);
}

export default function* ({ api }) {
  yield fork(watchArtworksFetchRequest, api);
  yield fork(watchArtworksUploadRequest, api);
  yield fork(watchArtworksCommitRequest, api);
  yield fork(watchArtworksUploadImagesRequest, api);
  yield fork(watchArtworksDeleteRequest, api);
  yield fork(watchArtworksCheckImagesAvailability, api);
  yield fork(watchArtworksCheckUpdates, api);
  yield fork(watchArtworksPublicProfileRequest, api);
  yield fork(watchApplyFilterRequest);
  yield fork(watchChangeSorting, api);
  yield fork(watchArtworksSingleArtworkFetchRequest, api);
  yield fork(watchFilesAdd);
  yield fork(watchExportCsvErred);
  yield fork(watchBulkActionsRequest, api);
  yield fork(watchUserActions);
}
