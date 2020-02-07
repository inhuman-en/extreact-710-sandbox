import React, { Component } from 'react';
import { Container, Grid, Column, Toolbar, Button, PivotGrid } from "@sencha/ext-react-modern";
import data from './mockdata';
import ReactDOMServer from 'react-dom/server';
Ext.require("Ext.grid.plugin.Summary");
Ext.require("Ext.grid.plugin.RowExpander");
Ext.require("Ext.data.summary.*");
Ext.require("Ext.grid.filters.*");
Ext.require("Ext.pivot.*");

const renderLink = (value, record) => {
  const jsx = <a style={{ color: 'red' }} href={`mailto:${record.get('email')}`}>{value}</a>;
  return jsx;
};

const createStore = () => Ext.create('Ext.data.Store', {
  proxy: { type: 'memory' },
  data
  // data: data.slice(0, 3),
});

const firstColumns = [
  {
    text: "JSX cell",
    dataIndex: "name",
    key: "name",
    width: 150,
    renderer: v => v + ' hello'
    // renderer: renderLink,
    // cell: { xtype: 'reactcell',  encodeHtml: false, },
    // summaryRenderer: v => <button type="button">jsx in summary row</button>
  },
  {
    text: 'title',
    dataIndex: "num",
    key: "num",
    width: 200,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    renderer: v => <strong>{v}</strong>,
    summary: 'sum',
    // summaryRenderer: v => `$${v}`
  },
  {
    text: "email",
    dataIndex: "email",
    key: "email",
    width: 200,
    summary: 'count',
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

const secondColumns = [
  {
    text: "Another number column",
    dataIndex: "num",
    key: "second-num",
    width: 300,
    // cell: { xtype: 'reactcell',  encodeHtml: false, },
    // renderer: v => <em>{v}</em>,
    summary: 'average',
    // summaryRenderer: v => `$${v}`
    renderer: v => v + ' bye'
  },
  {
    text: "Another email",
    dataIndex: "email",
    key: "second-email",
    width: 300,
    summary: 'count',
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    renderer: v => <em>{v}</em>,
    // summaryRenderer: v => `Total - ${v}`
  },
]

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

const grouperFn = function (rec) {
  return `${rec.get('name')} -  ${rec.get('email')}`;
};
const jsxGrouperFn = function (rec) {
  return ReactDOMServer.renderToStaticMarkup(<strong>{rec.get('name')} {rec.get('email')}</strong>);
};

const labelRenderer= v => v + ' group';
const jsxLabelRenderer= v => ReactDOMServer.renderToStaticMarkup(<strong>{v}</strong>);

const pivotMatrix = {
  type: 'local',
  collapsibleRows: true,
  collapsibleColumns: false,
  rowGrandTotalsPosition: 'first',
  textGrandTotalTpl: 'Total',
  viewLayoutType: 'outline',     
  leftAxis: [{
    header: 'First',
    dataIndex: 'email',
    width: 200,
    grouperFn: jsxGrouperFn,
    // column: {
    //   cell: {
    //     xtype: 'reactcell', encodeHtml: false,
    //   }
    // }
    // labelRenderer: jsxLabelRenderer
  },
  {
    header: 'Second',
    dataIndex: 'name',
    width: 200,
    labelRenderer: jsxLabelRenderer
  }],
  aggregate: [{
    header: 'Count',
    dataIndex: 'num',
    aggregator: 'count'
  },
  {
    header: 'Sum',
    dataIndex: 'num',
    aggregator: 'sum'
  }],
  store: {
    proxy: { type: 'memory' },
    data
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      showGrid: true,
      bordered: false,
      switchColumns: false,
      switchStore: false,
      gridData: [...data],
    };

    this.changeState = this.changeState.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.switchGridColumns = this.switchGridColumns.bind(this);
    this.switchGridStore = this.switchGridStore.bind(this);
    this.setNewData = this.setNewData.bind(this);
    this.updateDataInState = this.updateDataInState.bind(this);
  }

  testPluginFn () {}

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

  switchGridColumns() {
    // this.setState(state => ({
    //   switchColumns: !state.switchColumns,
    // }));

    this.grid.cmp.setColumns([])
      .setColumns(secondColumns)
      .setStore(this.grid.cmp.getStore());
  }

  switchGridStore() {
    this.setState(state => ({
      switchStore: !state.switchStore,
    }));
  }

  updateDataInState() {
    this.setState({
      gridData: [
        {name: 'Eugene', email: 'eugene@gmail.com', num: Math.random()},
        {name: 'Eugene', email: 'eugene@gmail.com', num: Math.random()},
        {name: 'Eugene', email: 'eugene@gmail.com', num: Math.random()},
        {name: 'Eugene', email: 'eugene@gmail.com', num: Math.random()},
        {name: 'Eugene', email: 'eugene@gmail.com', num: Math.random()},
        {name: 'Eugene', email: 'eugene@gmail.com', num: Math.random()},
        {name: 'Eugene', email: 'eugene@gmail.com', num: Math.random()},
      ]
    });
  }

  setNewData() {
    this.grid.cmp.getStore().setData([
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
      {name: 'Helen', email: 'helen@gmail.com', num: Math.random()},
    ]);
  }

  rowTpl (record) {
    console.log('rowTpl');
    return <div style={{ height: '20px', background: 'lightblue' }}>{record.email}</div>;
  }

  toggleRow (grid, target) {
    console.log('row toggled');

    target.record.set('email', 'changed');
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('update');
  //   this.setNewData();
  // }

  render() {
    console.log('render');
    const { gridData } = this.state;

    const columnsSet = firstColumns;

    const gridStore = {
        xtype: 'store',
        proxy: { type: 'memory' },
        data
    };

    return (
      <div>
      <Container
        layout="vbox"
        shadow
        className="test-class-name"
        maxHeight="100vh"
      >
        <Toolbar docked="top">
          <Button id="testButtonId" text="Change State" handler={this.changeState}/>
          <Button text="Change Style" handler={this.changeStyle}/>
          <Button text="Switch columns" handler={this.switchGridColumns}/>
          <Button text="Switch store" handler={this.switchGridStore}/>
          <Button text="Set new data" handler={this.setNewData}/>
        </Toolbar>
          {/* <PivotGrid
            title="Pivot Grid"
            matrix={pivotMatrix}
            height={350}
          /> */}
          <Grid
            ref={grid => {
              this.grid = grid;
            }}
            title="Grid"
            height={350}
            weighted
            extname="grid1"
            store={gridStore}
            columns={columnsSet}
            infinite={false}
            style={{ border: this.state.bordered ? '2px solid blue' : '0px solid blue' }}
            plugins={{
              gridsummary: {
                row: {
                  docked: 'top',
                  weight: 1,
                },
              },
              // rowexpander: {
              //   column: {
              //     width: 35,
              //   },
              // },
              gridfilters: true,
            }}
            // itemConfig={{
            //   body: {
            //     tpl: this.rowTpl,
            //   },
            // }}
            listeners={{
              childtap: this.toggleRow
            }}
            variableHeights
          />

          {/* <Grid
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
            listeners={{
              childtap: this.toggleRow
            }}
            variableHeights
          /> */}
      </Container>
      </div>
    )
  }
}
export default App;