import React, { Fragment } from 'react';
import { TCollection } from '../collection-types';

import {
    NextCollectionHolder,
    NextCollectionTitle,
    NextCollectionLink,
    NextCollectionDivider,
    NextCollectionImageHolder,
    NextCollectionImage,
    NextCollectionNavLink,
    NextCollectionButton,
    Holder,
} from './styled';
import { TArtwork } from 'features/artwork/artwork-type';
import { TUserInfo } from 'features/user/user-types';
import Arrows from 'components/Arrows';

interface INextCollection {
    nextCollection: TCollection | {};
    nextArtworks: TArtwork[],
    publicInfo: TUserInfo,
}

const NextCollection: React.FC<INextCollection> = ({ nextCollection, nextArtworks, publicInfo }) => {

    if (Array.isArray(nextArtworks) && nextArtworks.length) {
        const [next] = nextArtworks;
        const [img] = next.artwork_data.images;

        return (
            <NextCollectionHolder>
                <NextCollectionDivider />
                <NextCollectionNavLink to={`/${publicInfo.marcel_username}/collections/${nextCollection.url}`}>
                    <Fragment>
                        <Holder>
                            <NextCollectionLink>Next Collection</NextCollectionLink>
                            <NextCollectionTitle>{nextCollection.name}</NextCollectionTitle>
                            <NextCollectionButton>
                                <Arrows.Arrow isDefault={true}/>
                            </NextCollectionButton>
                        </Holder>
                        <NextCollectionImageHolder>
                            <NextCollectionImage src={img.thumbnails.mid} />
                        </NextCollectionImageHolder>
                    </Fragment>
                </NextCollectionNavLink>
            </NextCollectionHolder>
        );
    }

    return null;
}

export default NextCollection;