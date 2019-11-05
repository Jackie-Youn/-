var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./template.js');
var Web3 = require('web3');
const crypto = require('crypto');

// set the provider you want from Web3.providers
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
   
  
web3.eth.defaultAccount = web3.eth.accounts[0];

var promissoryContract = new web3.eth.Contract([
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "_hash",
				"type": "address"
			}
		],
		"name": "check_note",
		"outputs": [
			{
				"internalType": "address",
				"name": "number",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_hash",
				"type": "address"
			}
		],
		"name": "confirm_note",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "creditor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "debtor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_hash",
				"type": "address"
			}
		],
		"name": "create_note",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "notes",
		"outputs": [
			{
				"internalType": "address",
				"name": "creditor_addr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "debtor_addr",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "note_hash",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "creditor_confirmed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "debtor_confirmed",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "creditor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "debtor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_hash",
				"type": "address"
			}
		],
		"name": "logNewNote",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_hash",
				"type": "address"
			}
		],
		"name": "logConfirmed",
		"type": "event"
	}
]);
promissoryContract.options.address = "0x8c9C860c3F98e23D4002af5BA34c32e5E7eFB130";
promissoryContract.options.gasPrice = '200000000000'; // default gas price in wei
promissoryContract.options.gas = 500000;

var app = http.createServer(function(request,response){
  
 //바꾸기
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
            if(body.length >1e7){ //data가 10mb 이상이라 너무 많을 때 연결 끊기
              request.connection.destroy();
            }
        });
        //정보 수신이 끝났을 때
        request.on('end', function(){
            var post = qs.parse(body); //입력받은 data 전달
            var text = template.Filecreation(post); //전체 내용 하나의 줄글로 정리
            
            var creditor = post.credit_key;
            var debtor = post.debtor_key;
            var _hash = crypto.createHash('sha256').update(text).digest('hex'); 
            var note_hash = '0x';
            note_hash = note_hash.concat(_hash);
            console.log(note_hash);
            promissoryContract.options.from = creditor;
            promissoryContract.methods.create_note(creditor, debtor, note_hash).send();
            
            var html = template.TEXT(`<ul> <li><h3>차용증 내용</h3></li>${text}<br> <li><h3>차용증 해시</h3></li>     ${note_hash}<br> </ul>`);
            response.writeHead(200); //정상적으로 값 return
            response.end(html); //end 함수를 통해 컨텐츠를 브라우저에 전달  
        });
         
    }
    else if(pathname === '/confirm_note'){
      body = '';
      request.on('data', function(data){
        body = body + data;
        if(body.length >1e6){ //data가 1mb 이상이라 너무 많을 때 연결 끊기
          request.connection.destroy();
        }
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var _hash = post.note_hash;
        var key = post.key;
        
        promissoryContract.options.from = key;
        promissoryContract.methods.confirm_note(key, _hash).send();
        
        var html = template.HTML(`<br><br><h3>차용증이 정상적으로 확정되었습니다</h3>`);

        response.writeHead(200); //정상적으로 값 return
        response.end(html);
      })
    }
    else if(pathname === '/check_note'){
	  body = '';
	  console.log("inside");
      request.on('data', function(data){
        body = body + data;
        if(body.length >1e6){ //data가 100mb 이상이라 너무 많을 때 연결 끊기
          request.connection.destroy();
        }
      });
	  console.log(body);
      request.on('end', function(){
        var post = qs.parse(body);
		var key = post.key;
		var _hash = post.note_hash;
        var content = post.note_info;
        var note_hash = crypto.createHash('sha256').update(content).digest('hex'); 
        var new_hash = '0x';
		new_hash = new_hash.concat(note_hash);

		var result = 0x0;
		promissoryContract.options.from = key;
		result = promissoryContract.methods.check_note(_hash).send();
		if(result == address(0) ||new_hash != _hash){
			var html = template.HTML(`<h2>존재하지 않는 차용증입니다.</h2>`);
          
            response.writeHead(200); //정상적으로 값 return
            response.end(html);
		}
        if(new_hash == _hash){
          var html = template.HTML(`<p>해당 내용의 차용증이 존재합니다.<br>`);
          
            response.writeHead(200); //정상적으로 값 return
            response.end(html);
        }
      })
    }
    else{
      response.writeHead(404); //not found
      response.end('Not found');
    }
})

app.listen(3000);