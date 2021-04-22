import React from 'react';
import { Wrapper } from '../collections/styled';
import ProductList from './ProductList';
import { Title, TitleWrapper } from './styled';

const PublicShop = ({ products, prodUpdateId, isLoading, hasMore, onLoadMore, total }) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Shop</Title>
      </TitleWrapper>
      <ProductList
        products={products}
        prodUpdateId={prodUpdateId}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
        total={total}
      />
    </Wrapper>
  );
};

export default PublicShop;
