const express = require('express');
const proxy = require('http-proxy-middleware');
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


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);


 for (route of routes) {
  app.use(route.route,
      proxy({
          target: route.address,
          pathRewrite: (path, req) => {
              return path.split('/').slice(2).join('/'); // Could use replace, but take care of the leading '/'
          }
      })
  );
}

 httpServer.listen(80, () => {
   console.log('HTTP Server running on port 80');
 });

 httpsServer.listen(443, () => {
   console.log('HTTPS Server running on port 443');
   });