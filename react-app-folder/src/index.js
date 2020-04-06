import React from 'react';
import ReactDOM from 'react-dom';
// import MyInfo from "./components/MyInfo"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import App from "./App.js"

import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,document.getElementById("root")
);

serviceWorker.unregister();
