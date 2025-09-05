import express,{ Express } from "express";
import cluster from "cluster";
import os from "os"
import { count } from "console";
import { appendFile } from "fs";

const cors = os.cpus();

if(cluster.isPrimary){

    for(let i = 0 ; i < cors.length ; i++){
        cluster.fork();
    }
    cluster.on("exit", (worker, code, singal)=>{
        console.log(`worker ${worker.process.pid} has died`);
        console.log("letst fork another worker")
        cluster.fork()
    })
}
else{
    const app :Express = express();
    const port = 3000;
    console.log(`Worker ${process.pid} started`);
    let count  = 0;
    app.get("/", (req,res)=>{
        res.send("Working")
    })
    app.get("/api/:n", (req,res) =>{
        let n = parseInt(req.params.n);
        let count = 0;
        if(n > 500000000) n = 500000000;
        for(let i = 0; i < n; i++){
            count += i;
        }
        res.send(`Current count ${count } and prcess id  ${process.pid}`)
    })
    
    app.listen(port, ()=>{
        console.log(`listing on a port number ${port}`)
    })
    
    console.log("data", count)
}