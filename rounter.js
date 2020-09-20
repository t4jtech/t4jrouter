const express = require('express');
const proxy = require('http-proxy-middleware');
const fs = require('fs');
const http = require('http');
const https = require('https');

// Config
const { routes } = require('./config.json');



const app = express();
const privateKey = fs.readFileSync('/home/ubuntu/t4j-ssl/technology4jewelry.com.key');
const certificate = fs.readFileSync('/home/ubuntu/t4j-ssl/t4j.crt');
const ca = fs.readFileSync('/home/ubuntu/t4j-ssl/gd_bundle-g2-g1.crt');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
  


//app.listen(port,hostname, () => {
    //console.log('Proxy Started');
//});

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
    });