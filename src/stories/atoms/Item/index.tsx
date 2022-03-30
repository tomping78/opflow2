import React from 'react';
import { useRemoveItem } from '../../molecules/ItemList/state';

export type ItemProps = {
  value: string;
};

const Item = (item: ItemProps) => {
  // recoil state 제거
  const removeItem = useRemoveItem();

  function removeHandler() {
    removeItem(item);
  }

  return (
    <li>
      {item?.value} <span onClick={removeHandler}>remove</span>
    </li>
  );
};

export default Item;
