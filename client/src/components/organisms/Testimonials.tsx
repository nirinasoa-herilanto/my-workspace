import React from 'react';
import styled from 'styled-components';

import { IReview } from '@project/utils';

import Reviews from './Reviews';

export type TestimonialsProps = {
  className?: string;
  reviews: IReview[];
};

/**
 * ### Testimonials component
 */
const Testimonials: React.FC<TestimonialsProps> = ({ className, reviews }) => {
  return (
    <TestimonialsWrapper className={`testimonials ${className || ''}`}>
      <h1>Testimonials</h1>
      <p className="testimonials-p">Our customers said</p>

      <Reviews data={reviews} />
    </TestimonialsWrapper>
  );
};

const TestimonialsWrapper = styled.section`
  &.testimonials {
    & {
      padding: 50px;
    }

    & h1 {
      text-align: center;
    }

    .testimonials-p {
      font-size: 20px;
      text-align: center;
    }
  }
`;

export default Testimonials;
