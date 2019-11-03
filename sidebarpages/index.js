var http = require('http');
var url = require('url');
var qs = require('querystring');

//http://jaeyunkim.com/lockable-smart-contract-4/
var Web3 = require(web3);
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
var promissory = web3.eth.contract(require(`../truffle/build/contracts/Promissory`).abi).at("0x946F24A83461CEFcEb30b9714c5e4Cb3f701E289");

console.log(abi);
var app = http.createServer(function(request,respose){
    var _url = requres.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);

    if(pathname === '/'){
        if(queryData.id == undefined){ //main page
   
           fs.readdir('./data', function(error, filelist){
             var title = 'welcome';
             var description = 'Hello, Node.js';
             var list = template.list(filelist);
             var html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`,`<a href="/create">Create</a>`);
   
             response.writeHead(200); //정상적으로 값 return
             response.end(html); //end 함수를 통해 컨텐츠를 브라우저에 전달
           })
   
        }
        else{
         fs.readdir('./data', function(error, filelist){
           fs.readFile(`data/${queryData.id}`, "utf8", function(err, description) {
             var title = queryData.id;
             var list = template.list(filelist);
             var html = template.HTML(title, list, `<h2>${title}</h2><p>${description}</p>`, 
             `<a href="/create">Create </a>
             <a href="/update?id=${title}"> Update</a>          
             <form action="delete_process" method="post">
               <input type="hidden" name="id" value="${title}">
               <input type="submit" value="delete">
             </form>`);
   
             response.writeHead(200);
             response.end(html);
           });
         })
       }
})

app.listen(3000);