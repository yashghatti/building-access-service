var switchService = require('./services/SwitchService');
var routerService = require('./services/RouterService');
var clear = require('clear');
var app = require('express')();
require('dotenv').config();

routerService.config({
    username: process.env.ROUTER_USERNAME,
    password: process.env.ROUTER_PASSWORD
});

app.set("port",process.env.PORT);

app.get("/wifi-clients", async(req, res) => {
    res.send(await routerService.getClientList());
});

app.get("/unlock-front-door", async(req, res) => {
    await switchService.unlockFrontDoorByLAN();
    res.send({status: "UNLOCKED"});
});

app.listen(app.get("port") , () => {
    console.log("Building Access Service v.1.0 is listening on localhost:"+app.get("port"));
});

var statusQueue = [];
setInterval(async () => {
    clear();
    console.log("Building Access Service v.1.0 is listening on localhost:"+app.get("port"));
    console.log("\n====> RUNNING ON "+new Date().toString());

    routerService.isHostConnected(process.env.GOOGLE_PIXEL_STATIC_IP, async (pixelConnected, ipaddr) => {
        if (pixelConnected) {
            statusQueue.push({
                date: new Date(),
                status: "CONNECTED"
            });
        } else {
            statusQueue.push({
                date: new Date(),
                status: "DISCONNECTED"
            });
        }

        if(statusQueue.length > 4){
            statusQueue.splice(0, statusQueue.length - 4);
        }

        if(statusQueue.length >= 2 
            && statusQueue[statusQueue.length-1].status === "CONNECTED"
            && statusQueue[statusQueue.length-2].status === "DISCONNECTED") {
            console.log("+=> Detected a new connect event!! Unlocking front door");
            await switchService.unlockFrontDoorByLAN();
        }
        console.log(statusQueue);
    });
    
}, 2000);