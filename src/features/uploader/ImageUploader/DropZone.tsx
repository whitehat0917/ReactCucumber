import loadImage from 'blueimp-load-image';
import Icon from 'components/Icon';
import MinorLoader from 'components/MinorLoader';
import Typography from 'components/Typography';
import React, { Fragment, useState } from 'react';
import Masonry from 'react-masonry-component';
import { toast } from 'react-toastify';
import Tiff from 'tiff.js';
import { getImageDimensions } from 'utils/artworks';
import {
  DnDText,
  DnDWrapper,
  ImageContainer,
  ImageName,
  ImageNameWrapper,
  ImageWrapper,
  PreviewContainer,
  PreviewImage,
  StyledDrozone,
  SuccessIndicator,
  SupportText,
  UploadingContainer,
} from './styled';

Tiff.initialize({
  TOTAL_MEMORY: 50000000,
});

const RenderUploadingView = () => (
  <UploadingContainer>
    <DnDWrapper>
      <Icon size="big" style={{ merginBottom: '1.5rem' }}>
        cloud
      </Icon>
      <DnDText>
        <Typography type="body3" style={{ display: 'inline' }}>
          Drag and drop images here or
        </Typography>
        <Typography type="body3" weight="bold" style={{ display: 'inline' }}>
          {' choose images'}
        </Typography>
      </DnDText>
    </DnDWrapper>
    <SupportText>
      <Typography type="caption" color="muted">
        Support files less than 50MB
      </Typography>
      <Typography type="caption" color="muted">
        JPG, JPEG, PNG, TIFF, TIF
      </Typography>
    </SupportText>
  </UploadingContainer>
);

const RenderPicturesView = ({ files, status, onRemoveFileClick }) => {
  return (
    <PreviewContainer>
      <Masonry>
        {files.map(({ name, id, status, dataUrl, thumbnail }) => {
          return (
            <ImageContainer key={id}>
              <ImageWrapper status={status}>
                <PreviewImage referrerPolicy="no-referrer" alt={name} src={dataUrl || thumbnail} />
                <SuccessIndicator status={status} />
              </ImageWrapper>
              <ImageNameWrapper>
                <ImageName color="default" type="caption">
                  {name}
                </ImageName>
                <Icon color="muted" size={0.375} clickable onClick={onRemoveFileClick(id)}>
                  close
                </Icon>
              </ImageNameWrapper>
            </ImageContainer>
          );
        })}
      </Masonry>
    </PreviewContainer>
  );
};

const DropZone = ({ files, onDrop, status, onRemoveFileClick }) => {
  
  const [loading, setLoading] = useState(false);
  const mapFileToSerializable = (file: any) => {
    return {
      ...file,
      lastModifiedDate:
        file.lastModifiedDate && typeof file.lastModifiedDate === 'object'
          ? (file.lastModifiedDate as Date).toISOString()
          : '',
    };
  };
  const handleDrop = (newFiles) => {
    setLoading(true);

    if (newFiles.length && (newFiles[0].type === 'text/csv' || newFiles[0].type === 'application/vnd.ms-excel')) {
      setLoading(false);

      onDrop([
        {
          file: mapFileToSerializable(newFiles[0]),
          type: 'csv',
        },
      ]);

      return;
    }

    const promises = newFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          console.log('Tiff -> ', Tiff);

          loadImage(
            file,
            (canvas) => {
              if (file.type === 'image/tiff' && FileReader) {
                console.log('loadImage file -> ', file);
                console.log('loadImage canvas -> ', canvas);

                const fr = new FileReader();

                fr.onload = (e) => {
                  const tiff = new Tiff({ buffer: e.target.result });
                  const tiffCanvas = tiff.toCanvas();
                  const newDataUrl = tiffCanvas.toDataURL ? tiffCanvas.toDataURL(file.type) : null;

                  if (!newDataUrl) {
                    reject(new Error(`Sorry. File ${file.name} is invalid or unsupported`));
                  }

                  resolve({
                    dataUrl: newDataUrl,
                    type: file.type,
                    image_original_width: tiff.width(),
                    image_original_height: tiff.height(),
                  });
                };

                fr.readAsArrayBuffer(file);
              } else if (canvas.toDataURL) {
                getImageDimensions(file).then((dimensions) => {
                  resolve({
                    dataUrl: canvas.toDataURL(file.type),
                    type: file.type,
                    image_original_width: dimensions.width,
                    image_original_height: dimensions.height,
                  });
                });
              } else {
                reject(new Error(`Sorry. File ${file.name} is invalid or unsupported`));
              }
            },
            { maxWidth: 180, orientation: true, canvas: true },
          );
        }),
    );

    Promise.all(promises)
      .then((data) => {
        setLoading(false);

        onDrop(
          newFiles.map((file, idx) => ({
            file: mapFileToSerializable(file),
            dataUrl: data[idx].dataUrl,
            type: data[idx].type,
            image_original_width: data[idx].image_original_width,
            image_original_height: data[idx].image_original_height,
          })),
        );
      })
      .catch((err) => {
        toast.error(err.message);

        setLoading(false);
      });
  };

  return (
    <Fragment>
      <StyledDrozone
        accept="image/jpeg,image/jpg,image/png,image/tiff,text/comma-separated-values,text/csv,application/csv,application/vnd.ms-excel,.csv"
        onDrop={handleDrop}
        multiple
        activeClassName="active"
      >
        {loading && <MinorLoader />}
        {!loading && files.length === 0 && <RenderUploadingView />}
        {!loading && files.length > 0 && files[0].type !== 'csv' && (
          <RenderPicturesView files={files} status={status} onRemoveFileClick={onRemoveFileClick} />
        )}
      </StyledDrozone>
    </Fragment>
  );
};

export default DropZone;
