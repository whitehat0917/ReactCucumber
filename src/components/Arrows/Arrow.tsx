import React from 'react';
import { TTheme } from 'theme';
import { Icon, Line, ArrowContainer } from './styled';

export type IconProps = {
    theme: TTheme
    isDefault?: boolean
}

export type LineProps = {
    theme: TTheme
    isDefault?: boolean
    isLeftSide?: boolean
    isRightSide?: boolean
}

interface Arrow {
    isDefault?: boolean,
    isLeftSide?: boolean
    isRightSide?: boolean
}

const Arrow: React.FC<Arrow>  = ({
    isDefault=false,
}) => { 
    return (
    <ArrowContainer>
         <Icon>
            <Line isDefault={isDefault} isLeftSide={false}  isRightSide={false}/>
            <Line isDefault={isDefault} isLeftSide={true}  isRightSide={false}/>
            <Line isDefault={isDefault} isRightSide={true} isLeftSide={false}/>
        </Icon>
    </ArrowContainer>
    );
}

export default Arrow;