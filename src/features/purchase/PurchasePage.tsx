import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import history from '../../store/history';
import PageTemplate from '../../templates/PageTemplate';
import { IShopRouterParams } from '../shop/PublicShopPage';
import MobileSummary from './MobileSummary';
import OrderSummary from './OrderSummary';
import { IPurchasePageDescr } from './purchase-types';
import { productFetchRequest, productProcessError } from './purchaseSlice';
import { productSelector } from './selectors';
import ShippingSummary from './ShippingSummary';
import ContactStep from './steps/ContactStep';
import PaymentStep from './steps/PaymentStep';
import ShippingStep from './steps/ShippingStep';
import {
  CurrStepBox,
  InfoBox,
  PurchasePageBody,
  PurchasePageContent,
  PurchasePageInner,
  PurchasePageNavigation,
} from './styled';

const PURCHASE_PAGES: IPurchasePageDescr[] = [
  {
    id: 'contact',
    title: 'Contact & Shipping',
  },
  {
    id: 'shipping',
    title: 'Shipping Method',
  },
  {
    id: 'payment',
    title: 'Payment',
  },
];

const CurrentPage = ({ currPage, isDesktop, userName, productId, setLoading }) => {
  switch (currPage) {
    case PURCHASE_PAGES[1].id:
      return <ShippingStep isDesktop={isDesktop} userName={userName} productId={productId} />;

    case PURCHASE_PAGES[2].id:
      return <PaymentStep isDesktop={isDesktop} userName={userName} setLoading={setLoading} productId={productId} />;

    default:
      return <ContactStep isDesktop={isDesktop} userName={userName} productId={productId} />;
  }
};

export interface IPurchaseRouterParams extends IShopRouterParams {
  page?: string;
}

const PurchasePage = ({ location }) => {
  const dispatch = useDispatch();

  //FIXME: Need to refactor isDesktop from being calculated locally to being set and broadcast to all components in one place via a Context API based solution
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

  const params = useParams<IPurchaseRouterParams>();
  const { userName, productId } = params;
  const currPage = params.page ? params.page : PURCHASE_PAGES[0].id;

  const { isLoading, isError, product } = useSelector(productSelector);
  const [loadingInner, setLoadInner] = React.useState(false);
  useEffect(() => {
    if (!productId) {
      history.push(`/${userName}/shop`);
      return;
    }

    //TODO: Add proper error handling instead of just going back
    if (isError) {
      dispatch(productProcessError(userName));
      return;
    }

    if ((!product || product.id != productId) && !isLoading) dispatch(productFetchRequest({ productId }));
  }, [dispatch, userName, productId, product, isLoading, isError]);

  return (
    <PageTemplate location={location} isLoading={loadingInner || isLoading}>
      <PurchasePageBody isDesktop={isDesktop}>
        <PurchasePageInner>
          {!isDesktop && <MobileSummary product={product} currPage={currPage} />}
          <PurchasePageNavigation isDesktop={isDesktop} pages={PURCHASE_PAGES} currPage={currPage} />
          <PurchasePageContent isDesktop={isDesktop}>
            <CurrStepBox isDesktop={isDesktop}>
              <CurrentPage
                currPage={currPage}
                isDesktop={isDesktop}
                userName={userName}
                productId={productId}
                setLoading={setLoadInner}
              />
            </CurrStepBox>
            {isDesktop && (
              <InfoBox>
                <OrderSummary product={product} />
                <ShippingSummary product={product} currPage={currPage} />
              </InfoBox>
            )}
          </PurchasePageContent>
        </PurchasePageInner>
      </PurchasePageBody>
    </PageTemplate>
  );
};

export default PurchasePage;
