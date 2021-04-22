import { CATEGORIES, METRICS, STATUSES } from 'constants/artworks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { formatPrice } from 'utils/artworks';
import { resetAll } from '../../purchase/purchaseSlice';
import CloseIcon from './CloseIcon';
import CloseIconMobile from './CloseIconMobile';
import {
  ArtistName,
  ButtonBox,
  BuyButton,
  CloseButtonDesktop,
  CloseButtonMobile,
  InfoPanelBody,
  ProductInfoBox,
  ProductInfoItem,
  ProductName,
  ProductPrice,
  ProductStatus,
  QuestionButton,
  SoldOutButton,
} from './styled';

const CloseButton = ({ isDesktop, showDetails, params }) => {
  if (isDesktop) {
    return (
      <CloseButtonDesktop to={`/${params.userName}/shop`}>
        <CloseIcon />
      </CloseButtonDesktop>
    );
  }

  return (
    <CloseButtonMobile onClick={(e) => showDetails((state) => !state)}>
      <CloseIconMobile />
    </CloseButtonMobile>
  );
};

const InfoPanel = ({ product, params, isDesktop, isActive, showDetails }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    id: productId,
    artwork_data: { artist, title, artist_data, category, sub_category, width, height, metric, edition, status },
    price,
  } = product;

  const handleBuy = () => {
    dispatch(resetAll());
    history.push(`/${artist_data.marcel_username}/shop/purchase/${productId}`);
  };

  return (
    <InfoPanelBody isDesktop={isDesktop} isActive={isActive}>
      <ArtistName>{artist}</ArtistName>
      <CloseButton isDesktop={isDesktop} showDetails={showDetails} params={params} />

      <ProductName>{title && `${title}`}</ProductName>
      <ProductPrice>{formatPrice(price, artist_data.currency)}</ProductPrice>

      <ButtonBox>
        {product?.stock_quantity === 0 ? (
          <SoldOutButton disabled>Sold Out</SoldOutButton>
        ) : (
          <BuyButton onClick={handleBuy}>Buy it now</BuyButton>
        )}
        <NavLink to={`/${artist_data.marcel_username}/contact/${product.artwork_data.id}`}>
          <QuestionButton>Ask a question</QuestionButton>
        </NavLink>
      </ButtonBox>

      <ProductInfoBox isDesktop={isDesktop}>
        {category && <ProductInfoItem>{CATEGORIES[category].label}</ProductInfoItem>}
        {sub_category && <ProductInfoItem>{sub_category}</ProductInfoItem>}

        {width && height && metric && (
          <ProductInfoItem>
            {`${Math.floor(width)} X ${Math.floor(height)} ${METRICS[metric].csvValue}`}
          </ProductInfoItem>
        )}
        {edition && <ProductInfoItem>{`Edition: ${edition}`}</ProductInfoItem>}

        {status && <ProductStatus status={status}>{STATUSES[status].label}</ProductStatus>}
      </ProductInfoBox>
    </InfoPanelBody>
  );
};

export default InfoPanel;
