import React, { ReactNode } from 'react';
import { Button as AntdButton } from 'antd';

interface ButtonProps {
  /**
   * 버튼에 표시될 이름
   */
  name?: string;
  /**
   * 버튼 타입
   */
  type?: 'primary' | 'dashed' | 'ghost';
  /**
   * 컴포넌트
   */
  children?: ReactNode;
}

/**
 * 버튼
 * Author: circlegiven
 * Date: 2022-03-22
 */
const Button: React.FC<ButtonProps> = ({ name, type, children }) => {
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
  return <AntdButton type={type}>{children ?? name}</AntdButton>;
};

export default Button;
