document.addEventListener("keydown", moverike);
// canvas
const papel = document.getElementById("canvas");
const canvas = papel.getContext("2d");
const move = 50;
var xMax = 940, yMax = 1200, xMin = 840, yMin = 0;
// fondo
var fondo = new imagen("fondo.png");
fondo.imagencita.addEventListener("load", () => {
   fondo.load = true;
   dibujar();
})
// perro
var x = 890, y = 1140, xAux, yAux;
var perro = new imagen("dog.png");
perro.imagencita.addEventListener("load" ,() =>{
   perro.load = true;
   dibujar();
})
// interior
var interior = new imagen("interior.jpg");
var flag_inside = false;
interior.imagencita.addEventListener("load", () => {
   interior.load = true;
   dibujar();   
})                  
function moverike(key){
   var tecla = key.keyCode;
   switch(tecla){
      case 37: x -= move; comprobar("izquierda");ike_fuera_mapa(); dibujar(); break; // izquierda
      case 39: x += move; comprobar("derecha"); dibujar();ike_fuera_mapa(); break; // derecha
      case 38: y -= move; comprobar("abajo"); dibujar();ike_fuera_mapa(); break;//abajo
      case 40: y += move; comprobar("arriba"); dibujar();ike_fuera_mapa(); break;//arriba
      case 13: if(!flag_inside){
         flag_inside = true;
         comprobarPuerta();
         dibujar();
      };break;
      case 27: for(var i = 0; i < 3; ++i){limpiar_canvas();}comprobarSalir(); dibujar();break;
   }
}

function comprobar(caso){
   if(x > xMax || y > yMax || x < xMin || y < yMin){
      switch(caso){
         case "derecha": x -= move * 2; break;
         case "izquierda": x += move * 2; break;
         case "abajo" : y += move * 2; break;
         case "arriba": y -= move * 2; break;
      }
   }
}
function limpiar_canvas(){
   if(flag_inside){
      for(var i = 0; i < 1493; ++i){
         
      canvas.beginPath();
      canvas.strokeStyle = "white";
      canvas.moveTo(0,i);
      canvas.lineTo(1990,i);
      canvas.stroke();
      canvas.closePath();
      }
   }
}
function comprobarPuerta(){
   if(x < 838 || y < 600 || x > 1200 || y > 1000){
      flag_inside = false;
   }else{
      xMax = (1886 - 100);
      yMax = (1390 - 100);
      x = 962;
      y = 1100;
   }
}  

function dibujar(){
   if(flag_inside){ // si presionamos enter
      canvas.drawImage(interior.imagencita,0,0);
      canvas.drawImage(perro.imagencita, x,y);
   }else{ // si no hemos presionado enter
      xMax = 1350;
      yMax = 1200;
      canvas.drawImage(fondo.imagencita, 0,0);
      canvas.drawImage(perro.imagencita, x,y);

   }
}
let bandera = false;
function ike_fuera_mapa(){
   if(!flag_inside){
      if(y <= 690){
         yMin = 0;
         xMax = 1250;
         xMin = 50;
         yMax = 700;
      }else{// caso en que este en el puente
         yMin = 0;
          xMax =  950;
          yMax = 1200;
          xMin = 840;
      }
      // caso en que no se la verdad ;-;
      if(x >= 840 && x <= 940 && y == 690){
         yMin = 0;
         xMax =  950;
         yMax = 1200;
         xMin = 840;
      }
      // para que no atraviese la parte frontal de la casa
      if(x <= 1090 && y < 650&& y > 50 && x > 390){
         yMin = 600;
         
      }else if (y <= 40 && x < 1240 && x > 215){
         yMax = 41;
      }
   }else{
      // cuando uno este dentro de la casa
      // primero hay que dividir las secciones y delimitar
      //comedor:
      yMax = 1150;
      if(x >= 787 && x <= 1687 && y >= 875){
         xMin = 677;
         yMin = 840;
      }
      // en caso de que queramos entrar a el baño
      // en proceso
   }
}
function comprobarSalir(){
   if(flag_inside){
      if(x >= 812 && x <= 1162 && y >= 1090 && y <= 1190){
         flag_inside = false;
         x = 890;
         y = 740;
      }
   }
}