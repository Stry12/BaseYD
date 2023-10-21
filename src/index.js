import 'dotenv/config.js';
import App from './App.js';

import value from './const/conts.js';

const main = (() => {
    const server = App.listen( value.RUN_PORT || 5000 ); 
    console.log("Server activo", value.RUN_PORT || 5000);
    server.timeout = 600000;
})();