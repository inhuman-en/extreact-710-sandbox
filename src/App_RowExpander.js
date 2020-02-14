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

class RowComponent extends Component {
  constructor(props) {
    super(props);
    console.log('component created for', props.id);
  }

  render() {
    return <div style={{ height: '20px', background: 'lightblue' }}>{this.props.email}</div>;
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };

    this.itemConfig = {
      body: {
        tpl: this.rowTpl.bind(this),
      },
    };

    this.gridListeners = {
      childtap: this.toggleRow.bind(this),
    };

    this.store = Ext.create('Ext.data.Store', {
      proxy: { type: 'memory' },
      data
    });
  }

  rowTpl (record) {
    console.log('rowTpl');

    if (!record.toggled) return null;

    return <RowComponent id={record.id} email={record.email} />;
  }

  toggleRow (grid, target) {
    console.log('row toggled');

    target.record.set('toggled', true);
  }

  render() {
    return (
      <Grid
      ref={grid => {
        this.grid = grid;
      }}
      refreshHeightOnUpdate={false}
      title="Grid with Row Expander"
      height={350}
      weighted
      extname="grid1"
      store={this.store}
      columns={gridColumns}
      infinite={false}
      plugins={{
        rowexpander: {
          column: {
            width: 35,
          },
        },
      }}
      itemConfig={this.itemConfig}
      listeners={this.gridListeners}
    />
    )
  }
}
export default App;