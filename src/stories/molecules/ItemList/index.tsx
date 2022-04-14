import React from 'react';
import Item, { ItemProps } from '../../atoms/Item';
import { useGetItemList } from './state';

const ItemList = () => {
  // recoil state 조회
  const list: ItemProps[] = useGetItemList();

  return (
    <ul>
      {(list ?? []).map((item: ItemProps, index) => (
        <Item
          key={index}
          value={item.value}
        />
      ))}
    </ul>
  );
};

export default ItemList;
