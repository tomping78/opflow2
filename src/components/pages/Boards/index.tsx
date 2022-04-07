import React from 'react';
import { ListTemplateA } from '../../templates/ListTemplate';
import { format } from 'date-fns';
import { DeleteOutlined } from '@ant-design/icons';
import { message, Select } from 'antd';
import { FilterProp } from '../../molecules/Filter';
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

const filters: FilterProp[] = [
  {
    name: 'category',
    label: '카테고리',
    component: (
      <Select placeholder={'선택해주세요'}>
        <Select.Option value="jack">Jack</Select.Option>
        <Select.Option value="lucy">Lucy</Select.Option>
      </Select>
    ),
  },
  {
    name: 'country',
    label: '국가',
    component: (
      <Select placeholder={'선택해주세요'}>
        <Select.Option value="KOR">KOR</Select.Option>
        <Select.Option value="JPN">JPN</Select.Option>
      </Select>
    ),
  },
  {
    name: 'keyword',
    label: '검색어',
    component: <Search placeholder={'제목이나 내용을 입력하세요'} />,
  },
];

/**
 * 목록 A 유형을 사용해서 작성한 게시판 예시 입니다
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
      filters={filters}
    />
  );
};

export default Boards;
