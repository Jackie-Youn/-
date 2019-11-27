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
        
        <h1><a href="/" style="text-decoration:none; color:black"> ProPro(프로프로) - 차용증 작성하기(Promissory Protection) </a></h1>
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
              <li><a href="/?id=confirmNote" style="text-decoration:none; color:black; font-weight:bold">차용증 확정</a></li>
            <li> <a href="/?id=checkNote" style="text-decoration:none; color:black;font-weight:bold">차용증 확인</a></li>
              </ul>
            </div>
            <div style=" margin:10px; border: 1px solid black; padding: 10px; height: auto; min-height: 600px; overflow: auto;">
            
            ${body}
           </div>
        </p>
      </body>
      </html>`;
    },
    Filecreation: function (post){
      var text ='';
      
      var type = ['채권자 정보 -- 우편번호: ','-', ' | 주소: ', ' | 이름: ', ' | 주민등록번호: ', ' - ', ' | 핸드폰 번호: ', ' | 개인 키: ',  ' | 채무자 정보 -- 우편번호: ','-', ' | 주소: ', ' | 이름: ', ' | 주민등록번호: ', ' - ', ' | 핸드폰 번호:', ' | 개인 키: ', ' | 차용액: ',' | 변제 일: ', '년 ', '월 ', '일', ' | 변제방법: ', ' | 이자율: ', '% | 이자 지급방법: ', ' | 기타조건: '];
      var name = ['credit_post1', 'credit_post2', 'credit_addr', 'credit_name', 'credit_num1','credit_num2','credit_phone', 'credit_key', 'debtor_post1',  'debtor_post2','debtor_addr', 'debtor_name', 'debtor_num1', 'debtor_num2', 'debtor_phone', 'debtor_key','money','year','month','date', 'payback','interest_rate', 'interest_payback','exception'];

      for(var i = 0; i < 25; i++){
        text = text + type[i];
        if(i<20) text = text + post[name[i]];
        else if(i >20) text = text + post[name[i-1]];
        else if(i>24) continue;
      }
      
      return text;
    },

    TEXT: function (body){
      return `
      <!DOCTYPE html>
      <html>
      <head>
      
        <meta charset="utf-8">
      
        <title>차용증 쉽게 작성하기</title>
    
      
      </head>
      <body>
        
        <h1><a href="/" style="text-decoration:none; color:black"> ProPro(프로프로) - 차용증 작성하기(Promissory Protection) </a></h1>
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
              <li><a href="/?id=confirmNote" style="text-decoration:none; color:black; font-weight:bold">차용증 확정</a></li>
            <li> <a href="/?id=checkNote" style="text-decoration:none; color:black;font-weight:bold">차용증 확인</a></li>
              </ul>
            </div>
            <div style=" margin:10px; border: 1px solid black; padding: 10px; height: auto; min-height: 600px; overflow: auto;">
            
            ${body}
            
            <br> <br>
            *** 위의 내용은 차용증에 포함된 내용과 차용증 해시입니다.<br> 추후 변제받지 못하였을 시 차용증이 작성되었는 지 확인하기 위해 필요한 내용이오니 차용증 내용과 해시를 별도로 워드/텍스트 파일의 형태로 저장해두시길 바랍니다. 
           </div>
        </p>
      </body>
      </html>`;
    }
  }

  module.exports = template;