import express from 'express';
import cors from 'cors';
import "dotenv/config"
import router from "./routes.js";

const server = express();

server.use(cors());

server.use(express.json());

server.use("/api", router);


server.post("/loginUser", (req, res) => { 
    res.send("Login online")
});

// servir frontend
server.use(express.static("build"));

server.get("*", (req, res) => {
  res.sendFile(path.resolve("build", "index.js"))
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Servidor rodando na ${PORT}`);
});
