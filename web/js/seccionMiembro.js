/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var vistaPremiosMiembro=new EventSource("seccionPremiosDisponibles?accion=new");
vistaPremiosMiembro.addEventListener("mostrarPremiosDisponibles",function(evento){
    var premios=JSON.parse(evento.data);
    var html="";
    for(var i=0;i<premios.length;i++){
        html+="<div class='card'><i class='fas fa-gift card-img-top'></i><div class='card-body'><h5 class='card-title'>"+premios[i].nombre+"</h5><ul><li class='card-text'>Descripción : "+premios[i].descripcion+"</li><li class='card-text'>Puntos : <i class='fas fa-star'></i>"+premios[i].puntos+"</li><li class='card-text'>Stock : "+premios[i].stock+"</li></ul><button class='btn btn-primary' id='btnGetPrize'>Solicitar premio</a></div></div>";
    }
    $("#cardPrizeList").html("");
    $("#cardPrizeList").html(html);
},false);
vistaPremiosMiembro.addEventListener("mostrarPremiosObtenidos",function(evento){
    var premios=JSON.parse(evento.data);
    var html="";
    for(var i=0;i<premios.length;i++){
        html+="<div class='card'><i class='fas fa-gift card-img-top'></i><div class='card-body'><h5 class='card-title'>"+premios[i].nombre+"</h5><ul><li class='card-text'>Descripción : "+premios[i].descripcion+"</li><li class='card-text'>Puntos : <i class='fas fa-star'></i>"+premios[i].puntos+"</li><li class='card-text'>Stock : "+premios[i].stock+"</li></ul></div></div>";
    }
    $("#cardPrizeList2").html("");
    $("#cardPrizeList2").html(html);
},false);
function solicitarPremio(idPrize){
    $.get("/AplicacionGestionMuestras2/seccionPremiosDisponibles?accion=solicitudPremio&idPremio="+idPrize);
}

