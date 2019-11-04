var template ={
    HTML: function (body){
      return `
      <!DOCTYPE html>
      <html>
      <head>
      
        <meta charset="utf-8">
      
        <title>차용증 쉽게 작성하기</title>
    
      
      </head>
      <body>
        
        <h1><a href="/" style="text-decoration:none; color:black">서비스명 들어갈 자리 </a></h1>
        <p>
            <div style="float:left; margin-right:20px; border: 1px solid blue; padding: 10px; padding-right: 40px; height: auto; min-height: 600px; overflow: auto;">
              <ul>
                 <li> <a href="/?id=explainBody" style="text-decoration:none; color:black; font-weight:bold">서비스 이용 방법</a>
                 </li>
                 <ul>
                  <li><a href="/?id=explainBody" style="text-decoration:none; color:black;">      서비스 안내</a></li>

                  <li><a href="/?id=explainBody2" style="text-decoration:none; color:black;">      지갑 만들기</a></li>
                  <li><a href="/?id=explainBody3" style="text-decoration:none; color:black;">      차용증 작성법</a></li>
                <li><a href="/?id=explainBody4" style="text-decoration:none; color:black;">      차용증 확인법</a></li>
                </ul>
                <br>
              <li><a href="/?id=writeNote" style="text-decoration:none; color:black; font-weight:bold">차용증 작성</a></li>
            <li> <a href="/?id=checkNote" style="text-decoration:none; color:black;font-weight:bold">차용증 확인</a></li>
              </ul>
            </div>
            <div style=" margin:10px; border: 1px solid black; padding: 10px; height: auto; min-height: 600px; overflow: auto;">
            
            ${body}
           </div>
        </p>
      </body>
      </html>`;
    }/*,
    list: function (filelist){
      //list 정의
             ///* <ol>
                  <li><a href="/?id=HTML">HTML</a></li>
                  <li><a href="/?id=CSS">CSS</a></li>
                  <li><a href="/?id=Javascript">JavaScript</a></li>
              </ol>
            ///*
  
    var list = `<ul>`;
    for(var i = 0; i < filelist.length; i++){
      list = list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list += '</ul>'
    return list;
    }*/
  }

  module.exports = template;