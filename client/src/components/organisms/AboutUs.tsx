import React from 'react';
import styled from 'styled-components';

import { assets } from '@project/assets';

import { wordingConfig } from '@project/config';

import { Image, Button } from '@project/components';

export type AboutUsProps = {
  className?: string;
};

/**
 * ### AboutUs component
 */
const AboutUs: React.FC<AboutUsProps> = ({ className }) => {
  return (
    <AboutUsWrapper className={`about-us ${className || ''}`}>
      <div className="about-us__card">
        <img src={assets.growth} alt="growth icon" />
        <h2>Let's growth together</h2>
        <p>{wordingConfig.aboutUs}</p>

        <Button
          className="about-us__card--btn"
          whileTap={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 500 }}
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
    padding: 20px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    gap: 20px;

    background-color: #f0f9ff;

    .about-us__card {
      width: 350px;
      height: auto;

      padding: 28px;
      background: var(--white);
      border-radius: 20px;
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
    }

    @media (min-width: 1024px) {
      & {
        margin-top: 52px;
        padding: 52px;
      }
    }
  }
`;

export default AboutUs;
