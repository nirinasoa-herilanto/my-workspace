import { useReducer } from 'react';

type ActionType =
  | {
      type: 'INPUT';
      payload: string;
    }
  | {
      type: 'BLUR';
      warningMessage: string;
    }
  | {
      type: 'RESET';
    };

export type UseInputParams = {
  validateInputFn: (value: string) => boolean;
  warningMessage: string;
};

export type UseInputType = {
  value: string;
  warningMessage: string;
  isValid: boolean;
  hasError: boolean;
  inputBlurHandler: () => void;
  resetInputHandler: () => void;
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const initialInputState = {
  value: '',
  warningMessage: '',
  isTouched: false,
};

const inputReducer = (state: typeof initialInputState, action: ActionType) => {
  if (action.type === 'INPUT') {
    return {
      value: action.payload,
      warningMessage: state.warningMessage,
      isTouched: state.isTouched,
    };
  }

  if (action.type === 'BLUR') {
    return {
      value: state.value,
      warningMessage: action.warningMessage,
      isTouched: true,
    };
  }

  if (action.type === 'RESET') {
    return initialInputState;
  }

  return initialInputState;
};

/**
 * #### useInput() hook
 * A custom hook for handling input element
 */
export const useInput = ({
  warningMessage,
  validateInputFn,
}: UseInputParams) => {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    initialInputState
  );

  const isValid = validateInputFn(inputState.value);
  const hasError = !isValid && inputState.isTouched;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchInput({ type: 'INPUT', payload: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: 'BLUR', warningMessage });
  };

  const resetInputHandler = () => {
    dispatchInput({ type: 'RESET' });
  };

  return {
    isValid,
    hasError,
    value: inputState.value,
    warningMessage: inputState.warningMessage,
    inputChangeHandler,
    inputBlurHandler,
    resetInputHandler,
  } as UseInputType;
};
