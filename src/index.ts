import express,{ Express } from "express";
import cluster from "cluster";
import os from "os"
import { count } from "console";

const cors = os.cpus();

if(cluster.isPrimary){
    for(let i = 0 ; i < cors.length ; i++){
        cluster.fork();
    }
}
else{
    console.log(`Process Id ${process.pid} `)
    console.log("          ")
    let count  = 0;
    for(let i = 0; i <= (10^10) ; i++){
        count =+ i;
        console.log(count)
    }
    
    console.log("data", count)
}