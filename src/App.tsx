import React from 'react';
import './App.css';
import SpinStatePortal from './SpinStatePortal';
import Main from './Main';

/**
 * 전역에 설정이 필요한 경우
 *  - <Main /> 컴포넌트에서 작성해주세요
 */
function App() {
  return (
    <SpinStatePortal>
      <Main />
    </SpinStatePortal>
  );
}

export default App;
