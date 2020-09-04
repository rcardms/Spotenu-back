import { AddressInfo } from "net";
import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./router/userRouter";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/user", userRouter)

const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Servidor rodando em http://localhost:${address.port}`)
    } else {
        console.error(`Falha ao rodar o servidor`)
    }
});