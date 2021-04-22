import React from 'react';

import {
    Input,
    InputHolder,
    Placeholder,
    ErrorMsg
} from './styled';
import { TErrors } from 'app/global-types';

interface TextInputProps {
    className?: string
    value?: string
    name: string,
    errors?: TErrors,
    validation?: any,
    placeholder?: string
    type: string
    allErrors?: boolean
    onChange: (e) => void
    onFocus?: (e) => void
    onBlur?: (e) => void
}

const RenderErrors = ({ errors, name }) => {
    if (errors?.type === 'field') {
        const [error] = errors.errors.filter(error => {
            return error.field === name;
        });

        if (error) {
            return <ErrorMsg>{error.errors[name]}</ErrorMsg>;
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
}

const TextInput: React.FC<TextInputProps> = ({
    className,
    value='',
    errors,
    validation,
    placeholder,
    name,
    allErrors,
    ...rest
}) => {
    return (
        <InputHolder className={className}>
            <Input
                value={value}
                error={validation && !!validation[name]}
                name={name}
                {...rest} />
            {placeholder && (
                <Placeholder
                    value={!!value}
                    error={validation && !!validation[name]}>
                    {placeholder}
                </Placeholder>
            )}
            {errors && <RenderErrors errors={errors} name={name} />}
            {validation && <RenderInputErrors errors={validation[name]} />}
        </InputHolder>
    );
}

// Error message format
// {
//     type: '',
//     fieldName: '',
//     message: '',
// };

export default TextInput;
