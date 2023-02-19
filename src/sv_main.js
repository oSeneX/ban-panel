const http = require("http");
const url = require("url");

const resourceName = GetCurrentResourceName()
const htmlFile = LoadResourceFile(resourceName, 'web/index.html');
const cssFile = LoadResourceFile(resourceName, 'web/style.css');
const jsFile = LoadResourceFile(resourceName, 'web/script.js');
const configFile = LoadResourceFile(resourceName, 'config.json');
const bans = LoadResourceFile(resourceName, 'bans.json');

const configObj = JSON.parse(configFile);
const apikey = configObj.apikey;
const port = configObj.port;

if (apikey == 'apikey' || apikey == '') console.log('API-avain puuttuu. Palvelin ei voi päivittää porttikieltoja.');

http.createServer(function (req, res) { //Create a http server
    const reqUrl = url.parse(req.url).pathname
    if(reqUrl == "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(htmlFile);
    } else if (reqUrl === '/web/style.css') {
        res.end(cssFile);
    } else if (reqUrl === '/web/script.js') {
        res.end(jsFile);
    }

}).listen(port);

on("onResourceStart", (resource) => {
    if (resourceName === resource) {
        console.log("Paneeli käynnisttetty osoitteessa: http://127.0.0.1:"+port+"/");
    }
});

on('playerConnecting', (name, setKickReason, deferrals) => {
    deferrals.update(`Tarkistetaan porttikieltoja`)
    const player = global.source;
    const steam = GetPlayerIdentifierByType(player, 'steam');
    const license = GetPlayerIdentifierByType(player, 'license');
    const license2 = GetPlayerIdentifierByType(player, 'license2');
    const discord = GetPlayerIdentifierByType(player, 'discord');
    const xbox = GetPlayerIdentifierByType(player, 'xbx');
    const live = GetPlayerIdentifierByType(player, 'live');
    const fivem = GetPlayerIdentifierByType(player, 'fivem');
    deferrals.done()
});

on("ban-panel:playerBanned", () => {
    
});

on("txAdmin:events:playerBanned", (eventData) => { //Requires at least tx 5.0
    const reason = eventData.reason;
    const identifiers = eventData.targetIds;
    const expiration = eventData.expiration;
    const name = eventData.targetName;
});
