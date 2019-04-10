const fs = require("fs");
const path = require("path");
const http = require("http");

fs.watch(path.resolve(__dirname, "..", "server"), function (event, filename) {
    if (path.basename(filename) == "build"){
        setTimeout(function(){
            const server = require("..");
            const hServer = http.Server(server.app);
            server.io.attach(hServer);
            hServer.listen();
        });
    }
});