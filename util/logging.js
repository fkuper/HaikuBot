const winston = require('winston');

const logMessagePrintFormat = (info) => {
  const {
    timestamp, level, message, ...args
  } = info;
  const ts = timestamp.slice(0, 19).replace('T', ' ');
  return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(logMessagePrintFormat),
      ),
    }),
    new winston.transports.File({
      level: 'info',
      filename: './logs/combined.log',
      maxsize: '2000000',
      maxFiles: '5',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(logMessagePrintFormat),
      ),
    }),
  ]
});

module.exports = logger;