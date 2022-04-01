import React, { ReactNode } from 'react';
import { Form } from 'antd';

export interface FilterProp {
  name: string;
  label?: string | number;
  formItemProps?: any;
  component: ReactNode;
}

/**
 *
 * Author: circlegiven
 * Date: 2022-04-01
 */
const Filter = ({ name, label, component, formItemProps }: FilterProp) => {
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
  return (
    <Form.Item {...formItemProps} name={name} label={label}>
      {component}
    </Form.Item>
  );
};

export default Filter;
