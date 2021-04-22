import { Artwork } from 'features/artwork/artwork-type';
import { useWindowResize } from 'features/core/hooks/useWindowResize';
import * as React from 'react';
import { caseOf } from 'utils/case.of';
import './artwork-image.scss';
export type Thumb = 'mid' | 'mini' | 'tiny' | 'small';
export const ArtworkImageView = (props: {
  artwork: Artwork;
  display: 'image' | 'div';
  className?: string;
  displayOptions:
    | {
        type: 'auto';
        widthEstimation?: number;
        widthEstimationPercentage?: number;
        heightEstimationPercentage?: number;
        heightEstimation?: number;
      }
    | { type: 'fixed'; thumbnail: Thumb };
}) => {
  const imageIdx = 0;

  if (!props.artwork?.images?.length) return <div></div>;
  const image = props.artwork.images[imageIdx];
  let autoThumb = undefined;
  if (props.displayOptions.type === 'auto') {
    autoThumb = useWindowResize((w, h) => {
      if (props.displayOptions.type === 'auto') {
        let heightEstimation = props.displayOptions.heightEstimationPercentage
          ? (props.displayOptions.heightEstimationPercentage * h) / 100
          : props.displayOptions.heightEstimation;
        const widthEstimation = props.displayOptions.widthEstimationPercentage
          ? (props.displayOptions.widthEstimationPercentage * w) / 100
          : props.displayOptions.widthEstimation;
        heightEstimation =
          heightEstimation || (widthEstimation * image.image_original_height) / image.image_original_width;
        console.log('height', heightEstimation);
        return caseOf<number>()
          .case(
            (h) => h <= 30,
            () => 'mini' as Thumb,
          )
          .case(
            (h) => h <= 256,
            () => 'tiny' as Thumb,
          )
          .case(
            (h) => h <= 512,
            () => 'small' as Thumb,
          )
          .defaultCase(() => 'mid' as Thumb)
          .eval(heightEstimation) as Thumb;
      }
    });
  }

  const selectedThumbName: Thumb = props.displayOptions.type === 'fixed' ? props.displayOptions.thumbnail : autoThumb;
  let selectedThumb = caseOf<Thumb>()
    .case('mid', () => image.thumbnails.mid)
    .case('small', () => image.thumbnails.small)
    .case('mini', () => image.thumbnails.mini)
    .case('tiny', () => image.thumbnails.tiny)
    .eval(selectedThumbName);

  if (props.display === 'image') {
    return <img className={`artwork_image ${props.className || ''}`} src={selectedThumb} />;
  }

  return (
    <div
      className={`artwork_image_div ${props.className || ''}`}
      style={{ backgroundImage: selectedThumb, backgroundSize: 'cover' }}
    ></div>
  );
};
