import React from 'react';
import HeatMap from '../../molecules/HeatMap';
import { map } from 'lodash';

interface MatrixProp {
  data: any[];
  xAxis: any[];
  yAxis: any[];
}

/**
 *
 * Author: circlegiven
 * Date: 2022-04-27
 */
const MatrixTable = ({ data = [], xAxis, yAxis }: MatrixProp) => {
  /******************************************
   * Constant / State
   * ****************************************/

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  /******************************************
   * Function
   * ****************************************/

  /******************************************
   * Lifecycle
   * ****************************************/

  /******************************************
   * Render
   * ****************************************/
  return (
    <table className="MatrixGrid">
      <colgroup>
        <col />
        <col span={xAxis.length} />
      </colgroup>
      <thead>
        <tr></tr>
        <tr className="MatrixHeader">
          <th className="PartHeader">구분</th>
          {map(xAxis, (d, i) => (
            <th key={i}>{d}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {map(yAxis, (d, i: number) => (
          <tr
            className="MatrixRow"
            key={i}>
            <td>{d}</td>
            {i === 0 ? (
              <td
                className="graph"
                rowSpan={yAxis.length}
                colSpan={xAxis.length}>
                <HeatMap
                  xAxis={xAxis}
                  yAxis={yAxis}
                  data={data}
                />
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MatrixTable;
