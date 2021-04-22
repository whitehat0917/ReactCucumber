import * as React from 'react';
import logoType from './images/marcel_v2.svg';
import onlyLogo from './images/marcel_v2_icon_only.svg';
export const CompanyLogo = (props: { onlyLogo?: boolean; className?: string }) => {
  return <img className={props.className} src={props.onlyLogo ? onlyLogo : logoType} />;
};
