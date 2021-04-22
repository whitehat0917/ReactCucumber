import React from 'react';
import { Checkmark } from './ShippingOptions';
import { InfoSummaryContainer, ShippingOptionsItemBody, ShippingOptionsItemValue } from './styled';

const BinarySelection = ({ className, isDesktop, value, yesMessage, yesElement, noMessage, onChange }) => {
  const handleChange = (newValue) => () => onChange?.(newValue);

  return (
    <InfoSummaryContainer className={className}>
      <ShippingOptionsItemBody onClick={handleChange(true)}>
        <Checkmark checked={value} />
        <ShippingOptionsItemValue isDesktop={isDesktop}>{yesMessage || yesElement}</ShippingOptionsItemValue>
      </ShippingOptionsItemBody>
      <ShippingOptionsItemBody onClick={handleChange(false)}>
        <Checkmark checked={!value} />
        <ShippingOptionsItemValue isDesktop={isDesktop}>{noMessage}</ShippingOptionsItemValue>
      </ShippingOptionsItemBody>
    </InfoSummaryContainer>
  );
};

export default BinarySelection;
