import React, { Fragment } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { useRouteMatch } from 'react-router-dom';
import { formatPrice } from 'utils/artworks';
import { v4 } from 'uuid';
import { TProduct } from '../shop-types';
import ProductCardImage from './ProductCardImage';
import {
  ProductCardContainer,
  ProductImageWrapper,
  ProductName,
  ProductPrice,
  ProductPriceWrapper,
  SoldOutSign,
  SoldOutText,
} from './styled';

const ProductCard = ({ product }: { product: TProduct }) => {
  const { url } = useRouteMatch();

  const image = product.artwork_data.images.length > 0 ? product.artwork_data.images[0] : null;

  return (
    <ProductCardContainer to={`${url}/product/${product.id}`}>
      {image && (
        <ReactResizeDetector key={v4()} handleWidth>
          {(width) => {
            let imageWidth = width;
            if (!imageWidth) {
              return <Fragment />;
            }

            const aspect = image.image_original_width / image.image_original_height;
            const imageHeight = width ? width / aspect : image.image_original_height / 2;

            return (
              <ProductImageWrapper>
                <ProductCardImage width={imageWidth} height={imageHeight} image={image} />
                {product.stock_quantity === 0 && (
                  <SoldOutSign>
                    <SoldOutText>Sold Out</SoldOutText>
                  </SoldOutSign>
                )}
              </ProductImageWrapper>
            );
          }}
        </ReactResizeDetector>
      )}
      <ProductPriceWrapper>
        <ProductName>{product.artwork_data.title}</ProductName>
        <ProductPrice>{formatPrice(product.price, product.artwork_data.artist_data.currency)}</ProductPrice>
      </ProductPriceWrapper>
    </ProductCardContainer>
  );
};

export default ProductCard;
