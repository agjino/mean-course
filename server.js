const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer(app);

server.on("error", function(error) {
  console.log(error);
});
server.on("listening", function() {
  console.log('...listening...');
});
server.listen(port); 