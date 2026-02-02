import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'h:mm:ss A' }),
    winston.format.printf(({ level, message, timestamp, ...metadata }) => {
      // 1. Criamos o objeto de serviço padrão
      const serviceInfo = {
        service: "AppFinance",
        timestamp: new Date().toISOString()
      };

      // 2. Verificamos se existem dados extras (como o seu 'data' do usuário)
      // Se houver, transformamos em string para exibir
      const extraData = Object.keys(metadata).length 
        ? ` | Data: ${JSON.stringify(metadata)}` 
        : '';

      // 3. Retornamos a linha completa
      return `${level}: ${timestamp} [express] ${message}${extraData}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;