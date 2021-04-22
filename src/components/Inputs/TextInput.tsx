import { TErrors } from 'app/global-types';
import React from 'react';
import { useWindowResize } from '../../features/core/hooks/useWindowResize';
import { CommonErrorMsg, ErrorMsg, Input, InputHolder, Placeholder, TextArea } from './styled';
export interface TextInputProps {
  value?: string;
  name: string;
  errors?: TErrors;
  validation?: any;
  placeholder?: string;
  type: string;
  allErrors?: boolean;
  textStyle?: 'normal' | 'small';
  onChange: (e) => void;
  onFocus?: (e) => void;
  onBlur?: (e) => void;
  area?: boolean;
}

const RenderErrors = ({ errors, name }) => {
  if (errors && errors.type === 'field') {
    const [error] = errors.errors.filter((error) => {
      return error.field === name;
    });

    if (error) {
      return <ErrorMsg>{error.errors[name]}</ErrorMsg>;
    }
  }
  if (errors && errors[name]?.message) {
    return <ErrorMsg>{errors[name]?.message}</ErrorMsg>;
  }

  return null;
};

export const RenderCommonErrors = ({ errors }) => {
  if (errors && errors.type === 'common') {
    const [error] = errors.errors.map((error) => error);

    if (error) {
      return <CommonErrorMsg>{error.errors}</CommonErrorMsg>;
    }
  }

  return null;
};

const RenderInputErrors = ({ errors }) => {
  if (errors) {
    const [error] = errors;

    return <ErrorMsg>{error}</ErrorMsg>;
  }

  return null;
};

const TextInput: React.FC<TextInputProps> = ({
  value = '',
  errors,
  validation,
  placeholder,
  name,
  allErrors,
  textStyle,
  area,

  ...rest
}) => {
  // console.log('validation -> ', validation);
  //alert(ref);
  const [lastHeight, setLastHeight] = React.useState(0);
  const areaRef = React.useRef(null as HTMLTextAreaElement);
  const holderRef = React.useRef(null as HTMLDivElement);
  const placeHolderRef = React.useRef(null as HTMLDivElement);
  if (area) {
    const updateHeight = () => {
      if (areaRef.current) {
        areaRef.current.style.height = 'auto';
        let height = areaRef.current?.scrollHeight;
        const placeHolderHeight = placeHolderRef.current.getBoundingClientRect().height;
        areaRef.current.style.height = height + 'px';
        holderRef.current.style.height = placeHolderHeight + height + 'px';
        holderRef.current.style.paddingTop = placeHolderHeight + 'px';
        setLastHeight(height - 5);
        //setHeight(areaRef.current?.scrollHeight);
      }
    };
    const w = useWindowResize((w, h) => w);
    React.useLayoutEffect(updateHeight, [value, areaRef.current, w]);
  }
  const error = (validation && !!validation[name]) || errors[name]?.message;

  const input = (
    <InputHolder textStyle={textStyle} ref={holderRef}>
      {area ? (
        <TextArea value={value} error={error} name={name} textStyle={textStyle} ref={areaRef} {...rest}>
          {value}
        </TextArea>
      ) : (
        <Input
          value={value}
          error={error}
          name={name}
          textStyle={textStyle}
          {...rest}
          //ref={ref}
        />
      )}
      <Placeholder ref={placeHolderRef} value={!!value} translateY={lastHeight} textStyle={textStyle} error={error}>
        {placeholder}
      </Placeholder>
      <RenderErrors errors={errors} name={name} />
      <RenderInputErrors errors={validation && validation[name]} />
      {/* { error && <ErrorMsg>{errorMsg}</ErrorMsg> }
            { errors && <ErrorMsg>{errors[name]}</ErrorMsg> }
            { allErrors && <ErrorMsg>{errors.non_field_errors}</ErrorMsg> } */}
    </InputHolder>
  );

  return input;
};
// Error message format
// {
//     type: '',
//     fieldName: '',
//     message: '',
// };

export default TextInput;
