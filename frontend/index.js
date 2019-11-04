var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./template.js');
//http://jaeyunkim.com/lockable-smart-contract-4/
/*
var Web3 = require(web3);
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var promissory = web3.eth.contract(require(`../truffle/build/contracts/Promissory`).abi).at("0x946F24A83461CEFcEb30b9714c5e4Cb3f701E289");

console.log(abi);
*/
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);

    if(pathname === '/'){
        if(queryData.id == undefined){ //main page
         
          fs.readFile(`pages/home.html`, "utf8", function(err, description){
            var html = template.HTML(`${description}`);
          
            response.writeHead(200); //정상적으로 값 return
            response.end(html); //end 함수를 통해 컨텐츠를 브라우저에 전달
   
          })
          
        }
        else{
           fs.readFile(`pages/${queryData.id}`, "utf8", function(err, description) {
             var html = template.HTML(`${description}`);
             response.writeHead(200);
             response.end(html);
           });
         
       }
    }
})

app.listen(3000);