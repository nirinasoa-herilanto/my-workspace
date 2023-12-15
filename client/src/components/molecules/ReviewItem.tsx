import React from 'react';
import styled from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';

import { IReview, truncate } from '@project/utils';

import { Image } from '@project/components';

export type ReviewItemProps = {
  className?: string;
  review: IReview;
} & HTMLMotionProps<'li'>;

/**
 * ### ReviewItem component
 * Use to display a specific review
 */
const ReviewItem: React.FC<ReviewItemProps> = ({
  className,
  review,
  ...rest
}) => {
  return (
    <ReviewItemWrapper className={`review-item ${className || ''}`} {...rest}>
      <Image
        className="reviem-item__image"
        src={review.image.url}
        alt={review.username}
      />

      <p className="review-item__opinion">{truncate(review.opinion, 190)}</p>

      <div className="review-item__user">
        <span>{review.username}</span>
        <span>{review.company}</span>
      </div>
    </ReviewItemWrapper>
  );
};

const ReviewItemWrapper = styled(motion.li)`
  &.review-item {
    padding: 28px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    background: #e2e8f0;
    border-radius: 20px;

    .review-item__opinion {
      text-align: center;
    }

    .reviem-item__image {
      width: 80px;
      height: 80px;
      border-radius: 100px;
      overflow: hidden;
    }

    .review-item__user span {
      color: var(--blue-500);
      font-weight: bold;
    }
  }
`;

export default ReviewItem;
