import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { formatPrice } from '../../../utils/artworks';
import { TImage } from '../../artwork/artwork-type';
import { TProduct } from '../shop-types';
import { ProductCardBody, ProductCardImage, ProductName, ProductPrice, ProductPriceWrapper } from './styled';
const ProductCardNew = ({ product, isNew }: { product: TProduct; isNew: boolean }) => {
  const { url } = useRouteMatch();

  const image = product.artwork_data.images?.[0] as TImage;
  const aspect = image ? image.image_original_width / image.image_original_height : 1;

  return (
    <ProductCardBody to={`${url}/product/${product.id}`} isNew={isNew}>
      {image && <ProductCardImage aspect={aspect} image={image.thumbnails.tiny} />}
      <ProductPriceWrapper>
        <ProductName>{product.artwork_data.title}</ProductName>
        <ProductPrice>{formatPrice(product.price, product.artwork_data.artist_data.currency)}</ProductPrice>
      </ProductPriceWrapper>
    </ProductCardBody>
  );
};

export default ProductCardNew;
