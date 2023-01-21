const http = require("http");
const url = require("url");

const htmlFile = LoadResourceFile(GetCurrentResourceName(), 'web/index.html');
const cssFile = LoadResourceFile(GetCurrentResourceName(), 'web/style.css');
const jsFile = LoadResourceFile(GetCurrentResourceName(), 'web/script.js');
const configFile = LoadResourceFile(GetCurrentResourceName(), 'config.json');

const configObj = JSON.parse(configFile);
var apikey = configObj.apikey;

if (apikey == 'apikey' || apikey == '') apikey = false;

http.createServer(function (req, res) {
    /*res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);*/
    const reqUrl = url.parse(req.url).pathname
    if(reqUrl == "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(htmlFile);
    } else if (reqUrl === '/web/style.css') {
        res.end(cssFile);
    } else if (reqUrl === '/web/script.js') {
        res.end(jsFile);
    }

}).listen(50120);