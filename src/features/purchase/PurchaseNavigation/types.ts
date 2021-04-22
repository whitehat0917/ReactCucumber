import {IPurchasePageDescr} from "../purchase-types";

export type PurchaseNavigationProps = {
    className?: string;
    isDesktop: boolean;
    pages: IPurchasePageDescr[];
    currPage: string;
}
