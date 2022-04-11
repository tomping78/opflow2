import React, { ReactNode, useEffect, useState } from 'react';
import { DefaultTemplate } from './index';
import SearchPageHeader from '../../molecules/SearchPageHeader';
import { Col, Row } from 'antd';
import Table from '../../molecules/Table';
import { HttpClient } from '../../../common/utils/http-client';
import { useSearchParams } from 'react-router-dom';
import { FilterProp } from '../../molecules/Filter';
import { v4 as uuid } from 'uuid';

interface ListTemplateBProps {
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
   * 변경 즉시 검색 활성화
   */
  useImmediatelySearch?: boolean;
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
 * 목록 유형 - B
 *
 * @Author: circlegiven
 * @Date: 2022-04-04
 */
const ListTemplateB = ({
  title,
  subTitle,
  url,
  columns,
  filters,
  useImmediatelySearch,
  onClick,
  onDoubleClick,
}: ListTemplateBProps) => {
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
   * @param keyword
   */
  function onSearch(params: any = {}) {
    setSearchParams({
      ...params,
      _uuid: uuid(),
    });
  }

  /******************************************
   * Function
   * ****************************************/

  /**
   *
   * 현재 Search Params 가져오기
   * @param queryString
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
        useImmediatelySearch={useImmediatelySearch}
        onSearch={onSearch}
        className="site-page-header"
        title={title}
        subTitle={subTitle}
        defaultSearchParams={getCurrentSearchParams()}
        filters={filters}
      />
      <Row className="contentWrap">
        <Col className="contentWrap-inner">
          <Table
            columns={columns}
            dataSource={data?.content}
            scroll={{ y: 500 }}
            total={data?.totalElements}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
          />
        </Col>
      </Row>
    </DefaultTemplate>
  );
};

export default ListTemplateB;
