import React from 'react';
import styled from 'styled-components';

export type InputProps = {
  className?: string;
  labelFor: string;
  htmlFor: string;
  hasError: boolean;
  warningMessage: string;
} & JSX.IntrinsicElements['input'];

type InputRef = HTMLInputElement;

/**
 * #### Input component
 * A custom component built in HTMLInputElement `input`.
 * - 💥 Don't use for password
 */
const Input = React.forwardRef<InputRef, InputProps>(
  (
    { className, htmlFor, labelFor, hasError, warningMessage, ...rest },
    ref
  ) => {
    return (
      <InputWrapper className={`input-el ${className || ''}`}>
        <label htmlFor={htmlFor}>{labelFor}</label>
        <br />
        <input
          ref={ref}
          className={`input ${hasError ? 'error' : ''}`}
          name={htmlFor}
          {...rest}
        />

        {hasError && <span className="error-message">{warningMessage}</span>}
      </InputWrapper>
    );
  }
);

const InputWrapper = styled.div`
  &.input-el {
    & {
      margin-bottom: 20px;
    }

    & .input {
      width: calc(100% - 26px);
      height: 28px;

      padding: 12px;
      margin-top: 12px;

      color: var(--zinc);
      font-size: 16px;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 20px;
    }

    .error {
      background: #ffe1e1 !important;
    }

    .error-message {
      color: var(--red-600);
    }

    @media (min-width: 768px) {
    }
  }
`;

export default Input;
