require('./config/config');
var port = process.env.PORT
var serviceName = process.env.SERVICE_NAME
// connect to db
require('./models');





class Server {
    constructor(serviceName, port) {
        this.port = port;
        this.serviceName = serviceName;
    }
    start() {
        this.app =  require('./config/express')(this.serviceName,this.port);
        return this.app
    }
}

module.exports = Server;

if(process.env.NODE_ENV != "test") {
    let server = new Server(serviceName,port)
    server.start()
}
