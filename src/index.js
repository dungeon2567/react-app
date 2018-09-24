import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "../node_modules/@blueprintjs/select/lib/css/blueprint-select.css";

import App from './App';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
