const Request = require("./request");
const http = require("http");

class Xzhttp {

    constructor() {
        this.links = {
            "/": (r)=>{
            r.addData("Powered By: <a href='https://github.com/Xzlash/node-xzhttp'>Xzhttp</a>").send()}
        };
    }
    
    link(path, func) {
        this.links[path] = func;
        return this;
    }
    
    handle(req, res) {
        var Reqh = new Request (req, res);
        
        if (this.links[Reqh.path]) {
            //if it is registered
            this.links[Reqh.path](Reqh);
        } else {
            //404
            res.statusCode = 404;
            res.write("404 Not Found");
            res.end();    
        }
    }
    
    listen(port, host) {
        this.server = http.createServer(this.handle).listen(port, host);
        return this;
    }
}

module.exports = Xzhttp;
