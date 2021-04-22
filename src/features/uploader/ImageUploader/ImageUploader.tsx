import React from 'react';
import { Route } from 'react-router-dom';
import Tiff from 'tiff.js';
import { useLocalizable } from '../../core/i18n/Localizable';
import UploadModal from './UploadModal';

Tiff.initialize({
  TOTAL_MEMORY: 50000000,
});

const ImageUploader = () => {
  const { _ } = useLocalizable('uploader');
  return (
    <Route
      exact
      path={`/uploader`}
      render={(props) => {
        return (
          <UploadModal
            {...props}
            isOpen={true}
            name="upload"
            title={_('title')}
            artworkTitle={_('artwork.title')}
            subtitle={_('upload.subtitle')}
          />
        );
      }}
    />
  );
};

export default ImageUploader;
