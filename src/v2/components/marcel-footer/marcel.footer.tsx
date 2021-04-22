import * as React from 'react';
import { Link } from 'react-router-dom';
import { CompanyLogo } from '../logos/company.logo';
import apple from './images/apple.svg';
import appStore from './images/apple_app_store.svg';
import appleDownload from './images/apple_download_app.svg';
import './marcel-footer.scss';
export const MarcelFooter = (props: {}) => {
  return (
    <div className="app_footer">
      <Link to="/" className="app_footer__logo">
        <CompanyLogo className="app_footer__logo__image" />
      </Link>
      <div className="app_footer__links">
        <div className="app_footer__links__copyright">2019 © Marcel Art</div>
        <a className="app_footer__links__link" href="https://www.marcelforart.com/privacy-policy/" target="_blank">
          Privacy Policy
        </a>
        <a className="app_footer__links__link" href="https://www.marcelforart.com/terms/" target="_blank">
          Terms of Use
        </a>
      </div>

      <div>
        <a className="apple_install_button" href="https://itunes.apple.com/us/app/marcel-art/id1416032467?mt=8">
          <img src={apple} className="apple_install_button__apple_image" />
          <div className="apple_install_button__text">
            <img src={appleDownload} className="apple_install_button__text__1" />
            <img src={appStore} className="apple_install_button__text__2" />
          </div>
        </a>
      </div>
    </div>
  );
};
