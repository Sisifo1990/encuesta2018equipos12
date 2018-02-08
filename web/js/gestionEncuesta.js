/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var encuesta = null;
var error = null;


//$("#btnAgregarNuevaRespuesta").click(addResponse);
$("#v-pills-tab").off("click", "#crearPreguntaEncuestalink.nav-link");
$("#v-pills-tab").off("click", "#crearEncuestalink.nav-link");
$("#v-pills-tab").on("click", "#crearPreguntaEncuestalink.nav-link", continuar);
$("#v-pills-tab").on("click", "#crearEncuestalink.nav-link", continuar);
$("#respuestasList").on("click", ".addResponse", addResponse);
$("#btnCerrarEncuesta").click(addSurvey);
$("#crearNuevaPregunta").click(continuar);
$("#btnIrPreguntaAnterior").click(irPreguntaAnterior);
$("#btnCancelar").hide();
$("#viewSurveyTab").click(cargarDataTableEncuestas);

$("#createSurvey").click(function(){
 $("#tituloCreate").text("Crear encuesta");
 });
//$("#respuestasList").on("dblclick",".addResponse",deleteButton);
/*$("v-pills-tab").on('click', "#crearPreguntaEncuestalink", function () {
 $(this).tab('show');
 
 });*/
$(".btnContinueSurvey").on("click", "#btnContinueCreate", continuarEncuesta);
var vistaEncuesta = new EventSource("seccionEncuestas?accion=new");
vistaEncuesta.addEventListener("cargarPaneles", function (evento) {
    $(".jqueryDataTable2 > tbody").html("");
    $(".jqueryDataTable2 > tbody").append(evento.data);
}, false);
function addResponse() {
    var cantidadRespuestas = parseInt($(".respuestaEncuestaCrear").length) + 1;
    var u = cantidadRespuestas - 1;

    $("#respuestasList").append("<div class='form-group row respuestaEncuestaCrear'><div class='col'><label for='respuestaEncuestaCreate" + cantidadRespuestas + "' class='col-form-label'>Respuesta " + cantidadRespuestas + "</label></div><div class='col-6'><input type='text' class='form-control' id='respuestaEncuestaCreate" + cantidadRespuestas + "'></div><div class='col'></div></div>");

}


function deleteButton() {
    cleanFormQuestion();
    var menuOptions = $("#v-pills-tab").children();
    var codeHtml = "";
    var copy;
    $(".respuestaEncuestaCrear input[type=text]").val("");
    var nroPregunta = menuOptions.length;


    if (menuOptions.length > 1) {
        for (var i = 0; i < menuOptions.length; i++) {
            codeHtml += $("#v-pills-tab").children()[i].outerHTML;
            if (i === menuOptions.length - 1) {
                copy = $("#v-pills-tab").children()[i];
                $("#v-pills-tab a:eq(" + i + ")").attr('class', 'nav-link');
                $("#v-pills-tab a:eq(" + i + ")").val("");
            }
        }
        copy.text = "Pregunta " + nroPregunta;
        $("#v-pills-tab").html(codeHtml + copy.outerHTML);

    } else {
        codeHtml += $("#v-pills-tab").children()[0].outerHTML; //aria-controls='crearPreguntaEncuestaForm'*/
        codeHtml += "<a class='nav-link' id='crearPreguntaEncuestalink' data-toggle='pill' href='#crearPreguntaEncuestaForm' role='tab'  aria-selected='false'><i class='fa fa-question-circle' aria-hidden='true'></i> Pregunta 1</a>";
        $("#v-pills-tab").html(codeHtml);
    }




    //$("#btnAgregarNuevaRespuesta").click(addResponse());

}

function continuarEncuesta(index) {
    //
    var nombreEncuesta = $("#nombreEncuestaCreate").val();
    var descripcionEncuesta = $("#descripcionEncuestaCreate").val();
    var puntosEncuesta = $("#puntosEncuestaCreate").val();
    var empresaEncuesta = $("#empresaEncuestaCreate").val();
    var panelesEncuesta = new Array();
    var filas = $(".jqueryDataTable2 > tbody > tr");
    for (var i = 0; i < filas.length; i++) {
        if (filas[i].children[0].children[0].checked) {
            panelesEncuesta.push(filas[i].children[0].children[0].value);
        }
    }
    var _idEncuesta = 0;
    var preguntas = new Array();
    if (encuesta !== null) {
        if (encuesta.hasOwnProperty("idEncuesta") && encuesta.idEncuesta > 0) {
            _idEncuesta = encuesta.idEncuesta;
            //panelesEncuesta=encuesta.panel;

        }
        if (encuesta.preguntas.length > 0)
            preguntas = encuesta.preguntas;

    }
    encuesta = {
        nombreEncuesta: nombreEncuesta,
        descripcionEncuesta: descripcionEncuesta,
        puntosEncuesta: puntosEncuesta,
        empresa: empresaEncuesta,
        panel: panelesEncuesta,
        preguntas: preguntas
    };
    encuesta["idEncuesta"] = _idEncuesta;

    var _bandera = true;
    var _mensaje = "";
    if (encuesta.nombreEncuesta === "" || encuesta.descripcionEncuesta === "") {
        _bandera = false;
        _mensaje += "Alguno de los campos del formulario encuesta est&oacute;n vac&iacute;os \n";

    } else if (encuesta.panel.length === 0) {
        _bandera = false;
        _mensaje += "No eligi&oacute; ninguno de los paneles disponibles \n";
    } else if (isNaN(parseInt(encuesta.puntosEncuesta))) {
        _bandera = false;
        _mensaje += "El valor ingresado para el puntaje no es un n&uacute;mero";
    } else if (encuesta.puntosEncuesta === "" || encuesta.puntosEncuesta === 0) {
        _bandera = false;
        _mensaje += "No asign&oacute; puntaje a la encuesta \n";
    }
    if (_bandera) {
        if (encuesta.idEncuesta === 0 || encuesta.preguntas.length === 0) {
            if ($(this).attr('id') === "crearNuevaPregunta" || $(this).attr('id') === "btnContinueCreate") {
                deleteButton();
            }
        }
        if ($(this).attr("id") === "btnContinueCreate")
                volverPregunta(1);
            else
                volverPregunta(index);
            $('#crearPreguntaEncuestalink').tab('show');
         
    }else {
            mostrarMensajeError(_mensaje);
        }


}

function addQuestion(id,index) {
    /*if (*/agregarPregunta(id,index);//) {

    /*if (($(this).attr("id") !== "crearNuevaPregunta" && $(this).attr("id") !== "crearEncuestalink")) {
     volverPregunta($(this).index() - 1);
     }*/

    //} else {
    /*if (error)
     
     else
     volverPregunta($(this).index());*/
    // }
}
function addSurvey() {
    var _bandera = true;
    var _mensaje = "";

    for (var i = 0; i < encuesta.preguntas.length; i++) {
        if (encuesta.preguntas[i].pregunta.length === 0 || encuesta.preguntas[i].pregunta === "") {
            _bandera = false;
            _mensaje += "Alguno de los campos  de la pregunta nro. " + parseInt(i + 1) + " estan vacios. \n";
        }
        for (var j = 0; j < encuesta.preguntas[i].respuesta.length; j++) {
            if (encuesta.preguntas[i].respuesta[j].length === 0 || encuesta.preguntas[i].respuesta[j] === "") {
                _bandera = false;
                _mensaje += "Alguno de los campos de las opciones de la pregunta nro. " + parseInt(i + 1) + " estan vacios. \n";
            }
        }
    }
    if (encuesta.preguntas.length === 0) {
        _bandera = false;
        _mensaje += "No tiene ninguna pregunta creada \n";
    }
    //var _preguntaPendiente = encuesta.preguntas[$("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index()-1];
    if (encuesta.preguntas.length === $("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() - 1) {
        agregarPregunta($(this).attr("id"));
    }
    if ($("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() < encuesta.preguntas.length) {
        agregarPregunta($(this).attr("id"));
    }

    if (_bandera) {
        $("#tituloModal").text("Confirmar Encuesta");
        $("#btnCancelar").text("Cancelar");
        $("#btnCancelar").show();
        $("#btnAceptar").click(confirmaCreacionEncuesta);
        mostrarMensajeError("¿Está seguro que desea guardar la encuesta?");

    } else {
        $("#tituloModal").text("Error en Encuesta");
        $("#btnCancelar").hide();
        $("#btnAceptar").off("click", confirmaCreacionEncuesta);
        mostrarMensajeError(_mensaje);
    }

}
function confirmaCreacionEncuesta() {
    var parameters = JSON.stringify(encuesta);
    $("#btnAceptar").off('click', confirmaCreacionEncuesta);
    $.get("/AplicacionGestionMuestras2/seccionEncuestas?accion=crearEncuesta&encuesta=" + parameters);

}
function mostrarMensajeError(_mensaje) {
    $("#mensajeError").text(_mensaje);
    $("#modalError").modal("show");
}

function agregarPregunta(id,index) {
    var _pregunta;
    var retorno = true;
    if (/*($(this).attr('id')==="crearNuevaPregunta" || $(this).attr('id')==="crearPreguntaEncuestalink") &&*/ $("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() - 1 < encuesta.preguntas.length) {
        _pregunta = encuesta.preguntas[$("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() - 1];
        retorno = false;
        if (id === "crearNuevaPregunta") {
            retorno = true;
        }
    } else {
        _pregunta = {
            idPregunta: 0,
            pregunta: "",
            respuesta: new Array()
        };
    }
    var cantidadPreguntas = $(".respuestaEncuestaCrear input[type=text]").length;
    _pregunta.pregunta = $("#preguntaEncuestaCreate").val();
    _pregunta.respuesta = new Array();
    var _bandera = true;
    var _mensaje = "";

    for (var i = 0; i < cantidadPreguntas; i++) {
        var respuesta = $(".respuestaEncuestaCrear input[type=text]")[i].value;
        if (respuesta !== "") {

            _pregunta.respuesta.push(respuesta);
        } else {
            _bandera = false;
            _mensaje += "Alguno de los campos de preguntas estan vacios.";

        }
    }

    if (_pregunta.pregunta === "") {
        _bandera = false;
        _mensaje += "No hay ninguna pregunta ingresada en el formulario.";
    } else if (_pregunta.respuesta.length === 0) {
        _bandera = false;
        _mensaje += "No hay ninguna opcion ingresada";
    }
    if (_bandera) {


        if (retorno) {
            encuesta.preguntas.push(_pregunta);

        } else {
            encuesta.preguntas[$("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() - 1] = _pregunta;

        }
        if (id === "crearNuevaPregunta" && $("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() === encuesta.preguntas.length) {
            deleteButton();
            var nro1 = $("#v-pills-tab").children().length - 1;
            $("#v-pills-tab a:eq(" + nro1 + ")").tab('show');
        } else if (id!=="btnCerrarEncuesta" && id !== "crearNuevaPregunta" && id !== "crearEncuestalink") {
            volverPregunta(index);
        }
    } else {
        //error = true;
        event.stopPropagation();
        mostrarMensajeError(_mensaje);
        //return false;
    }
}
function irPreguntaAnterior() {
    volverPregunta($("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() - 1);
}
function seleccionarPregunta() {
    volverPregunta($(this).index());
}
function volverPregunta(nroPregunta) {

    var preguntaSeleccionada;
    /*var _nr = $("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index() - 1;
     if (_nr === encuesta.preguntas.length) {
     var _preguntaActual = $("#preguntaEncuestaCreate").val();
     var textboxOpciones = $(".respuestaEncuestaCrear input[type=text]");
     var respuestas = new Array();
     
     for (var i = 0; i < textboxOpciones.length; i++) {
     
     respuestas.push(textboxOpciones[i].value);
     
     }
     var _pregunta = {
     pregunta: _preguntaActual,
     respuesta: respuestas
     };
     encuesta.preguntas.push(_pregunta);
     }*/
    var _nro = nroPregunta;

    //$("#v-pills-tab a:eq(" + _nro + ")").attr('class', 'nav-link');
    if (_nro > -1) {
        $("#v-pills-tab a:eq(" + _nro + ")").tab('show');
        cleanFormQuestion();
        _nro -= 1;
        preguntaSeleccionada = encuesta.preguntas[_nro];

        $("#preguntaEncuestaCreate").val(preguntaSeleccionada.pregunta);
        for (var i = 0; i < preguntaSeleccionada.respuesta.length; i++) {

            $(".respuestaEncuestaCrear input[type=text]")[i].value = preguntaSeleccionada.respuesta[i];
            if (i !== preguntaSeleccionada.respuesta.length - 1) {
                addResponse();
            }

        }
    }
}

function cleanFormQuestion() {
    var htmlCode = $(".respuestaEncuestaCrear")[0];


    $("#respuestasList").html("");
    $("#respuestasList").html(htmlCode);
    $("#preguntaEncuestaCreate").val("");
    $("#respuestaEncuestaCreate1").val("");
}
vistaEncuesta.addEventListener("mostrarTablaEncuestas", function (evento) {
    var _tabla2 = $("#surveyDataTable").DataTable({
        "retrieve": true
    });
    _tabla2.destroy();
    //$("#surveyDataTable").html("");
    $("#surveyDataTable > tbody").html("");
    //$("#surveyDataTable > tbody").append(evento.data);

    var _encuestas = JSON.parse(evento.data);
    _tabla2 = $("#surveyDataTable").DataTable({
        "retrieve": true,
        "language": {"sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }},
        "sPaginationType": "full_numbers",
        "columns": [
            {"data": "idEncuesta"},
            {"data": "nombreEncuesta"},
            {"data": "descripcionEncuesta"},
            {"data": "cantidadPreguntas"},
            {"data": "premioEncuesta"},
            {"data": "puntosEncuesta"},
            {
                "className": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            }
        ],
        "columnDefs": [{
                "targets": 7,
                "data": null,
                "render": function (a, b, data, d) {
                    return  "<input type='button' class='btn btn-outline-primary' value='Actualizar' id='btnUpdateSurvey'>";
                }
            }, {
                "targets": 8,
                "data": null,
                "render": function (a, b, data, d) {

                    if (data.eliminable) {
                        return "<input type='button' class='btn btn-outline-danger' value='Eliminar' id='btnDeleteSurvey'>";


                    } else if (!data.eliminable && data.habilitado) {
                        return "<input type='button' class='btn btn-outline-danger' value='Deshabilitar' id='btnDisableSurvey'>";
                    } else {
                        return "<input type='button' class='btn btn-outline-primary' value='Habilitar' id='btnEnableSurvey'>";
                    }

                    return "";

                }}],
        //"data":evento.data,
        "order": [[0, "asc"]],
        "bProcessing": false,
        "bServerSide": false,
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Crear nueva encuesta',
                action: function (e, dt, node, config) {
                    loadFormNewSurvey();

                }
            }
        ]



    });


    _tabla2.rows.add(_encuestas).draw();
    $("#surveyDataTable > tbody").off('click', "#btnUpdateSurvey");
    $("#surveyDataTable > tbody").off('click', "#btnEnableSurvey");
    $("#surveyDataTable > tbody").off('click', "#btnDisableSurvey");
    $("#btnEnableSurvey").click(function () {
        var data = _tabla2.row($(this).parents('tr')).data();
        enableDisableSurvey(data.idEncuesta);
    });
    $("#btnDisableSurvey").click(function () {
        var data = _tabla2.row($(this).parents('tr')).data();
        enableDisableSurvey(data.idEncuesta);
    });
    $("#surveyDataTable > tbody").on('click', "#btnUpdateSurvey", function () {
        var data = _tabla2.row($(this).parents('tr')).data();
        loadFormEncuesta(parseInt(data.idEncuesta));
    });

    $("#surveyDataTable > tbody").off('click', "#btnDeleteSurvey");
    $("#surveyDataTable > tbody").on('click', '#btnDeleteSurvey', function () {
        var idEncuesta = encodeURI(parseInt(_tabla2.row($(this).parents('tr')).data().idEncuesta));
        $.get("/AplicacionGestionMuestras2/seccionEncuestas?accion=deleteSurvey&idEncuesta=" + idEncuesta);
    });
}, false);
function cargarDataTableEncuestas() {
    $("#tituloCreate").text("Crear encuesta");
    $.get("/AplicacionGestionMuestras2/seccionEncuestas?accion=cargarDataTable");
}
function loadFormEncuesta(idEncuesta) {
    $.get("/AplicacionGestionMuestras2/seccionEncuestas?accion=cargarFormUpdate&idEncuesta=" + idEncuesta);
}

function loadFormNewSurvey() {
    var htmlMenu1 = $("#v-pills-tab > a")[0].outerHTML;
    $("#v-pills-tab").html("");
    $("#v-pills-tab").html(htmlMenu1);
    $("#createSurveyTab").tab('show');
    //cleanFormQuestion();

    $("#crearEncuestalink").tab('show');
    //vistaEncuesta.close();
    $(".surveyForm").val("");
    //vistaEncuesta=new EventSource("AplicacionGestionMuestras2?accion=new");

}

vistaEncuesta.addEventListener("cargarFormUpdate", function (evento) {

    var _encuesta = JSON.parse(evento.data);
    encuesta = {
        idEncuesta: _encuesta.idEncuesta,
        nombreEncuesta: _encuesta.nombreEncuesta,
        descripcionEncuesta: _encuesta.descripcionEncuesta,
        puntosEncuesta: _encuesta.puntosEncuesta,
        empresa: _encuesta.empresaEncuesta,
        panel: _encuesta.paneles,
        preguntas: new Array()
    };
    if (_encuesta.hasOwnProperty("preguntas")) {
        for (var i = 0; i < _encuesta.preguntas.length; i++) {
            var _pr = {
                idPregunta: _encuesta.preguntas[i].idPregunta,
                pregunta: _encuesta.preguntas[i].formulaPregunta,
                respuesta: new Array()
            };
            for (var j = 0; j < _encuesta.preguntas[i].opciones.length; j++) {
                _pr.respuesta.push(_encuesta.preguntas[i].opciones[j]);
            }
            encuesta.preguntas.push(_pr);
        }
    }
    //$("#crearEncuestalink").tab('show');

    loadFormNewSurvey();
    $("#nombreEncuestaCreate").val(encuesta.nombreEncuesta);
    $("#descripcionEncuestaCreate").val(encuesta.descripcionEncuesta);
    $("#puntosEncuestaCreate").val(encuesta.puntosEncuesta);
    $("#empresaEncuestaCreate").val(encuesta.empresa);

    var filas = $(".jqueryDataTable2 > tbody > tr");
    for (var i = 0; i < filas.length; i++) {
        for (var j = 0; j < encuesta.panel.length; j++) {
            if (parseInt(filas[i].children[0].children[0].value) === encuesta.panel[j]) {
                filas[i].children[0].children[0].checked = true;
            }
        }
    }
    if (_encuesta.hasOwnProperty("preguntas")) {
        for (var i = 0; i < encuesta.preguntas.length; i++) {
            deleteButton();

        }
    }
    $("#tituloCreate").text("Modificar encuesta");
    $("#v-pills-tab a:eq(0)").tab('show');






}, false);

function enableDisableSurvey(id) {
    $.get("/AplicacionGestionMuestras2/seccionEncuestas?accion=enableDisableSurvey&idEncuesta=" + id);
}

function continuar(event) {
    if ($("#crearEncuestalink").hasClass("active")) {
        continuarEncuesta($(this).index());

    } else {
        agregarPregunta($(this).attr("id"),$(this).index());




        /*var index=$("#v-pills-tab a#crearPreguntaEncuestalink.nav-link.active").index();
         $("#v-pills-tab a:eq("+index+")").tab("show");*/
        //}
    }
    /*if($(this).attr('id')==="btnContinueCreate")
     volverPregunta(1);
     else
     volverPregunta($(this).index());*/
}