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
    else if(pathname === '/create_note'){
      var body = '';
      //request 요청할 때 web brower가 보낸 정보. web browser는 data의 크기가 클 때 한 번에 전송하면 오류가 생길 수 있기 때문에 나눠서 보내고, 이를 수신하기 위해 사용
        request.on('data', function(data){ 
            body = body + data;
            if(body.lengh >1e7){ //data가 10mb 이상이라 너무 많을 때 연결 끊기
              request.connection.destroy();
            }
        });
        //정보 수신이 끝났을 때
        request.on('end', function(){
            var post = qs.parse(body); //입력받은 data 전달
            var text = template.Filecreation(post);
            
            var html = template.TEXT(text);
            response.writeHead(200); //정상적으로 값 return
            response.end(html); //end 함수를 통해 컨텐츠를 브라우저에 전달  
        });
         
    }
    else if(pathname === '/confirm_note'){
      body = '';
      request.on('data', function(data){
        body = body + data;
        if(body.lengh >1e6){ //data가 1mb 이상이라 너무 많을 때 연결 끊기
          request.connection.destroy();
        }
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var _hash = post.note_hash;
        var key = post.key;

      })
    }
    else if(pathname === '/check_note'){
      body = '';
      request.on('data', function(data){
        body = body + data;
        if(body.lengh >1e7){ //data가 10mb 이상이라 너무 많을 때 연결 끊기
          request.connection.destroy();
        }
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var _hash = post.note_hash;
        var content = post.note_info;

      })
    }
    else{
      response.writeHead(404); //not found
      response.end('Not found');
    }
})

app.listen(3000);