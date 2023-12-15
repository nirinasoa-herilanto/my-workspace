import React from 'react';
import styled from 'styled-components';

import { footerConfig } from '@project/config';

import { FaLinkedin } from 'react-icons/fa';
import CustomLink from './CustomLink';

export type FooterNavProps = {
  className?: string;
};

/**
 * #### FooterNav component
 */
const FooterNav: React.FC<FooterNavProps> = ({ className }) => {
  return (
    <FooterNavWrapper className={`footer-nav ${className || ''}`}>
      <div className="footer-nav__phone">
        <h3>PHONE</h3>

        <a href={`tel:${footerConfig.phoneNumber}`}>
          {footerConfig.phoneNumber}
        </a>
      </div>

      <div className="footer-nav__email">
        <h3>EMAIL</h3>

        <a href={`mailto:${footerConfig.email}`}>{footerConfig.email}</a>
      </div>

      <div className="footer-nav__socials">
        <h3>SOCIAL</h3>

        <nav className="nav-socials">
          <ul>
            <CustomLink
              className="social-link"
              href={footerConfig.linkedInAccount}
              target="_blank"
              Icon={FaLinkedin}
            />
          </ul>
        </nav>
      </div>
    </FooterNavWrapper>
  );
};

const FooterNavWrapper = styled.div`
  &.footer-nav {
    a {
      font-size: 18px;
      font-weight: bold;
    }

    .social-link svg {
      width: 32px;
      height: 32px;
      color: var(--blue-600);
    }
  }
`;

export default FooterNav;
