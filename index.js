const Request = require("./request");
const http = require("http");

var xz_desc = "Powered By: <a href='https://github.com/Xzlash/node-xzhttp'>Xzhttp</a>";

var xz_info = (r)=>{r.addData(xz_desc).send()};

class Xzhttp {

    constructor() {
        this.links = {
            "/": xz_info
        };
    }
    
    link(path, func) {
        this.links[path] = func;
        return this;
    }
    
    handle(req, res) {
        var Reqh = new Request (req, res);
        
        if (this.xzhttp.links[Reqh.path]) {
            //if it is registered
            this.xzhttp.links[Reqh.path](Reqh);
        } else {
            //404
            res.statusCode = 404;
            res.setHeader("content-type", "text/html");
            res.write("<h3>404 Not Found</h3><br></br>");
            res.write(xz_desc);
            
            res.end();    
        }
    }
    
    listen(port, host) {
        this.server = http.createServer(this.handle);
        this.server.listen(port, host);
        this.server.xzhttp = this;
        return this;
    }
}

module.exports = Xzhttp;
