import React from 'react';
import { ListTemplateA } from '../../templates/ListTemplate';
import { format } from 'date-fns';
import { DeleteOutlined } from '@ant-design/icons';
import { message } from 'antd';

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

  /******************************************
   * Handler
   ******************************************/

  /******************************************
   * Lifecycle
   ******************************************/

  /******************************************
   * Render
   ******************************************/

  return (
    <ListTemplateA
      title={'게시판'}
      subTitle="여행 도서 목록 입니다"
      url={'/api/boards'}
      columns={columns}
    />
  );
};

export default Boards;
