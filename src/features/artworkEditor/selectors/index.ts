import { createSelector } from "reselect";

const getArtworkStatus = state => state.artworkEditor.status.fetch;
const getArtwork = state => state.artworkEditor.artwork;

const artworkSelector = createSelector(
    getArtworkStatus,
    getArtwork,
    (status, artwork) => {
        return {
            status,
            artwork,
        };
    }
);

export default artworkSelector;