import { Link } from 'react-router-dom';
import styled from 'styled-components';

export type ErrorPageProps = {
  message?: string;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <ErrorWrapper className="error-page">
      <div className="content">
        <h1>{message || '404 | Url not found!'}</h1>
        <Link to={'..'}>Return</Link>
      </div>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  &.error-page {
    width: 100%;
    height: 100dvh;

    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      text-align: center;
    }

    .content h1 {
      color: var(--red-600);
    }
  }
`;

export default ErrorPage;
