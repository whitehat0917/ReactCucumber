export type TErrors = {
    [k: string]: string
};

export type FetchStatus = {
    isLoading: boolean,
    errors: TErrors,
    hasNeverLoaded: boolean,
}