import React, { Component } from 'react';
import { ExtPanel, ExtGrid, ExtGridcolumn } from "@sencha/ext-react";
import data from './mockdata';

// no Template class used, didn't find in the package
const renderLink = (value, record) => <a style={{ color: 'red' }} href={`mailto:${record.get('email')}`}>{value}</a>
const createStore = () => Ext.create('Ext.data.Store', {
  proxy: { type: 'memory' },
  data,
});

class App extends Component {

  render() {
    const columns = [
      {
        text: "JSX cell",
        dataIndex: "name",
        width: 150,
        renderer: renderLink,
        //doesn't take any effect
        cell: { encodeHtml: false }
      },
      // for some reason "Griup by this field" doesn't work correctly on this one
      { text: "name", dataIndex: "name" },
      { text: "email", dataIndex: "email", width: 200 },
    ];

    return (
      <ExtPanel
        title="Each grid has 200 records"
        layout="vbox"
        shadow="true"
        // viewport="true"
        padding="10"
      >
        {/*
          - rows get squashed, hover over gray area to see them
          - there are 181 row dom elements, means no buffered renderer
          - jsx cells get correctly interpreted
        */}
        <ExtGrid margin={10} title="Grid with columns as children and fixed height" store={createStore()} height={250}>
          {
            columns.map(c => <ExtGridcolumn {...c} key={c.text} />)
          }
        </ExtGrid>

        {/*
          - this one has 20 row elements, buffered renderer looks applied
        */}
        <ExtGrid margin={10} title="Grid with columns as children and no height" store={createStore()}>
          {
            columns.map(c => <ExtGridcolumn {...c} key={c.text} />)
          }
        </ExtGrid>

        {/*
          - this one has 24 row elements, buffered renderer looks applied
          - jsx cells are displayed as [object Object], i assume simple string casting result
        */}
        <ExtGrid margin={10} title="Grid with columns as a prop and fixed height" store={createStore()} height={250} columns={columns} />

        {/*
          - this one has 20 row elements, buffered renderer looks applied
        */}
        <ExtGrid margin={10} title="Grid with columns as a prop and no height" store={createStore()} columns={columns} />
      </ExtPanel>
    )
  }
}
export default App;