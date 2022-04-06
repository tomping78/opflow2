import React, { ReactNode } from 'react';

/**
 * 템플릿 베이스 컴포넌트 Props
 */
type BaseTemplateProps = {
  children: ReactNode;
};

/**
 * 템플릿 베이스 컴포넌트
 * @param children ReactNode
 * @constructor
 */
const BaseTemplate = ({ children }: BaseTemplateProps) => {
  return <div>{children}</div>;
};

export default BaseTemplate;
