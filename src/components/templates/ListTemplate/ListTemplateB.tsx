import React, { ReactNode, useEffect, useState } from 'react';
import { DefaultTemplate } from './index';
import SearchPageHeader from '../../molecules/SearchPageHeader';
import { Col, Row } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import Table from '../../molecules/Table';
import { HttpClient } from '../../../common/utils/HttpClient';
import { useSearchParams } from 'react-router-dom';
import Filter, { FilterProp } from '../../molecules/Filter';
import { v4 as uuid } from 'uuid';

interface ListTemplateBProps {
  title?: ReactNode;
  subTitle?: ReactNode;
  url: string;
  columns: any[];
  filters?: FilterProp[];
}

/**
 * ListTemplate - B
 * Author: circlegiven
 * Date: 2022-04-04
 */
const ListTemplateB = ({
  title,
  subTitle,
  url,
  columns,
  filters,
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
        onSearch={onSearch}
        className="site-page-header"
        title={title}
        subTitle={subTitle}
        defaultSearchParams={getCurrentSearchParams()}
      >
        <Row>
          <div style={{ flex: 1 }}>
            <>
              <Paragraph>
                <Row>
                  {(filters ?? []).map((filter: FilterProp) => (
                    <Col>
                      <Filter {...filter} />
                    </Col>
                  ))}
                </Row>
              </Paragraph>
            </>
          </div>
        </Row>
      </SearchPageHeader>
      <Table
        style={{ paddingLeft: 10, paddingRight: 10 }}
        columns={columns}
        dataSource={data?.content}
        scroll={{ y: 500 }}
        total={data?.totalElements}
        onClick={record => console.log('clicked', record)}
        onDoubleClick={record => console.log('double clicked', record)}
      />
    </DefaultTemplate>
  );
};

export default ListTemplateB;
