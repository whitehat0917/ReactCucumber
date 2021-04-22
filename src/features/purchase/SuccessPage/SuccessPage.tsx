import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import { useSelector } from "react-redux";

import {IPurchaseRouterParams} from "../PurchasePage";

import {
    SuccessPageBody,
    SuccessPageHeader,
    SuccessPageInfoContainer,
    SuccessPageInfoBody,
    SuccessPageTitle,
    SuccessPageSubtitle,
    SuccessPageOrderId,
    BackButton,
    SuccessPageIcon
} from "./styled";
import Logo from 'components/Logo';

import { orderIdSelector } from "../selectors";

const SuccessPage = () => {
    const params = useParams<IPurchaseRouterParams>();
    const { userName } = params;

    //FIXME: Need to refactor isDesktop from being calculated locally to being set and broadcast to all components in one place via a Context API based solution
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

    const { orderId } = useSelector(orderIdSelector);

    return (
        <SuccessPageBody>
            <SuccessPageHeader>
                <Logo />
            </SuccessPageHeader>
            <SuccessPageInfoContainer>
                <SuccessPageInfoBody>
                    <SuccessPageIcon isDesktop={isDesktop} />
                    <SuccessPageTitle isDesktop={isDesktop}>
                        Thanks for your order!
                    </SuccessPageTitle>
                    <SuccessPageSubtitle isDesktop={isDesktop}>
                        Order has been processed and the artist will be in touch regarding shipment
                    </SuccessPageSubtitle>
                    <SuccessPageOrderId>
                        {`Order ID: ${orderId}`}
                    </SuccessPageOrderId>
                    <Link to={`/${userName}/shop`}>
                        <BackButton>Back to Shop</BackButton>
                    </Link>
                </SuccessPageInfoBody>
            </SuccessPageInfoContainer>
        </SuccessPageBody>
    );
}

export default SuccessPage;
