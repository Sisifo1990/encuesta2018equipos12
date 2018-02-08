<%-- 
    Document   : GestionPremio
    Created on : 28/11/2017, 09:21:26 AM
    Author     : Usuario
--%>

<%@page import="dominio.Usuario"%>
<%@page import="persistencia.BaseDatos"%>
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
        <title>Secci&oacute;n de Premios</title>
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
                    <a class="nav-link" href="#"><i class="fa fa-users" aria-hidden="true"></i> Gesti&oacute;n de Panel</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-gift" aria-hidden="true"></i> Secci&oacute;n de Premio</a>
                    <div class="dropdown-menu">
                        <a class="nav-link dropdown-item" id='createPremioTab' data-toggle="tab" href="#create" role="tab" aria-controls="create" aria-selected="true" onclick="cargarEncuestas()">Crear Premio</a>
                        <a class="nav-link dropdown-item" id='updatePremioTab' data-toggle="tab" href="#update" role="tab" aria-controls="update" aria-selected="false" onclick="cargarDataTable()">Modificar</a>
                        <a class="nav-link dropdown-item" id='requestsPremioTab' data-toggle="tab" href="#requests" role="tab" aria-controls="requests" aria-selected="false" onclick="verSolicitudes()">Ver solicitudes de Premio</a>
                    </div>    
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="GestionEncuestas.jsp"><i class="fa fa-book" aria-hidden="true"></i> Gesti&oacute;n de Encuestas</a>
                </li>
                <li>
                    <a class="nav-link" href="reportesPanelEncuestas.jsp">Reportes</a>
                </li>
                <li>
                    <%
                        if(u!=null){
                    %>
                    <button class="nav-link bg-danger text-white" id="btnLogOut" onclick="logout()"><i class="fa fa-sign-out" aria-hidden="true"></i> Cerrar Sesi&oacute;n</button>
                    <%
                        }
                    %>
                   
                </li>
            </ul>

        </nav>
        <div id="myModalConfirm" class="modal fade" data-keyboard="false" data-backdrop="static" role="dialog">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="tituloModal"></h4>
                    </div>
                    <div class="modal-body">
                        <p id="mensajeConfirmacion"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnSi" onclick="">Si</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" id="btnNo" onclick="">No</button>
                    </div>
                </div>

            </div>
        </div>
        <div class="container">
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="create" role="tabpanel" aria-labelledby="createPremioTab">
                    <form action="/AplicacionGestionMuestras2/seccionPremios"></form>
                    <div class="form-group w-50">
                        <label for="nombrePremio">Nombre del Premio</label>
                        <input type="text" class="form-control control-create" name="nombrePremio" id="nombrePremio" placeholder="Nombre del Premio">
                    </div>
                    <div class="form-group w-50 ">
                        <label for="descripcionPremio">Descripci&oacute;n</label>
                        <input type="text" class="form-control control-create" name="descripcionPremio" id="descripcionPremio" placeholder="Descripci&oacute;n del Premio">
                    </div>
                    <div class="form-group w-50">
                        <label for="puntosPremio">Puntos</label>
                        <input type="number" class="form-control control-create" name="puntosPremio" id="puntosPremio">
                    </div>
                    <div class="form-group w-50">
                        <label for="stockPremio">Stock</label>
                        <input type="number" class="form-control control-create" name="stockPremio" id="stockPremio">
                    </div>
                    <div class="form-group ">
                        <label for="stockPremio">Agregar a Encuesta</label>
                        <div id="surveyList">

                        </div>
                        <%--Es un ejemplo de como implementarlo%--%>

                        <%--<select multiple="multiple" size="5">
                            <option value="1">Uruguay</option>
                            <option value="2">Argentina</option>
                            <option value="3">Brasil</option>
                            <option value="4">Chile</option>
                            <option value="5">Paraguay</option>
                            <option value="6">Bolivia</option>
                            <option value="7">Peru</option>
                        </select>%--%>

                    </div>
                    <div class="form-group">
                        <input type="button" class="btn btn-lg btn-primary text-center" onclick="crearPremio()" value="Crear Premio" id="btn-CreatePrize">

                    </div>
                </div>

                <div class="tab-pane fade" id="update" role="tabpanel" aria-labelledby="updatePremioTab">
                    <h1 class="text-center">Modificar el premio</h1>
                    <div id="dataTablePrizes">
                        <table class="jqueryDataTable display table-striped table-bordered" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Encuestas</th>
                                    <th>Id Premio</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Puntos</th>
                                    <th>Stock</th>
                                    <th>Solicitudes</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Id Premio</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Puntos</th>
                                    <th>Stock</th>
                                    <th>Solicitudes</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <form>        </form>

                    <div class="form2">
                        <div class="form-group">
                            <label for="nombrePremio2">Nombre del Premio</label>
                            <input type="text" class="form-control control-update" id="nombrePremio2" placeholder="Nombre del Premio">
                        </div>
                        <div class="form-group">
                            <label for="descripcionPremio2">Descripci&oacute;n</label>
                            <input type="text" class="form-control control-update" id="descripcionPremio2" placeholder="Descripci&oacute;n del Premio">
                        </div>
                        <div class="form-group">
                            <label for="puntosPremio2">Puntos</label>
                            <input type="number" class="form-control control-update" id="puntosPremio2">
                        </div>
                        <div class="form-group">
                            <label for="stockPremio2">Stock</label>
                            <input type="number" class="form-control control-update" id="stockPremio2">
                        </div>
                        <div class="form-group">
                            <label for="surveyList2">Agregar a Encuesta</label>
                            <div id="surveyList2">

                            </div>
                            <%--Es un ejemplo de como implementarlo%--%>
                            <%--<select multiple="multiple" size="5">
                                <option value="1">Uruguay</option>
                                <option value="2">Argentina</option>
                                <option value="3">Brasil</option>
                                <option value="4">Chile</option>
                                <option value="5">Paraguay</option>
                                <option value="6">Bolivia</option>
                                <option value="7">Peru</option>
                            </select>--%>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-lg btn-primary justify-content-center" type="submit" onclick="updatePremio()">Actualizar Premio</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-lg btn-primary justify-content-center" type="button" onclick="cargarDataTable()">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="requests" role="tabpanel" aria-labelledby="requestsPremioTab">
                    <h1 id="titleRequest">Solicitud de Premios</h1>
                    
                    <h4>Pendientes</h4>
                    <table class="table table-striped" id="requestsPrize">
                        <thead><tr><td scope="col"></td><td scope="col">Solicitante</td><td scope="col">Saldo de Puntaje</td><td scope="col">Premio</td><td scope="col">Valor del Premio</td><td scope="col">Fecha de solicitud</td><td scope="col">Estado</td><td scope="col"></td><td scope="col"></td></tr></thead>
                        <tbody></tbody>
                        <tfoot></tfoot>
                    </table> 
                    <a class="font-weight-bold" data-toggle="collapse" href="#approved" role="button" aria-expanded="false" aria-controls="approved">
                        <h4>Aprobadas<span class="badge badge-secondary" id="cantidadAprobadas"></span></h4></a>
                    <div class="collapse" id="approved">
                        <table class="table table-striped" id="requestsPrize2">
                            <thead><tr><td scope="col"></td><td scope="col">Solicitante</td><td scope="col">Saldo de Puntaje</td><td scope="col">Premio</td><td scope="col">Valor del Premio</td><td scope="col">Fecha de solicitud</td><td scope="col">Estado</td></tr></thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table> 
                    </div>
                    <a class="font-weight-bold" data-toggle="collapse" href="#rejected" role="button" aria-expanded="false" aria-controls="rejected">
                        <h4>Rechazadas<span class="badge badge-secondary" id="cantidadRechazadas"></span></h4></a>
                    <div class="collapse" id="rejected">
                        <table class="table table-striped" id="requestsPrize3">
                            <thead><tr><td scope="col"></td><td scope="col">Solicitante</td><td scope="col">Saldo de Puntaje</td><td scope="col">Premio</td><td scope="col">Valor del Premio</td><td scope="col">Fecha de solicitud</td><td scope="col">Estado</td></tr></thead>
                            <tbody></tbody>
                            <tfoot></tfoot>
                        </table> 
                    </div>
                </div>
            </div>
        </div>
        <script src="js/eventsource.js" type="text/javascript"></script>                
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        
        <%-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>--%>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
        <%--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>--%>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <%--Multiselect--%>
        <script src="js/jquery.multi-select.js" type="text/javascript"></script>
        <%--DataTables--%>
        <script src="js/jquery.dataTables.min.js" type="text/javascript"></script>
        <script src="js/dataTables.bootstrap4.min.js" type="text/javascript"></script>
        <script src="js/dataTables.colReorder.min.js" type="text/javascript"></script>
        <script src="js/dataTables.scroller.min.js" type="text/javascript"></script>
        <script src="js/dataTables.buttons.min.js" type="text/javascript"></script>
        <script src="js/gestionPremio.js" type="text/javascript"></script>
        <script src="js/login.js" type="text/javascript"></script>
        <script type="text/javascript">
                                    window.history.forward();
                                    
                                    
        </script>
    </body>
</html>
