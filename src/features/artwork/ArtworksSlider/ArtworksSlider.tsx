import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import Slider from "react-slick";
import { v4 } from 'uuid';
import { Icon } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';
import ReactResizeDetector from 'react-resize-detector';

import RenderMetaData from './RenderMetaData';
import { IRouterParams } from 'features/collection/SingleCollectionPage';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
    SliderOverlay,
    SliderHolder,
    Dot,
    DotsContainer,
    DotsHolder,
    ArtworkSlide,
    ArtworkImageHolder,
    ArtworkImage,
    NextArrow,
    PrevArrow,
    ShowDetailsButton,
    CloseMobile,
    CloseMobileHolder,
    ArtworkSliderHolder,
    ArtworkSliderWrapper,
    ArtworkSliderHitBox,
} from './styled';

export const RenderArrow = ({ onClick, handleClick, isNext }) => {
    handleClick(onClick);
    return isNext
        ?
        <NextArrow onClick={onClick}>
            <Icon name='chevron right' />
        </NextArrow>
        :
        <PrevArrow onClick={onClick}>
            <Icon name='chevron left' />
        </PrevArrow>
}

const useKey = (key, cb) => {
    const callbackRef = useRef(cb);
    useEffect(() => {
        callbackRef.current = cb;
    });
    useEffect(() => {
        const handle = event => {
            if (event.keyCode === key) {
                if (typeof callbackRef.current === 'function') {
                    callbackRef.current(event);
                }
            }
        }
        document.addEventListener('keydown', handle)
        return () => document.removeEventListener('keydown', handle)
    }, [key]);
}

const responsiveSettings = [
    {
        breakpoint: 990,
        settings: {
            arrows: false,
        }
    }
];

const ArtworksSlider = ({ artworks }) => {
    const [currentArtwork, setArtwork] = useState();
    const [dotsQuantity, setDotsQuantity] = useState(0);
    const [isActive, showDetails] = useState(true);
    const [isShowBadges, showBadges] = useState(true);
    const params = useParams<IRouterParams>();
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
    const leftArrowCode = 37;
    const rightArrowCode = 39;

    useEffect(() => {
        document.querySelector('body').style.overflow = 'hidden';
        !isDesktop && (document.querySelector('body').style.position = 'fixed');

        return () => {
            document.querySelector('body').style.overflow = 'auto';
            document.querySelector('body').style.position = 'initial';
        }
    }, [currentArtwork]);

    const currentArtworkIdx = artworks.findIndex(a => a.artwork === params.artworkId);
    const allImages = artworks.map((a,index) => a.artwork_data.images.map(i => ({...i, artworkIndex: index })));
    const imagesStack = _.flatten(allImages)
    const currentImageIdx = imagesStack.findIndex(image => image.id === artworks[currentArtworkIdx].artwork_data.images[0].id);


    const updateSlide = ({artworkIndex = 0, order = 0}) => {
        const { images } = artworks[artworkIndex].artwork_data;
        setArtwork(state => artworks[artworkIndex]);
        setDotsQuantity(state=>images.length);
        window.history.pushState({}, '', `${artworks[artworkIndex].artwork}`);
    };

    const settings = {
        initialSlide: currentImageIdx,
        dots: true,
        lazyLoad: true,
        arrows: true,
        adaptiveHeight: true,
        style: {height:'100%'},
        responsive: [
            ...responsiveSettings
        ],
        nextArrow: <RenderArrow handleClick={onClick => useKey(rightArrowCode, onClick)} isNext={true} />,
        prevArrow: <RenderArrow handleClick={onClick => useKey(leftArrowCode, onClick)} />,
        onInit() {
            console.log(currentArtworkIdx)
            setDotsQuantity(state=>artworks[currentArtworkIdx].artwork_data.images.length)
            updateSlide({artworkIndex: currentArtworkIdx});
        },
        beforeChange(oldIdx, newIdx) {
                updateSlide(imagesStack[newIdx])
        },
        appendDots: dots => {
            return (
                <DotsContainer>
                    <DotsHolder>
                        {dots.map((dot,index) => {
                            if(index<dotsQuantity&&dotsQuantity!==1){
                                return <Dot {...dot.props} onClick={dot.props.children.props.onClick} />
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
                                        {artworks.map(artwork => {
                                            return artwork.artwork_data.images.map(image => {
                                                return (
                                                    <ArtworkSlide height={height} >
                                                        <ArtworkImageHolder key={v4()}>
                                                            <ArtworkSliderHitBox onClick={() => showBadges(state => !state)} />
                                                            <ArtworkImage imageUrl={image.thumbnails.mid} height={height}/>
                                                        </ArtworkImageHolder>
                                                    </ArtworkSlide>
                                                );
                                            })
                                        })}
                                    </Slider>
                                </SliderHolder>
                                <RenderMetaData
                                    isActive={isActive}
                                    isDesktop={isDesktop}
                                    artwork={currentArtwork}
                                    params={params}
                                    showDetails={showDetails} />


                            </Fragment>
                        )
                    }}
                </ReactResizeDetector>

                <SliderOverlay onClick={() => showBadges(state => !state)} />
                <CloseMobileHolder
                    to={`/${params.userName}/collections/${params.collectionUrl}`}
                    isShowBadges={isShowBadges}
                >
                    <CloseMobile >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </CloseMobile>
                </CloseMobileHolder>
                <ShowDetailsButton
                    isShowBadges={isShowBadges}
                    onClick={() => showDetails(state => !state)}>
                    Show Details
            </ShowDetailsButton>
            </ArtworkSliderHolder>
        </ArtworkSliderWrapper>
    );
}

export default ArtworksSlider;
