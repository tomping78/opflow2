import React, { ReactNode, useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

/**
 * 리코일 디버깅 옵저버
 *
 * @param children ReactNode
 * @constructor
 */
const DebugRecoilObserver = ({ children }: { children: ReactNode }) => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(`[Recoil Debug] ${node.key}:`, snapshot.getLoadable(node));
    }
  }, [snapshot]);
  return <>{children}</>;
};

/**
 * 스토어 디버깅 옵저버
 *
 * @param children ReactNode
 * @param defaultActiveCondition boolean
 * @constructor
 */
const DebugStoreObserver = ({
  children,
  defaultActiveCondition = process.env.NODE_ENV !== 'production',
}: {
  children: ReactNode;
  defaultActiveCondition?: boolean;
}) => {
  return (
    <>
      {defaultActiveCondition ? (
        <DebugRecoilObserver>{children}</DebugRecoilObserver>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default DebugStoreObserver;
