import React, { useMemo } from 'react';
import './App.css';
import Main from './Main';
import { Spin } from 'antd';
import { useIsFetching, useIsMutating } from 'react-query';

/**
 * 전역에 설정이 필요한 경우
 *  - <Main /> 컴포넌트에서 작성해주세요
 */
function App() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const isLoading = useMemo(
    () => hasFetching(isFetching) || hasMutating(isMutating),
    [isFetching, isMutating],
  );

  function hasFetching(count: number) {
    return (count ?? 0) > 0;
  }

  function hasMutating(count: number) {
    return (count ?? 0) > 0;
  }

  return (
    <Spin
      size={'large'}
      spinning={isLoading}
      style={{
        maxHeight: 'none',
      }}
    >
      <Main />
    </Spin>
  );
}

export default App;
