import * as React from 'react';
import { ArtistPageFooter } from '../artist-footer/artist.page.footer';
import { MarcelFooter } from '../marcel-footer/marcel.footer';
import './page-footer.scss';
export const PageFooter = (props: {}) => {
  return (
    <div className="page_footer">
      <ArtistPageFooter></ArtistPageFooter>
      <MarcelFooter></MarcelFooter>
    </div>
  );
};
