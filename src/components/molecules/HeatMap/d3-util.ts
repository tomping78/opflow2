import { max, mean, min, scaleBand, scaleLinear } from 'd3';

export const generateXScale = (width: number, domains: []) => {
  return scaleBand().range([0, width]).domain(domains);
};

export const generateYScale = (height: number, domains: []) => {
  return scaleBand().range([height, 0]).domain(domains);
};

export function generateGradationColorScale({
  lowColor,
  midColor,
  highColor,
  values,
}: {
  lowColor: string;
  midColor: string;
  highColor: string;
  values: number[];
}) {
  return scaleLinear<string>()
    .domain(extentValues(values))
    .range([lowColor, midColor, highColor]);
}

function extentValues(values: number[]) {
  const minValue = min(values);
  const meanValue = mean(values);
  const maxValue = max(values);

  const result = new Array<number>();

  if (minValue !== undefined) {
    result.push(minValue);
  }

  if (meanValue !== undefined) {
    result.push(meanValue);
  }

  if (maxValue !== undefined) {
    result.push(maxValue);
  }

  return result;
}
