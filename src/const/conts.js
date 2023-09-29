import 'dotenv/config.js';

const SECRET = process.env.SECRET;
const RUN_PORT = process.env.RUN_PORT;
const NODE_ENV = process.env.NODE_ENV;
const STATIC_PATH = process.env.STATIC_PATH;


export {
    SECRET,
    NODE_ENV,
    RUN_PORT,
    STATIC_PATH,
};