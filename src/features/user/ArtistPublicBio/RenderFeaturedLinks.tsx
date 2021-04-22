import React from 'react';

import FeaturedLink from './FeaturedLink';
import { TFeaturedLink } from '../user-types';
import {
    FeaturedTitle,
    FeaturedLinksWrapper,
} from './styled';
import { skeletonList, Skeleton } from 'styled';
import { ContactForm } from '../ArtistContact/styled';

interface IRenderFeaturedLinks {
    featuredLinks: TFeaturedLink[]
    isLoading: boolean
}

const RenderFeaturedLinks: React.FC<IRenderFeaturedLinks> = ({ featuredLinks = [], isLoading }) => {
    if (Array.isArray(featuredLinks) && !featuredLinks.length && isLoading ) {
        return (
            <FeaturedLinksWrapper>
                { skeletonList.map((link) => <Skeleton key={link.id} margin="0 0 26px" />) }
            </FeaturedLinksWrapper>
        );
    }

    if (Array.isArray(featuredLinks) && !featuredLinks.length && !isLoading ) {
        return null;
    }

    return (
        <FeaturedLinksWrapper>
            <FeaturedTitle>Featured Links</FeaturedTitle>
            { featuredLinks.map((link) => <FeaturedLink key={link.id} {...link} />) }
        </FeaturedLinksWrapper>
    );

}

export default RenderFeaturedLinks;
