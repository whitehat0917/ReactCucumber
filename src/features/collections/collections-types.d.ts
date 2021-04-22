import { FetchStaus } from "../../app/global-types"
import { TArtwork } from "../artwork/artwork-type"

export type TCollectionStatus = {
    fetch: FetchStaus,
    fetch_selected: FetchStaus,
    fetch_more: FetchStaus,
    preload_selected: FetchStaus,
}

export type TCollection = {
    id: number,
    name: string,
    description: string,
    url: string,
    artist: string,
    artworks: []
}

export type TCollectionsState = {
    status: TCollectionStatus,
    collections: TCollection[],
    artworks: TArtwork[],
    loadedCollections?: TCollection[],
    count?: number,
    empty: boolean,
}