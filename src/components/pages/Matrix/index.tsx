import React, { useEffect, useState } from 'react';
import { Col, Row, Typography } from 'antd';
import MatrixTable from '../../organisms/MatrixTable';
import { csv } from 'd3';

const { Title } = Typography;

// Labels of row and columns
const myGroups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const myVars = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10'];

const Matrix = () => {
  const [xAxis] = useState(myGroups);
  const [yAxis] = useState(myVars);

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    csv(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv',
    ).then((d) => setData(d));
  }, []);

  return (
    <Row className="contentWrap">
      <Col className="contentWrap-inner">
        <Title level={4}>Matrix Table</Title>
        <div className="MatrixGridArea">
          <MatrixTable
            xAxis={xAxis}
            yAxis={yAxis}
            data={data}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Matrix;
