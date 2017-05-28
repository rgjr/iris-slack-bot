'use strict';

const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

server.listen(3000);
server.on('listening', function () {
  console.log(`IRIS is listening on port ${server.address().port} in ${service.get('env')} mode.`);
})
