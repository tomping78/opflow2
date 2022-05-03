import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import {
  generateGradationColorScale,
  generateXScale,
  generateYScale,
} from './d3-util';

/**
 *
 * Author: circlegiven
 * Date: 2022-04-27
 */
const HeatMap = ({ xAxis, yAxis, data }: any) => {
  /******************************************
   * Constant / State
   * ****************************************/

  const svgRef = useRef<SVGSVGElement>(null);

  /******************************************
   * Global State
   * ****************************************/

  /******************************************
   * Handler
   * ****************************************/

  /******************************************
   * Function
   * ****************************************/

  function isEmptyData(d: []) {
    return (d ?? []).length === 0;
  }

  const svgElementOf = (ref: React.RefObject<SVGSVGElement>) => {
    return ref?.current;
  };

  const parentElementOf = (ref: React.RefObject<SVGSVGElement>) => {
    return svgElementOf(ref)?.parentElement;
  };

  const parentElementWidthOf = (ref: React.RefObject<SVGSVGElement>) => {
    return parentElementOf(ref)?.clientWidth;
  };

  const parentElementHeightOf = (ref: React.RefObject<SVGSVGElement>) => {
    return parentElementOf(ref)?.clientHeight;
  };

  /******************************************
   * Lifecycle
   * ****************************************/

  useEffect(() => {
    if (isEmptyData(data)) {
      return;
    }

    const width = parentElementWidthOf(svgRef);
    const height = parentElementHeightOf(svgRef);

    const svg = d3.select(svgElementOf(svgRef));
    svg.attr('viewBox', `0 0 ${width} ${height}`);

    if (width === undefined || height === undefined) {
      return;
    }

    // calculate scale
    const xScale = generateXScale(width, xAxis);
    const yScale = generateYScale(height, yAxis);
    const colorScale = generateGradationColorScale({
      lowColor: 'red',
      highColor: 'blue',
      midColor: 'white',
      values: data.map((d: any) => d.value),
    });

    svg
      .selectAll()
      // @ts-ignore
      .data(data, (d: { group: string; variable: string; value: number }) => {
        return d.group + ':' + d.variable;
      })
      .join('rect')
      // @ts-ignore
      .attr('x', function (d) {
        return xScale(d.group);
      })
      // @ts-ignore
      .attr('y', function (d) {
        return yScale(d.variable);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', function (d) {
        return colorScale(d.value);
      });
  }, [xAxis, yAxis, data]);

  /******************************************
   * Render
   * ****************************************/
  return (
    <svg
      viewBox={'0 0 100 28'}
      preserveAspectRatio="none"
      ref={svgRef}></svg>
  );
};

export default HeatMap;
