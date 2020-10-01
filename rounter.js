const express = require('express');
const createProxyMiddleware = require('http-proxy-middleware');
const fs = require('fs');
const http = require('http');
const https = require('https');

// Config
const { routes } = require('./config.json');



const app = express();
const privateKey = fs.readFileSync('/home/ubuntu/t4j-ssl/private.pem', 'utf8');
const certificate = fs.readFileSync('/home/ubuntu/t4j-ssl/t4j.pem', 'utf8');
const ca = fs.readFileSync('/home/ubuntu/t4j-ssl/gd_bundle-g2-gl.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

 const httpsServer = https.createServer(credentials, app);


app.get('/', (req, res) => {
    res.send('Hello World');
});
// const httpServer = http.createServer(app);
  

// const httpsServer.createServer(credentials, function (req, res) {
//     res.writeHead(200);
//     res.end("Welcome to Node.js HTTPS Servern");
//  }).listen(3001)

httpsServer.listen(3001, () => {
  console.log('HTTPS Server running on port 1000');
  //res.writeHead(3001);
   // res.end("Welcome to Node.js HTTPS Servern");
 });