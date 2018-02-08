<%-- 
    Document   : reportesPanelEncuestas
    Created on : 18/01/2018, 06:04:51 PM
    Author     : Usuario
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Reportes de Panel y Encuestas</title>
        <link href="font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <%--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">--%>
        <link rel="stylesheet" type="text/css" href='css/palette.css'>
        <link href="css/multi-select.css" rel="stylesheet" media="screen" type="text/css"/>
        <link href="css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/colReorder.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/scroller.bootstrap4.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery.dataTables.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/buttons.dataTables.min.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"><img src="img/home_logo sup.png" class="img-fluid" alt="Equipos Consultores"/></a>
            <ul class="nav nav-tabs" id='tabMenu' role='tablist'>

                <li class="nav-item">
                    <a class="nav-link" href="GestionPanel.jsp"><i class="fa fa-users" aria-hidden="true"></i> Gesti&oacute;n de Panel</a>
                </li>
                 <li class="nav-item">
                    <a class="nav-link" href="GestionPremio.jsp"><i class="fa fa-gift" aria-hidden="true"></i> Secci&oacute;n de Premios</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="GestionEncuestas.jsp"><i class="fa fa-book" aria-hidden="true"></i> Gesti&oacute;n de Encuestas</a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Reportes</a>
                    <div class="dropdown-menu">
                        <a class="nav-link dropdown-item" id='reportPanelTab' data-toggle="tab" href="#reportPanel" role="tab" aria-controls="reportPanel" aria-selected="true">Sobre Panel</a>
                        <a class="nav-link dropdown-item" id='reportSurveyTab' data-toggle="tab" href="#reportSurvey" role="tab" aria-controls="reportSurvey" aria-selected="false">Sobre Encuestas</a>
                    </div>    
                </li>

            </ul>

        </nav>
        <div class="container">
            
            <div class=""id="reportPanel">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                    <h3 class="display-3">Lista de paneles</h3>
                    
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row">
                    <div class="col-2"></div>
                <div class="col-8" id="accordion">
                    
                </div>
                    <div class="col-2"></div>
                    </div>
                
            </div>
            <div id="reporSurvey">
                <div class="row">
                    <div class="col-3"></div>
                    <div class="col-6">
                    <h3 class="display-3">Lista de Encuestas</h3>
                    
                    </div>
                    <div class="col-3"></div>
                </div>
                <div class="row">
                    <div class="col-2"></div>
                <div class="col-8" id="accordion2">
                    
                </div>
                    <div class="col-2"></div>
                    </div>
            </div>
        </div>
        <script src="js/eventsource.js" type="text/javascript"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <%--<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>--%>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
        <%--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>--%>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <%--<script src="http://code.jquery.com/jquery-latest.min.js"></script>--%>
        <script src="js/reportePanelEncuestas.js" type="text/javascript"></script>
    </body>
</html>
