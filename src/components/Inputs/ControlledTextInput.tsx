import * as React from 'react';
import { Controller } from 'react-hook-form';
import TextInput from './TextInput';
export const ControlledTextInput = (props: {
  name: string;
  errors?: any;
  validation?: any;
  placeholder?: string;
  type: string;
  allErrors?: boolean;
  textStyle?: 'normal' | 'small';
  onFocus?: (e) => void;
  onBlur?: (e) => void;
  control: any;
}) => {
  //alert(props.control);
  return <Controller name={props.name} control={props.control} render={(p) => <TextInput {...props} {...p} />} />;
};
