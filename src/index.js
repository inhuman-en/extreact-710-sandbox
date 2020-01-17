import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { render } from '@sencha/ext-react';

window.onload = function () {
    ReactDOM.render(
        <App />,
        document.getElementById('main')
    );
}