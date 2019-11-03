var template ={
    HTML: function (body){
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
      
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
      
        <title>차용증 쉽게 작성하기</title>
      
        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
      
        <!-- Custom styles for this template -->
        <link href="css/simple-sidebar.css" rel="stylesheet">
      
      </head>
      
      <body>
      
        <div class="d-flex" id="wrapper">
      
          <!-- Sidebar -->
          <div class="bg-light border-right" id="sidebar-wrapper">
            <div class="sidebar-heading"><a href = 'index.html' style="text-decoration:none">서비스명</a></div>
            <div class="list-group list-group-flush">
              <a href="#" class="list-group-item list-group-item-action bg-light" style= "font-weight:bold">서비스 이용 방법</a>
              <a href="#" class="list-group-item list-group-item-action bg-light">     - 서비스 안내</a>
              <a href="#" class="list-group-item list-group-item-action bg-light">     - 지갑 만들기</a>
              <a href="#" class="list-group-item list-group-item-action bg-light">     - 차용증 작성</a>
              <a href="#" class="list-group-item list-group-item-action bg-light">     - 차용증 확인</a>
              <a href="#" class="list-group-item list-group-item-action bg-light" style= "font-weight:bold">차용증 작성</a>
              <a href="#" class="list-group-item list-group-item-action bg-light" style= "font-weight:bold">차용증 확인</a>
              
            </div>
          </div>
          <!-- /#sidebar-wrapper -->
      
          <!-- Page Content -->
          <div id="page-content-wrapper">
      
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <button class="btn btn-primary" id="menu-toggle">메뉴</button>
      
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
      
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li class="nav-item active">
                    <a class="nav-link" href='index.html'>Home <span class="sr-only">(current)</span></a>
                  </li>
                </ul>
              </div>
            </nav>
      
            <div class="container-fluid">
              ${body}
            </div>
          </div>
          <!-- /#page-content-wrapper -->
      
        </div>
        <!-- /#wrapper -->
      
        <!-- Bootstrap core JavaScript -->
        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      
        <!-- Menu Toggle Script -->
        <script>
          $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
          });
        </script>
      
      </body>
      
      </html>
      
      `;
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