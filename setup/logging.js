const winston = require('winston');

module.exports = function() {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.errors({ stack: true }),
          winston.format.splat(),
          winston.format.json()
        ),
        defaultMeta: { service: 'Maskmaker' },
        transports: [
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'combined.log' }),
          new winston.transports.Console({
              format: winston.format.combine(
                  winston.format.colorize(),
                  winston.format.simple()
              )
          })
        ]
      });

      logger.info("Logger established");
      winston.add(logger)
}