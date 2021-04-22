import React from 'react';
import { MenuLink, MenuLi } from './styled';

export interface IMenuItem {
    to: string,
    name: string,
    isDesktop?: boolean,
    disabled?: boolean,
}

const MenuItem: React.FC<IMenuItem> = ({ to, name, isDesktop }) => {
    return (
        <MenuLi>
            <MenuLink
                to={to}
                isDesktop={isDesktop}
                isActive={(_, location) => [to].includes(location.pathname)}
                onClick={() =>{
                    document.querySelector('body').style.overflow = 'auto'
                    document.querySelector('body').style.position = 'initial';
                    }}>
                    {name}
            </MenuLink>
        </MenuLi>
    );
}

export default MenuItem;
