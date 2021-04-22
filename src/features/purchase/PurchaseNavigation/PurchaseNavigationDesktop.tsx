import React, { ReactNode } from 'react';
import { v4 } from 'uuid';

import { IPurchasePageDescr } from "../purchase-types";

import {
    PurchaseNavBody,
    PurchaseNavGrid,
    NavItemBody,
    NavItemIcon,
    NavItemText,
    NavFiller
} from "./styled";

import { PurchaseNavigationProps } from "./types";

type NavItemProps = {
    page: IPurchasePageDescr;
    current: boolean;
    visited: boolean;
};

const NavItem = (props: NavItemProps) => {
    return (
        <NavItemBody current={props.current || props.visited}>
            {props.current && <NavItemIcon />}
            <NavItemText current={props.current}>{props.page.title}</NavItemText>
        </NavItemBody>
    );
};

function renderItems(pages: IPurchasePageDescr[], currPage: string): ReactNode[] {
    let items = [];

    const lastIndex = pages.length - 1;

    let visited = true;

    pages.forEach((page, index) => {
        const current = page.id === currPage;
        if (current)
            visited = false;

        items.push(<NavItem key={v4()} page={page} current={current} visited={visited} />);

        if (index < lastIndex) {
            items.push(<NavFiller key={v4()} visited={visited} />);
        }
    });

    return items;
}

const PurchaseNavigationDesktop = (props: PurchaseNavigationProps) => {
    const {
        className,
        pages,
        currPage
    } = props;

    return (
        <PurchaseNavBody className={className}>
            <PurchaseNavGrid>
                {renderItems(pages, currPage)}
            </PurchaseNavGrid>
        </PurchaseNavBody>
    );
};

export default PurchaseNavigationDesktop;
