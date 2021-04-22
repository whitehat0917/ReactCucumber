import { useMachine } from '@xstate/react';
import { useArtistData } from 'features/core/context/artistInfo.context';
import { CollectionsMachine, CollectionsMachineActions } from 'model/machines/artist.collections.machine';
import * as React from 'react';
import { ArtworkImageView } from 'v2/components/artwork-image/artwork.image.view';
import { MarcelLink } from 'v2/components/link/marcel.link';
import { SkeletonBox } from 'v2/components/skeleton/skeleton.box';
import useArtistSocialLinks from '../../../../features/user/hooks/useArtistSocialLinks';
import { CommonStateNames } from '../../../../model/machines/common.state.machines';
import { ArtistCollections } from '../../../components/collections/artist.collections';
import { Heading } from '../../../components/layout/heading';
import { PageContent } from '../../../components/page-content/page.content';
import './about.scss';
export default () => {
  const [artist] = useArtistData();
  const [artistCollectionState, sendArtistCollections] = useMachine(CollectionsMachine);
  const loadingArtist = artist.value === CommonStateNames.Loading;
  React.useEffect(() => {
    if (!artist.context?.artistData?.id) return;
    sendArtistCollections({
      type: CollectionsMachineActions.ArtistChanged,
      data: { artistId: artist.context.artistData.id },
    });
  }, [artist.context.artistData]);
  console.log(artist.context.artistData?.featured_artwork);
  const socialLinks = useArtistSocialLinks(artist.context.artistData?.social_links);

  return (
    <PageContent>
      <div className="about_page__artist">
        <ArtworkImageView
          className="about_page__featured_image"
          artwork={artist.context.artistData?.featured_artwork}
          display="image"
          displayOptions={{
            type: 'auto',
            heightEstimationPercentage: 60,
          }}
        />
        <div className="about_page__artist__info">
          <Heading type="h1" className="about_page__artist_bio" skeleton={loadingArtist}>
            {artist.context.artistData?.bio}
          </Heading>

          <SkeletonBox
            loading={loadingArtist}
            className="about_page__artist_intro"
            skeletonClassName="about_page__artist_intro"
          >
            <div className="about_page__artist_intro">{artist.context.artistData?.intro}</div>
          </SkeletonBox>

          <SkeletonBox loading={loadingArtist} items={4} skeletonClassName="about_page__artist_links">
            {socialLinks?.map((socialLink) => (
              <MarcelLink url={socialLink.url} text={socialLink.label}></MarcelLink>
            ))}
          </SkeletonBox>
        </div>
      </div>
      <Heading type="h2" text="collections" />

      <ArtistCollections collectionsState={artistCollectionState}></ArtistCollections>
    </PageContent>
  );
};
