import React, { ReactNode, useEffect } from 'react';
import {
  Button,
  Form,
  PageHeader as AntdPageHeader,
  PageHeaderProps as AntdPageHeaderProps,
  Row,
} from 'antd';

interface SearchPageHeaderProps<T = any> extends AntdPageHeaderProps {
  children: ReactNode;
  disableInitSearch?: boolean;
  defaultSearchParams?: T;
  onSearch: (fields: T) => void;
}

/**
 * Search PageHeader
 * Author: circlegiven
 * Date: 2022-04-01
 */
const SearchPageHeader = ({
  children,
  defaultSearchParams,
  disableInitSearch,
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

    if (disableInitSearch !== true) {
      handleSearch();
    }
  }

  /**
   * 검색
   */
  function handleSearch() {
    form.submit();
  }

  /******************************************
   * Function
   * ****************************************/

  /******************************************
   * Lifecycle
   * ****************************************/

  /**
   * 초기 검색 params 설정
   */
  useEffect(() => {
    if (defaultSearchParams) form.setFieldsValue(defaultSearchParams);
  }, [defaultSearchParams]);

  /******************************************
   * Render
   * ****************************************/
  return (
    <Form form={form} onFinish={onSearch}>
      <AntdPageHeader
        {...props}
        extra={
          <Row justify={'end'}>
            <Button onClick={handleInitSearch}>초기화</Button>
            &nbsp;
            <Button htmlType="submit" type="primary">
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
