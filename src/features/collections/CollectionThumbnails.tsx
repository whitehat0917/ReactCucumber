import React from 'react';
import PropTypes from 'prop-types';
import { Image } from './styled';

const CollectionThumbnails = ({ images }) => {
    if (Reflect.has(images || {}, 'thumbnails')) {
        return (
            <Image className="tile-image" src={images.thumbnails['tiny' || 'mid' || 'small' || 'mini']} />
        );
    }

    return null;
}

CollectionThumbnails.propTypes = {
    images: PropTypes.object.isRequired
};

export default CollectionThumbnails;
