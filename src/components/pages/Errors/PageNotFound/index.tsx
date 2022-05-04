import React from 'react';
import BaseTemplate from '../../../templates/BaseTemplate';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * 페이지를 찾지 못했습니다
 *  - e.g) 404
 * @constructor
 */
const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <BaseTemplate>
      <Result
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button
            type='primary'
            onClick={() => navigate('/')}>
            홈으로 이동
          </Button>
        }
      />
    </BaseTemplate>
  );
};

export default PageNotFound;
