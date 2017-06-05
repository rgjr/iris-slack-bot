'use strict';

const request = require('superagent');

module.exports.process = function process (intentData, registry, cb) {
  if (intentData.intent[0].value != 'time') {
    return cb(new Error(`Expected time intent, got ${intentData.intent[0].value} instead`));
  }

  if (!intentData.location) {
    return cb(new Error('Missing location in time intent'));
  }

  const location = intentData.location[0].value.replace(/,.?iris/i, '');

  const service = registry.get('time');

  if (!service) {
    return cb(false, 'no service available');
  }

  request.get(`http://${service.ip}:${service.port}/service/${location}`, (err, res) => {
    if (err || res.statusCode != 200 || !res.body.result) {
      console.log(err);

      return cb(false, `I had a problem finding out the time in ${location}`);
    }

    return cb(false, `In ${location} it is now ${res.body.result}`)
  })
}
