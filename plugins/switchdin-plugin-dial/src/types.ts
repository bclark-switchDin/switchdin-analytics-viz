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
 import { EChartOption } from 'echarts';
 import blueAsset from './images/blue-gauge-panel.png';
 import greenAsset from './images/green-gauge-image.png';
 import orangeAsset from './images/orange-gauge-panel.png';
 import pinkAsset from './images/pink-gauge-panel.png';
 import purpleAsset from './images/purple-gauge-panel.png';
 import redAsset from './images/red-gauge-panel.png';
 import yellowAsset from './images/yellow-gauge-panel.png';
 
 export {blueAsset, greenAsset, orangeAsset, pinkAsset, purpleAsset, redAsset, yellowAsset}

 export type EchartsGaugeFormData = {
     panelImageURL:string,
     primaryColour:imageAssets,
     suffix:string,
     prefix:string,
     circleColour:string,
     textColour:string,
     animationDuration:number,
     animationDurationUpdate:number,
     animationEasingUpdate?:string,
     valOnRadianMax:number,
     outerRadius:number,
     innerRadius:number,
     pointerInnerRadius:number,
     insidePanelRadius:number,
     currentDataIndex:number
 };
   
 export enum EchartsGaugeLabelType {
   Key = 'key',
   Value = 'value',
   Percent = 'percent',
   KeyValue = 'key_value',
   KeyPercent = 'key_percent',
   KeyValuePercent = 'key_value_percent',
 }

 export enum imageAssets {
  blue = 'blue',
  green = 'green',
  orange = 'orange',
  pink = 'pink',
  purple = 'purple',
  red = 'red',
  yellow = 'yellow'
 }

 export const DEFAULT_FORM_DATA : EchartsGaugeFormData = {
   panelImageURL: redAsset,
   primaryColour: imageAssets.red,
   suffix: '%',
   prefix: ' ',
   circleColour: 'white',
   textColour: 'black',
   animationDuration:1000,
   animationDurationUpdate:1000,
   animationEasingUpdate:'quarticInOut',
   valOnRadianMax:100,
   outerRadius:150,
   innerRadius:140,
   pointerInnerRadius:40,
   insidePanelRadius:110,
   currentDataIndex:0
 }

 export type EchartsStylesProps = {
  height: number;
  width: number;
};

export interface EchartsProps {
  height: number;
  width: number;
  echartOptions: EChartOption;
}