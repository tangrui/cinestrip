import bunyan from 'bunyan'

import config from './config'

const options = {
  name: config.get('name'),
  src: config.get('environment') === 'development',
  level: config.get('log:level'),
  streams: [{
    level: 'info',
    stream: process.stdout
  }, {
    level: 'error',
    stream: process.stderr
  }],
  serializers: bunyan.stdSerializers
}

export default bunyan.createLogger(options)
