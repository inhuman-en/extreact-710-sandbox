import React from 'react';
import ReactDOM from 'react-dom';
import App from './App_GridGrouping';
// import App from './App_RowExpander';
// import App from './App_DynamicColumnsAndStore';
// import App from './App_ConditionalColumnsAndStore';

window.onload = function () {
    ReactDOM.render(
        <App />,
        document.getElementById('main')
    );
}