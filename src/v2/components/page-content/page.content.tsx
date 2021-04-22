import * as React from 'react';
import { PageFooter } from '../page-footer';
import { PageArtistHeader } from '../page-header/page.header';
import './page-content.scss';
export const PageContent = (props: { children: any }) => {
  return (
    <>
      <PageArtistHeader />

      <section className="page-content">
        <div className="page-content__wrapper">{props.children}</div>
      </section>
      <PageFooter />
    </>
  );
};
