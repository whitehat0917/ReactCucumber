import React from 'react';

import {TErrors} from "../../app/global-types";

import {
    TextInputBody,
    TextInputCtrl,
    ErrorMsg
} from "./styled";

const renderErrors = (errors, name) => {
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

const renderInputErrors = (errors) => {
    if (!!errors?.length) {
        const [error] = errors;

        return <ErrorMsg>{error}</ErrorMsg>;
    }

    return null;
}

export interface TextInputProps {
    className?: string,
    value?: string
    name: string,
    errors?: TErrors,
    validation?: any,
    placeholder?: string,
    type: string,
    allErrors?: boolean,
    onChange: (e) => void
}

const TextInput = (props: TextInputProps) => {
    return (
        <TextInputBody className={props.className}>
            <TextInputCtrl
                type={props.type}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            {renderErrors(props.errors, props.name)}
            {renderInputErrors(props.validation?.[props.name])}
        </TextInputBody>
    )
}

export default TextInput;
