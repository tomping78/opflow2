import React, { ReactNode, useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

const DebugObserver = ({ children }: { children: ReactNode }) => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    // @ts-ignore
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(`[Recoil Debug] ${node.key}:`, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return <>{children}</>;
};

export default DebugObserver;
