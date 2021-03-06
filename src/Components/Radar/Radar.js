import React from 'react';
import { Group } from '@visx/group';
import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleLinear } from '@visx/scale';
import { Point } from '@visx/point';
import { Line, LineRadial } from '@visx/shape';

const orange = '#ff9933';
export const pumpkin = '#f5810c';
const silver = '#d9d9d9';
export const background = '#FAF7E9';

const degrees = 360;
const data = [{displacement: .1, letter: 'a'},{displacement: .1, letter: 'b'},{displacement: .1, letter: 'c'},{displacement: 0.4, letter: 'd'}]

const y = (d) => d.displacement;

const genAngles = (length) =>
  [...new Array(length + 1)].map((_, i) => ({
    angle: (i * (degrees / length))+45,
  }));

const genPoints = (length, radius) => {
  const step = (Math.PI * 2) / length;
  return [...new Array(length)].map((_, i) => ({
    x: radius * Math.sin((i * step) + (step / 2)),
    y: radius * Math.cos((i * step)+ (step / 2)),
  }));
};

function genPolygonPoints(
  dataArray,
  scale,
  getValue,
) {
  const step = (Math.PI * 2) / dataArray.length;
  const points = new Array(dataArray.length).fill({ x: 0, y: 0 });
  const pointString = new Array(dataArray.length + 1).fill('').reduce((res, _, i) => {
    if (i > dataArray.length) return res;
    const xVal = scale(getValue(dataArray[i - 1])) * Math.sin((i * step) + (step / 2));
    const yVal = scale(getValue(dataArray[i - 1])) * Math.cos((i * step) + (step / 2));
    points[i - 1] = { x: xVal, y: yVal };
    res += `${xVal},${yVal} `;
    return res;
  });

  return { points, pointString };
}

const defaultMargin = { top: 40, left: 80, right: 80, bottom: 80 };



export default function Example({ width = 600, height = 600, levels = 15, margin = defaultMargin , selectedBootData}) {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;
    console.log(data)
  const radialScale = scaleLinear({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear({
    range: [0, radius],
    domain: [0, Math.max(...selectedBootData[5].data.map(y))],
  });

  const webs = genAngles(data.length);
  const points = genPoints(data.length, radius);
  const polygonPoints = genPolygonPoints(data, (d) => yScale(d) ?? 0, y);
  const zeroPoint = new Point({ x: 0, y: 0 });


  let centerSquarePoints= [{displacement:7 , letter: 'a'},{displacement: 7, letter: 'b'},{displacement: 7, letter: 'c'},{displacement: 7, letter: 'd'}]
  let centerPolygonPoints = genPolygonPoints(centerSquarePoints, (d) => yScale(d) ?? 0, y);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect fill={background} width={width} height={height} rx={14} />
      <Group top={height / 2 - margin.top} left={width / 2}>
        {[...new Array(levels)].map((_, i) => {
            let points = [{displacement: 1+i, letter: 'a'},{displacement: 1+i, letter: 'b'},{displacement: 1+i, letter: 'c'},{displacement: 1+i, letter: 'd'}]
            let polygonPoints = genPolygonPoints(points, (d) => yScale(d) ?? 0, y);
            return (
                <polygon
                points={polygonPoints.pointString}
                fill={orange}
                fillOpacity={0}
                stroke={silver}
                strokeWidth={1}
                />
            )
            }
        )}
        {[...new Array(data.length)].map((_, i) => (
          <Line key={`radar-line-${i}`} from={zeroPoint} to={points[i]} stroke={silver} />
        ))}
        {selectedBootData.map((d, i) => {
            console.log(d.data)
            console.log(data)
            let polygonPoints = genPolygonPoints(d.data, (d) => yScale(d) ?? 0, y);
            
            return(
                <>
                    <polygon
                        points={polygonPoints.pointString}
                        fill={orange}
                        fillOpacity={0}
                        stroke={orange}
                        strokeWidth={1}
                    />
                    {polygonPoints.points.map((point, i) => (
                    <circle key={`radar-point-${i}`} cx={point.x} cy={point.y} r={4} fill={pumpkin} />
                    ))}
                </>
            )
        })}

        
       
            
        <polygon
        points={centerPolygonPoints.pointString}
        fillOpacity={0}
        stroke={'#000000'}
        strokeWidth={1}
        />
            
        
       
      </Group>
    </svg>
  );
}