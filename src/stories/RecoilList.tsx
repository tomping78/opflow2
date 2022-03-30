import React from 'react';
import { Button } from 'antd';
import ItemList from './molecules/ItemList';
import { useAddItem } from './molecules/ItemList/state';

const RecoilList: React.VFC = () => {
  const addItem = useAddItem();

  function addHandler() {
    addItem({ value: Math.random().toString() });
  }

  return (
    <>
      <div>
        <Button onClick={addHandler}>ADD</Button>
      </div>
      <ItemList />
    </>
  );
};
export default RecoilList;
