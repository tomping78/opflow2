import React, { ReactNode, useEffect, useState } from 'react';
import { DefaultTemplate } from './index';
import SearchPageHeader from '../../molecules/SearchPageHeader';
import { Col, Form, Row, Select } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Search from '../../atoms/Search';
import Table from '../../molecules/Table';
import { HttpClient } from '../../../common/utils/HttpClient';
import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../../molecules/Table/constants/page';

interface ListTemplateAProps {
  title?: ReactNode;
  subTitle?: ReactNode;
  url: string;
  columns: any[];
}

/**
 * ListTemplate - A
 * Author: circlegiven
 * Date: 2022-04-01
 */
const ListTemplateA = ({
  title,
  subTitle,
  url,
  columns,
}: ListTemplateAProps) => {
  /******************************************
   * Constant / State
   * ****************************************/

  const [data, setData] = useState<any>();
  const [searchParams, setSearchParams] = useSearchParams();

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  function onSearch({ keyword }: any) {
    onChangeKeyword(keyword);
  }

  /**
   * 페이지 정보 변경
   * @param page
   * @param pageSize
   */
  function onChangePagination(page: number, pageSize: number) {
    setSearchParams({
      page: (page - 1).toString(),
      size: pageSize.toString(),
      keyword: getCurrentKeyword(searchParams),
    });
  }

  /**
   * 검색어 변경
   * @param keyword
   */
  function onChangeKeyword(keyword: string = '') {
    setSearchParams({
      page: DEFAULT_PAGE.toString(),
      size: DEFAULT_PAGE_SIZE.toString(),
      keyword,
    });
  }

  /******************************************
   * Function
   * ****************************************/

  /**
   * 검색 파라미터에서 현재 페이지 번호 가져오기
   * @param queryString
   */
  function getCurrentPageFromSearchParams(queryString = searchParams) {
    return Number(queryString?.get('page') ?? DEFAULT_PAGE);
  }

  /**
   * 요청에 사용될 현재 페이지 번호 가져오기
   * @param queryString
   */
  function getCurrentPageNumberToUsedInRequest(queryString = searchParams) {
    return getCurrentPageFromSearchParams(queryString);
  }

  /**
   * 테이블 페이지네이션에 사용될 현재 페이지 번호 가져오기
   * @param queryString
   */
  function getCurrentPageNumberToUsedInTablePagination(
    queryString = searchParams,
  ) {
    return getCurrentPageFromSearchParams(queryString) + 1;
  }

  /**
   * 현재 페이지 사이즈 가져오기
   * @param queryString
   */
  function getCurrentPageSize(queryString = searchParams) {
    return Number(queryString?.get('size') ?? DEFAULT_PAGE_SIZE);
  }

  /**
   * 현재 검섹어 사이즈 가져오기
   * @param queryString
   */
  function getCurrentKeyword(queryString = searchParams) {
    return queryString?.get('keyword') ?? '';
  }

  /******************************************
   * Lifecycle
   * ****************************************/

  useEffect(() => {
    HttpClient.get(url, {
      params: {
        page: getCurrentPageNumberToUsedInRequest(searchParams),
        size: getCurrentPageSize(searchParams),
        keyword: getCurrentKeyword(searchParams),
      },
    })
      .then(response => setData(response.data))
      .catch(() => setData(undefined));
  }, [searchParams]);

  /******************************************
   * Render
   * ****************************************/
  return (
    <DefaultTemplate>
      <SearchPageHeader
        onSearch={onSearch}
        className="site-page-header"
        title={title}
        subTitle={subTitle}
        defaultSearchParams={Object.fromEntries(searchParams)}
      >
        <Row>
          <div style={{ flex: 1 }}>
            <>
              <Paragraph>
                <Row>
                  <Col>
                    <Form.Item name="category" label="카테고리">
                      <Select
                        defaultValue="lucy"
                        placeholder={'선택해주세요'}
                        style={{ width: 250 }}
                      >
                        <Select.Option value="jack">Jack</Select.Option>
                        <Select.Option value="lucy">Lucy</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  &nbsp;
                  <Col>
                    <Form.Item name="country" label="국가">
                      <Select
                        style={{ width: 250 }}
                        placeholder={'선택해주세요'}
                      >
                        <Select.Option value="KOR">KOR</Select.Option>
                        <Select.Option value="JPN">JPN</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  &nbsp;
                  <Col>
                    <Form.Item name="keyword" label="검색어">
                      <Search
                        style={{ width: 250 }}
                        placeholder={'제목이나 내용을 입력하세요'}
                        defaultValue={getCurrentKeyword(searchParams)}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Paragraph>
            </>
          </div>
        </Row>
      </SearchPageHeader>
      <Table
        usePagination
        style={{ paddingLeft: 10, paddingRight: 10 }}
        columns={columns}
        dataSource={data?.content}
        scroll={{ y: 500 }}
        total={data?.totalElements}
        defaultCurrentPage={getCurrentPageNumberToUsedInTablePagination()}
        defaultPageSize={getCurrentPageSize()}
        currentPage={getCurrentPageNumberToUsedInTablePagination()}
        pageSize={getCurrentPageSize()}
        onChangePage={onChangePagination}
        onClick={record => console.log('clicked', record)}
        onDoubleClick={record => console.log('double clicked', record)}
      />
    </DefaultTemplate>
  );
};

export default ListTemplateA;
