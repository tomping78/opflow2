import React, { ReactNode } from 'react';
import {
  Loadable,
  RecoilState,
  RecoilValue,
  useRecoilCallback,
  useRecoilTransactionObserver_UNSTABLE,
  useRecoilValue,
} from 'recoil';
import { Spin } from 'antd';
import { spinState } from './store/spin';

export let RecoilGetLoadable: <T>(recoilValue: RecoilValue<T>) => Loadable<T> =
  null as any;

export let RecoilSet: <T>(
  recoilVal: RecoilState<T>,
  valOrUpdater: ((currVal: T) => T) | T,
) => void = null as any;

type SpinStatePortalProps = {
  children: ReactNode;
};

const SpinStatePortal = ({ children }: SpinStatePortalProps) => {
  /******************************************
   * Constant / State
   ******************************************/

  /******************************************
   * Global State
   ******************************************/

  const spinStateValue = useRecoilValue(spinState);

  /******************************************
   * Handler
   ******************************************/

  /******************************************
   * Function
   ******************************************/

  /******************************************
   * Lifecycle
   ******************************************/

  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    RecoilGetLoadable = snapshot.getLoadable;
  });

  useRecoilCallback(({ set }) => {
    RecoilSet = set;
    return async () => {};
  })();

  /******************************************
   * Render
   ******************************************/

  return (
    <Spin
      size={'large'}
      spinning={spinStateValue > 0}
      style={{
        maxHeight: 'none',
      }}
    >
      {children}
    </Spin>
  );
};

export default SpinStatePortal;
