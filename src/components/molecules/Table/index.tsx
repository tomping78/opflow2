import React, { useCallback } from 'react';
import { Table as AntdTable } from 'antd';
import { DEFAULT_PAGE, PAGE_SIZE_10, PAGE_SIZE_LIST } from './constants/page';
import { TablePaginationConfig } from 'antd/lib/table/interface';
import { TableProps as AntdTableProps } from 'antd/lib/table/Table';
import { addComma } from '../../../common/utils/numeric-utils';

const DEFAULT_ROW_KEY = 'id';

export type TablePaginationPosition =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

export interface TableProps<T>
  extends Omit<AntdTableProps<T>, 'pagination' | 'onRow' | 'rowSelection'> {
  usePagination?: boolean;
  paginationOptions?: TablePaginationConfig;
  defaultPageSize?: number;
  defaultCurrentPage?: number;
  pageSize?: number;
  currentPage?: number;
  pageSizeList?: number[];
  paginationPosition?: TablePaginationPosition;
  total?: number;
  onClick?: (data: T, index: number) => void;
  onDoubleClick?: (data: T, index: number) => void;
  onChangePage?: (page: number, pageSize: number) => void;
}

/**
 * Antd table wrapper component
 */
const Table = <T extends object = any>({
  usePagination,
  paginationOptions,
  defaultPageSize = PAGE_SIZE_10,
  defaultCurrentPage = DEFAULT_PAGE,
  pageSize = PAGE_SIZE_10,
  currentPage = DEFAULT_PAGE,
  pageSizeList = PAGE_SIZE_LIST,
  paginationPosition = 'bottomCenter',
  onClick,
  onDoubleClick,
  onChangePage,
  rowKey = DEFAULT_ROW_KEY,
  total,
  ...rest
}: TableProps<T>) => {
  /******************************************
   * Constant / State
   * ****************************************/

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  const handleRowClick = useCallback((data, index) => {
    if (!onClick) return;
    return onClick(data, index);
  }, []);

  const handleRowDoubleClick = useCallback((data, index) => {
    if (!onDoubleClick) return;
    return onDoubleClick(data, index);
  }, []);

  /******************************************
   * Function
   * ****************************************/

  /******************************************
   * Lifecycle
   * ****************************************/

  /******************************************
   * Render
   * ****************************************/
  return usePagination ? (
    <AntdTable<T>
      {...rest}
      rowKey={rowKey}
      pagination={{
        ...paginationOptions,
        showSizeChanger: true,
        total: total,
        defaultPageSize: defaultPageSize,
        defaultCurrent: defaultCurrentPage,
        current: currentPage,
        pageSize: pageSize,
        position: [paginationPosition],
        pageSizeOptions: pageSizeList,
        showTotal: totalCount => `Total: ${addComma(totalCount)}`,
        onChange: onChangePage,
      }}
      onRow={(data, index) => ({
        onClick: () => handleRowClick(data, index),
        onDoubleClick: () => handleRowDoubleClick(data, index),
      })}
    />
  ) : (
    <AntdTable
      {...rest}
      rowKey={rowKey}
      pagination={false}
      onRow={(data, index) => ({
        onClick: () => handleRowClick(data, index),
        onDoubleClick: () => handleRowDoubleClick(data, index),
      })}
    />
  );
};

export default Table;
