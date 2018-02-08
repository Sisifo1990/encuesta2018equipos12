/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//$("#btn-CreatePrize").click(crearPremio());

var idsEncuestas=new Array();
var rowSelected,trSelected;
var _tabla;
$(".form2").hide();
$('#myModalConfirm').on('shown.bs.modal', function () {
  $('#myModalConfirm').trigger('focus');
});
$("#selectEncuesta").change(function(){
    
    $("#selectEncuesta").multiSelect({
        afterSelect:function(values){
                     if(values==="No elegir ninguna"){
                         $('#selectEncuesta').multiSelect('deselect');
                     }
                 }});
    
});    


var vistaWeb = new EventSource("seccionPremios?accion=new"); 

vistaWeb.addEventListener("cargarPremios",function(evento){
        //if(localStorage.getItem("proceso")==="update"){
            $("#dataTablePrizes").show();
            $(".form2").hide();
            localStorage.removeItem("proceso");
        //}
         _tabla=$(".jqueryDataTable").DataTable({
            "retrieve":true
        });
        _tabla.destroy();
        $(".jqueryDataTable > tbody").html("");
        $(".jqueryDataTable > tbody").append(evento.data);
        
            
             _tabla=$(".jqueryDataTable").DataTable({ 
            "retrieve":true,
            "language":{"sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }},
            "sPaginationType" : "full_numbers",
            "columns": [{
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },{ "data": "idPremio"},
    { "data": "nombrePremio"},
    { "data": "descripcionPremio"},
    { "data": "puntosPremio"},
    { "data": "stockPremio"},
    { "data": "solicitudes"},
    {"data":"modificar"},
    {"data":"eliminar"}
                ],
               
            //"data":evento.data,
            "order":[[0,"desc"]],
                "bProcessing" : false,
                "bServerSide" : false,
            dom: 'Bfrtip',     
            buttons:[
            {
                text: 'Crear nuevo premio',
                action: function ( e, dt, node, config ) {
                    alert( 'Button activated' );
                    
                }
            }
        ]    
            
            
            
            });
        
        
       // }
         $('.jqueryDataTable > tbody').off('click','tr td.details-control');   
         $('.jqueryDataTable > tbody').on('click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row=_tabla.row(tr);
        
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }else if(!row.child.isShown()){
            var _idPremio=tr.find("td").eq(1).text();
            rowSelected=row;
            trSelected=tr;
            
            $.get("/AplicacionGestionMuestras2/seccionPremios?accion=mostrarEncuestasDataTable&idPremio="+encodeURIComponent(_idPremio));
        }
    
});

        },false);
    vistaWeb.addEventListener("cargarPremioUpdate",function(evento){
        var s=JSON.parse(evento.data);
        $("#nombrePremio2").val(s.nombrePremio);
        $("#descripcionPremio2").val(s.descripcionPremio);
        $("#stockPremio2").val(s.stockPremio);
        $("#puntosPremio2").val(s.puntosPremio);
        $("#selectEncuesta2").multiSelect('deselect_all');
        if(s.encuestas.length>0){
            var arrayString=new Array();
            for(var i=0;i<s.encuestas.length;i++){
                arrayString.push(s.encuestas[i].idEncuesta.toString());
            }
           
           $("#selectEncuesta2").multiSelect('select',arrayString); 
        }
        $("#dataTablePrizes").hide();
        $(".form2").show();
        
    },false);
    

    vistaWeb.addEventListener("mostrarEncuestas",function(evento){
             
             $("#surveyList").html("");
             $("#surveyList").append(evento.data);
             $("#selectEncuesta").multiSelect({
  afterSelect: function(values){
    if(values[0]==="0"){
        $("#selectEncuesta").multiSelect('deselect_all');
        
    }
    $('#selectEncuesta').multiSelect('refresh');
  },
  afterDeselect: function(values){
    
  }
  
});
            
         },false);
         vistaWeb.addEventListener("mostrarEncuestas2",function(evento){
             
             $("#surveyList2").html("");
             $("#surveyList2").append(evento.data);
             $("#selectEncuesta2").multiSelect({
  afterSelect: function(values){
    if(values[0]==="0"){
        $("#selectEncuesta2").multiSelect('deselect_all');
        
    }
    $('#selectEncuesta2').multiSelect('refresh');
  },
  afterDeselect: function(values){
    
  }
  
});
            
         },false);
         
         vistaWeb.addEventListener("showChildRows",function(evento){
             rowSelected.child(evento.data).show();
             trSelected.addClass('shown');
         },false);
         
         vistaWeb.addEventListener("mensajeError",function(evento){
             $("#mensajeConfirmacion").html("");
            $("#mensajeConfirmacion").append(evento.data);
            $("#btnSi").hide();
            $("#btnNo").text("");
            $("#btnNo").text("Aceptar");
            $("#myModalConfirm").modal("show");
         },false);
 function cargarEncuestas(){
     if(vistaWeb.readyState===1){
         vistaWeb=new EventSource("seccionPremios?accion=new");
     }
     //if(localStorage.getItem("cargarEncuesta")=="cargar"){
        $.get("/AplicacionGestionMuestras2/seccionPremios",{accion:"cargarEncuestas"});
    }
    function crearPremio(){
        var nombrePremio=$("#nombrePremio").val();
        var descripcionPremio=$("#descripcionPremio").val();
        var stockPremio=parseInt($("#stockPremio").val());
        var puntosPremio=$("#puntosPremio").val();
        
        var idEncuesta=$("#selectEncuesta").val();
        var esVacio;
        //[type='text']
         $(".control-create").each(function(){
       if( $(this).val().length === 0){
           esVacio=true;
          $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
            }else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            
       }
       //$(this).parent().find(".");
           
       });
        if(!esVacio){
             $("#selectEncuesta").multiSelect('deselect_all');  
             $("#mensajeConfirmacion").html("");
             $("#btnNo").text("");
            $("#btnNo").text("No");
            $("#btnSi").show();
            $("#mensajeConfirmacion").append("¿Desea guardar este premio?");
             $("#btnSi").click(function(){
             $.get("/AplicacionGestionMuestras2/seccionPremios?accion=crearPremio"+"&nombrePremio="+encodeURIComponent(nombrePremio)+"&descripcionPremio="+encodeURIComponent(descripcionPremio)+"&stockPremio="+encodeURIComponent(stockPremio)+"&puntosPremio="+encodeURIComponent(puntosPremio)+"&selectEncuesta="+encodeURIComponent(idEncuesta));
             });
         }else{
            $("#mensajeConfirmacion").html("");
            $("#btnNo").text("");
            $("#btnNo").text("Aceptar");
            $("#btnSi").hide();
            $("#mensajeConfirmacion").append("Alguno de los campos estan vacios");
            
        }
         $("#myModalConfirm").modal("show");
        }
        
    function cargarDataTable(){
        //$(".form2").hide();
        $.get("/AplicacionGestionMuestras2/seccionPremios?accion=cargarDataTable");
    }
    
    function deletePremios(_idPremio){
        $.get("/AplicacionGestionMuestras2/seccionPremios?accion=deletePremio&idPremio="+encodeURIComponent(_idPremio));
        
    }
    function enablePremios(_idPremio){
       $.get("/AplicacionGestionMuestras2/seccionPremios?accion=disablePremio&idPremio="+encodeURIComponent(_idPremio));
   }
   function disablePremios(_idPremio){
       $.get("/AplicacionGestionMuestras2/seccionPremios?accion=disablePremio&idPremio="+encodeURIComponent(_idPremio));
   }
   function loadFormPremio(_idPremio){
       sessionStorage.setItem("idPrize",_idPremio);
       $.get("/AplicacionGestionMuestras2/seccionPremios?accion=cargarFormUpdate&idPremio="+encodeURIComponent(_idPremio));
   }
   
    
    function updatePremio(){
        var idPremio=sessionStorage.getItem("idPrize");
        var nombrePremio=$("#nombrePremio2").val();
        var descripcionPremio=$("#descripcionPremio2").val();
        var stockPremio=parseInt($("#stockPremio2").val());
        var puntosPremio=$("#puntosPremio2").val();
        
        var idEncuesta=$("#selectEncuesta2").val();
        var esVacio;
        //[type='text']
         $(".control-update").each(function(){
       if( $(this).val().length === 0){
           esVacio=true;
          $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
            }else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            
       }
       //$(this).parent().find(".");
           
       });
        if(!esVacio){
             $("#selectEncuesta2").multiSelect('deselect_all');
             sessionStorage.removeItem("idPrize");
             localStorage.setItem("proceso","update");
             $.get("/AplicacionGestionMuestras2/seccionPremios?accion=actualizarPremio"+"&idPremio="+encodeURIComponent(idPremio)+"&nombrePremio="+encodeURIComponent(nombrePremio)+"&descripcionPremio="+encodeURIComponent(descripcionPremio)+"&stockPremio="+encodeURIComponent(stockPremio)+"&puntosPremio="+encodeURIComponent(puntosPremio)+"&selectEncuesta="+encodeURIComponent(idEncuesta));
        
         }else{
            $("#mensajeConfirmacion").html("");
            $("#mensajeConfirmacion").append("Alguno de los campos estan vacios");
            $("#myModalConfirm").modal("show");
        }
    }
    
    function cargarEncuestas(){
        $.get("/AplicacionGestionMuestras2/seccionPremios?accion=new");
    }
    function verSolicitudes(){
       // vistaWeb.close();
        //vistaWeb2.close();
        vistaWebInicializar("new");
        
    }
    function vistaWebInicializar(accion){
        $("#titleRequest").text("Solicitudes de Premios");
    var vistaWeb2=new EventSource("solicitudPremios?accion="+accion);
        vistaWeb2.addEventListener("mostrarTitulo",function(evento){
            $("#titleRequest").text("Solicitudes de Premio:"+evento.data);
        },false);
        vistaWeb2.addEventListener("cargarSolicitudesPendientes",function(evento){
        $("#requestsPrize > tbody").html("");
        $("#requestsPrize > tbody").append(evento.data);
    },false);
    vistaWeb2.addEventListener("cargarSolicitudesAprobadas",function(evento){
        $("#requestsPrize2 > tbody").html("");
        $("#requestsPrize2 > tbody").append(evento.data);
        var _cantidadR=$("#requestsPrize2 > tbody > tr").length;
        $("#cantidadAprobadas").text(_cantidadR);
    },false);
    vistaWeb2.addEventListener("cargarSolicitudesRechazadas",function(evento){
        $("#requestsPrize3 > tbody").html("");
        $("#requestsPrize3 > tbody").append(evento.data);
        var _cantidadA=$("#requestsPrize3 > tbody > tr").length;
        $("#cantidadRechazadas").text(_cantidadA);
    },false);
    }
    function aprobarSolicitud(idSolicitud){
        $.get("/AplicacionGestionMuestras2/solicitudPremios?accion=aprobarSolicitud&idSolicitud="+encodeURI(idSolicitud));
    }
    
    function rechazarSolicitud(idSolicitud){
        $.get("/AplicacionGestionMuestras2/solicitudPremios?accion=rechazarSolicitud&idSolicitud="+encodeURI(idSolicitud));
    }
    
    function verSolicitudesPorPremio(idPremio){
        $("#requestsPremioTab").tab('show');
        vistaWebInicializar("cargarSolicitudesDePremio&idPremio="+encodeURI(idPremio));
        
    }
    
    