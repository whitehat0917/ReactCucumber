//import { SkeletonWrapper } from 'features/shop/ProductList/styled';
import { useWindowResize } from 'features/core/hooks/useWindowResize';
import _ from 'lodash';
import * as React from 'react';
import MasonryCss from 'react-masonry-css';
//import { CardWrapper, EmptyPlaceholder, GridWrapper, ProductsHolder, SkeletonWrapper } from './styled';
import { Skeleton } from 'styled';
import styled from 'styled-components';
import './masonry.css';

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const CardWrapper = styled.div`
    padding: 0 12px 12px 0;
    width: 300px;

    @media (max-width: 970px) {
        width: 250px;
    }
    
    @media (max-width: 825px) {
        width: 200px;
    }
    
    @media (max-width: 664px) {
        width: 250px;
    }
    
    @media (max-width: 538px) {
        width: 140px;
    }}
`;
const renderSkeletonList = (itemCount?: number) =>
  _.times(itemCount || 4, (idx) => (
    <CardWrapper key={`prodSkel_${idx}`} data-type="prodCard">
      <Skeleton height="200px" />
    </CardWrapper>
  ));
export function MasonryView<T>(props: {
  isLoading?: boolean;
  renderSkeleton?: boolean;
  elements: T[];
  map: (e: T, width?: number, index?: number) => JSX.Element;
  loadMore: (start: number, stop: number) => any;
  totalItems?: number;
  heightEstimation?: (w: number, elem: T, index?: number) => number;
  scrollElemRef?: React.RefObject<HTMLElement>;
  rowsToPreload?: number;
  columns?: { [e: number]: number };
  defaultColumns?: number;
  key?: (elem: T, idx?: number) => string;
}) {
  const masonryRef = React.useRef(null as HTMLElement);
  const componentRef = React.useRef(null as any);
  const [width, breakpointCols] = useWindowResize(
    (screenWidth, h) => {
      const masonryWidth = masonryRef.current ? masonryRef.current.getBoundingClientRect().width : 0;
      console.log('current masonry', masonryRef.current, masonryWidth);
      const columns = Object.entries(props.columns || {}).reduce(
        (result, [elemWidth, elemValue]) => {
          const [selectedValue, maxWidth] = result;
          if (parseInt(elemWidth) >= screenWidth && parseInt(elemWidth) <= maxWidth) {
            return [elemValue, parseInt(elemWidth)];
          }
          return result;
        },
        [props.defaultColumns || 3, 20000],
      )[0];
      return [masonryWidth, columns];
    },
    [masonryRef.current, masonryRef],
  );
  const getKey = props.key || ((elem: any, idx: number) => `item_${idx}`);

  const loadRefsRef = React.useRef([]);
  const loadRefs = loadRefsRef.current;
  const { scrollElemRef } = props;
  const overScan = 3;
  React.useEffect(() => {
    loadRefsRef.current = [];
    _.times(overScan * breakpointCols, () => loadRefsRef.current.push(React.createRef()));
  }, [overScan, breakpointCols]);

  React.useEffect(() => {
    function checkVisible(elm) {
      if (!elm) {
        return;
      }
      var rect = elm.getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
    const onScroll = _.debounce(
      () => {
        if (typeof props.totalItems === 'number' && (props.elements || []).length >= props.totalItems) {
          return;
        }
        //console.log('current', loadRefs.current, checkVisible(loadRef.current));
        if (loadRefs.some((loadRef) => loadRef.current && checkVisible(loadRef.current))) {
          props.loadMore(
            props.elements.length - 1,
            props.elements.length - 1 + (props.rowsToPreload || 3) * breakpointCols,
          );
        }
      },
      100,
      { maxWait: 500 },
    );
    const scrollElement = scrollElemRef?.current || window || document.body;
    console.log('element', scrollElement);
    if (!scrollElement) {
      return () => {};
    }
    scrollElement.addEventListener('scroll', onScroll);
    return () => {
      scrollElement.removeEventListener('scroll', onScroll);
    };
  }, [scrollElemRef, scrollElemRef?.current, loadRefs, props.loadMore, props.totalItems, props.elements]);

  if (props.isLoading && !props.elements?.length && typeof props.totalItems !== 'number') {
    if (props.renderSkeleton) {
      return <SkeletonWrapper>{renderSkeletonList()}</SkeletonWrapper>;
    } else {
      return null;
    }
  }
  const itemWidth = (width - 30) / breakpointCols;
  const columnHeights = _.times(breakpointCols, () => 0);
  let fakeColumns = 0;
  return (
    <div ref={masonryRef as any}>
      <MasonryCss breakpointCols={breakpointCols} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {props.elements?.reduce((mapped, elem, idx) => {
          const loadRefIdx = idx - (props.elements.length - breakpointCols * overScan - 1);
          let cellIdx = idx + fakeColumns;

          if (columnHeights[cellIdx % breakpointCols] > _.min(columnHeights) + 2) {
            fakeColumns += 1;
            cellIdx = idx + fakeColumns;
            mapped.push(<div></div>);
          }
          if (props.heightEstimation) {
            columnHeights[cellIdx % breakpointCols] += props.heightEstimation(1, elem, 1);
          }

          mapped.push(
            <div key={`${getKey(elem, idx)}`} ref={loadRefIdx >= 0 ? loadRefs[loadRefIdx] : null}>
              {props.map(elem, width / breakpointCols, idx)}
            </div>,
          );
          return mapped;
        }, [] as any[])}
      </MasonryCss>
    </div>
  );
}
