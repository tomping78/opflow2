import React, { ReactNode, useEffect, useState } from 'react';
import { DefaultTemplate } from './index';
import SearchPageHeader from '../../molecules/SearchPageHeader';
import { Col, Row } from 'antd';
import Table from '../../molecules/Table';
import { HttpClient } from '../../../common/utils/http-client';
import { useSearchParams } from 'react-router-dom';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../../molecules/Table/constants/page';
import Filter, { FilterProp } from '../../molecules/Filter';
import { v4 as uuid } from 'uuid';

interface ListTemplateAProps {
  /**
   * 제목
   */
  title?: ReactNode;

  /**
   * 설명
   */
  subTitle?: ReactNode;

  /**
   * 목록 조회 API URL
   */
  url: string;

  /**
   * 목록 테이블 컬럼
   */
  columns: any[];

  /**
   * 필터 목록
   */
  filters?: FilterProp[];
  /**
   * 클릭 이벤트
   */
  onClick?: (data: any, index: number) => void;
  /**
   * 더블 클릭 이벤트
   */
  onDoubleClick?: (data: any, index: number) => void;
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
  filters,
  onClick,
  onDoubleClick,
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

  /**
   * 필터 변경
   * @param params
   */
  function onSearch(params: any = {}) {
    setSearchParams({
      ...params,
      page: DEFAULT_PAGE.toString(),
      size: DEFAULT_PAGE_SIZE.toString(),
      _uuid: uuid(),
    });
  }

  /**
   * 페이지 정보 변경
   * @param page
   * @param pageSize
   */
  function onChangePagination(page: number, pageSize: number) {
    setSearchParams({
      ...getCurrentSearchParams(),
      page: (page - 1).toString(),
      size: pageSize.toString(),
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
   * 현재 Search Params 가져오기
   */
  function getCurrentSearchParams() {
    return Object.fromEntries(searchParams);
  }

  /******************************************
   * Lifecycle
   * ****************************************/

  useEffect(() => {
    HttpClient.get(url, {
      params: {
        ...getCurrentSearchParams(),
        page: getCurrentPageNumberToUsedInRequest(searchParams),
        size: getCurrentPageSize(searchParams),
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
        defaultSearchParams={getCurrentSearchParams()}
      >
        <Row gutter={[12, 8]} className="rowSpace">
          {(filters ?? []).map((filter: FilterProp, index: number) => (
            <Col key={index} span={8} className="colSpace">
              <Filter {...filter} />
            </Col>
          ))}
        </Row>
      </SearchPageHeader>
      <Row className="contentWrap">
        <Col className="contentWrap-inner">
          <Table
            usePagination
            columns={columns}
            dataSource={data?.content}
            total={data?.totalElements}
            defaultCurrentPage={getCurrentPageNumberToUsedInTablePagination()}
            defaultPageSize={getCurrentPageSize()}
            currentPage={getCurrentPageNumberToUsedInTablePagination()}
            pageSize={getCurrentPageSize()}
            onChangePage={onChangePagination}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
          />
        </Col>
      </Row>
    </DefaultTemplate>
  );
};

export default ListTemplateA;
