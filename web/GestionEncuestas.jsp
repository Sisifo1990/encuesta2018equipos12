<%-- 
    Document   : GestionEncuestas
    Created on : 02/01/2018, 12:14:08 PM
    Author     : Usuario
--%>

<%@page import="dominio.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Secci&oacute;n de Encuestas</title>
        <link href="font-awesome-4.7.0/css/font-awesome.css" rel="stylesheet" type="text/css"/>
        <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
        <%--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">--%>
        <link rel="stylesheet" type="text/css" href='css/palette.css'>
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
                    <a class="nav-link" href=""><i class="fa fa-users" aria-hidden="true"></i> Gesti&oacute;n de Panel</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="GestionPremio.jsp"><i class="fa fa-gift" aria-hidden="true"></i> Secci&oacute;n de Premio</a>

                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"> <i class="fa fa-book" aria-hidden="true"></i> Gesti&oacute;n de Encuestas</a>
                    
                    <div class="dropdown-menu">
                        <a class="nav-link dropdown-item active" id='createSurveyTab' data-toggle="tab" href="#createSurvey" role="tab" aria-controls="createSurvey" aria-selected="true">Crear Encuesta</a>
                        <a class="nav-link dropdown-item" id='viewSurveyTab' data-toggle="tab" href="#viewSurvey" role="tab" aria-controls="viewSurvey" aria-selected="false">Ver Encuestas</a>
                    </div>    
                </li>
                <li>
                    <a class="nav-link" href="reportesPanelEncuestas.jsp">Reportes</a>
                </li>
            </ul>

        </nav>
        <div id="modalError" class="modal fade" data-keyboard="false" data-backdrop="static" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        
                        <h4 class="modal-title" id="tituloModal">Error de edicion</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p id="mensajeError"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnAceptar" onclick="">Aceptar</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnCancelar" onclick="">No</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="container">
            <div class="tab-content">
                <div class="tab-pane fade show active" id="createSurvey" role="tabpanel" aria-labelledby="createSurvey">
                    <div class="row align-items-start">

                        <div class="nav nav-pills flex-column col-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a class="nav-link active" id="crearEncuestalink" data-toggle="pill" href="#crearEncuestaForm" role="tab" <%--aria-controls="crearEncuestaForm"--%> aria-selected="true"><i class="fa fa-newspaper-o" aria-hidden="true"></i> Crear Encuesta</a>
                            <%--<a class="nav-link" id="crearPreguntaEncuestalink" data-toggle="pill" href="#crearPreguntaEncuestaForm" role="tab" aria-controls="crearPreguntaEncuestaForm" aria-selected="false">Pregunta 1</a>
                            --%>
                        </div>


                        <div class="tab-content col-9" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="crearEncuestaForm" role="tabpanel" <%--aria-labelledby="crearEncuestalink"--%>>
                                <h3 class="text-center" id="tituloCreate">Crear Encuesta</h3>
                                <div class="form-group row">
                                    <label for="nombreEncuestaCreate" class="col-4 col-form-label">Nombre de Encuesta</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control surveyForm" id="nombreEncuestaCreate">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="descripcionEncuestaCreate" class="col-4 col-form-label">Descripci&oacute;n</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control surveyForm" id="descripcionEncuestaCreate">
                                    </div>
                                </div> 
                                <div class="form-group row">
                                    <label for="puntosEncuestaCreate" class="col-4 col-form-label">Cantidad de Puntos</label>
                                    <div class="col-8">
                                        <input type="number" class="form-control surveyForm" id="puntosEncuestaCreate">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <h4>Elige alguno de los paneles disponibles...</h4>
                                    <table class="jqueryDataTable2 display table-striped table-bordered" cellspacing="0" width="100%">
                                        <thead><tr><th></th><th>Nombre de Panel</th><th>Descripci&oacute;n</th></tr></thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div class="form-group row">
                                    <label for="empresaEncuestaCreate" class="col-4 col-form-label">Nombre de Empresa</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control surveyForm" id="empresaEncuestaCreate">
                                    </div>
                                </div>
                                <div class="form-group row btnContinueSurvey">
                                    <div class="col-6">
                                        <button id="btnContinueCreate" class="btn btn-primary"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> Continuar</button>
                                    </div>

                                </div>
                            </div>
                            <div class="tab-pane fade" id="crearPreguntaEncuestaForm" role="tabpanel" <%--aria-labelledby="crearPreguntaEncuestalink"--%>>    
                                <h3 id="titulonroPregunta"></h3>
                                <div class="form-group row">
                                    <label for="preguntaEncuestaCreate" class="col-4 col-form-label">Pregunta</label>
                                    <div class="col-8">
                                        <input type="text" class="form-control" id="preguntaEncuestaCreate">
                                    </div>
                                </div>
                                <div id="respuestasList">
                                    <div class="form-group row respuestaEncuestaCrear">
                                        <div class="col">
                                            <label for="respuestaEncuestaCreate1" class="col-form-label">Respuesta 1</label>
                                        </div>
                                        <div class="col-6">
                                            <input type="text" class="form-control"  id="respuestaEncuestaCreate1">

                                        </div>
                                        <div class="col">
                                            <button class="btn btn-success addResponse"  id="btnAgregarNuevaRespuesta"><i class="fa fa-plus-square" aria-hidden="true"></i> Agregar Respuesta</button>
                                            <br>
                                            <button class="btn deleteResponse" "btnBorrarUltRespuesta"><i class="fa fa-minus-square" aria-hidden="true"></i> Eliminar Respuesta</button>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div class="form-group row align-items-end">
                                    <div class="col-4">
                                        <button type="button" class="btn btn-primary w-75" id="crearNuevaPregunta">Crear Nueva Pregunta</button>
                                    </div>
                                    <div class="col-4">
                                        <button type="button" class="btn btn-primary w-75" id="btnCerrarEncuesta">Crear Encuesta</button>
                                    </div>
                                    <div class="col-4">
                                        <button type="button" class="btn btn-primary w-75" id="btnIrPreguntaAnterior">Ir a pregunta anterior</button>                                        
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div class="tab-pane fade" id="viewSurvey" role="tabpanel" aria-labelledby="viewSurveyTab">
                    <div class="row">
                        <div class="col-12">
                            <table id="surveyDataTable" class="display table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr><th>Id de Encuesta</th><th>Nombre de Encuesta</th><th>Descripci&oacute;n</th><th>Cantidad de Preguntas</th><th>Premio</th><th>Puntos</th><th></th><th></th><th></th></tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>    
                    </div>
                </div>   
            </div>
        </div>
        <script src="js/eventsource.js" type="text/javascript"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script src="js/gestionEncuesta.js" type="text/javascript"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <%--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>--%>
        <script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="js/dataTables.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/dataTables.colReorder.min.js" type="text/javascript"></script>
        <script src="js/dataTables.scroller.min.js" type="text/javascript"></script>
        <script src="js/dataTables.buttons.min.js" type="text/javascript"></script>

    </body>
</html>
