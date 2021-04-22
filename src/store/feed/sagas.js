import {
  put, call, fork, takeLatest, all,
} from 'redux-saga/effects';
import monitoringService from 'services/sentry';
import * as actions from './actions';
import * as types from './constants';

const fetchPostMeta = (url, id) => new Promise((resolve) => {
  const emptyResult = {
    id,
    title: null,
    image: null,
  };
  fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        response.text()
          .then((text) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/html');
            const metaTags = Array.from(xmlDoc.getElementsByTagName('meta'));
            const titleTag = metaTags
              .find((tag) => tag.attributes.property && tag.attributes.property.value === 'og:title');
            const imageTag = metaTags
              .find((tag) => tag.attributes.property && tag.attributes.property.value === 'og:image');
            resolve({
              id,
              title: titleTag ? (titleTag.attributes.content && titleTag.attributes.content.value) : null,
              image: imageTag ? (imageTag.attributes.content && imageTag.attributes.content.value) : null,
            });
          })
          .catch(() => {
            resolve(emptyResult);
          });
      }
      throw new Error(`Request failed. Can not get ${url}.`);
    })
    .catch((error) => {
      monitoringService.logError(error);
      resolve(emptyResult);
    });
});

function* feedItemsFetchRequest(api, { payload }) {
  try {
    const { results } = yield call([api, api.get], 'feed/?ordering=-publish_date&limit=10000');
    const blogPosts = results.filter((post) => post.item_type === 2);
    const fetchMetaPromises = blogPosts.map(({ url, id }) => call(fetchPostMeta, url, id));
    const postsMeta = yield all(fetchMetaPromises);
    const resultsWithAdditionalInfo = results.map((res) => {
      const meta = postsMeta.find((m) => m.id === res.id);
      if (meta) {
        return { ...res, image: meta.image, title: meta.title };
      }
      return res;
    });
    yield put(actions.feedItemsFetchSuccess({ items: resultsWithAdditionalInfo }));
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.feedItemsFetchError(error));
  }
}

function* watchFeedItemsFetchRequest(api) {
  yield takeLatest(types.FEED_ITEMS_FETCH_REQUEST, feedItemsFetchRequest, api);
}

function* discoverArtworksFetchRequest(api, { payload }) {
  try {
    const pageSize = 20;
    const { page } = payload;
    const { count, results } = yield call([api, api.get], `feed-discover/?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
    const pageCount = Math.ceil(count / pageSize);
    yield put(actions.feedDiscoverArtworksFetchSuccess({ artworks: results, pageCount, page }));
  } catch (error) {
    monitoringService.logError(error);
    yield put(actions.feedDiscoverArtworksFetchError(error));
  }
}

function* watchDiscoverArtworksFetchRequest(api) {
  yield takeLatest(types.FEED_DISCOVER_ARTWORKS_FETCH_REQUEST, discoverArtworksFetchRequest, api);
}

export default function* ({ api }) {
  yield fork(watchFeedItemsFetchRequest, api);
  yield fork(watchDiscoverArtworksFetchRequest, api);
}
