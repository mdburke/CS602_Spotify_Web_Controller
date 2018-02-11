/*
 *   Application structure based on boilerplate available here: https://github.com/kelyvin/express-env-example
 */

const
    server = require('./server/index')(),
    config = require('./configs');

server.create(config);
server.start();