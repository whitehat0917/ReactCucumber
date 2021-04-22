import { FetchStaus } from "../../app/global-types"

type CoreStatus = {
    login: FetchStaus,
    signup: FetchStaus,
    oauth_login: FetchStaus,
    reset_password: FetchStaus,
    change_password: FetchStaus,
    impersonate: FetchStaus,
    magic_login: FetchStaus,
}



export type TCoreState = {
    initializing: boolean,
    initializide: boolean,
    authorized?: boolean,
    status?: CoreStatus,
    uploader?: any,
    errors?: any,
    userId?: string
}

export type TUploaderState = {
    files: any[],
    modalIsOpen: boolean,
}