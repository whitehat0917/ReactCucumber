import React, { useState } from 'react';
import clsx from 'clsx';
import { MenuBurgerIcon } from './styled';

interface IMenuIcon {
    isOpen?: boolean,
    isDesktop: boolean;
    onClick?: (e) => void
}

const RenderIcon = ({ onClick }) => {
    const [isOpen, setOpen] = useState(false);

    const handleOpenMenu = e => {
        setOpen(!isOpen);
        onClick(!isOpen);
        const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        document.querySelector('body').style.overflow = !isOpen ? 'hidden' : 'auto';
        !isChrome && (document.querySelector('body').style.position = !isOpen ? 'fixed' : 'initial');
    }
    
    return (
        <MenuBurgerIcon 
            id="menu-icon" 
            className={clsx(isOpen && 'open')}
            onClick={handleOpenMenu} >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </MenuBurgerIcon>
    )
}

const MenuIcon: React.FC<IMenuIcon> = ({ onClick, isDesktop }) => {
    if (!isDesktop) {
        return <RenderIcon onClick={onClick} />
    }

    return null;
};

export default MenuIcon;