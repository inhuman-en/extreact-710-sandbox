import React, { Component } from 'react';
import { Grid } from "@sencha/ext-react-modern";
import data from './mockdata';

Ext.require("Ext.grid.plugin.Summary");
Ext.require("Ext.data.summary.*");
Ext.require("Ext.grid.filters.*");

const gridColumns = [
  {
    text: "Name",
    dataIndex: "name",
    key: "name",
    width: 150,
    summaryRenderer: v => 'Total'
  },
  {
    text: 'Number',
    dataIndex: "num",
    key: "num",
    width: 200,
    summary: 'sum',
    summaryRenderer: v => `$${v}`
  },
  {
    text: "Email",
    dataIndex: "email",
    key: "email",
    width: 200,
    summary: 'count',
    summaryRenderer: v => `Count - ${v}`
  }
];

class App extends Component {

  testPluginFn () {}

  render() {
    return (
      <Grid
        ref={grid => {
          this.grid = grid;
        }}
        title="Grid with plugins"
        height={350}
        weighted
        extname="grid1"
        store={{
            xtype: 'store',
            proxy: { type: 'memory' },
            data
        }}
        columns={gridColumns}
        infinite={false}
        plugins={{
          gridsummary: {
            row: {
              docked: 'top',
              weight: 1,
            },
            // breaking function config
            testFn: this.testPluginFn
          },
          gridfilters: true,
        }}
      />
    )
  }
}
export default App;