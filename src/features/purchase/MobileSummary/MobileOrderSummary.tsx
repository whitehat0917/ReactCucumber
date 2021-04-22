import React, {Fragment} from 'react';

import {
    MobileOrderSummaryBody,
    MobileOrderSummaryDetails,
    ProductImage,
    OrderSummaryList,
    OrderSummaryName,
    MobileOrderSummaryPrice
} from "../styled";

import { extractImageSrc, OrderSummaryItemList } from "../OrderSummary";
import {formatPrice} from "../../../utils/artworks";

const MobileOrderSummary = ({ product }) => {
    const imageSrc = extractImageSrc(product);

    return (
        <MobileOrderSummaryBody>
            {product && (
                <Fragment>
                    <MobileOrderSummaryDetails>
                        <ProductImage src={imageSrc} />
                        <OrderSummaryList>
                            <OrderSummaryName>
                                {product.artwork_data.title}
                            </OrderSummaryName>
                            <OrderSummaryItemList product={product} />
                        </OrderSummaryList>
                    </MobileOrderSummaryDetails>
                    <MobileOrderSummaryPrice>
                        {formatPrice(product.price, product.artwork_data.artist_data.currency)}
                    </MobileOrderSummaryPrice>
                </Fragment>
            )}
        </MobileOrderSummaryBody>
    );
};

export default MobileOrderSummary;
