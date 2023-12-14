import React from 'react';
import styled from 'styled-components';

import { assets } from '@project/assets';

import { FooterNav, Image } from '@project/components';

export type FooterProps = {
  className?: string;
};

/**
 * ### Footer component
 */
const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <FooterWrapper className={`footer ${className || ''}`}>
      <div className="footer__content">
        <Image src={assets.contactUs} alt="contact us" />
        <div className="footer-info">
          <h1>Contact us</h1>
          <FooterNav className="footer-link" />
        </div>
      </div>

      <div className="copyrighting">
        <span>{`NHR Copyright ${new Date().getFullYear()}`}</span>
      </div>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  &.footer {
    padding: 20px;

    .footer__content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .footer-link {
      margin-top: 52px;
    }

    .copyrighting {
      margin-top: 20px;
      text-align: right;
    }
    .copyrighting span {
      font-size: 18px;
      font-weight: bold;
    }

    @media (min-width: 1024px) {
      & {
        padding: 52px;
      }

      /* .footer__content {
        margin-right: 52px;
      } */
    }
  }
`;

export default Footer;
