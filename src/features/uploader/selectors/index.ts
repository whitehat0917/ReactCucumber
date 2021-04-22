import { createSelector } from "reselect";

const getUploaderStatus = state => state.uploader.status['upload'];
const getFiles = state => state.uploader.files;
const getArtwork = state => state.uploader.artwork;

const uploaderSelector = createSelector(
    getUploaderStatus,
    getFiles,
    getArtwork,
    (status, files, artwork) => ({ status, files, artwork })
);

export default uploaderSelector;
