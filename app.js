var express = require('express'),
app = express(),
chalk = require('chalk'),
server = require('http').Server(app);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static(__dirname));

server.listen(3000, function(){
  console.log(chalk.green('listening on port 3000'));
});
