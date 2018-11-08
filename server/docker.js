
const app = require('./index');

const http = app;
const https = http;

https.listen(433);
http.listen(80);
