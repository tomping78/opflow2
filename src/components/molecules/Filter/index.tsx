import React from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';

export interface FilterProp {
  name: string;
  label?: string | number;
  formItemProps?: FormItemProps;
  component: React.ReactNode;
  onChange?: (...args: any) => void;
}

/**
 *
 * Author: circlegiven
 * Date: 2022-04-01
 */
const Filter = ({
  name,
  label,
  component,
  formItemProps,
  onChange,
}: FilterProp) => {
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
      {React.cloneElement(component as React.ReactElement, {
        onChange: onChange,
      })}
    </Form.Item>
  );
};

export default Filter;
