import React from 'react';
import styled from 'styled-components';
import { HTMLMotionProps, motion } from 'framer-motion';

import type { CustomWrapperPropsType } from '@project/types';

/**
 * A custom Button component.
 *
 * We can enable `motion style` by passing it through `props`
 */
const Button: React.FC<CustomWrapperPropsType<HTMLMotionProps<'button'>>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <ButtonWrapper className={`button ${className || ''}`} {...rest}>
      {children}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(motion.button)`
  &.button {
    & {
      padding: 10px;
      font-size: 16px;
      color: var(--white);
      font-family: 'Nunito', sans-serif;

      border: none;
      outline: none;
      border-radius: 20px;
      background: var(--blue-500);
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }
`;

export default Button;
