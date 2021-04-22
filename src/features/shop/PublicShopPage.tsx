import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { usePixel } from 'services/pixel';
import PageTemplate from '../../templates/PageTemplate';
import ProductSlider from './ProductSlider';
import PublicShop from './PublicShop';
import { pixelIdSelector, productsSelector } from './selectors';
import { productsFetchRequest } from './shopSlice';

export interface IShopRouterParams {
  userName?: string;
  productId?: string;
}

const PublicShopPage = ({ location }) => {
  const dispatch = useDispatch();
  const params = useParams<IShopRouterParams>();

  const { isLoading, isError, products, prodUpdateId, hasMore, selectedProduct, totalProducts } = useSelector(
    productsSelector(params.productId),
  );

  useEffect(() => {
    if (!products && !isLoading && !isError) {
      dispatch(productsFetchRequest({ append: false }));
    }
  }, [dispatch, isLoading, isError, products]);

  const { pixelId } = useSelector(pixelIdSelector);
  usePixel(pixelId, location.pathname);

  const handleLoadMore = () => {
    if (hasMore && !isLoading && !isError) {
      dispatch(productsFetchRequest({ append: true }));
    }
  };

  return (
    <Fragment>
      <PageTemplate location={location}>
        <Fragment>
          <PublicShop
            products={products}
            prodUpdateId={prodUpdateId}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            total={totalProducts}
          />
        </Fragment>
      </PageTemplate>
      {selectedProduct && <ProductSlider products={products} selectedProduct={selectedProduct} />}
    </Fragment>
  );
};

export default PublicShopPage;
