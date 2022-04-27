import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title } = Typography;

function Matrix() {
  return (
    <Row className="contentWrap">
      <Col className="contentWrap-inner">
        <Title level={4}>Matrix Table</Title>
        <div className="MatrixGridArea">
          <table className="MatrixGrid">
            <colgroup>
              <col
                span={10}
                width="1%"
              />
            </colgroup>
            <thead>
              <tr className="MatrixHeader">
                <th
                  className="PartHeader"
                  rowSpan={2}>
                  구분
                </th>
                <th colSpan={2}>ghfdddsgd</th>
                <th rowSpan={2}>7859435</th>
                <th rowSpan={2}>7859435</th>
                <th rowSpan={2}>7859435</th>
                <th rowSpan={2}>7859435</th>
                <th rowSpan={2}>7859435</th>
                <th rowSpan={2}>7859435</th>
                <th rowSpan={2}>7859435</th>
              </tr>
              <tr>
                <th className="HeadSub">hdfsgf</th>
                <th className="HeadSub">hdfsgf</th>
              </tr>
            </thead>
            <tbody>
              <tr className="MatrixRow">
                <td>7859435</td>
                <td>765435</td>
                <td>7835</td>
                <td>7859435</td>
                <td>7835</td>
                <td>785945555555555535</td>
                <td>7835</td>
                <td>7859435</td>
                <td>7859435</td>
                <td>7859435</td>
              </tr>
              <tr className="MatrixRow">
                <td>7859435</td>
                <td>765435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7859435</td>
                <td>7859435</td>
              </tr>
              <tr className="MatrixRow">
                <td>7859435</td>
                <td>765435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7859435</td>
                <td>7859435</td>
              </tr>
              <tr className="MatrixRow">
                <td>7859435</td>
                <td>765435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7859435</td>
                <td>7859435</td>
              </tr>
              <tr className="MatrixRow">
                <td>7859435</td>
                <td>765435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7855</td>
                <td>7859435</td>
                <td>7859435</td>
                <td>7859435</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  );
}

export default Matrix;
