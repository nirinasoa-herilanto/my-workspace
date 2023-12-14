import styled from 'styled-components';
import type { CustomPropsType } from '@project/types';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import { HTMLMotionProps, motion } from 'framer-motion';

export type ImagePropsType = {
  src: string;
  alt: string;
} & HTMLMotionProps<'div'>;

/**
 * #### Image component
 * Use to display a custom lazy image component on the UI
 * - We can enable `motion style` by passing it through `props`
 */
const Image: React.FC<CustomPropsType<ImagePropsType>> = ({
  className,
  src,
  alt,
  ...rest
}) => {
  return (
    <ImageWrapper className={`custom-image ${className || ''}`} {...rest}>
      <LazyLoadImage
        className="image"
        effect="blur"
        src={src}
        alt={alt}
        wrapperProps={{
          style: { transitionDelay: '0.25s' },
        }}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled(motion.div)`
  &.custom-image {
    width: 100%;
    height: inherit;

    .image {
      width: 100%;
      height: 100%;
      background-size: cover;
    }

    @media (min-width: 768px) {
      & {
        width: 500px;
        height: 500px;
      }
    }
  }
`;

export default Image;
