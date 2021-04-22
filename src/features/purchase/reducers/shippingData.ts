const setShippingOption = (state, { payload }) => ({
    ...state,
    shippingData: {
        ...state.shippingData,
        currShippingOption: payload
    }
});

export default {
    setShippingOption
}
