import React, { Component } from 'react';
import { Grid, Button, Container } from "@sencha/ext-react-modern";
import data from './mockdata';

Ext.require("Ext.grid.plugin.RowExpander");

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

    this.btnHandler = this.btnHandler.bind(this);

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

    this.gridColumns = [
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

  btnHandler () {
    this.setState(() => ({ value: 'random' }));
  }

  render() {
    return (
      <Container layout="vbox">
        <Button text="Update State (cause rerender)" handler={this.btnHandler} />
        <Grid
        ref={grid => {
          this.grid = grid;
        }}
        title="Grid with Row Expander"
        height={350}
        store={this.store}
        columns={this.gridColumns}
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
      </Container>
    )
  }
}
export default App;