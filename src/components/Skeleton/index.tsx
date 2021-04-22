import React, { Fragment } from 'react';
import { SSkeleton } from 'styled';

const Skeleton = ({ 
    children, 
    data, 
    isLoading,
    ...rest }) => {
    if (!data && isLoading) {
        return <SSkeleton {...rest} />
    }

    if (!data && !isLoading) {
        return null;
    }

    return <Fragment>{ children }</Fragment>
};

export default Skeleton;