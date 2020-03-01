const axios = require('axios').default; 
const mergeJSON = require("merge-json") ;
const _ = require("lodash");

const ping = require('ping');

var config = {
    baseRouterURL: 'http://192.168.0.1'
}

module.exports.config = (options) => {
    config = mergeJSON.merge(config, options);
}

module.exports.login = async () => {
    console.log("=> Logging into 192.168.0.1 as "+config.username);
    await axios.post(`${config.baseRouterURL}/goform/login`, `user=${config.username}&pwd=${config.password}&rememberMe=1&pwdCookieFlag=0`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then((response) => {
        var cookies = response.headers["set-cookie"];
        var loggedIn = _.filter(cookies, function(cookie){
            return cookie.match(/userid=(\d+(\W+)*)+/gi);
        }).length>0 ? true : false;
        if(!loggedIn){
            throw new Error("Login Failed");
        }
        cookies.push('LANG_COOKIE=en_US;');
        config.cookies = cookies;
    });

};

module.exports.getClientList = async () => {
    var clientDat = await axios.get(`${config.baseRouterURL}/data/getWlsClient.asp`, {
        headers: {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Cookie': _.join(config.cookies," ")
        }
    }).then(async (response) => {
        var path = "";
        try{
            path = response.request.connection._httpMessage.path;
        } catch(e) {}
        var returnDat = {};
        if( path === '/login.htm') {
            console.log("=> Possible session expiry, re-trying login");
            await module.exports.login();
            returnDat = await module.exports.getClientList();  
        } else {
            returnDat = response.data;
        }
        console.log("=> Retreived client list");
        return returnDat;
    });
    return clientDat;
};

module.exports.isMacConnected = async (mac) => {
    var clientList = await module.exports.getClientList();
    return _.findIndex(clientList, function(client){
        if (client.mac.toUpperCase() === mac.toUpperCase()) {
            console.log("=> Client MAC["+mac+"] is connected!");
            return true;
        }
    }) >= 0;
};

module.exports.isHostConnected = (ipaddr, callback, timeoutSec = 1) => {
    ping.sys.probe(ipaddr, function(isAlive){
        callback(isAlive, ipaddr);
    }, {
        timeout: timeoutSec
    });
};