import React, { ChangeEvent, useState } from 'react';
import { Input as AntdInput, InputProps as AntdInputProps } from 'antd';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';

type InputValue = string | ReadonlyArray<string> | number | undefined;

interface InputProps extends AntdInputProps {
  valueValidator?: (value: InputValue) => boolean;
}

/**
 * Input
 * Author: circlegiven
 * Date: 2022-03-30
 */
const Input = ({
  onChange,
  valueValidator = () => true,
  defaultValue,
  value,
  ...props
}: InputProps) => {
  /******************************************
   * Constant / State
   * ****************************************/
  const [inputValue, setInputValue] = useState<InputValue>(defaultValue ?? '');

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (valueValidator(event.target.value) !== true) {
      return;
    }

    setInputValue(event.target.value);

    if (isFunction(onChange) && isNil(onChange) === false) {
      onChange(event);
    }
  }

  /******************************************
   * Function
   * ****************************************/

  /******************************************
   * Lifecycle
   * ****************************************/

  /******************************************
   * Render
   * ****************************************/
  return (
    <AntdInput {...props} value={value ?? inputValue} onChange={handleChange} />
  );
};

export default Input;
