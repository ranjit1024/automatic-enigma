"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const cors = os_1.default.cpus();
if (cluster_1.default.isPrimary) {
    for (let i = 0; i < cors.length; i++) {
        cluster_1.default.fork();
    }
}
else {
    console.log(`Process Id ${process.pid} `);
    console.log("          ");
    let count = 0;
    for (let i = 0; i <= (10 ^ 10); i++) {
        count = +i;
        console.log(count);
    }
    console.log("data", count);
}
