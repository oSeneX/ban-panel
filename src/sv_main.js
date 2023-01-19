const http = require("http");
const url = require("url");

const htmlFile = LoadResourceFile(GetCurrentResourceName(), 'web/index.html');
const cssFile = LoadResourceFile(GetCurrentResourceName(), 'web/style.css');
const jsFile = LoadResourceFile(GetCurrentResourceName(), 'web/script.js');
const configFile = LoadResourceFile(GetCurrentResourceName(), 'config.json');

const configObj = JSON.parse(configFile)
const apikey = configObj.apikey

/* TODO
on("onResourceStarting", (resourceName) => { 
    if (resourceName == GetCurrentResourceName()) {
        if (apikey == 'apikey' || apikey == '') { 
            console.log('API-avainta ei ole asetettu.'); 
            CancelEvent();
        }
    }
});*/ 

http.createServer(function (req, res) {
    const reqUrl = url.parse(req.url).pathname
    if(reqUrl == "/") {
        res.setHeader("Content-Type", "text/html");
        res.end(htmlFile);
    } else if (reqUrl === '/web/style.css') {
        res.end(cssFile);
    } else if (reqUrl === '/web/script.js') {
        res.end(jsFile);
    }

}).listen(50120);

