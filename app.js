console.log("=> Starting Building Access Service...");

var express = require('express');
var actuator = require('express-actuator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var switchService = require('./services/switch');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(actuator());

// routerService.config({
//     username: process.env.ROUTER_USERNAME,
//     password: process.env.ROUTER_PASSWORD
// });

// app.get("/wifi-clients", async(req, res) => {
//     res.send(await routerService.getClientList());
// });

app.get("/toggle-entry-switch", async(req, res) => {
    if(!req.query.state) {
        res.status(400).send('Required query params missing : state');
        return;
    }
    else if (!req.query.state.match("on|off")) {
        res.status(400).send('Invalid param value : state, can only be "on" or "off"');
        return;
    }
    console.log("-> Recieved switch toggle request on ["+(new Date()).toString()+"], state : "+req.query.state)

    var response = await switchService.unlockFrontDoorByLAN(req.query.state);
    res.send(response);
});

module.exports = app;