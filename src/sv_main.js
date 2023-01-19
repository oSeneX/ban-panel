const http = require("http");
const url = require("url");

const htmlFile = LoadResourceFile(GetCurrentResourceName(), 'web/index.html');
const cssFile = LoadResourceFile(GetCurrentResourceName(), 'web/style.css');
const jsFile = LoadResourceFile(GetCurrentResourceName(), 'web/script.js');
const scriptFile = LoadResourceFile(GetCurrentResourceName(), 'src/sv_main.js');
const configFile = LoadResourceFile(GetCurrentResourceName(), 'config.json');

const configObj = JSON.parse(configFile);
var apikey = configObj.apikey;

if (apikey == 'apikey' || apikey == '') apikey = false;

http.createServer(function (req, res) {
    const reqUrl = url.parse(req.url).pathname
    if(reqUrl == "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(htmlFile);
    } else if (reqUrl === '/web/style.css') {
        res.end(cssFile);
    } else if (reqUrl === '/web/script.js') {
        res.end(jsFile);
    } else if (reqUrl === '/src/sv_main.js') {
        res.end(scriptFile);
    }

}).listen(50120);

console.log('12')
