import React from 'react';

import PurchaseNavigationDesktop from "./PurchaseNavigationDesktop";
import PurchaseNavigationMobile from "./PurchaseNavigationMobile";

import { PurchaseNavigationProps } from "./types";

const PurchaseNavigation = (props: PurchaseNavigationProps) => (
    props.isDesktop ? <PurchaseNavigationDesktop {...props} /> : <PurchaseNavigationMobile {...props} />
);

export default PurchaseNavigation;
