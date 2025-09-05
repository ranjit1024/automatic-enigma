"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const cors = os_1.default.cpus();
if (cluster_1.default.isPrimary) {
    for (let i = 0; i < cors.length; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, singal) => {
        console.log(`worker ${worker.process.pid} has died`);
        console.log("letst fork another worker");
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    const port = 3000;
    console.log(`Worker ${process.pid} started`);
    let count = 0;
    app.get("/", (req, res) => {
        res.send("Working");
    });
    app.get("/api/:n", (req, res) => {
        let n = parseInt(req.params.n);
        let count = 0;
        if (n > 500000000)
            n = 500000000;
        for (let i = 0; i < n; i++) {
            count += i;
        }
        res.send(`Current count ${count} and prcess id  ${process.pid}`);
    });
    app.listen(port, () => {
        console.log(`listing on a port number ${port}`);
    });
    console.log("data", count);
}
