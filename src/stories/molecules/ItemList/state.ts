import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { ItemProps } from '../../atoms/Item';

/**
 * state
 */
const itemListState = atom<Array<ItemProps>>({
  key: 'ITEM_LIST',
  default: [],
});

/**
 * 조회
 */
export function useGetItemList(): ItemProps[] {
  return useRecoilValue(itemListState);
}

/**
 * 추가
 */
export function useAddItem() {
  const changeItemList = useSetRecoilState(itemListState);

  function addItemToList(item: ItemProps) {
    changeItemList((itemList) => [...itemList, item]);
  }

  return addItemToList;
}

/**
 * 제거
 */
export function useRemoveItem() {
  const changeItemList = useSetRecoilState(itemListState);

  function removeItemInList(item: ItemProps) {
    changeItemList((itemList) =>
      (itemList ?? []).filter(
        (itemState: ItemProps) => itemState.value !== item.value,
      ),
    );
  }

  return removeItemInList;
}
