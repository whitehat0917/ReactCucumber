import React, { ReactNode } from 'react';
import { v4 } from 'uuid';

import { PurchaseNavigationProps } from "./types";

import {
    PurchaseNavMobileBody,
    NavItemMobile
} from "./styled";
import {IPurchasePageDescr} from "../purchase-types";

import ChevronGrIcon from "./ChevronGrIcon";

function renderItems(pages: IPurchasePageDescr[], currPage: string): ReactNode[] {
    let items = [];

    const lastIndex = pages.length - 1;

    pages.forEach((page, index) => {
        const current = page.id === currPage;

        items.push((
            <NavItemMobile key={v4()} current={current}>
                {page.title}
            </NavItemMobile>
        ));

        if (index < lastIndex) {
            items.push(<ChevronGrIcon key={v4()} />);
        }
    });

    return items;
}

const PurchaseNavigationMobile = (props: PurchaseNavigationProps) => {
    const {
        className,
        pages,
        currPage
    } = props;

    return (
        <PurchaseNavMobileBody className={className}>
            {renderItems(pages, currPage)}
        </PurchaseNavMobileBody>
    );
};

export default PurchaseNavigationMobile;
