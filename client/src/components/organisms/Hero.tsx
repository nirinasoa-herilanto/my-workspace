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
      <div className="hero__description">
        <Logo />
        <div className="hero-content">
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
    padding: 20px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    .hero__description {
      max-width: 38%;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .hero-content h1 {
      margin: 0;
      font-size: 72px;
    }
    .hero-content p {
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

    @media (min-width: 1024px) {
      & {
        padding: 52px;
      }

      .hero-content {
        margin-left: 50px;
      }

      .hero-action {
        margin-top: 28px;
      }
    }
  }
`;

export default Hero;
