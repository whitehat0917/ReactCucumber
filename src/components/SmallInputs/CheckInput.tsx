import React from 'react';

import Checkbox from 'components/Checkbox/Checkbox';

interface CheckInputProps {
    className?: string;
    value?: boolean;
    name: string;
    label?: string;
    onChange: (e) => void;
}

const CheckInput: React.FC<CheckInputProps> = ({
    className,
    value,
    name,
    label,
    onChange
}) => (
    <Checkbox
        className={className}
        label={label}
        onChange={onChange}
        checked={value}
        name={name}
    />
);

export default CheckInput;
