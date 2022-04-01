import React, { ReactNode } from 'react';
import {
  Button,
  Form,
  PageHeader as AntdPageHeader,
  PageHeaderProps as AntdPageHeaderProps,
  Row,
} from 'antd';

interface SearchPageHeaderProps extends AntdPageHeaderProps {
  children: ReactNode;
  onSearch: (fields: any) => void;
}

/**
 * Search PageHeader
 * Author: circlegiven
 * Date: 2022-04-01
 */
const SearchPageHeader = ({
  children,
  onSearch,
  ...props
}: SearchPageHeaderProps) => {
  /******************************************
   * Constant / State
   * ****************************************/

  const [form] = Form.useForm();

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  /**
   * 초기화
   */
  function handleInitSearch() {
    form.resetFields();
    handleSearch();
  }

  /**
   * 검색
   */
  function handleSearch() {
    form.validateFields().then(fields => {
      onSearch(fields);
    });
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
    <Form form={form}>
      <AntdPageHeader
        {...props}
        extra={
          <Row justify={'end'}>
            <Button onClick={handleInitSearch}>초기화</Button>
            &nbsp;
            <Button onClick={handleSearch} type="primary">
              검색
            </Button>
          </Row>
        }
      >
        {children}
      </AntdPageHeader>
    </Form>
  );
};

export default SearchPageHeader;
