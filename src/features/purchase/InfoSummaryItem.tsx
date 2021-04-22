import React from 'react';

import {
    InfoSummaryItemBody,
    InfoSummaryPairBody,
    InfoSummaryItemTitle,
    InfoSummaryItemValue,
    InfoSummaryItemChange
} from "./styled";

const InfoSummaryItem = ({isDesktop, title, value, onChange}) => (
    <InfoSummaryItemBody isDesktop={isDesktop}>
        <InfoSummaryPairBody isDesktop={isDesktop}>
            <InfoSummaryItemTitle isDesktop={isDesktop}>{title}</InfoSummaryItemTitle>
            <InfoSummaryItemValue>{value}</InfoSummaryItemValue>
        </InfoSummaryPairBody>
        <InfoSummaryItemChange isDesktop={isDesktop} onClick={onChange}>Change</InfoSummaryItemChange>
    </InfoSummaryItemBody>
);

export default InfoSummaryItem;
