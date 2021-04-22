import { TProduct } from 'features/shop/shop-types';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { getcurrencyCode } from 'utils/artworks';
import config from '../../../config';
import { loadScript } from '../../../utils/load.script';
import { TArtwork } from '../../artwork/artwork-type';
import { useAsyncElement } from '../../core/hooks/useAsyncElement';
export const PayPalButton = (props: any) => {
  return null;
  const PayPalBtn = React.useMemo(() => (window as any).paypal.Buttons.driver('react', { React, ReactDOM }), []);

  return <PayPalBtn />;
};
const ACCEPTED_CURRENCIES = [
  'AUD',
  'BRL',
  'CAD',
  'CZK',
  'DKK',
  'EUR',
  'HKD',
  'HUF',
  'INR',
  'ILS',
  'JPY',
  'MYR',
  'MXN',
  'TWD',
  'NZD',
  'NOK',
  'PHP',
  'PLN',
  'GBP',
  'RUB',
  'SGD',
  'SEK',
  'CHF',
  'THB',
  'USD',
];
export const PayPalInput = (props: {
  clientId: string;
  product: TProduct;
  artwork?: TArtwork;
  createPaypalOrder: (data: any, actions: any) => any;
  approvePaypalOrder: (data: any, actions: any) => any;
}) => {
  const { product, artwork } = props;
  const paypalButtonsRef = React.useRef(null as HTMLDivElement);
  let currency = props.artwork ? getcurrencyCode((props.artwork as any).artist_data.currency) : '';
  console.log('currency', currency, props.product, props.artwork, (props.artwork as any)?.artist_data?.currency);

  const isAccepted = ACCEPTED_CURRENCIES.indexOf(currency) >= 0;
  if (!isAccepted) {
    currency = 'EUR';
    //  return null;
  }
  const { loading, data: PayPalBtn, showLoader } = useAsyncElement(
    () =>
      currency
        ? loadScript(`https://www.paypal.com/sdk/js?client-id=${config.paypalClientId}&currency=${currency}`).then(
            () => (window as any).paypal.Buttons.driver('react', { React, ReactDOM }) as any,
          )
        : null,
    500,
    [props.clientId],
  );
  const createOrder = props.createPaypalOrder;

  const onApprove = props.approvePaypalOrder;
  React.useEffect(() => {
    console.log('data', PayPalBtn);
  }, [PayPalBtn]);
  if (showLoader || !PayPalBtn) {
    return <div></div>;
  }
  if (PayPalBtn) {
    return <PayPalBtn createOrder={createOrder} onApprove={onApprove} amount={props.product?.price} />;
  }
  return <div>Paypal up</div>;
};
