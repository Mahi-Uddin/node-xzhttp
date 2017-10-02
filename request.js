const url = require("url");
require("object-recurse");

class Request {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.url = url.parse(req.url, true);
        this.path = this.url.pathname;
        this.reply = {
            headers:{
                "content-type": "text/html"
            },
            status:200,
            body:[]
        };
    }
    
    addData(data) {
        this.reply.body.push((typeof(data)==="string") ?
        data : JSON.stringify(data));
        return this;
    }
    
    addHeaders(obj) {
        obj.traverse((key, val) => {
            this.reply.headers[key] = val;
        });
        return this;
    }
    
    addHeader(name, val) {
        this.reply.headers[name] = val;
        return this;
    }
    
    setType(type) {
        this.reply.headers["content-type"] = type;
        return this;
    }
    
    send() {
        //add headers
        this.reply.headers.traverse((name, val)=>{
            void this.res.setHeader(name, val);
        });
        
        //set status code
        this.res.statusCode = this.reply.status;
        
        //add body
        this.reply.body.forEach((val)=>{
            this.res.write(val);
        });
        
        return void this.res.end();
    }
}
module.exports = Request;