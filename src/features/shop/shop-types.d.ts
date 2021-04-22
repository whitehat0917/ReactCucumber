import { FetchStaus } from "../../app/global-types";

export type TShopStatus = {
    fetch: FetchStaus
};

export type TShippingOption = {
    id: number,
    name: string,
    destination: number,
    shipping_time_days: number,
    shipping_cost: number,
    shipping_method: number
};

export type TProduct = {
    id: string,
    created: string,
    deleted?: string,
    stock_quantity?: number,
    price: number,
    target: string,
    is_available: boolean,
    shipping_options: TShippingOption[],
    update_id: number,
};

export type TProductList = {
    count: number,
    next?: string,
    previous?: string,
    results: TProduct[]
};

export type TShopState = {
    status: TShopStatus,
    products?: TProductList,
    prodUpdateId: number,
    totalProductNum: number
};
