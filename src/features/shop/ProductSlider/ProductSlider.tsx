import React, {Fragment, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ReactResizeDetector from 'react-resize-detector';
import Slider from "react-slick";
import { v4 } from 'uuid';

import {
    ArtworkSliderWrapper,
    ArtworkSliderHolder,
    SliderOverlay,
    CloseMobileHolder,
    CloseMobile,
    ShowDetailsButton,
    SliderHolder,
    DotsContainer,
    DotsHolder,
    Dot, ArtworkImageHolder, ArtworkSliderHitBox, ArtworkImage, ArtworkSlide
} from '../../artwork/ArtworksSlider/styled';
import { RenderArrow } from "../../artwork/ArtworksSlider/ArtworksSlider";

import InfoPanel from "./InfoPanel";
import CloseIcon from "./CloseIcon";

interface IRouterParams {
    userName: string,
    productId: string
}

//FIXME: If window is narrow enough, slider image goes to the left and hides left arrow. Same problem with Artwork slider
const ProductSlider = ({ products, selectedProduct }) => {
    const params = useParams<IRouterParams>();
    const [showDetails, setShowDetails] = useState(true);
    const [showBadges, setShowBadges] = useState(true);

    //FIXME: Need to refactor isDesktop from being calculated locally to being set and broadcast to all components in one place via a Context API based solution
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });

    const [dotsQuantity, setDotsQuantity] = useState(selectedProduct.artwork_data.images.length);

    const settings = {
        dots: true,
        lazyLoad: true,
        arrows: true,
        adaptiveHeight: true,
        style: {height:'100%'},
        nextArrow: <RenderArrow handleClick={() => {}} isNext={true} />,
        prevArrow: <RenderArrow handleClick={() => {}} />,
        appendDots: dots => {
            return (
                <DotsContainer>
                    <DotsHolder>
                        {dots.map((dot,index) => {
                            if(index<dotsQuantity&&dotsQuantity!==1){
                                return <Dot key={v4()} {...dot.props} onClick={dot.props.children.props.onClick} />
                            }
                            return
                        })}
                    </DotsHolder>
                </DotsContainer>
            );
        },
    };

    return (
        <ArtworkSliderWrapper>
            <ArtworkSliderHolder>
                <ReactResizeDetector handleWidth handleHeight>
                    {(width, height) => {
                        return (
                            <Fragment>
                                <SliderHolder>
                                    <Slider {...settings}>
                                        {selectedProduct.artwork_data.images.map(image => (
                                            <ArtworkSlide key={v4()} height={height} >
                                                <ArtworkImageHolder key={v4()}>
                                                    <ArtworkSliderHitBox onClick={() => setShowBadges(state => !state)} />
                                                    <ArtworkImage imageUrl={image.thumbnails.mid} height={height}/>
                                                </ArtworkImageHolder>
                                            </ArtworkSlide>
                                        ))}
                                    </Slider>
                                </SliderHolder>
                                <InfoPanel
                                    product={selectedProduct}
                                    params={params}
                                    isDesktop={isDesktop}
                                    isActive={showDetails}
                                    showDetails = {setShowDetails}
                                />
                            </Fragment>
                        );
                    }}
                </ReactResizeDetector>

                <SliderOverlay />
                <CloseMobileHolder
                    to={`/${params.userName}/shop`}
                    isShowBadges={showBadges}
                >
                    <CloseIcon />
                </CloseMobileHolder>
                <ShowDetailsButton
                    isShowBadges={showBadges}
                    onClick={() => setShowDetails(state => !state)}
                >
                    Show Details
                </ShowDetailsButton>
            </ArtworkSliderHolder>
        </ArtworkSliderWrapper>
    );
}

export default ProductSlider;
