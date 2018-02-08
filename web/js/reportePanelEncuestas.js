/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var vistaReporte=new EventSource("seccionReporte?accion=new");
vistaReporte.addEventListener("showPanels",function(evento){
    $("#accordion").html(evento.data);
},false);
vistaReporte.addEventListener("showSurveys",function(evento){
    $("#accordion2").html(evento.data);
},false);
//$("#panelList > button").on('click','#panelButton',mostrarReportePanel);
vistaReporte.addEventListener("mostrarInfoPanel",function(evento){
    var panel=JSON.parse(evento.data);
    var html="<ul><li>Nombre : "+panel.nombre+"</li><li>Descripcion: "+panel.descripcion+"</li><li>Cantidad de Encuestas Asociadas: "+panel.cantidadEncuestasAsociadas+"</li></ul><table class='table table-responsive table-striped'><thead class='thead-dark'><tr><th scope='col'>#</th><th scope='col'>Email</th><th scope='col'>Género</th><th scope='col'>Edad</th><th scope='col'>Ciudad</th><th scope='col'>Departamento</th><th scope='col'>Encuestas Realizadas</th><th scope='col'>Premios Obtenidos</th><th>Ultima participacion</th></tr></thead><tbody>";
    
    for(var i=0;i<panel.miembros.length;i++){
       html+="<tr><td>"+panel.miembros[i].idMiembro+"</td><td>"+panel.miembros[i].email+"</td><td>"+panel.miembros[i].genero+"</td><td>"+panel.miembros[i].edad+"</td><td>"+panel.miembros[i].ciudad+"</td><td>"+panel.miembros[i].departamento+"</td><td>"+panel.miembros[i].cantidadEncuestasRealizadas+"</td><td>"+panel.miembros[i].cantidadPremios+"</td><td>"+panel.miembros[i].fechaUltParticipacion+"</td></tr>";
    }
    html+="</tbody></table>";
    $("#collapse"+panel.idPanel+"> .card-body").html(html);
},false);
function mostrarReportePanel(){
    var idPanel=$("#accordion").children(this).index()+1;
    $.get("/AplicacionGestionMuestras2/seccionReporte?accion=showPanel&idPanel="+idPanel);
}

function mostrarReporteEncuesta(){
    var idPanel=$("#accordion2").children(this).index()+1;
    $.get("/AplicacionGestionMuestras2/seccionReporte?accion=showSurvey&idEncuesta="+idPanel);
}