import React, { Component } from 'react';
import { Container, Grid, Column, Toolbar, Button } from "@sencha/ext-react-modern";
import data from './mockdata';

Ext.require("Ext.grid.plugin.Summary");
Ext.require("Ext.grid.plugin.RowExpander");
Ext.require("Ext.data.summary.*");
Ext.require("Ext.grid.filters.*");

const renderLink = (value, record) => {
  const jsx = <a style={{ color: 'red' }} href={`mailto:${record.get('email')}`}>{value}</a>;
  return jsx;
};

const createStore = () => Ext.create('Ext.data.Store', {
  proxy: { type: 'memory' },
  data
  // data: data.slice(0, 3),
});

const gridColumns = [
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
    text: "some number",
    dataIndex: "num",
    key: "num",
    width: 200,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    renderer: v => <strong>{v}</strong>,
    summary: 'sum',
    summaryRenderer: v => `$${v}`
  },
  {
    text: "email",
    dataIndex: "email",
    key: "email",
    width: 200,
    summary: 'count',
    summaryRenderer: v => `Count - ${v}`
  },
  {
    text: 'Column group',
    key: 'group',
    minWidth: 250,
    columns: [
      {
        text: "First",
        dataIndex: "name",
        key: 'name',
        width: 140,
      },
      {
        text: "Second",
        dataIndex: "email",
        key: 'email',
        width: 200,
      },
    ]
  }
];

const virtualGridColumns = [
  {
    text: "JSX cell",
    dataIndex: "name",
    key: "name",
    width: 150,
    renderer: renderLink,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    // summaryRenderer: v => <button type="button">jsx in summary row</button>
  },
  {
    text: "some number",
    dataIndex: "num",
    key: "num",
    width: 200,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    renderer: v => <strong>{v}</strong>,
    // summary: 'sum',
    summaryDataIndex: 'num',
    summaryRenderer: v => `$${v}`
  },
  {
    text: "email",
    dataIndex: "email",
    key: "email",
    width: 200,
    // summary: 'count',
    // summaryRenderer: v => `Count - ${v}`
  },
  {
    text: 'Column group',
    key: 'group',
    minWidth: 250,
    columns: [
      {
        text: "First",
        dataIndex: "name",
        key: 'name',
        width: 140,
      },
      {
        text: "Second",
        dataIndex: "email",
        key: 'email',
        width: 200,
      },
    ]
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      showGrid: true,
      bordered: false,
    };

    this.changeState = this.changeState.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.destroyGrid = this.destroyGrid.bind(this);
  }
  
  // onReady = (event) => {
  //   event.cmpObj['grid1'].setStore(createStore());
  //   // event.detail.cmpObj['grid2'].setStore(createStore());
  //   // event.detail.cmpObj['grid3'].setStore(createStore());
  //   // event.detail.cmpObj['grid4'].setStore(createStore());
  // };

  changeState() {
    this.setState({
      num: Math.random()
    });
  }

  changeStyle() {
    this.setState({
      bordered: true
    });
  }

  destroyGrid() {
    this.setState({
      showGrid: false
    });
  }

  rowTpl (record) {
    console.log('row tpl');

    return <div style={{ height: '100px', background: 'lightblue' }}>{record.get('email')}</div>
  }

  toggleRow (grid, target) {
    console.log('row toggled');
  }

  render() {
    console.log('render');

    return (
      <div>
        <div style={{height: 100, textAlign: "center" }} >Chart area</div>
      <Container
        layout="vbox"
        shadow
        className="test-class-name"
        maxHeight="100vh"
      >
        <Toolbar docked="top">
          <Button text="Change State" handler={this.changeState}/>
          <Button text="Change Style" handler={this.changeStyle}/>
          <Button text="Destroy Grid" handler={this.destroyGrid}/>
        </Toolbar>
          {this.state.showGrid && <Grid
            height={300}
            weighted
            extname="grid1"
            store={{
              proxy: { type: 'memory' },
              data
            }}
            columns={gridColumns}
            infinite={false}
            style={{ border: this.state.bordered ? '2px solid blue' : '0px solid blue' }}
            plugins={{
              gridsummary: {
                row: {
                  docked: 'top',
                  weight: 1,
                },
              },
              rowexpander: {
                column: {
                  width: 35,
                },
              },
              gridfilters: true,
            }}
            itemConfig={{
              body: {
                tpl: this.rowTpl,
              },
            }}
            onChildTap={this.toggleRow}
            variableHeights
          />}
          <Grid
            height={400}
            weighted
            store={{
              type: 'virtual',
              pageSize: 50,
              leadingBufferZone: 0,
              trailingBufferZone: 0,
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              proxy: {
                type: 'ajax',
                url: 'http://localhost:3004/users',
                simpleSortMode: true,
                pageParam: '',
                noCache: false,
                startParam: '_start',
                limitParam: '_limit',
                reader: {
                  type: 'json',
                  rootProperty: 'items',
                  totalProperty: 'total',
                  summaryRootProperty: 'summary',
                },
              }
            }}
            columns={virtualGridColumns}
            infinite
            plugins={{
              gridsummary: {
                row: {
                  docked: 'top',
                  weight: 1,
                },
              },
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
            onChildTap={this.toggleRow}
            variableHeights
          />
      </Container>
      </div>
    )
  }
}
export default App;