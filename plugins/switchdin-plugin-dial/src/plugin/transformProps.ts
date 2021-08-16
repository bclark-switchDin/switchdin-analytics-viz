/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ChartProps, TimeseriesDataRecord } from '@superset-ui/core';
import { EChartOption } from 'echarts';
import {blueAsset, greenAsset, orangeAsset, pinkAsset, purpleAsset, redAsset, yellowAsset} from '../types'
 
import {
  DEFAULT_FORM_DATA as DEFAULT_GAUGE_FORM_DATA,
  EchartsGaugeFormData,
} from '../types';

export default function transformProps(chartProps: ChartProps) {
  /**
   * This function is called after a successful response has been
   * received from the chart data endpoint, and is used to transform
   * the incoming data prior to being sent to the Visualization.
   *
   * The transformProps function is also quite useful to return
   * additional/modified props to your data viz component. The formData
   * can also be accessed from your SwitchdinPluginDial.tsx file, but
   * doing supplying custom props here is often handy for integrating third
   * party libraries that rely on specific props.
   *
   * A description of properties in `chartProps`:
   * - `height`, `width`: the height/width of the DOM element in which
   *   the chart is located
   * - `formData`: the chart data request payload that was sent to the
   *   backend.
   * - `queriesData`: the chart data response payload that was received
   *   from the backend. Some notable properties of `queriesData`:
   *   - `data`: an array with data, each row with an object mapping
   *     the column/alias to its value. Example:
   *     `[{ col1: 'abc', metric1: 10 }, { col1: 'xyz', metric1: 20 }]`
   *   - `rowcount`: the number of rows in `data`
   *   - `query`: the query that was issued.
   *
   * Please note: the transformProps function gets cached when the
   * application loads. When making changes to the `transformProps`
   * function during development with hot reloading, changes won't
   * be seen until restarting the development server.
   */
   const { width, height, formData, queriesData } = chartProps;
   const data = queriesData[0].data as TimeseriesDataRecord[];
   console.log('data via test transformProps', data);
   const data2 = data[0]
   console.log('data2 via test transformProps', data2);
   console.log('metrics via test transformProps', formData.metrics[0])
   const metric = formData.metrics[0] //Metric name can be found in the formData object under metrics
   console.log('metric  via test transformProps', metric);
   const data3 = data2[metric] //Need to account for metric name, not just count.
   console.log('data3 via test transformProps', data3);
   const {
    primaryColour,
    prefix,
    suffix,
    circleColour,
    textColour,
    animationDuration,
    animationDurationUpdate,
    valOnRadianMax,
    outerRadius,
    innerRadius,
    pointerInnerRadius,
    insidePanelRadius,
   }: EchartsGaugeFormData = { ...DEFAULT_GAUGE_FORM_DATA, ...formData };
   
 
 
   console.log('formData via TransformProps.ts', formData);
   console.log('queriesData via TransformProps.ts', queriesData);
 
   function renderItem(params: { coordSys: any; }, api: { value: (arg0: number) => any; coord: (arg0: any[]) => any; }) {
     var valOnRadian = api.value(1);
     var coords = api.coord([api.value(0), valOnRadian]);
     var polarEndRadian = coords[3];
     var selectedPanelImageURL;
     switch(primaryColour){
         case 'blue':
            selectedPanelImageURL = blueAsset;
            break;
         case 'green':
            selectedPanelImageURL = greenAsset;
            break;
        case 'orange':
            selectedPanelImageURL = orangeAsset;
            break;
        case 'pink':
            selectedPanelImageURL = pinkAsset;
            break;
        case 'purple':
            selectedPanelImageURL = purpleAsset;
            break;
        case 'red':
            selectedPanelImageURL = redAsset;
            break;
        case 'yellow':
            selectedPanelImageURL = yellowAsset;
            break;
     }
     var imageStyle = {
         image: selectedPanelImageURL,
         x: params.coordSys.cx - outerRadius,
         y: params.coordSys.cy - outerRadius,
         width: outerRadius * 2,
         height: outerRadius * 2
     };
 
     return {
         type: 'group',
         children: [{
             type: 'image',
             style: imageStyle,
             clipPath: {
                 type: 'sector',
                 shape: {
                     cx: params.coordSys.cx,
                     cy: params.coordSys.cy,
                     r: outerRadius,
                     r0: innerRadius,
                     startAngle: 0,
                     endAngle: -polarEndRadian,
                     transition: 'endAngle',
                     enterFrom: { endAngle: 0 }
                 }
             }
         }, {
             type: 'image',
             style: imageStyle,
             clipPath: {
                 type: 'polygon',
                 shape: {
                     points: makePionterPoints(params, polarEndRadian)
                 },
                 extra: {
                     polarEndRadian: polarEndRadian,
                     transition: 'polarEndRadian',
                     enterFrom: { polarEndRadian: 0 }
                 },
                 during: function (apiDuring: { setShape: (arg0: string, arg1: any[][]) => void; getExtra: (arg0: string) => any; }) {
                     apiDuring.setShape(
                         'points',
                         makePionterPoints(params, apiDuring.getExtra('polarEndRadian'))
                     );
                 }
             }
         }, {
             type: 'circle',
             shape: {
                 cx: params.coordSys.cx,
                 cy: params.coordSys.cy,
                 r: insidePanelRadius
             },
             style: {
                 fill: circleColour,
                 shadowBlur: 25,
                 shadowOffsetX: 0,
                 shadowOffsetY: 0,
                 shadowColor: primaryColour
             }
         }, {
             type: 'text',
             extra: {
                 valOnRadian: valOnRadian,
                 transition: 'valOnRadian',
                 enterFrom: { valOnRadian: 0 }
             },
             style: {
                 text: makeText(valOnRadian),
                 fontSize: 50,
                 fontWeight: 700,
                 x: params.coordSys.cx,
                 y: params.coordSys.cy,
                 fill: textColour,
                 align: 'center',
                 verticalAlign: 'middle',
                 enterFrom: { opacity: 0 }
             },
         }]
     };
 
     function convertToPolarPoint(renderItemParams: { coordSys: { cx: number; cy: number; }; }, radius: number, radian: number) {
       return [
           Math.cos(radian) * radius + renderItemParams.coordSys.cx,
           -Math.sin(radian) * radius + renderItemParams.coordSys.cy
       ];
     }
 
     function makePionterPoints(renderItemParams: { coordSys: { cx: number; cy: number; } | { cx: number; cy: number; }; }, polarEndRadian: number) {
         return [
             convertToPolarPoint(renderItemParams, outerRadius, polarEndRadian),
             convertToPolarPoint(renderItemParams, outerRadius, polarEndRadian + Math.PI * 0.03),
             convertToPolarPoint(renderItemParams, pointerInnerRadius, polarEndRadian)
         ];
     }
 
     function makeText(valOnRadian: number) {
         // Validate additive animation calc.
         if (valOnRadian < -10) {
             alert('illegal during val: ' + valOnRadian);
         }
         return prefix + (valOnRadian / valOnRadianMax * 100).toFixed(0) + suffix;
     }
   }
 
   
   const echartOptions: EChartOption = {
     animationDuration: animationDuration,
     animationDurationUpdate: animationDurationUpdate,
     dataset: {
         source: [[1, data3]]
     },
     tooltip: {},
     angleAxis: {
         type: 'value',
         startAngle: 0,
         axisLine: { show: false },
         axisTick: { show: false },
         axisLabel: { show: false },
         splitLine: { show: false },
         min: 0,
         max: valOnRadianMax
     },
     radiusAxis: {
         type: 'value',
         axisLine: { show: false },
         axisTick: { show: false },
         axisLabel: { show: false },
         splitLine: { show: false }
     },
     polar: {},
     series: [{
         type: 'custom',
         coordinateSystem: 'polar',
         renderItem: renderItem
     }]
   };
 
   return {
     width,
     height,
     echartOptions,
     data,
     renderItem
   };
 
 }