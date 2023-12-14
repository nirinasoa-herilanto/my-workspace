import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { IReview } from '@project/utils';

import ReviewItem from '../molecules/ReviewItem';

export type ReviewsProps = {
  className?: string;
  data: IReview[];
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

/**
 * ### Reviews
 * Use to display lists of review
 */
const Reviews: React.FC<ReviewsProps> = ({ className, data }) => {
  return (
    <ReviewsWrapper className={`reviews ${className || ''}`}>
      <motion.ul
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {data.map((review) => (
          <ReviewItem key={review._id} review={review} variants={item} />
        ))}
      </motion.ul>
    </ReviewsWrapper>
  );
};

const ReviewsWrapper = styled.div`
  &.reviews {
    & ul {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 50px;
    }
  }
`;

export default Reviews;
