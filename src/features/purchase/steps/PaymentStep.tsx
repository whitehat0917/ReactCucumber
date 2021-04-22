import { CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { default as appConfig, default as config } from 'config';
import { push } from 'connected-react-router';
import { userSelector } from 'features/user/selectors';
import { STATUS_PUBLIC_INFO } from 'features/user/selectors/artistHomeSelector';
import React, { Fragment, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import monitoringService from 'services/sentry';
import useForm from '../../core/hooks/useForm';
import CardInfo from '../CardInfo';
import CountryRegionSelector from '../CountryRegionSelector';
import CardIcons from '../icons/CardIcons.png';
import PaypalTitle from '../icons/Paypal_title.png';
import InfoSummaryItem from '../InfoSummaryItem';
import { PayPalInput } from '../PayPalInput/PayPalInput';
import { TBillingData, TContactData, TShippingData } from '../purchase-types';
import {
  paymentProcessEnd,
  paymentProcessStart,
  setBillingData,
  setOrderId,
  setSameAsShipping,
} from '../purchaseSlice';
import {
  billingDataSelector,
  contactDataSelector,
  paymentStatusSelector,
  productSelector,
  shippingDataSelector,
} from '../selectors';
import {
  AptInput,
  BackButton,
  BillingAddressHolder,
  CardIconsHolder,
  CardsImg,
  ContactSummaryContainer,
  Disclaimer,
  More,
  PaypalImg,
  RowCountryHolder,
  RowInput,
  RowSelectHolder,
  ShippingAddressSelection,
  ShippingContinueButton,
  StepBody,
  StepButtonsBox,
  StepSection,
  StepSectionRow,
  StepSectionRowAdaptive,
  StepSectionTitle,
  StreetInput,
} from '../styled';
import { buildAddressSummary, buildShippingSummary } from '../utils';
import { CONTACT_DATA_CONSTRAINTS } from './ContactStep';

class ErrorBoundary<T = any> extends React.Component<T, { error: any }> {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(err) {
    console.error('Error in component', err);
    this.setState({ error: err });
  }
  render() {
    if (this.state.error) return <h1>Error</h1>;
    return this.props.children;
  }
}

const PaymentStepInner = ({ isDesktop, userName, productId, isPaypalEnabled, isStripeEnabled, setLoading }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const stripeElements = useElements();
  const [usePaypal, setUsePaypal] = useState(true);

  const { product } = useSelector(productSelector);

  const { contactData } = useSelector(contactDataSelector) as { contactData: TContactData };
  const { shippingData } = useSelector(shippingDataSelector) as { shippingData: TShippingData };
  const { billingData } = useSelector(billingDataSelector) as { billingData: TBillingData };

  const { isInProcess } = useSelector(paymentStatusSelector);
  const showLoader = isInProcess;
  const shipTo = buildAddressSummary(contactData);
  const shipMethod = buildShippingSummary(shippingData, product);
  const [paypalOrderId, setPayPalOrderId] = useState(0);
  const paypalOrderIdRef = React.useRef('');
  const {
    formState: billingFormState,
    errors: billingErrors,
    handleChange: handleBillingChange,
    handleSimpleValue: handleBillingSimpleValue,
    processFormSimple: processBillingForm,
  } = useForm(billingData.data, CONTACT_DATA_CONSTRAINTS);

  const handleSameAsShippingChanged = (newValue) => {
    dispatch(setSameAsShipping(newValue));
  };
  const billingInfoSrc = billingData.sameAsShipping ? contactData : billingData.data;
  const handlePay = async () => {
    dispatch(paymentProcessStart());

    try {
      if (!product || !stripe || !stripeElements) {
        dispatch(paymentProcessEnd());
        return;
      }
      let shippingId = undefined;
      if (product?.shipping_options && product.shipping_options?.length > shippingData.currShippingOption)
        shippingId = product?.shipping_options[shippingData.currShippingOption].id;
      const billingInfoSrc = billingData.sameAsShipping ? contactData : billingData.data;

      const card = stripeElements.getElement(CardNumberElement);
      const intentResult: { client_secret: string } = await fetch(
        `${appConfig.apiUrl}/marketplace/products/${product.id}/payment-intent/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            selected_shipping: shippingId,
            buyer_address_line1: contactData.streetAddr,
            buyer_address_line2: contactData.aptNum,
            buyer_address_city: contactData.city,
            buyer_address_state: billingInfoSrc.region,
            buyer_address_country: billingInfoSrc.country,
            buyer_phone_number: billingInfoSrc.phoneNumber,
            buyer_name: `${billingInfoSrc.firstName} ${billingInfoSrc.lastName}`,
            buyer_email: billingInfoSrc.email,
            buyer_address_postal_code: billingInfoSrc.postalCode,
            billing_name: `${billingInfoSrc.firstName} ${billingInfoSrc.lastName}`,
            billing_email: billingInfoSrc.email,
            billing_phone_number: billingInfoSrc.phoneNumber,
            billing_address_line1: billingInfoSrc.streetAddr,
            billing_address_line2: billingInfoSrc.aptNum,
            billing_address_city: billingInfoSrc.city,
            billing_address_state: billingInfoSrc.region,
            billing_address_country: billingInfoSrc.country,
            billing_address_postal_code: billingInfoSrc.postalCode,
          }),
        },
      ).then((res) => res.json());
      console.log('intent result', intentResult);
      const result = await stripe.confirmCardPayment(intentResult.client_secret, { payment_method: { card: card } });
      console.log('result confirm payment', result);
      if (!billingData.sameAsShipping) {
        const { formState, validationErrors } = processBillingForm();

        if (validationErrors && Object.keys(validationErrors).length > 0) {
          dispatch(paymentProcessEnd());
          return;
        }

        dispatch(setBillingData(formState));
      }

      if (result.paymentIntent?.client_secret) {
        dispatch(setOrderId(result.paymentIntent.id));
        dispatch(
          push(
            `/${userName}/shop/purchase/${productId}/success`,
          ) /*
          makePurchase({
            userName,
            productId,
            token: result.paymentIntent?.client_secret,
          }),*/,
        );
      } else {
        dispatch(paymentProcessEnd());
      }
    } catch (e) {
      monitoringService.logError(e);
      toast.error('Something went wrong. Please, try again later.');
      console.error('error', e);
      dispatch(paymentProcessEnd());
    }
  };

  const createPaypalOrder = async (data: any, actions: any) => {
    let shippingId = undefined;
    setLoading(true);
    if (product?.shipping_options && product.shipping_options?.length > shippingData.currShippingOption)
      shippingId = product?.shipping_options[shippingData.currShippingOption].id;

    const orderId = await fetch(`${appConfig.apiUrl}/marketplace/products/${product.id}/paypal-order/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },

      body: JSON.stringify({
        selected_shipping: shippingId,
        buyer_address_line1: contactData.streetAddr,
        buyer_address_line2: contactData.aptNum,
        buyer_address_city: contactData.city,
        buyer_address_state: billingInfoSrc.region,
        buyer_address_country: billingInfoSrc.country,
        buyer_phone_number: billingInfoSrc.phoneNumber,
        buyer_name: `${billingInfoSrc.firstName} ${billingInfoSrc.lastName}`,
        buyer_email: billingInfoSrc.email,
        buyer_address_postal_code: billingInfoSrc.postalCode,
        billing_name: `${billingInfoSrc.firstName} ${billingInfoSrc.lastName}`,
        billing_email: billingInfoSrc.email,
        billing_phone_number: billingInfoSrc.phoneNumber,
        billing_address_line1: billingInfoSrc.streetAddr,
        billing_address_line2: billingInfoSrc.aptNum,
        billing_address_city: billingInfoSrc.city,
        billing_address_state: billingInfoSrc.region,
        billing_address_country: billingInfoSrc.country,
        billing_address_postal_code: billingInfoSrc.postalCode,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.provider_pi_id)
      .catch(() => setLoading(false));
    setPayPalOrderId(orderId);
    paypalOrderIdRef.current = orderId;

    return orderId;
  };
  const approveOrder = async (data: any, actions: any) => {
    setLoading(true);
    const result = await fetch(`${appConfig.apiUrl}/marketplace/paypal/${paypalOrderIdRef.current}/capture/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setOrderId(res.order_id));
      })
      .then(() => dispatch(push(`/${userName}/shop/purchase/${productId}/success`)))
      .catch(() => setLoading(false));
  };
  const handleContactBack = () => {
    dispatch(setBillingData(billingFormState));
    history.push(`/${userName}/shop/purchase/${productId}/contact`);
  };

  const handleShippingBack = () => {
    dispatch(setBillingData(billingFormState));
    history.push(`/${userName}/shop/purchase/${productId}/shipping`);
  };

  const paypalId = 'sb';
  const paymentMethodsEnabled = isStripeEnabled && isPaypalEnabled;
  return (
    <Fragment>
      <ContactSummaryContainer>
        <InfoSummaryItem isDesktop={isDesktop} title="Contact" value={contactData.email} onChange={handleContactBack} />
        <InfoSummaryItem isDesktop={isDesktop} title="Ship to" value={shipTo} onChange={handleContactBack} />
        <InfoSummaryItem isDesktop={isDesktop} title="Method" value={shipMethod} onChange={handleShippingBack} />
      </ContactSummaryContainer>
      {paymentMethodsEnabled && (
        <StepSection>
          <StepSectionTitle>Payment Methods</StepSectionTitle>

          <ShippingAddressSelection
            isDesktop={isDesktop}
            value={usePaypal}
            yesElement={<PaypalImg src={PaypalTitle} isDesktop={isDesktop} />}
            noMessage="Credit Card"
            onChange={setUsePaypal}
            className=""
          />
        </StepSection>
      )}
      {isStripeEnabled && (
        <StepSection style={{ display: !paymentMethodsEnabled || !usePaypal ? 'block' : 'none' }}>
          <StepSectionTitle>Credit Card Payment</StepSectionTitle>
          <CardIconsHolder>
            <CardsImg src={CardIcons} isDesktop={isDesktop} />
            {isDesktop && <More>and more</More>}
          </CardIconsHolder>
          <CardInfo />
        </StepSection>
      )}
      {isPaypalEnabled && (
        <StepSection style={{ display: !paymentMethodsEnabled || usePaypal ? 'block' : 'none' }}>
          <StepSectionTitle>Paypal Payment</StepSectionTitle>
          <PayPalInput
            clientId={paypalId}
            product={product}
            artwork={(product as any)?.artwork_data}
            createPaypalOrder={createPaypalOrder}
            approvePaypalOrder={approveOrder}
          />
        </StepSection>
      )}
      <StepSection>
        <StepSectionTitle>Billing Address</StepSectionTitle>
        <ShippingAddressSelection
          isDesktop={isDesktop}
          value={billingData.sameAsShipping}
          yesMessage="Same as shipping address"
          noMessage="Use different billing address"
          onChange={handleSameAsShippingChanged}
        />
        {!billingData.sameAsShipping && (
          // TODO: This is the same as contact step form. Will be good to extract it into separate reusable control
          <BillingAddressHolder>
            <StepSection>
              <StepSectionTitle>Contact Details</StepSectionTitle>
              <StepSectionRowAdaptive isDesktop={isDesktop}>
                <RowInput
                  name="email"
                  value={billingFormState.email}
                  onChange={handleBillingChange}
                  onBlur={handleBillingChange}
                  placeholder="Email"
                  type="text"
                  validation={billingErrors}
                />
                <RowInput
                  name="phoneNumber"
                  value={billingFormState.phoneNumber}
                  onChange={handleBillingChange}
                  onBlur={handleBillingChange}
                  placeholder="Phone Number"
                  type="text"
                  validation={billingErrors}
                />
              </StepSectionRowAdaptive>
            </StepSection>
            <StepSection>
              <StepSectionTitle>Billing Address</StepSectionTitle>
              <StepSectionRow>
                <RowInput
                  name="firstName"
                  value={billingFormState.firstName}
                  onChange={handleBillingChange}
                  onBlur={handleBillingChange}
                  placeholder="First name"
                  type="text"
                  validation={billingErrors}
                />
                <RowInput
                  name="lastName"
                  value={billingFormState.lastName}
                  onChange={handleBillingChange}
                  onBlur={handleBillingChange}
                  placeholder="Last name"
                  type="text"
                  validation={billingErrors}
                />
              </StepSectionRow>
              <StepSectionRowAdaptive isDesktop={isDesktop}>
                <StreetInput
                  name="streetAddr"
                  value={billingFormState.streetAddr}
                  onChange={handleBillingChange}
                  onBlur={handleBillingChange}
                  placeholder="Street address"
                  type="text"
                  validation={billingErrors}
                />
                <AptInput
                  name="aptNum"
                  value={billingFormState.aptNum}
                  onChange={handleBillingChange}
                  onBlur={handleBillingChange}
                  placeholder="Apt, suite, etc."
                  type="text"
                  validation={billingErrors}
                />
              </StepSectionRowAdaptive>
              <RowInput
                name="city"
                value={billingFormState.city}
                onChange={handleBillingChange}
                onBlur={handleBillingChange}
                placeholder="City"
                type="text"
                validation={billingErrors}
              />
              <StepSectionRowAdaptive isDesktop={isDesktop}>
                <RowCountryHolder isDesktop={isDesktop}>
                  <CountryRegionSelector
                    isDesktop={isDesktop}
                    country={billingFormState.country}
                    region={billingFormState.region}
                    onCountryChange={handleBillingSimpleValue('country')}
                    onRegionChange={handleBillingSimpleValue('region')}
                  />
                </RowCountryHolder>
                <RowSelectHolder>
                  <RowInput
                    name="postalCode"
                    value={billingFormState.postalCode}
                    onChange={handleBillingChange}
                    onBlur={handleBillingChange}
                    placeholder="Postal code"
                    type="text"
                    validation={billingErrors}
                  />
                </RowSelectHolder>
              </StepSectionRowAdaptive>
            </StepSection>
          </BillingAddressHolder>
        )}
      </StepSection>
      <StepButtonsBox isDesktop={isDesktop}>
        <BackButton isDesktop={isDesktop} onClick={handleShippingBack}>
          Return to Shipping
        </BackButton>
        <ShippingContinueButton isDesktop={isDesktop} onClick={handlePay} disabled={showLoader}>
          {showLoader ? <PulseLoader color="white" size={8} /> : 'Pay'}
        </ShippingContinueButton>
      </StepButtonsBox>
      <Disclaimer>
        Please note: This purchase & transaction are made between the artist and the buyer directly. Any dispute, if
        occurs, will need to be resolved between you and the seller. Marcel assumes no responsibility in case of fraud
        or disputes. The price includes VAT/Tax.
      </Disclaimer>
    </Fragment>
  );
};

const PaymentStep = (props: any) => {
  const { status, publicInfo } = useSelector(userSelector(STATUS_PUBLIC_INFO));

  const stripePromise = useMemo(() => {
    return loadStripe(config.stripeKey, { stripeAccount: publicInfo.seller_stripe_account_uid });
  }, [publicInfo]);

  return (
    <StepBody>
      <Elements stripe={stripePromise} key={`${publicInfo?.seller_stripe_account_uid || ''}_${publicInfo?.id}`}>
        <PaymentStepInner
          {...props}
          isPaypalEnabled={publicInfo.is_paypal_connected}
          isStripeEnabled={publicInfo.is_stripe_verified}
        />
      </Elements>
    </StepBody>
  );
};

export default PaymentStep;
