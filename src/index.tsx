import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from "react-redux";
import store from "./store"
import {CookiesProvider} from "react-cookie";
import App from "./components/App";
import {BrowserRouter as Router} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {green} from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green["200"],
      main: green["400"],
      dark: green["600"]
    },
  }
});

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <Router>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Router>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
