import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);
    const io = new Server(httpServer, {
        cors: {
            origin: "*", // Permite conexiones desde cualquier origen
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Usuario conectado", socket.id);

        socket.on("mensaje", (msg) => {
            io.emit("mensaje", msg);
        });

        socket.on("disconnect", () => {
            console.log("Usuario desconectado", socket.id);
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`✅ Servidor corriendo en http://${hostname}:${port}`);
        });
});
