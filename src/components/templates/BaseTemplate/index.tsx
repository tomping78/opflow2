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
  return <div style={{ width: '100%', height: '100%' }}>{children}</div>;
};

export default BaseTemplate;
