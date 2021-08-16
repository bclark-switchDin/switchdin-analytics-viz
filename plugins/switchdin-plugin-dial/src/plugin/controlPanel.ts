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
import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig, sections } from '@superset-ui/chart-controls';
import { DEFAULT_FORM_DATA } from '../types';
import { imageAssets } from '../types';

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
} = DEFAULT_FORM_DATA;

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (tranlated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an intger or decimal value
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [['metrics'], ['adhoc_filters'],        
      [
        {
          name: 'valOnRadianMax',
          config: {
            type: 'TextControl',
            label: t('Fraction Denominator'),
            renderTrigger: true,
            default: valOnRadianMax,
            description: t('Sample Space Size. Query result will be divided by this and then multiplied by 100 to give %'),
          },
        },
      ],
      [
        {
          name: 'prefix',
          config: {
            type: 'TextControl',
            label: t('Prefix for Displayed Metric'),
            renderTrigger: true,
            default: prefix,
            description: t('Appears before the metric displayed in the center'),
          },
        },
      ],
      [
        {
          name: 'suffix',
          config: {
            type: 'TextControl',
            label: t('Suffix for Displayed Metric'),
            renderTrigger: true,
            default: suffix,
            description: t('Appears after the metric displayed in the center'),
          },
        },
      ],
    ],
    },
    {
      label: t('Colour'),
      expanded: true,
      controlSetRows: [[
          {
            name: 'circleColour',
            config: {
              type: 'TextControl',
              label: t('Inner Circle Colour'),
              renderTrigger: true,
              default: circleColour,
              description: t('Defines the Colour the Inner Circle. Can use any type of colour definer.'),
            },
          },
        ],
        [
          {
            name: 'textColour',
            config: {
              type: 'TextControl',
              label: t('Text Colour'),
              renderTrigger: true,
              default: textColour,
              description: t('Colour of Text. Can use any type of colour definer.'),
            },
          },
        ],
        [
          {
            name: 'primaryColour',
            config: {
              type: 'SelectControl',
              label: t('Primary Colour'),
              renderTrigger: true,
              choices: [
                [imageAssets.red, 'Red'],
                [imageAssets.orange, 'Orange'],
                [imageAssets.yellow, 'Yellow'],
                [imageAssets.green, 'Green'],
                [imageAssets.blue, 'Blue'],
                [imageAssets.purple, 'Purple'],
                [imageAssets.pink, 'Pink']
              ],
              default: primaryColour,
              description: t('Colour of Chart'),
            },
          },
        ]]},{
          label: t('Size'),
          expanded: true,
          controlSetRows: [
        [
          {
            name: 'outerRadius',
            config: {
              type: 'SliderControl',
              label: t('Outer Radius Value'),
              renderTrigger: true,
              min: 0,
              max: 240,
              step: 10,
              default: outerRadius,
              description: t('Outer Radius Size'),
            },
          },
        ],
        [
          {
            name: 'innerRadius',
            config: {
              type: 'SliderControl',
              label: t('Inner Radius Value'),
              renderTrigger: true,
              min: 0,
              max: 240,
              step: 10,
              default: innerRadius,
              description: t('Inner Radius Size'),
            },
          },
        ],
        [
          {
            name: 'pointerInnerRadius',
            config: {
              type: 'SliderControl',
              label: t('Pointer Radius Value'),
              renderTrigger: true,
              min: 0,
              max: 300,
              step: 1,
              default: pointerInnerRadius,
              description: t('Pointer Radius Size'),
            },
          },
        ],
        [
          {
            name: 'insidePanelRadius',
            config: {
              type: 'SliderControl',
              label: t('Inner Circle Radius'),
              renderTrigger: true,
              min: 0,
              max: 300,
              step: 1,
              default: insidePanelRadius,
              description: t('Inner Circle Radius'),
            },
          },
        ],
      ],
    },{
      label: t('Animation'),
      expanded: true,
      controlSetRows: [
      [
        {
          name: 'animationDuration',
          config: {
            type: 'SliderControl',
            label: t('Animation Duration'),
            renderTrigger: true,
            min: 0,
            max: 2000,
            step: 100,
            default: animationDuration,
            description: t('Duration of Animation'),
          },
        },
      ],
      [
        {
          name: 'animationDurationUpdate',
          config: {
            type: 'SliderControl',
            label: t('Animation Duration Update'),
            renderTrigger: true,
            min: 0,
            max: 2000,
            step: 100,
            default: animationDurationUpdate,
            description: t('Update Rate of Animation'),
          },
        },
      ]]}],
  controlOverrides: {
    series: {
      validators: [validateNonEmpty],
      clearable: false,
    },
    row_limit: {
      default: 100,
    },
  },
};

export default config;
