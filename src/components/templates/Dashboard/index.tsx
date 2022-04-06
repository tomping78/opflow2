import React from 'react';
import BaseTemplate from '../BaseTemplate';

/**
 * 대시보드
 * @constructor
 */
const Dashboard = () => {
  return (
    <BaseTemplate>
      <div
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span
          style={{
            display: 'block',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          대시보드
        </span>
      </div>
    </BaseTemplate>
  );
};

export default Dashboard;
