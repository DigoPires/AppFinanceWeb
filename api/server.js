import express from 'express';
import cors from 'cors';
import "dotenv/config"
import router from "./routes.js"

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use("/api", router);

const PORT = process.env.PORT;
server._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(`Rota registrada: ${Object.keys(r.route.methods)} ${r.route.path}`)
  }
})
server.listen(PORT, () => console.log(`Servidor Rodando na porta ${PORT} `));