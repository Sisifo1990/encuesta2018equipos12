/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

            
       /*  function loginAdministrador(){
                var usuario=encodeURIComponent($("#inputEmail").val());
                var password=encodeURIComponent($("#inputPassword").val());
                $.get("/AplicacionGestionMuestras2/LoginAdministrador?accion=login&inputEmail="+usuario+"&inputPassword="+password);
            }/**/

 
/*var vista=new EventSource("LoginAdministrador");

vista.addEventListener('error',function(evento){
                $("#exampleModalLabel").text("Error de inicio");
                $(".modal-body").html("");
                $(".modal-body").append("<p>"+evento.data+"</p>");
                $("#exampleModal").modal("show");
            },false);
     */
    
   
    
    function logout(){
        vistaWeb.close();
        //vistaEncuesta.close();
        $.get("/AplicacionGestionMuestras2/loginA?accion=logout",function(responseText) {   
                    if(responseText==="logout"){
                    window.location.href = 'index.jsp';
            }
            });
    }