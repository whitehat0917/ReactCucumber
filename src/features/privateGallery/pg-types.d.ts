import { FetchStaus } from "../../app/global-types"
import { TArtwork } from "../artwork/artwork-type"

export type TPGStatus = {
    fetch: FetchStaus,
    fetch_more: FetchStaus,
}

export type TPGState = {
    status: TPGStatus,
    artworks: TArtwork[],
    artworksUpdateId: number,
    count?: number,
    isPrivate: boolean
}
