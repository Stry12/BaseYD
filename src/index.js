import App from './App.js';
import 'dotenv/config.js';
import { RUN_PORT } from './const/conts.js';

const main = (() => {
    const server = App.listen( RUN_PORT || 5000 );
    console.log("Server activo", RUN_PORT || 5000 );
    server.timeout = 60000;
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals