import { useLocalizable } from 'features/core/i18n/Localizable';
import * as React from 'react';
import { SkeletonBox } from '../skeleton/skeleton.box';
import './heading.scss';
export const Heading = (props: {
  text?: string;
  type?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  skeleton: boolean;
  children?: any;
}) => {
  const { _ } = useLocalizable();
  const type = props.type || 'h1';
  const commonProps: any = {
    className: `${type} ${props.className || ''}`,
  };
  let result = null;
  const text = _(props.text);
  switch (type) {
    case 'h4':
      result = (
        <h4 {...commonProps}>
          {text}
          {props.children}
        </h4>
      );
      break;
    case 'h3':
      result = (
        <h3 {...commonProps}>
          {text}
          {props.children}
        </h3>
      );
      break;
    case 'h2':
      result = (
        <h2 {...commonProps}>
          {text}
          {props.children}
        </h2>
      );
      break;
    case 'h1':
    default:
      result = (
        <h1 {...commonProps}>
          {text}
          {props.children}
        </h1>
      );
      break;
  }
  return (
    <SkeletonBox loading={props.skeleton} className={commonProps.className} skeletonClassName={type}>
      {result}
    </SkeletonBox>
  );
};
