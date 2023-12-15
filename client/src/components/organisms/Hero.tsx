import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { assets } from '@project/assets';

import { Image, Button, Logo } from '@project/components';

export type HeroProps = {
  className?: string;
};

/**
 * ### Hero component
 */
const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <HeroWrapper className={`hero ${className || ''}`}>
      <div className="hero-content">
        <Logo />

        <div className="hero-content__description">
          <h1>Your new future workspace</h1>
          <p>Let's grow together</p>

          <div className="hero-action">
            <Button
              className="hero-action__btn"
              whileTap={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              Sign up
            </Button>
            <Link to={'..'}>Already have an account?</Link>
          </div>
        </div>
      </div>

      <Image className="hero__image" src={assets.teams} alt="teams building" />
    </HeroWrapper>
  );
};

const HeroWrapper = styled.section`
  &.hero {
    & {
      padding: 50px;

      display: flex;
      flex-direction: column;
      gap: 50px;
    }

    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .hero-content__description h1 {
      margin: 0;
      font-size: 52px;
    }
    .hero-content__description p {
      font-size: 22px;
    }

    .hero-action {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .hero-action__btn {
      width: 180px;
    }

    @media (min-width: 768px) {
      & {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .hero__image {
        width: 100%;
        height: inherit;
      }
    }

    @media (min-width: 1024px) {
      & {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }

      .hero-content {
        max-width: 38%;
      }
      .hero-content__description {
        /* margin-left: 50px; */
      }

      .hero-content__description h1 {
        margin: 0;
        font-size: 68px;
      }

      .hero-action {
        margin-top: 28px;
      }

      .hero__image {
        width: 500px;
        height: inherit;
      }
    }
  }
`;

export default Hero;
