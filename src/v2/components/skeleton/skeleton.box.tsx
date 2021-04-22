import { times } from 'lodash';
import * as React from 'react';
import './skeleton.scss';
export const SkeletonBox = (props: {
  loading: boolean;
  className?: string;
  skeletonClassName?: string;
  minHeight?: number;
  items?: number;
  children?: any;
  noList?: boolean;
}) => {
  if (props.loading) {
    if (props.items) {
      const items = times(props.items, () => (
        <div className={`skeleton skeleton__list_item ${props.skeletonClassName}__item`}></div>
      ));
      if (props.noList) {
        return <>{items}</>;
      }
      return <div className={`${props.className} ${props.skeletonClassName}__list`}>{items}</div>;
    }
    return (
      <div
        className={`skeleton ${props.className || ''} ${
          props.skeletonClassName ? `${props.skeletonClassName}__skeleton` : ''
        }`}
      >
        {props.children}
      </div>
    );
  }
  return props.children || null;
};
