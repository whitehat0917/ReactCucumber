import React, { Fragment } from 'react';

import {CATEGORIES, METRICS} from "../../constants/artworks";
import { formatPrice } from "utils/artworks";

import {
    OrderSummaryBody,
    ProductImage,
    OrderSummaryList,
    OrderSummaryName,
    OrderSummaryItem,
    OrderSummaryPrice
} from "./styled";

export function extractImageSrc(product) {
    if (product) {
        return product.artwork_data.images[0].thumbnails.mid;
    }

    return null;
}

export const OrderSummaryItemList = ({ product }) => {
    const {
        artwork_data: {
            category,
            sub_category,
            width,
            height,
            metric,
            edition
        }
    } = product;

    return (
        <Fragment>
            {category && (
                <OrderSummaryItem>
                    {CATEGORIES[category].label}
                </OrderSummaryItem>
            )}
            {sub_category && (
                <OrderSummaryItem>
                    {sub_category}
                </OrderSummaryItem>
            )}

            {width && height && metric && (
                <OrderSummaryItem>
                    {`${Math.floor(width)} X ${Math.floor(height)} ${METRICS[metric].csvValue}`}
                </OrderSummaryItem>
            )}
            {edition && (
                <OrderSummaryItem>
                    {`Edition: ${edition}`}
                </OrderSummaryItem>
            )}
        </Fragment>
    );
};

const OrderSummary = ({ product }) => {
    const imageSrc = extractImageSrc(product);

    return (
        <OrderSummaryBody>
            <ProductImage src={imageSrc} />
            <OrderSummaryList>
                {product && (
                    <Fragment>
                        <OrderSummaryName>
                            {product.artwork_data.title}
                        </OrderSummaryName>
                        <OrderSummaryItemList product={product} />
                        <OrderSummaryPrice>
                            {formatPrice(product.price, product.artwork_data.artist_data.currency)}
                        </OrderSummaryPrice>
                    </Fragment>
                )}
            </OrderSummaryList>
        </OrderSummaryBody>
    );
};

export default OrderSummary;
