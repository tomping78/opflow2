import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

function GridContainer() {
  return (
    <Row className="contentWrap">
      <Col className="contentWrap-inner">
        <Title level={4}>Matrix Table</Title>
        <div className="MatrixGridArea">
          <div className="MatrixGrid">
            <div className="grid-container">
              <div className="grid-item item1">1</div>
              <div className="grid-item item2">2</div>
              <div className="grid-item item3">3</div>
              <div className="grid-item item4">4</div>
              <div className="grid-item item5">5</div>
              <div className="grid-item item6">6</div>
              <div className="grid-item item7">7</div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default GridContainer;
