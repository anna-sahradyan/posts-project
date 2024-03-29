import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./store/index";

const store = configureStore({
    reducer: rootReducer,
})

ReactDOM.render(<BrowserRouter>
    <Provider store={store}>
        <App/>
    </Provider>
</BrowserRouter>, document.getElementById('root'));



