import React, { ReactNode, useEffect, useState } from 'react';
import Table from '../../molecules/Table';
import ListTemplate from '../../templates/ListTemplate';
import { format } from 'date-fns';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../../molecules/Table/constants/page';
import { DeleteOutlined } from '@ant-design/icons';
import { Col, Form, message, Row } from 'antd';
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

  const IconLink = ({ src, text }: { src: string; text: string }) => (
    <a className="example-link">
      <img className="example-link-icon" src={src} alt={text} />
      {text}
    </a>
  );

  const content = (
    <>
      <Paragraph>
        <Row>
          <Col>검색어&nbsp;:&nbsp;</Col>
          <Col>
            <Form.Item name="keyword">
              <Search defaultValue={getCurrentKeyword(searchParams)} />
            </Form.Item>
          </Col>
          &nbsp;
          <Col>
            <Search disabled />
          </Col>
        </Row>
      </Paragraph>
      <Paragraph>
        돈을 버는 능력, 모으는 능력, 쓰는 능력, 불리는 능력, 유지하는 능력.
        ‘진짜 부자’가 된 실제 인물이 말해주는 ‘진짜 돈’만들기. 집콕 추천 도서.
        부자가 되고 싶다면 필독. 통찰력을 주는 책. 당신이 진정한 교양인. 서비스:
        부자되는 Tip, 베스트셀러, HOT & NEW.{' '}
      </Paragraph>
      <div>
        <IconLink
          src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
          text="Quick Start"
        />
        &nbsp;
        <IconLink
          src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
          text=" Product Info"
        />
        &nbsp;
        <IconLink
          src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
          text="Product Doc"
        />
      </div>
    </>
  );

  const Content = ({
    children,
    extraContent,
  }: {
    children: ReactNode;
    extraContent: ReactNode;
  }) => (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );

  return (
    <>
      <ListTemplate>
        <SearchPageHeader
          onSearch={onSearch}
          className="site-page-header"
          title="게시판"
          subTitle="여행 도서 목록 입니다"
        >
          <Content
            extraContent={
              <img
                src="https://gw.alipayobjects.com/zos/antfincdn/K%24NnlsB%26hz/pageHeader.svg"
                alt="content"
                width="100%"
              />
            }
          >
            {content}
          </Content>
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
