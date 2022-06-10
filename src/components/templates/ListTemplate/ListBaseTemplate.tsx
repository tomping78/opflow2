import React, { ReactNode } from 'react';
import BaseTemplate from '../BaseTemplate';
import TitleComponent, { TitleProps } from '../../molecules/Title';

interface ListTemplateProps extends TitleProps {
  renderHeader?: (props: TitleProps) => ReactNode;
  children?: ReactNode;
}

/**
 * 목록 베이스 템플릿
 *
 * @Author: circlegiven
 * @Date: 2022-03-24
 */
const ListBaseTemplate = ({
  title,
  renderHeader,
  children,
}: ListTemplateProps) => {
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

  const header = () => {
    if (renderHeader) {
      return renderHeader({ title });
    }
    return <TitleComponent title={title} />;
  };

  /******************************************
   * Lifecycle
   * ****************************************/

  /******************************************
   * Render
   * ****************************************/
  return (
    <BaseTemplate>
      {header()}
      {children}
    </BaseTemplate>
  );
};

export default ListBaseTemplate;
