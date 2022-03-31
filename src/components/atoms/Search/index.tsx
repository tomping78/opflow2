import React, { ChangeEvent, useState } from 'react';
import { Input } from 'antd';
import { SearchProps as AntdSearchProps } from 'antd/es/input';
import { InputProps, InputValue } from '../Input';
import isFunction from 'lodash/isFunction';

const DEFAULT_SIZE = 'small';

interface SearchProps extends AntdSearchProps, InputProps {}

/**
 * Search Component
 * Author: circlegiven
 * Date: 2022-03-30
 */
const Search = ({
  size = DEFAULT_SIZE,
  allowClear = true,
  value,
  defaultValue,
  valueValidator,
  onChange,
  ...props
}: SearchProps) => {
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
    if (
      isFunction(valueValidator) &&
      valueValidator(event.target.value) !== true
    ) {
      return;
    }

    setInputValue(event.target.value);

    if (isFunction(onChange)) {
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
    <Input.Search
      {...props}
      value={value ?? inputValue}
      size={size}
      allowClear={allowClear}
      onChange={handleChange}
    />
  );
};

export default Search;
