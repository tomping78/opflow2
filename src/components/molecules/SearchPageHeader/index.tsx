import React, { useCallback, useEffect } from 'react';
import {
  Button,
  Form,
  PageHeader as AntdPageHeader,
  PageHeaderProps as AntdPageHeaderProps,
  Row,
} from 'antd';
import { debounce, isNil } from 'lodash';
import SearchFilters from '../SearchFilters';
import { FilterProp } from '../Filter';

interface SearchPageHeaderProps<T = any> extends AntdPageHeaderProps {
  /**
   * 필터 목록
   */
  filters?: FilterProp[];
  /**
   * 초기화 버튼 클릭시 검색 비활성화
   */
  disableInitSearch?: boolean;
  /**
   * 검색 필터 초기값
   */
  defaultSearchParams?: T;
  /**
   * 변경 즉시 검색 활성화
   */
  useImmediatelySearch?: boolean;
  /**
   * 검색 이벤트
   */
  onSearch: (fields: T) => void;
}

/**
 * Search PageHeader
 *
 * @Author: circlegiven
 * @Date: 2022-04-01
 */
const SearchPageHeader = ({
  filters,
  defaultSearchParams,
  disableInitSearch,
  useImmediatelySearch,
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
   * 초기화 이벤트
   */
  function handleInitSearch() {
    form.resetFields();

    if (disableInitSearch !== true) {
      handleSearch();
    }
  }

  /**
   * 검색 이벤트
   */
  function handleSearch() {
    form.submit();
  }

  /**
   * 필터 변경 이벤트
   */
  const handleValueChanged = useCallback(
    debounce(() => {
      if (useImmediatelySearch) handleSearch();
    }, 300),
    [],
  );

  /******************************************
   * Function
   * ****************************************/

  /**
   * SearchParams convert
   * @param values
   */
  function safetySearchParams(values: any) {
    return Object.fromEntries(
      Object.entries(values).filter(([, value]) => !isNil(value)),
    );
  }

  /**
   * 검색
   * @param values
   */
  function search(values: any) {
    onSearch(safetySearchParams(values));
  }

  /******************************************
   * Lifecycle
   * ****************************************/

  /**
   * 초기 검색 params 설정
   */
  useEffect(() => {
    if (defaultSearchParams) {
      form.resetFields();
      form.setFieldsValue(defaultSearchParams);
    }
  }, [defaultSearchParams]);

  /******************************************
   * Render
   * ****************************************/
  return (
    <Form
      form={form}
      onFinish={search}>
      <AntdPageHeader
        {...props}
        extra={
          <Row justify={'end'}>
            <Button onClick={handleInitSearch}>초기화</Button>
            &nbsp;
            <Button
              htmlType='submit'
              type='primary'>
              검색
            </Button>
          </Row>
        }>
        <SearchFilters
          filters={filters}
          onChange={handleValueChanged}
        />
      </AntdPageHeader>
    </Form>
  );
};

export default SearchPageHeader;
