import React, { useState } from 'react';
import {useSelector} from "react-redux";

import { formatPrice } from "utils/artworks";

import {shippingDataSelector} from "../selectors";

import {
    MobileSummaryBody,
    MobileSummaryHeader,
    MobileSummaryHeaderText,
    MobileSummaryChevron,
    MobileSummaryHeaderPrice,
    MobileSummaryDetailsBox,
    MobileSummaryDetails
} from "../styled";
import CartIcon from "./CartIcon";
import ChevronIcon from "./ChevronIcon";
import MobileOrderSummary from "./MobileOrderSummary";
import MobileShippingSummary from "./MobileShippingSummary";

import { calculateShippingAndTotal } from "../utils";

const MobileSummary = ({ product, currPage }) => {
    const [ isOpen, setOpen ] = useState(false);

    const { shippingData } = useSelector(shippingDataSelector);

    const handleHeaderClick = () => {
        setOpen(!isOpen);
    };

    const { shippingPrice, total } = calculateShippingAndTotal(product, shippingData);

    const showActualInfo = (currPage !== 'contact');

    return (
        <MobileSummaryBody>
            <MobileSummaryHeader onClick={handleHeaderClick}>
                <CartIcon />
                <MobileSummaryHeaderText>Show order summary</MobileSummaryHeaderText>
                <MobileSummaryChevron isOpen={isOpen}>
                    <ChevronIcon />
                </MobileSummaryChevron>
                {product && (
                    <MobileSummaryHeaderPrice>
                        {formatPrice(showActualInfo ? total : product.price, product.artwork_data.artist_data.currency)}
                    </MobileSummaryHeaderPrice>
                )}
            </MobileSummaryHeader>
            <MobileSummaryDetailsBox isOpen={isOpen}>
                <MobileSummaryDetails>
                    <MobileOrderSummary product={product} />
                    <MobileShippingSummary
                        product={product}
                        showActualInfo={showActualInfo}
                        shippingPrice={shippingPrice}
                    />
                </MobileSummaryDetails>
            </MobileSummaryDetailsBox>
        </MobileSummaryBody>
    );
};

export default MobileSummary;
