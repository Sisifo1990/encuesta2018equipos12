<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="dominio.Usuario"%>
<%
    HttpServletResponse httpResponse = (HttpServletResponse) response;
httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
httpResponse.setHeader("Pragma", "no-cache"); // HTTP 1.0
httpResponse.setDateHeader("Expires", 0); 
String msg=request.getParameter("msg");


    Usuario u = ((Usuario) request.getSession(false).getAttribute("usuario"));
    if (u != null) {
        response.sendRedirect("GestionPremio.jsp");
    }
%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Inicio de Sesi&oacute;n</title>
        <link rel="stylesheet" type="text/css" href='css/palette.css'>
        <link href="font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
        
    </head>
    <body id="index">
        
        
         <%--<nav class="navbar navbar-expand-lg navbar-light bg-light">
<a class="navbar-brand" href="#">--%><div class='text-center'><img src="img/equipos_mori_logo.png" class="" alt="Equipos Consultores"/></div><%--</a>
        </nav>--%>
        
          <!-- Modal -->
<div class="modal fade" id="exampleModal"tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>   
            
        
       <div class="container">

           <form class="" action="/AplicacionGestionMuestras2/loginA" >
               
      <div class="form-signin">
        <h2 class=" form-signin-heading text-center">Iniciar Sesi&oacute;n</h2>
        <label for="inputEmail" class="sr-only">Correo electr&oacute;nico</label>
        <input type="text" id="inputEmail" name="inputEmail" class="form-control" placeholder="Nombre de usuario">
        <label for="inputPassword"  class="sr-only">Contrase&ntilde;a</label>
        <input type="password" id="inputPassword" name="inputPassword" class="form-control" placeholder="Contrase&ntilde;a">
        <input type="hidden" name="accion" value="login" hidden="true">
        <button class="btn btn-lg btn-warning btn-block" type="submit" onclick="loginAdministrador()"><i class="fa fa-sign-in" aria-hidden="true"></i> Iniciar Sesi&oacute;n</button>
      </div>
</form>
    </div> <!-- /container -->
     
     <%
           
           if(msg!=null){
               %>
           <div id="error" class="form-signin alert alert-success" role="alert">
               <p><%=msg%></p>
            </div>
        <%
            
        }
        %>
    

<script src="js/eventsource.js" type="text/javascript"></script>
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<%--<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>--%>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
        <%--<script src="http://code.jquery.com/jquery-latest.min.js"></script>--%>
        
    </body>
</html>
