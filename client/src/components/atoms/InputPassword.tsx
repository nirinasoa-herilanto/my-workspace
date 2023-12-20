import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';

export type InputPasswordProps = {
  className?: string;
  labelFor: string;
  hasError: boolean;
  warningMessage: string;
} & Omit<JSX.IntrinsicElements['input'], 'type' | 'name'>;

type InputRef = HTMLInputElement;

/**
 * #### InputPassword component
 * A custom input password component built in HTMLInputElement `input` with `type="password"`.
 * - Only for handling password input
 *
 */
const InputPassword = React.forwardRef<InputRef, InputPasswordProps>(
  ({ className, labelFor, hasError, warningMessage, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isShowPasswordHandler = () =>
      setShowPassword((prevItem) => !prevItem);

    return (
      <InputPasswordWrapper className={`password-el ${className || ''}`}>
        <label htmlFor="password">{labelFor}</label>
        <br />
        <div className={`input-password ${hasError ? 'error' : ''}`}>
          <input
            ref={ref}
            name="password"
            type={showPassword ? 'text' : 'password'}
            {...rest}
          />

          {showPassword ? (
            <FaRegEyeSlash
              className="pw-icon"
              onClick={isShowPasswordHandler}
            />
          ) : (
            <FaRegEye className="pw-icon" onClick={isShowPasswordHandler} />
          )}
        </div>

        {hasError && <span className="error-message">{warningMessage}</span>}
      </InputPasswordWrapper>
    );
  }
);

const InputPasswordWrapper = styled.div`
  &.password-el {
    & {
      margin-bottom: 20px;
    }

    & .input-password input {
      width: 100%;
      height: auto;

      color: var(--zinc);
      background: transparent;
      font-size: 16px;
      outline: none;
      border: none;
    }

    & .input-password {
      width: calc(100% - 26px);
      height: auto;

      padding: 12px;
      margin-top: 12px;

      display: flex;
      align-items: center;
      gap: 12px;

      background: #fff;
      border-radius: 20px;
      border: 1px solid #ccc;
    }

    .pw-icon {
      font-size: 18px;
      cursor: pointer;
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

export default InputPassword;
