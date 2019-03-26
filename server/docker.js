const mongoose = require("mongoose");
const app = require("./build/server");

const http = app({
  modules: {
    mongoose
  }
}).app;
const https = http;

https.listen(433);
http.listen(80);
