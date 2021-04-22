import React, { Fragment } from 'react';
import { Skeleton } from 'styled';
import defaultImage from './dots.svg';
//import defaultImage from './blank.jpg';
// import PropTypes from 'prop-types';
// import Responsive from 'react-responsive';
import RenderFeaturedLinks from './RenderFeaturedLinks';
import {
  AboutBio,
  AboutImage,
  AboutTitle,
  ContentBioHolder,
  ContentHolder,
  DescriptionWrapper,
  ImageHolder,
  IntroBio,
} from './styled';

const RenderBio = ({ publicInfo, isLoading }) => {
  if (!publicInfo && isLoading) {
    return (
      <Fragment>
        <DescriptionWrapper>
          <AboutTitle>About</AboutTitle>
          <AboutBio>
            <Skeleton width="200px" />
          </AboutBio>
        </DescriptionWrapper>
        <ImageHolder>
          <Skeleton height="60vh" />
        </ImageHolder>
      </Fragment>
    );
  }

  if (!publicInfo && !isLoading) {
    return null;
  }

  return (
    <Fragment>
      <DescriptionWrapper>
        <AboutTitle>About</AboutTitle>
        <AboutBio>{publicInfo.bio}</AboutBio>
      </DescriptionWrapper>
      <ImageHolder>
        <AboutImage src={publicInfo.primary_image_signed || defaultImage} />
      </ImageHolder>
    </Fragment>
  );
};

const RenderIntroBio = ({ pages }) => {
  if (Array.isArray(pages) && pages.length) {
    return <IntroBio dangerouslySetInnerHTML={{ __html: pages && pages[0].content }} />;
  }

  return null;
};

const RenderArtistBio = ({ publicInfo, isLoading }) => {
  const { pages, featured_links } = publicInfo;

  // const aboutPage = pages.find((page) => page.page_type === PAGE_TYPE.ABOUT_PAGE) || {};

  return (
    <ContentHolder>
      <RenderBio publicInfo={publicInfo} isLoading={isLoading} />
      <ContentBioHolder>
        {/* {
                    (aboutPage && Reflect.has(aboutPage, 'content'))
                        ? <MarkdownParser source={aboutPage.content} />
                        : <MarkdownParser source={aboutPage.content} />
                } */}
        <RenderIntroBio pages={pages} />
        <RenderFeaturedLinks featuredLinks={featured_links} isLoading={isLoading} />
        {/* <Responsive minDeviceWidth={992}>
                    {(isDesktop) => isDesktop && (
                    <Button
                        fullWidth
                        styleType="outlined"
                        onClick={this.handleExploreArtworksButtonClick}
                        style={{
                            marginTop: '4.56rem',
                            color: '#FF5B00',
                            borderColor: '#FF5B00',
                        }}
                    >
                        Explore Artworks
                    </Button>
                    )}
                </Responsive> */}
      </ContentBioHolder>
    </ContentHolder>
  );
};

export default RenderArtistBio;
