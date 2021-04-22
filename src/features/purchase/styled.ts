import SmallInputs from 'components/SmallInputs';
import styled from 'styled-components';
import { TTheme } from 'theme';
import BinarySelection from './BinarySelection';
import CheckIcon from './icons/CheckIcon';
import PurchaseNavigation from './PurchaseNavigation';

export type AdaptiveProps = {
  isDesktop: boolean;
};

export type ThemedProps = {
  theme: TTheme;
};

export type ThemedAdaptiveProps = {
  theme: TTheme;
  isDesktop: boolean;
};

export const PurchasePageBody = styled.div<AdaptiveProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ isDesktop }) => (isDesktop ? '' : 'margin: 0 -20px;')}
`;

export const PurchasePageInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 1240px;
`;

export const PurchasePageNavigation = styled(PurchaseNavigation)<AdaptiveProps>`
  width: ${({ isDesktop }) => (isDesktop ? '60%' : '100%')};
  ${({ isDesktop }) => (isDesktop ? 'margin-bottom: 32px;' : '')}
`;

export const PurchasePageContent = styled.div<AdaptiveProps>`
  width: ${({ isDesktop }) => (isDesktop ? '80%' : '100%')};
  ${({ isDesktop }) => (isDesktop ? '' : 'padding: 0 20px;')};

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  margin-bottom: ${({ isDesktop }) => (isDesktop ? '200px' : '100px')};
`;

export const CurrStepBox = styled.div<AdaptiveProps>`
  flex: 1;

  ${({ isDesktop }) =>
    isDesktop
      ? `
        background: #FFFFFF;
        border: 1px solid #E3E4E5;
        border-radius: 3px;
        
        margin-right: 19px;
        padding: 36px 40px 56px 40px;
    `
      : ``}
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 295px;
`;

export const InfoItemBody = styled.div`
  background: #ffffff;
  border: 1px solid #e3e4e5;
  border-radius: 3px;

  padding: 24px;
`;

export const OrderSummaryBody = styled(InfoItemBody)`
  display: flex;
  flex-direction: row;

  margin-bottom: 16px;
`;

type ProductImageProps = {
  src?: string;
};

export const ProductImage = styled.div<ProductImageProps>`
  width: 60px;
  height: 60px;
  border-radius: 4px;

  background: ${({ src }) => (src ? `gray url("${src}") no-repeat center` : `gray`)};
  background-size: cover;

  margin-right: 17px;
`;

export const OrderSummaryList = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const OrderSummaryName = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  color: #222222;

  margin-bottom: 8px;
`;

export const OrderSummaryItem = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;

  color: #919191;

  margin-bottom: 8px;
`;

export const OrderSummaryPrice = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #222222;
`;

export const ShippingSummaryBody = styled(InfoItemBody)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

export const ShippingSummaryItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ShippingItemHeader = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;

  color: #222222;
`;

export const ShippingItemPlaceholder = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;

  color: #5c5c5c;
`;

export const ShippingItemPrice = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;

  /* identical to box height, or 154% */
  text-align: right;

  /* Light / Grey 100 */
  color: #121212;
`;

export const ShippingTotalBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px 0;
  margin-top: 20px;

  border-top: 1px solid #d5d5d5;
`;

export const ShippingTotalCurrency = styled.div<ThemedProps>`
  flex: 1;
  margin-right: 9px;

  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;

  text-align: right;

  color: #919191;
`;

export const ShippingTotalPrice = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  color: #222222;
`;

export const StepBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const StepSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  margin-bottom: 60px;
`;

export const StepSectionTitle = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 32px;

  color: #121212;
`;

export const StepSectionRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

export const StepSectionRowAdaptive = styled.div<AdaptiveProps>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: stretch;
`;

export const RowInput = styled(SmallInputs.TextInput)`
  &:first-child {
    margin-right: 20px;
  }
`;

export const RowCheck = styled(SmallInputs.CheckInput)`
  margin-top: 28px;
`;

export const RowSelectHolder = styled.div`
  margin-top: 28px;

  &:not(last-child) {
    margin-right: 20px;
  }

  flex: 1;
`;

export const RowCountryHolder = styled(RowSelectHolder)<AdaptiveProps>`
  flex: 3;
  ${({ isDesktop }) => (isDesktop ? 'padding-top: 30px;' : 'margin-top: 0;')}
`;

export const StreetInput = styled(RowInput)`
  flex: 3;
`;

export const AptInput = styled(RowInput)`
  flex: 1;
`;

export const ContinueButton = styled.button<ThemedAdaptiveProps>`
  ${({ isDesktop }) => (isDesktop ? 'align-self: flex-end' : '')};

  width: ${({ isDesktop }) => (isDesktop ? '255px' : '100%')};
  height: 56px;

  color: #ffffff;
  background: #ff5b00;
  border: none;
  border-radius: 12px;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;

  text-align: center;

  cursor: pointer;
`;

export const MobileSummaryBody = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const MobileSummaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 8px;

  background: #f8f8f8;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
`;

export const MobileSummaryHeaderText = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;

  color: #ff5b00;
`;

export const MobileSummaryHeaderPrice = styled.div<ThemedProps>`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;

  text-align: right;

  color: #121212;
`;

type OpenedProps = {
  isOpen: boolean;
};

export const MobileSummaryChevron = styled.div<OpenedProps>`
  ${({ isOpen }) => (isOpen ? 'transform: rotate(180deg);' : '')}
  transition: transform 1s;
`;

export const MobileSummaryDetailsBox = styled.div<OpenedProps>`
  ${({ isOpen }) => (isOpen ? '' : 'height: 0;')}
  overflow: hidden;
`;

export const MobileSummaryDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  padding: 8px;

  background: #f8f8f8;
  border-bottom: 1px solid #eaeaea;
`;

export const MobileOrderSummaryBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;
  border-bottom: 1px solid #d5d5d5;
`;

export const MobileOrderSummaryDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const MobileOrderSummaryPrice = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;

  text-align: right;

  color: #222222;
`;

export const MobileShippingSummaryBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px 0;
`;

export const MobileShippingSummaryTitle = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;

  color: #222222;
`;

export const MobileShippingSummaryPlaceholder = styled(MobileShippingSummaryTitle)`
  color: #5c5c5c;
`;

export const InfoSummaryContainer = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 4px;
`;

export const ContactSummaryContainer = styled(InfoSummaryContainer)`
  margin-bottom: 36px;
`;

export const InfoSummaryItemBody = styled.div<AdaptiveProps>`
  padding: ${({ isDesktop }) => (isDesktop ? '20px' : '12px 16px')};

  &:not(:first-child) {
    border-top: 1px solid #d5d5d5;
  }

  display: flex;
  flex-direction: row;
  align-items: ${({ isDesktop }) => (isDesktop ? 'center' : 'flex-start')};
`;

export const InfoSummaryPairBody = styled.div<AdaptiveProps>`
  flex: 1;

  margin-right: 20px;

  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  align-items: ${({ isDesktop }) => (isDesktop ? 'center' : 'flex-start')};
`;

export const InfoSummaryItemTitle = styled.div<ThemedAdaptiveProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: ${({ isDesktop }) => (isDesktop ? '16px' : '13px')};
  line-height: ${({ isDesktop }) => (isDesktop ? '24px' : '20px')};

  color: #5c5c5c;

  margin-right: 48px;
`;

export const InfoSummaryItemValue = styled.div<ThemedProps>`
  flex: 1;

  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;

  color: #121212;
`;

export const InfoSummaryItemChange = styled.div<ThemedAdaptiveProps>`
  font-family: ${({ theme, isDesktop }) => (isDesktop ? theme.fonts.light : theme.fonts.medium)};
  font-style: normal;
  font-weight: ${({ isDesktop }) => (isDesktop ? '300' : '500')};
  font-size: ${({ isDesktop }) => (isDesktop ? '16px' : '13px')};
  line-height: ${({ isDesktop }) => (isDesktop ? '24px' : '20px')};

  color: #ff5b00;

  cursor: pointer;
`;

export const ShippingOptionsItemBody = styled(InfoSummaryItemBody)`
  cursor: pointer;
`;

export const ShippingOptionsItemValue = styled.div<ThemedAdaptiveProps>`
  flex: 1;

  font-family: ${({ theme, isDesktop }) => (isDesktop ? theme.fonts.light : theme.fonts.medium)};
  font-style: normal;
  font-weight: ${({ isDesktop }) => (isDesktop ? '300' : '500')};
  font-size: 16px;
  line-height: 24px;

  color: #121212;
`;

type CheckmarkBodyProps = {
  checked: boolean;
};

export const CheckmarkBody = styled.div<CheckmarkBodyProps>`
  width: 28px;
  height: 28px;
  border-radius: 50%;

  ${({ checked }) => (checked ? 'background: #FF5B00;' : 'border: 1px solid #D5D5D5;')}

  position: relative;
  margin-right: 32px;
`;

export const CheckmarkIcon = styled(CheckIcon)`
  position: absolute;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const InfoSummaryItemPrice = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;

  color: #121212;
`;

export const StepButtonsBox = styled.div<AdaptiveProps>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')};
  justify-content: space-between;
  align-items: center;

  margin-top: 44px;
`;

export const BackButton = styled.div<ThemedAdaptiveProps>`
  ${({ isDesktop }) =>
    isDesktop
      ? ''
      : `
        order: 1;
        margin-top: 28px;
    `}

  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;

  color: #ff5b00;

  cursor: pointer;
`;

type ShippingContinueButtonProps = {
  isDesktop: boolean;
  disabled?: boolean;
};

export const ShippingContinueButton = styled(ContinueButton)<ShippingContinueButtonProps>`
  ${({ isDesktop }) =>
    isDesktop
      ? `
        margin-left: 20px;
        max-width: 255px;  
    `
      : ``}

  ${({ disabled }) =>
    disabled
      ? `
        opacity: 0.5;
        cursor: initial;
    `
      : ''}
`;

export const CountrySelectorBody = styled.div<AdaptiveProps>`
  display: flex;
  flex-direction: ${({ isDesktop }) => (isDesktop ? 'row' : `column`)};
  align-items: ${({ isDesktop }) => (isDesktop ? 'flex-end' : `stretch`)};

  ${({ isDesktop }) =>
    isDesktop
      ? ''
      : `
        & > div {
            height: 71px;
            
            margin-top: 30px;
            margin-right: 0 !important;
        }
    `}
`;

export const CountrySelectorItem = styled.div`
  &:first-child {
    margin-right: 20px;
  }
`;

export const CardIconsHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const More = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;

  color: #919191;
`;

export const ShippingAddressSelection = styled(BinarySelection)`
  margin-top: 20px;
`;

export const BillingAddressHolder = styled.div`
  margin-top: 60px;
`;

export const CardsImg = styled.img<AdaptiveProps>`
  ${({ isDesktop }) => (isDesktop ? '' : 'width: 100%')};
`;

export const PaypalImg = styled.img<AdaptiveProps>`
  height: 1.5rem;
`;
export const Disclaimer = styled.div<ThemedProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-style: normal;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;

  color: #919191;

  margin-top: 60px;
`;
