import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import {
    productSelector,
    contactDataSelector,
    shippingDataSelector
} from "../selectors";

import {
    StepBody,
    ContactSummaryContainer,
    StepButtonsBox,
    BackButton,
    ShippingContinueButton
} from '../styled';
import InfoSummaryItem from "../InfoSummaryItem";
import ShippingOptions from "../ShippingOptions";

import { setShippingOption } from '../purchaseSlice';

import { buildAddressSummary } from "../utils";

const ShippingStep = ({ isDesktop, userName, productId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        isLoading,
        isError,
        product
    } = useSelector(productSelector);

    const { contactData } = useSelector(contactDataSelector);
    const { shippingData } = useSelector(shippingDataSelector);

    const contactString = `${contactData.email}, ${contactData.phoneNumber}`;
    const addressString = buildAddressSummary(contactData);

    const handleShippingOptionChange = index => {
        dispatch(setShippingOption(index));
    };

    const handleBack = () => {
        history.push(`/${userName}/shop/purchase/${productId}/contact`);
    };

    const handleContinue = () => {
        history.push(`/${userName}/shop/purchase/${productId}/payment`);
    };

    return (
      <StepBody>
        <ContactSummaryContainer>
          <InfoSummaryItem isDesktop={isDesktop} title="Contact" value={contactString} onChange={handleBack} />
          <InfoSummaryItem isDesktop={isDesktop} title="Ship to" value={addressString} onChange={handleBack} />
        </ContactSummaryContainer>

        {(product?.shipping_options?.length > 0) && (
            <ShippingOptions
                product={product}
                current={shippingData.currShippingOption}
                onChange={handleShippingOptionChange}
            />
        )}

        <StepButtonsBox isDesktop={isDesktop}>
            <BackButton  isDesktop={isDesktop} onClick={handleBack}>Back</BackButton>
            <ShippingContinueButton
                isDesktop={isDesktop}
                onClick={handleContinue}
            >
                Continue to payment
            </ShippingContinueButton>
        </StepButtonsBox>
      </StepBody>
    );
};

export default ShippingStep;
