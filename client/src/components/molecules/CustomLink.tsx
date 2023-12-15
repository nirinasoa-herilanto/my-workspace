import React from 'react';
import styled from 'styled-components';

import type { IconType } from 'react-icons';

export type CustomLinkProps = {
  className?: string;
  item?: string;
  Icon?: IconType;
} & JSX.IntrinsicElements['a'];

/**
 * #### CustomLink component
 * An `abstraction link` of the HTMLAnchorElement `a`.
 *
 * ```jsx
 *   <li>
 *     <a className={`custom-link ${className || ''}`} href={"/"}>Homepage</a>
 *   </li>
 * ```
 *
 */
const CustomLink: React.FC<CustomLinkProps> = ({
  className,
  item,
  Icon,
  ...rest
}) => {
  let markupElement;

  if (item) {
    markupElement = item;
  }

  if (Icon) {
    markupElement = <Icon className="custom-link__icon" />;
  }

  return (
    <CustomLinkWrapper className={`custom-link ${className || ''}`}>
      <a {...rest}>{markupElement}</a>
    </CustomLinkWrapper>
  );
};

const CustomLinkWrapper = styled.li`
  &.custom-link {
    .custom-link__icon {
    }
  }
`;

export default CustomLink;
