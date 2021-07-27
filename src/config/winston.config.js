const path = require('path')
const winston = require('winston')

module.exports = () => {
  process.on('uncaughtException', err => winston.error('uncaught exception: ', err))
  process.on('unhandledRejection', (reason, p) => winston.error('unhandled rejection: ', reason, p))

  winston.exitOnError = false
//   winston.level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'
winston.transports = {
    transports: [
      new winston.transports.Console,
      new winston.transports.File({ filename: 'combined.log' })
    ]
  }
//   winston.add(winston.transports.Console, {
//     name: 'info-console',
//     level: 'error',
//     colorize: true,
//     timestamp: function() { return m.utc().format(dateFormat); }
//   })

//   winston.add(winston.transports.File, { filename: 'logfile.log' });
}