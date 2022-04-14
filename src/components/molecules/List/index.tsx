import React, { ReactNode } from 'react';
import { Pagination, List as AntdList } from 'antd';

interface ListProps<T> {
  list?: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  usePagination?: boolean;
  currentPage?: number;
  totalPage?: number;
  onChangePage?: (page: number, pageSize: number) => void;
}

/**
 * TODO: ...
 *
 * @Author: circlegiven
 * @Date: 2022-03-24
 */
const List = <T,>({
  list,
  renderItem,
  usePagination = false,
  currentPage,
  totalPage,
  onChangePage,
}: ListProps<T>) => {
  /******************************************
   * Constant / State
   * ****************************************/

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  /******************************************
   * Function
   * ****************************************/

  /******************************************
   * Lifecycle
   * ****************************************/

  /******************************************
   * Render
   * ****************************************/
  return (
    <AntdList
      footer={
        usePagination && (
          <Pagination
            current={currentPage}
            total={totalPage}
            onChange={onChangePage}
          />
        )
      }
      bordered
      dataSource={list ?? []}
      renderItem={renderItem}
    />
  );
};

export default List;
