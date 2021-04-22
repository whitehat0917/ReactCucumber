import React from 'react';
import { Select, SelectHolder, ErrorMsg } from './styled';

interface SelectTopicsProps {
    topics?: Array<string>
    name?: string,
    error?: boolean
    errorMsg?: string
    placeholder?: string
    onChange: (e) => void
}

const SelectTopics: React.FC<SelectTopicsProps> = ({
    topics = [],
    name='',
    error,
    errorMsg,
}) => {
    return (
        <SelectHolder>
            <Select
                    error={error}>
                        {
                topics.map(value=>(
                    <option key={value} value={value}>{value}</option>
                ))
            }
            </Select>
            
            { error && <ErrorMsg>{errorMsg}</ErrorMsg> }
        </SelectHolder>
    );
}

export default SelectTopics;