var http = require('http');

var app = http.createServer(function(request,response){

  var html = `<!doctype html>
  <html>
  <head>
    <title>WEB1 - Welcome</title>
    <meta charset="utf-8">
    
  </head>
  <body>
    <h2>WEB</h2>
  </body>
  </html>
  `
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

   element.style.display = 'none';
    document.body.appendChild(element);

   element.click();

    document.body.removeChild(element);
    }
    
    download("hello.txt","This is the content of my file :)");

  response.writeHead(200);
  response.end(html);
});

app.listen(3000);
