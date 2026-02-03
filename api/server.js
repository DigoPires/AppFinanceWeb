import express from 'express';
import cors from 'cors';
import "dotenv/config";
import path from 'path';
import { fileURLToPath } from 'url';
import router from "./routes.js";
import logger from '../src/config/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

server.use(cors());

server.use(express.json());

server.use("/api", router);

server.post("/api/logs", (req, res) => {
    const { level, message, data } = req.body;
    // Remove apenas a chave 'message' do objeto data para evitar duplicação
    const { message: _, ...logData } = data || {};
    logger.log(level || 'info', `[FRONTEND]: ${message}`, logData);
    res.status(204).send();
});

// servir frontend
server.use(express.static(path.join(__dirname, '..', 'build')));

server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.info(`Servidor rodando na ${PORT}`);
});
