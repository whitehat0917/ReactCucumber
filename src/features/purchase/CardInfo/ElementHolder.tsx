import React, { useState } from 'react';

import {
    ElementHolderBody,
    ElementHolderLabel,
    ElementHolderChildren,
    ElementHolderError
} from "./styled";

interface IElementHolderProps {
    className?: string;
    label: string;
    errorMsg: string;
}

const ElementHolder: React.FC<IElementHolderProps> = ({ children, className, label, errorMsg}) => {
    const [ status, setStatus ] = useState('');

    const handleChange = e => setStatus(e.error ? 'error' : e.empty ? '' : 'value');

    const errorState = status === 'error';

    return (
        <ElementHolderBody className={className}>
            <ElementHolderLabel status={status}>{label}</ElementHolderLabel>
            <ElementHolderChildren status={status}>
                {React.cloneElement(children, { onChange: handleChange })}
            </ElementHolderChildren>
            {errorState && <ElementHolderError>{errorMsg}</ElementHolderError>}
        </ElementHolderBody>
    );
};

export default ElementHolder;
