import React, { Component } from 'react';
import { Grid } from "@sencha/ext-react-modern";
import data from './mockdata';

Ext.require("Ext.grid.plugin.RowExpander");
Ext.require("Ext.grid.filters.*");

const gridColumns = [
  {
    text: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    text: 'Number',
    dataIndex: "num",
    width: 200,
  },
  {
    text: "Email",
    dataIndex: "email",
    width: 200,
  }
];

class App extends Component {

  rowTpl (record) {
    console.log('rowTpl');
    return <div style={{ height: '20px', background: 'lightblue' }}>{record.email}</div>;
  }

  toggleRow (grid, target) {
    console.log('row toggled');

    target.record.set('email', 'changed');
  }

  render() {
    return (
      <Grid
        ref={grid => {
          this.grid = grid;
        }}
        title="Grid with Row Expander"
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
          rowexpander: {
            column: {
              width: 35,
            },
          },
        }}
        itemConfig={{
          body: {
            tpl: this.rowTpl,
          },
        }}
        // listeners={{
        //   childtap: this.toggleRow
        // }}
        variableHeights
      />
    )
  }
}
export default App;