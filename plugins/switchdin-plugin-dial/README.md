## @switchdin-analytics/plugin-chart-switchdin-plugin-dial

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-switchdin-plugin-dial.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-switchdin-plugin-dial)

This plugin provides Switchdin Plugin Dial for Superset.

It has been developed through Switchdin for their superset based analytis plateform.

```js
import SwitchdinPluginDial from '@switchdin-analytics/plugin-chart-switchdin';

new SwitchdinPluginDial()
  .configure({ key: 'dial' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=switchdin-plugin-dial) for more details.

```js
<SuperChart
  chartType="dial"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```