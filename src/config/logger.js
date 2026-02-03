import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'h:mm:ss A' }),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
      
      const cleanMetadata = { ...metadata };
      delete cleanMetadata[Symbol.for('level')];
      delete cleanMetadata[Symbol.for('message')];
      delete cleanMetadata[Symbol.for('splat')];

      // Reconstruir a string original ou exibir o objeto limpo.
      let displayData = "";
      const keys = Object.keys(cleanMetadata);
      
      if (keys.length > 0) {
        // Checa se é aquele formato chato de string fatiada
        const isSlicedString = keys.every(key => !isNaN(key));
        if (isSlicedString) {
          displayData = ` | Data: ${Object.values(cleanMetadata).join('')}`;
        } else {
          displayData = ` | Data: ${JSON.stringify(cleanMetadata)}`;
        }
      }

      return `${level}: ${timestamp} [express] ${message}${displayData}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;