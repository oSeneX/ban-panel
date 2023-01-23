const http = require("http");
const url = require("url");

const htmlFile = LoadResourceFile(GetCurrentResourceName(), 'web/index.html');
const cssFile = LoadResourceFile(GetCurrentResourceName(), 'web/style.css');
const jsFile = LoadResourceFile(GetCurrentResourceName(), 'web/script.js');
const configFile = LoadResourceFile(GetCurrentResourceName(), 'config.json');

const configObj = JSON.parse(configFile);
const apikey = configObj.apikey;
const port = configObj.port;

if (apikey == 'apikey' || apikey == '') {
    console.log('API-avain puuttuu. Palvelin ei voi päivittää porttikieltoja.')
};

http.createServer(function (req, res) { //Create http server
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

AddEventHandler("onResourceStart", function(resource) {
    if (GetCurrentResourceName() === resource) {
        console.log("Server started on http://127.0.0.1:"+port+"/");
    }
});

on('playerConnecting', (name, setKickReason, deferrals) => {
    const bans = LoadResourceFile(GetCurrentResourceName(), 'bans.json');
    const player = global.source;
    
    deferrals.update(`Tarkistetaan porttikieltoja`)
    for (let i = 0; i < GetNumPlayerIdentifiers(player); i++) {
        const identifier = GetPlayerIdentifier(player, i);
        var steam, license, license2, discord, xbox, live, fivem = null;
        if (identifier.includes('steam:')) {
            steam = identifier;
        } else if (identifier.includes('license:')) {
            license = identifier;
        } else if (identifier.includes('license2:')) {
            license2 = identifier;
        } else if (identifier.includes('discord:')) {
            discord = identifier;
        } else if (identifier.includes('xbox:')) {
            xbox = identifier;
        } else if (identifier.includes('live:')) {
            live = identifier;
        } else if (identifier.includes('fivem:')) {
            fivem = identifier;
        }
    }
    deferrals.done()
})