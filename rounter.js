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

//const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
  
  
module.exports = function(app) {
app.use(
    '/',
    createProxyMiddleware({
      target: 'http://api.technology4jewelry.com:3000',
      changeOrigin: true,
    
    })
  );
  };
  
httpsServer.listen(3000, () => {
    console.log('HTTPS Server running on port 443');
 });