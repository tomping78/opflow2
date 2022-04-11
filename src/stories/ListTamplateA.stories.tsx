import React from 'react';
import { ListTemplateA } from '../components/templates/ListTemplate';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { format } from 'date-fns';
import { DeleteOutlined } from '@ant-design/icons';
import { message, Select } from 'antd';
import { FilterProp } from '../components/molecules/Filter';
import Search from '../components/atoms/Search';

export default {
  title: '컴포넌트/목록 유형',
  component: ListTemplateA,
  argTypes: {
    // Assigns the argType to the Text category
    title: {
      table: {
        category: 'Text',
      },
    },
    subTitle: {
      table: {
        category: 'Text',
      },
    },
    url: {
      table: {
        category: 'Text',
      },
    },
    // Assigns the argType to the Data category
    columns: {
      table: {
        category: 'Data',
      },
    },
    filters: {
      table: {
        category: 'Data',
      },
    },
    // Assigns the argType to the Events category
    onClick: {
      table: {
        category: 'Events',
      },
    },
    onDoubleClick: {
      table: {
        category: 'Events',
      },
    },
  },
} as ComponentMeta<typeof ListTemplateA>;

const Template: ComponentStory<typeof ListTemplateA> = args => (
  <ListTemplateA {...args} />
);

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
      <Select defaultValue="lucy" placeholder={'선택해주세요'}>
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

export const 유형_A = Template.bind({});
유형_A.args = {
  title: '목록 유형 A',
  subTitle: '목록 유형 A형 예제',
  url: '/api/boards',
  columns,
  filters,
};
