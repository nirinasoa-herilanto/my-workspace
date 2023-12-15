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
      <div className="footer-content">
        <Image
          className="footer-content__image"
          src={assets.contactUs}
          alt="contact us"
        />
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
    & {
      padding: 50px;
    }

    .footer-content {
      display: flex;
      flex-direction: column;
      gap: 50px;
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

    @media (min-width: 768px) {
      .footer-content {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .footer-content__image {
        width: 375px;
        height: inherit;
      }
    }

    @media (min-width: 1024px) {
      .footer-content {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }

      .footer-content__image {
        width: 482px;
        height: inherit;
      }
    }
  }
`;

export default Footer;
