import { createSelector } from 'reselect';
import _ from 'lodash';

import { FetchStatus } from '../../../app/global-types';
import { TProduct } from "../shop-types";

const getFetchStatus = state => state.shop.status.fetch;
const getUpdateId = state => state.shop.prodUpdateId;
const getProducts = state => state.shop.products;
const getHasMore = state => ( state.shop.products?.length ?? 0 ) < state.shop.totalProductNum;
const getSelectedProduct = id => state => {
    return id && state.shop.products ? state.shop.products.find(p => p.id.toString() === id) : null;
};
const getTotalProducts = state => state.shop.totalProductNum;
const getPixelId = state => state.artistInfo?.publicInfo?.pixel_tracking_id ?? '';

interface IProductsSelector {
    isLoading: boolean,
    isError: boolean,
    products?: TProduct[],
    prodUpdateId: number,
    hasMore: boolean,
    selectedProduct?: TProduct,
    totalProducts?: number
}

export const productsSelector = productId => createSelector(
    getFetchStatus,
    getUpdateId,
    getProducts,
    getHasMore,
    getSelectedProduct(productId),
    getTotalProducts,
    (fetchStatus: FetchStatus, prodUpdateId: number, products?: TProduct[], hasMore?: boolean, selectedProduct?: TProduct, totalProducts?: number): IProductsSelector => {
        const filteredProducts = products ? products.filter(item => item.is_available) : undefined;

        return {
            isLoading: fetchStatus.isLoading,
            isError: !_.isEmpty(fetchStatus.errors),
            products: filteredProducts,
            prodUpdateId,
            hasMore,
            selectedProduct,
            totalProducts
        };
    }
);

interface IProductsSimpleSelector {
    products?: TProduct[]
}

export const productsSimpleSelector = createSelector(
    getProducts,
    (products?: TProduct[]): IProductsSimpleSelector => ({
        products
    })
);

interface IPixelIdSelector {
    pixelId: string
}

export const pixelIdSelector = createSelector(
    getPixelId,
    (pixelId: string): IPixelIdSelector => ({
        pixelId
    })
);
