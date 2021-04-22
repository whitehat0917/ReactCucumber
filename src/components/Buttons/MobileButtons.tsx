import React, { Fragment } from 'react';
import { TTheme } from 'theme';
import { Button ,ErrorMsg } from './styled';

export type MobileButtonsProps = {
    isInversed?: boolean
    isDisabled?: boolean
    error?: boolean
    theme: TTheme
    width: string
}


interface MobileButtons {
    isInversed?: boolean
    isDisabled?: boolean
    error?: boolean
    errorMsg?: string
    placeholder?: string
    type?: string
    text?: string
    width?: string
    onClick?: (e) => void
}

const MobileButtons: React.FC<MobileButtons> = ({
    isDisabled = false,
    error,
    errorMsg,
    width,
    text = '',
    isInversed = false,
}) => {
    return (
        <Fragment>
            <Button
                width={width}
                isInversed={isInversed}
                isDisabled={isDisabled}
                disabled={isDisabled}
                error={error}>
            {text}
            </Button>
            { error && <ErrorMsg>{errorMsg}</ErrorMsg> }
        </Fragment>
    );
}

export default MobileButtons;