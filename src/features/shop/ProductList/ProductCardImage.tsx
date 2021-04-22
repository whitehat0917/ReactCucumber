import React from 'react';

import { BlurWrapper, ArtworkImage } from "../../collection/SingleCollectionPage/styled";

const ProductCardImage = ({ image, width, height }) => {
    return (
        <BlurWrapper>
            <ArtworkImage
                loaded={true}
                width={width}
                height={height}
                src={image.thumbnails.mid}
            />
        </BlurWrapper>
    );
};

export default ProductCardImage;
