import React from 'react';
import styled from 'styled-components';

export type LoadingProps = {
  className?: string;
};

/**
 * #### Loading dots component
 * @todo making reusable loading dots color
 */
const Loading: React.FC<LoadingProps> = ({ className }) => {
  return (
    <LoadingWrapper className={`loading ${className || ''}`}>
      <div className="custom-loader"></div>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  &.loading {
    @keyframes d5 {
      0% {
        box-shadow: 20px 0 #399df4, -20px 0 #399df422;
        background: #399df4;
      }
      33% {
        box-shadow: 20px 0 #399df4, -20px 0 #399df422;
        background: #399df422;
      }
      66% {
        box-shadow: 20px 0 #399df422, -20px 0 #399df4;
        background: #399df422;
      }
    }

    .custom-loader {
      width: 14px;
      height: 14px;
      background: #399df4;
      border-radius: 50%;
      box-shadow: 20px 0 #399df422, -20px 0 #399df4;
      animation: d5 2s infinite linear alternate;
    }
  }
`;

export default Loading;
