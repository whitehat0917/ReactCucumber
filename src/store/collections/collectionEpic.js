// import { ajax } from 'rxjs/ajax';
// import {
//   withLatestFrom, map, mergeMap, catchError,
// } from 'rxjs/operators';
// import { ofType } from 'redux-observable';
// import { forkJoin, of, from } from 'rxjs';
// import * as types from './constants';
// import * as actions from './actions';

// const apiUrl = 'https://app.marcelforart.com/api';
// const COLLECTIONS_LIMIT = 8;
// // const query = `artwork-collections/?artist__id=${userId}&artwork_details=false&all_collections=true&limit=${COLLECTIONS_LIMIT}&offset=${offset}`;

// const fetchCollections = (userId, offset) => {
//   const url = `${apiUrl}/artwork-collections/?artist__id=${userId}&artwork_details=false&all_collections=true&limit=${COLLECTIONS_LIMIT}&offset=${offset}`;
//   return ajax.getJSON(url);
// };

// export const fetchCollectionsEpic = (action$, state$) => action$.pipe(
//   ofType(types.COLLECTIONS_FETCH_REQUEST),
//   withLatestFrom(state$),
//   map(([, state]) => state.user.publicInfo.id),
//   mergeMap((userId, offset) => fetchCollections(userId, offset).pipe(
//     map((response) => actions.collectionsFetchSuccess(response)),
//     catchError((error) => of({
//       type: types.COLLECTIONS_FETCH_ERROR,
//       payload: error.xhr.response,
//       error: true,
//     })),
//   )),
//   // mergeMap(({ payload }) =>
//   //     from(payload.results.map(collection =>
//   //         actions.collectionFetchArtworks(collection.artworks, collection, payload.count))).pipe(

//   //         )
//   // )
// );

// const fetchArtwork = (artworkId) => {
//   const url = `${apiUrl}/artworks/${artworkId}`;
//   return ajax.getJSON(url);
// };

// export const fetchArtworkEpic = (action$) => action$.pipe(
//   ofType(types.COLLECTIONS_FETCH_ARTWORKS),
//   mergeMap(({ payload: { artworks, collection, count } }) => forkJoin(
//     artworks.map((artwork) => fetchArtwork(artwork.artwork)),
//   ).pipe(
//     map((response) => actions.collectionFetchArtworkSuccess(response, collection, count)),
//     catchError((error) => of({
//       type: types.COLLECTIONS_FETCH_ERROR,
//       payload: error,
//       error: true,
//     })),
//   )),
// );
