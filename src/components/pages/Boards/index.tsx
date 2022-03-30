import React from 'react';
import { HttpClient } from '../../../common/utils/HttpClient';
import Table from '../../molecules/Table';
import ListTemplate from '../../templates/ListTemplate';
import { Board } from './domain';
import { Page } from '../../../common/domain/Page';
import { useSearchParamPagination } from '../../../common/hooks/useSearchParamPagination';
import { format } from 'date-fns';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from '../../molecules/Table/constants/page';
import { DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Search from '../../atoms/Search';

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

  /******************************************
   * Handler
   ******************************************/

  /**
   * 페이지 정보 변경시
   * @param page
   * @param pageSize
   */
  function onChangePagination(page: number, pageSize: number) {
    changeSearchParams({
      page: (page - 1).toString(),
      size: pageSize.toString(),
    });
  }

  /******************************************
   * Lifecycle
   ******************************************/

  /**
   * 게시글 조회
   */
  const { data, searchParams, changeSearchParams } = useSearchParamPagination<
    Page<Board>
  >(
    (params: URLSearchParams): Promise<Page<Board>> =>
      HttpClient.get('/api/boards', {
        params: {
          page: getCurrentPageNumberToUsedInRequest(params),
          size: getCurrentPageSize(params),
        },
      })
        .then(response => response?.data)
        .catch(_ => []),
  );

  /******************************************
   * Render
   ******************************************/

  return (
    <>
      <ListTemplate>
        <Search onSearch={value => console.log(value)} />
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
      </ListTemplate>
    </>
  );
};

export default Boards;
