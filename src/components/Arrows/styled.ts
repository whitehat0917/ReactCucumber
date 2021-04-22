import styled from 'styled-components';
import { IconProps, LineProps } from './Arrow';

export const Icon = styled.a<IconProps>`
    position: relative;
    background: ${({ theme, isDefault }) => isDefault ? theme.palette.primary['30'] : theme.palette.white};
`;

export const Line = styled.div<LineProps>`
    z-index: 10;
    border-radius: 1px;
    position: absolute;
    transform: ${({isLeftSide, isRightSide}) => isLeftSide? 'rotate(45deg)' : isRightSide ? 'rotate(-45deg)': 'none'};
    left: ${({isLeftSide, isRightSide}) => isLeftSide || isRightSide ? '12px' : '0px'};
    top: ${({isLeftSide, isRightSide}) => isLeftSide ? '-2px' : isRightSide ? '2px' : '0px'};
    height: 2px;
    width: ${({isLeftSide, isRightSide}) => isLeftSide || isRightSide ? '6px' : '18px'};
    border-radius: 1px;
    background: ${({ theme, isDefault }) => isDefault ? theme.palette.white : theme.palette.primary['30']};
`;

export const ArrowContainer = styled.div`
    width: 36px;
    display: flex;
    margin: 0 7px 0 9px;
    align-items: center;
`