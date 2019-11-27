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
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "check_note",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "note_hash",
				"type": "bytes32"
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "create_note",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			}
		],
		"name": "logConfirmed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes32",
				"name": "_hash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "int256",
				"name": "confirmed",
				"type": "int256"
			}
		],
		"name": "LogNoteExist",
		"type": "event"
	}
]); // contract ABI
promissoryContract.options.address = "0xEDb98C13B5d13D917e67BFaD2bAC67Efb5a0D2E5"; // deployed contract address
promissoryContract.options.gasPrice = '200000000000'; // default gas price in wei
promissoryContract.options.gas = 500000;


//server
var app = http.createServer(function(request,response){
  
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);

	// home - main page
    if(pathname === '/'){
        if(queryData.id == undefined){ //main page
         
          fs.readFile(`pages/home.html`, "utf8", function(err, description){
            var html = template.HTML(`${description}`);
          
            response.writeHead(200); 
            response.end(html);
          })         
        }
        else{ //pages that explain how this service works - classify by query data
           fs.readFile(`pages/${queryData.id}`, "utf8", function(err, description) {
             var html = template.HTML(`${description}`);
             response.writeHead(200);
             response.end(html);
           });        
       }
	}
    else if(pathname === '/create_note'){ // handle data needed for promissory note creation 
      var body = '';
      //request 요청할 때 web brower가 보낸 정보. web browser는 data의 크기가 클 때 한 번에 전송하면 오류가 생길 수 있기 때문에 나눠서 보내고, 이를 수신하기 위해 사용
        request.on('data', function(data){ 
            body = body + data;
            if(body.length >1e7){ //when there is too much data than expected
              request.connection.destroy();
            }
        });
        //when all the datas are received
        request.on('end', function(){
            var post = qs.parse(body); //parse data into form that is more easier to use
            var text = template.Filecreation(post); //change information into one long line
            var creditor = post.credit_key;
            var debtor = post.debtor_key;
			
			//use hash algorithm to change data into shorter and deployable form
			var _hash = crypto.createHash('sha256').update(text).digest('hex'); 
            var note_hash = '0x';
			note_hash = note_hash.concat(_hash);
			var change = new String(note_hash);
			console.log(text);
			
			//send data to smart contract deployed in chain
            promissoryContract.options.from = creditor;
            promissoryContract.methods.create_note(creditor, debtor, change.valueOf()).send();
			
			

			//show the result to the user
            var html = template.TEXT(`<ul> <li><h3>차용증 내용</h3></li>${text}<br> <li><h3>차용증 해시</h3></li>     ${note_hash}<br> </ul>`);
            response.writeHead(200);
            response.end(html);
        });
         
    }
    else if(pathname === '/confirm_note'){ //both debtor and creditor signs the promissory contract
      body = '';
      request.on('data', function(data){
        body = body + data;
        if(body.length >1e6){ // stop receiving data when data is larger than expected
          request.connection.destroy();
        }
      });

      request.on('end', function(){
        var post = qs.parse(body);
        var _hash = post.note_hash;
        var key = post.key;
		
		//change values in smart contract
        promissoryContract.options.from = key;
        promissoryContract.methods.confirm_note(key, _hash).send();
		
		/**
		 * //check for promissory note creation
		var event = promissoryContract.logNewNote();
		event.watch(function(error,result){
			if(!error)
				console.log(result);
		})
		 */

		//show result to user
        var html = template.HTML(`<br><br><h3>차용증이 정상적으로 확정되었습니다</h3>`);

        response.writeHead(200); //정상적으로 값 return
        response.end(html);
      })
    }
    else if(pathname === '/check_note'){ //차용증이 실제 작성되어 동의되었는 지, 내용이 일치하는 지 확인
	  body = '';
	  console.log("inside");
      request.on('data', function(data){
        body = body + data;
        if(body.length >1e6){ //data가 100mb 이상이라 너무 많을 때 연결 끊기
          request.connection.destroy();
        }
      });

      request.on('end', function(){
        var post = qs.parse(body);
		var key = post.key;
		var _hash = post.note_hash;
		var content = post.note_info;
		console.log(content);

        var note_hash = crypto.createHash('sha256').update(content).digest('hex'); 
		var new_hash = '0x';
		new_hash = new_hash.concat(note_hash);
		var change = new String(new_hash);
		change = change.valueOf();

		
		promissoryContract.options.from = key;
		promissoryContract.methods.check_note(_hash).send();
		var result = promissoryContract.once('LogNoteExist', function(error, event){console.log(event);});
		console.log(_hash);
		console.log(change);
		console.log(result);

		if(change != _hash){
			var html = template.HTML(`<h2>존재하지 않는 차용증입니다.</h2>`);
		}
        else if( change == _hash){
          	var html = template.HTML(`<p>해당 내용의 차용증이 존재합니다.<br>`);
		}
		else{
			var html = template.HTML(`<p>해당 내용의 차용증이 존재합니다.2<br>`);
		}
		response.writeHead(200); //정상적으로 값 return
		response.end(html);
      })
    }
    else{ //잘못된 페이지 입력 시 처리
      response.writeHead(404); //not found
      response.end('Not found');
    }
})

app.listen(3000);