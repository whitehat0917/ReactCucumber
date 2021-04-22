import Typography from 'components/Typography';
import { TypographyProps } from 'components/Typography/Typography';
import * as React from 'react';
import { useLocalizable } from './Localizable';
//import Properties from './message.properties';

export const I18nText = (
  props: {
    msgKey?: string;
    className?: string;
    replacements?: { [id: string]: string };
    justText?: boolean;
    component?: any;
  } & TypographyProps,
) => {
  const { _ } = useLocalizable();
  if (!props.msgKey) {
    return null;
  }
  const message = _(props.msgKey, props.replacements);
  if (props.justText) {
    return <>message</>;
  }
  if (props.component) {
    return <props.component>{message}</props.component>;
  }
  return <Typography {...props}>{message}</Typography>;
};
