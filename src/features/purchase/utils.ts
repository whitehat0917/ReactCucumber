import {formatPrice} from "../../utils/artworks";

export function calculateShippingAndTotal(product, shippingData) {
    const shippingPrice = (product && product.shipping_options && product.shipping_options.length > shippingData.currShippingOption) ?
        product.shipping_options[shippingData.currShippingOption].shipping_cost : 0;

    const total = (product && product.price) ? (parseFloat(product.price) + parseFloat(shippingPrice)) : 0;

    return {
        shippingPrice,
        total
    };
}

export function buildAddressSummary(info) {
    const {
        country,
        region,
        city,
        streetAddr,
        aptNum,
        postalCode
    } = info;

    let addressSummary = `${streetAddr}, ${city}, ${region} ${postalCode}, ${country}`;
    if (aptNum)
        addressSummary = `${aptNum} ${addressSummary}`;

    return addressSummary;
}

export function buildShippingSummary(shippingData, product) {
    if (!product)
        return '';

    const shippingOption = product.shipping_options[shippingData.currShippingOption];
    if (!shippingOption)
        return '';

    return `${shippingOption.name} • ${formatPrice(shippingOption.shipping_cost, product.artwork_data.artist_data.currency)}`;
}
