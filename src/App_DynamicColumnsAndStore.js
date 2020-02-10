import React, { Component } from 'react';
import { Grid, Container, Toolbar, Button } from "@sencha/ext-react-modern";
import data from './mockdata';

Ext.require("Ext.grid.plugin.Summary");
Ext.require("Ext.data.summary.*");
Ext.require("Ext.grid.filters.*");

const renderLink = (value, record) => {
  const jsx = <a style={{ color: 'red' }} href={`mailto:${record.get('email')}`}>{value}</a>;
  return jsx;
};

const firstColumns = [
  {
    text: "JSX cell",
    dataIndex: "name",
    key: "name",
    width: 150,
    renderer: renderLink,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    summaryRenderer: v => <button type="button">jsx in summary row</button>
  },
  {
    text: 'Number',
    dataIndex: "num",
    key: "num",
    width: 200,
    summary: 'sum',
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    renderer: v => <strong>{v}</strong>,
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

const secondColumns = [
  {
    text: "Another number column",
    dataIndex: "num",
    key: "second-num",
    width: 300,
    summary: 'average',
    renderer: v => `${v} Number`
  },
  {
    text: "Another email",
    dataIndex: "email",
    key: "second-email",
    width: 300,
    summary: 'count',
  },
];

class App extends Component {

  constructor(props) {
    super(props);

    this.setNewColumns = this.setNewColumns.bind(this);
    this.setNewStore = this.setNewStore.bind(this);
    this.setNewData = this.setNewData.bind(this);
  }

  setNewData() {
    this.grid.cmp.getStore().setData([
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
    ]);
  }

  setNewStore() {
    this.grid.cmp.setStore({
      xtype: 'store',
      proxy: { type: 'memory' },
      data: data.slice(0,5),
    })
  }

  // causes incorrect cleanup of previous column cells
  setNewColumns() {
    this.grid.cmp.setColumns(secondColumns)
  }

  render() {
    return (
      <Container layout="vbox" maxHeight="100vh">
        <Toolbar docked="top">
          <Button text="Change columns" handler={this.setNewColumns}/>
          <Button text="Change store" handler={this.setNewStore}/>
          <Button text="Change data" handler={this.setNewData}/>
        </Toolbar>
        <Grid
          ref={grid => {
            this.grid = grid;
          }}
          title="Grid with dynamic columns and store"
          height={350}
          weighted
          extname="grid1"
          store={{
            xtype: 'store',
            proxy: { type: 'memory' },
            data
          }}
          columns={firstColumns}
          infinite={false}
        />
      </Container>
    )
  }
}
export default App;