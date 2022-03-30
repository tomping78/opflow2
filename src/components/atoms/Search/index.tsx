import React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';

const DEFAULT_SIZE = 'small';

/**
 * Search Component
 * Author: circlegiven
 * Date: 2022-03-30
 */
const Search = ({
  size = DEFAULT_SIZE,
  allowClear = true,
  ...props
}: SearchProps) => {
  /******************************************
   * Constant / State
   * ****************************************/

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  /******************************************
   * Function
   * ****************************************/

  /******************************************
   * Lifecycle
   * ****************************************/

  /******************************************
   * Render
   * ****************************************/
  return <Input.Search size={size} allowClear={allowClear} {...props} />;
};

export default Search;
