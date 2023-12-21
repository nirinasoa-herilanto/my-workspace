import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { assets } from '@project/assets';

import { wordingConfig } from '@project/config';

import { truncate } from '@project/utils';

import { Image, Button } from '@project/components';

export type AboutUsProps = {
  className?: string;
};

/**
 * ### AboutUs component
 */
const AboutUs: React.FC<AboutUsProps> = ({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth?tab=sign-in');
  };

  return (
    <AboutUsWrapper className={`about-us ${className || ''}`}>
      <div className="about-us__card">
        <img src={assets.growth} alt="growth icon" />
        <h2>Let's growth together</h2>
        <p>{truncate(wordingConfig.aboutUs, 220)}</p>

        <Button
          className="about-us__card--btn"
          whileTap={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 500 }}
          onClick={handleClick}
        >
          Log in
        </Button>
      </div>

      <Image className="about-us__image" src={assets.aboutUs} alt="our team" />
    </AboutUsWrapper>
  );
};

const AboutUsWrapper = styled.section`
  &.about-us {
    & {
      padding: 50px;

      display: grid;
      gap: 50px;

      background-color: #f0f9ff;
    }

    .about-us__card {
      padding: 28px;
      border-radius: 20px;
      background: var(--white);
    }

    .about-us__card img {
      width: 50px;
      height: 50px;
    }
    .about-us__card p {
      text-align: left;
    }

    .about-us__card--btn {
      width: 150px;
      margin-top: 12px;
    }

    .about-us__image {
      width: 100%;
      height: inherit;
    }

    @media (min-width: 768px) {
      & {
        display: grid;
        grid-template-columns: 332px auto;
        align-items: center;
      }

      .about-us__card h2 {
        font-size: 28px;
      }
      .about-us__card p {
        font-size: 14px;
      }
    }

    @media (min-width: 1024px) {
      & {
        display: grid;
        grid-template-columns: 392px auto;
        justify-items: center;
        align-items: center;
      }

      .about-us__card {
        max-width: 500px;
        padding: 32px;
      }

      .about-us__card h2 {
        font-size: 32px;
      }
      .about-us__card p {
        font-size: 16px;
      }

      .about-us__image {
        max-width: 500px;
        height: 500px;
      }
    }
  }
`;

export default AboutUs;
