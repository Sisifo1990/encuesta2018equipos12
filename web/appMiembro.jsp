<%-- 
    Document   : appMiembro
    Created on : 04/02/2018, 10:58:49 PM
    Author     : Usuario
--%>

<%@page import="dominio.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
   HttpServletResponse httpResponse = (HttpServletResponse) response;
httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
httpResponse.setHeader("Pragma", "no-cache"); // HTTP 1.0
httpResponse.setDateHeader("Expires", 0); 
String msg=request.getParameter("msg");
    Usuario u = ((Usuario) request.getSession().getAttribute("usuario"));
   
    if (u == null) {
        response.sendRedirect("index.jsp");
    }
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Equipo Consultores Encuestas</title>
        <link href="font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        

            
                 <nav class="navbar navbar-expand-lg navbar-light" role="navigation">
            <a class="navbar-brand" href="#"><img src="img/home_logo sup.png" class="img-fluid" alt="Equipos Consultores"/></a>
            

            <div role="tablist">  
         <a class="nav-item nav-link active" id="showPrizeAvailable" data-toggle="tab" href="#prizeList" role="tab" aria-controls="prizeList" aria-selected="false">
                    Ver premios disponibles
                </a>
                
               
                <a class="nav-item nav-link" href="#" role="tab">
                    Hacer Encuesta
                </a>
                <a class="nav-item nav-link" href="#" role="tab">
                    Transferir puntos
                </a>
               
                <a class="nav-item nav-link" href="#" role="tab">
                    Mi Perfil
                </a>
            </div> 
                 </nav>
            <div class="tab-content" id="contentApp">
                <div class="tab-pane fade" id="prizeList" role="tabpanel" aria-labelledby="showPrizeAvailable">

                <div id="cardPrizeList"></div>
                <div id="cardPrizeList2"></div>
                </div>
            </div>
            
            <script src="js/bootstrap.min.js" type="text/javascript"></script>
            <script src="js/jquery-3.2.1.min.js" type="text/javascript"></script>
    </body>
</html>
