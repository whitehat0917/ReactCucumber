import { createSlice } from '@reduxjs/toolkit';

import { initialStatus } from '../../store/utils';

import { TShopState } from './shop-types';
import shopReducers from './reducers';

export const initialState: TShopState = {
    status: {
        fetch: initialStatus
    },
    products: null,
    prodUpdateId: 0,
    totalProductNum: 0,
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        ...shopReducers
    }
});

export const {
    productsFetchRequest,
    productsFetchSuccess,
    productsFetchError
} = shopSlice.actions;

export default shopSlice.reducer;
