import React, { useEffect, useState } from 'react';
import Table from '../../molecules/Table';
import ListTemplate from '../../templates/ListTemplate';
import { format } from 'date-fns';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../../molecules/Table/constants/page';
import { DeleteOutlined } from '@ant-design/icons';
import { Col, Form, message, Row, Select } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { HttpClient } from '../../../common/utils/HttpClient';
import { Page } from '../../../common/domain/Page';
import { Board } from './domain';
import Paragraph from 'antd/es/typography/Paragraph';
import Search from '../../atoms/Search';
import SearchPageHeader from '../../molecules/SearchPageHeader';

const columns = [
  {
    title: '제목',
    dataIndex: 'title',
    sorter: true,
    render: (title: string) => `${title}`,
    width: '20%',
  },
  {
    title: '내용',
    dataIndex: 'content',
  },
  {
    title: '작성자',
    dataIndex: 'author',
    width: '10%',
  },
  {
    title: '수정자',
    dataIndex: 'XXXXX',
    width: '10%',
    render: (XXXXX: string) => {
      return <span style={{ color: 'red' }}>{XXXXX ?? 'NULL'}</span>;
    },
  },
  {
    title: '생성일',
    dataIndex: 'createdDate',
    width: '15%',
    render: (createdDate: Date) => format(new Date(createdDate), 'yyyy-MM-dd'),
  },
  {
    title: '',
    dataIndex: 'id',
    width: '3%',
    render: () => (
      <DeleteOutlined onClick={() => message.info('삭제 되었습니다.')} />
    ),
  },
];

/**
 * Boards Component
 * @constructor
 */
const Boards = () => {
  /******************************************
   * Constant / State
   ******************************************/

  const [searchParams, setSearchParams] = useSearchParams();
  const [boards, setData] = useState<Page<Board>>();
  /******************************************
   * Global State
   ******************************************/

  /******************************************
   * Function
   ******************************************/

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
   * Handler
   ******************************************/

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
   * Lifecycle
   ******************************************/

  useEffect(() => {
    HttpClient.get('/api/boards', {
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
   ******************************************/

  return (
    <>
      <ListTemplate>
        <SearchPageHeader
          onSearch={onSearch}
          className="site-page-header"
          title="게시판"
          subTitle="여행 도서 목록 입니다"
        >
          <Row>
            <div style={{ flex: 1 }}>
              <>
                <Paragraph>
                  <Row>
                    <Col>
                      <Form.Item name="category" label="카테고리">
                        <Select defaultValue="lucy" style={{ width: 200 }}>
                          <Select.Option value="jack">Jack</Select.Option>
                          <Select.Option value="lucy">Lucy</Select.Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    &nbsp;
                    <Col>
                      <Form.Item name="keyword" label="검색어">
                        <Search
                          style={{ width: 200 }}
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
          dataSource={boards?.content}
          scroll={{ y: 500 }}
          total={boards?.totalElements}
          defaultCurrentPage={getCurrentPageNumberToUsedInTablePagination()}
          defaultPageSize={getCurrentPageSize()}
          currentPage={getCurrentPageNumberToUsedInTablePagination()}
          pageSize={getCurrentPageSize()}
          onChangePage={onChangePagination}
          onClick={record => console.log('clicked', record)}
          onDoubleClick={record => console.log('double clicked', record)}
        />
      </ListTemplate>
    </>
  );
};

export default Boards;
