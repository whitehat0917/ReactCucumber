import React, { Fragment } from 'react';
import { v4 } from 'uuid';
// import { SocialIcon } from '../ArtistContact/styled';
import Arrows from 'components/Arrows'
import { Skeleton, skeletonList } from 'styled';

export type TLink = {
    url: string
    label: string
}

interface IRenderSocialLinks {
    socialLinks: TLink[]
    linkComponent: React.ReactNode
    withIcon?: boolean
    isLoading?: boolean
    width: string
    margin: string
}

const RenderSocialLinks = ({ 
    socialLinks, 
    linkComponent: LinkComponent,
    withIcon,
    width,
    margin,
    isLoading,
}: IRenderSocialLinks) => {
    if (!socialLinks && isLoading) {
        return (
            <Fragment>
                {skeletonList.map(l => <Skeleton key={v4()} width={width} margin={margin} />)}
            </Fragment>
        );
    }

    if (!socialLinks && !isLoading) {
        return null;
    }

    return (
        <Fragment>
            {
                socialLinks.map(link => (
                    <LinkComponent 
                        key={v4()} 
                        href={link.url}
                        isLoading={isLoading}
                        rel="noreferrer" 
                        target="_blank">
                        { withIcon && <Arrows.Arrow /> }
                        <p>{ link.label }</p>
                    </LinkComponent>)
                )
            }
        </Fragment>
    )
};

export default RenderSocialLinks;