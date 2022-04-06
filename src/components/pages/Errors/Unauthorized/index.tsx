import React from 'react';
import BaseTemplate from '../../../templates/BaseTemplate';

/**
 * 권한 없음
 *  - e.g) 401
 * @constructor
 */
const Unauthorized = () => {
  return (
    <BaseTemplate>
      <div className={'401'}>404</div>
    </BaseTemplate>
  );
};

export default Unauthorized;
