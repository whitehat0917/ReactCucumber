import React, { useMemo } from 'react';
import { Skeleton, skeletonList } from 'styled';
import { v4 } from 'uuid';
import { MasonryView } from '../../../components/Masonry/Masonry';
import { TProduct } from '../shop-types';
import ProductCard from './ProductCard';
import ProductCardNew from './ProductCardNew';
import { CardWrapper, EmptyPlaceholder, GridWrapper, ProductsHolder } from './styled';

const SkeletonList = () =>
  skeletonList.map(() => (
    <CardWrapper key={v4()} data-type="artworkCard">
      <Skeleton key={v4()} height="200px" />
    </CardWrapper>
  ));

const CardList = ({ products }) => {
  const hasProducts = !!products?.length;

  if (!hasProducts) {
    return <EmptyPlaceholder>No published Artworks for sale today</EmptyPlaceholder>;
  }

  return products.map((item) => (
    <CardWrapper key={v4()} data-type="artworkCard">
      <ProductCard product={item} />
    </CardWrapper>
  ));
};

const renderCardList = (products, prodUpdateId, isLoading, total) => {
  const hasProducts = !!products?.length;

  if (!hasProducts) {
    return <EmptyPlaceholder key={v4()}>No published Artworks for sale today</EmptyPlaceholder>;
  }

  let loadedProducts = products.map((item) => (
    <ProductCardNew key={`prodCard_${item.id}`} product={item} isNew={item.update_id === prodUpdateId} />
  ));

  if (!isLoading) return loadedProducts;

  let delta = total - loadedProducts.length;
  delta = Math.min(delta, loadedProducts.length);

  // Generate skeletons as placeholders for new items
  let skeletons = Array(delta)
    .fill(null)
    .map((item, idx) => (
      <CardWrapper key={`prodNewSkel_${idx}`} data-type="productCard">
        <Skeleton height="200px" />
      </CardWrapper>
    ));

  return [...loadedProducts, ...skeletons];
};

const MASONRY_SIZES = [
  { columns: 2, gutter: 5 },
  { mq: '665px', columns: 3, gutter: 15 },
  { mq: '1300px', columns: 4, gutter: 15 },
];

const ProductList = ({ className, products, prodUpdateId, isLoading, hasMore, onLoadMore, total }) => {
  const loadMore = useMemo(() => () => !isLoading && hasMore && onLoadMore(), [onLoadMore, hasMore, isLoading]);
  return (
    <ProductsHolder className={className}>
      <GridWrapper>
        <MasonryView
          columns={{
            538: 2,
            664: 3,
            825: 3,
            1300: 3,
          }}
          defaultColumns={4}
          //hasMore={hasMore}
          isLoading={isLoading && !products?.length}
          renderSkeleton={true}
          loadMore={loadMore}
          elements={products as TProduct[]}
          totalItems={total || undefined}
          map={(item) => (
            <ProductCardNew key={`prodCard_${item.id}`} product={item} isNew={item.update_id === prodUpdateId} />
          )}
        />
      </GridWrapper>
    </ProductsHolder>
  );
};

export default ProductList;
