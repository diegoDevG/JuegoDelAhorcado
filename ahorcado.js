//var palabra = "Tamarindo";
var ale = new Array("personas", "empresa", "objetivo", "usuarios", "empezar", "equipo", "producto", "ejecución");
var palabra = ale[Math.floor(Math.random()*ale.length)]
var hombre, l, espacio;


//Declaracion de la clase ahorcado

var ahorcado = function (con)

//this es las variables locales de la clase, accesibles en toda la clase
//this.contexto es el context de dibujo del canvas, que llega por parametro
//desde la variable con
{
	this.contexto = con;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;

	this.dibujar();
}

ahorcado.prototype.dibujar = function ()
{
	var dibujo = this.contexto;

	//Dibujando el poste

	dibujo.beginPath();
	dibujo.moveTo(150,100);
    dibujo.lineTo(150,50);
    dibujo.lineTo(400,50);
    dibujo.lineTo(400,350);
    dibujo.lineWidth = 15;
    dibujo.strokeStyle = "#000";
    dibujo.stroke();
	dibujo.closePath();

	if(this.intentos > 0)
	{
		//itentos = 1  ---> rostro
		dibujo.beginPath();
        dibujo.arc(150, 140, 40, 0, Math.PI * 2, false); //arc para dibujar arcos o circulos
        dibujo.strokeStyle = "red";
        dibujo.lineWidth = 5;
        dibujo.stroke();
        dibujo.closePath();

        if(this.intentos > 1)
        {
        	// intentos = 2 --> torso
            dibujo.beginPath();
            dibujo.moveTo(150,180);
            dibujo.lineTo(150,250);
            dibujo.strokeStyle = "red";
            dibujo.lineWidth = 5;
            dibujo.stroke();
            dibujo.closePath();

            if(this.intentos > 2)
            {
            	// intentos = 3 --> brazos
                dibujo.beginPath();
                dibujo.moveTo(120,220);
                dibujo.lineTo(150,180);
                dibujo.lineTo(180,220);
                dibujo.strokeStyle = "red";
                dibujo.lineWidth = 5;
                dibujo.stroke();
                dibujo.closePath();

                 if(this.intentos > 3)
                {
                    // intentos = 4 --> piernas
                    dibujo.beginPath();
                    dibujo.moveTo(120,290);
                    dibujo.lineTo(150,250);
                    dibujo.lineTo(180,290);
                    dibujo.strokeStyle = "red";
                    dibujo.lineWidth = 5;
                    dibujo.stroke();
                    dibujo.closePath();

                    if(this.intentos > 4)
                    {
                        // intentos = 5 --> ojos muertos
                        dibujo.beginPath();
                        //Ojo izquierdo
                        dibujo.moveTo(125,120);
                        dibujo.lineTo(145,145);
                        dibujo.moveTo(145,120);
                        dibujo.lineTo(125,145);

                        //Ojo derecho
                        dibujo.moveTo(155,120);
                        dibujo.lineTo(175,145);
                        dibujo.moveTo(175,120);
                        dibujo.lineTo(155,145);

                        dibujo.strokeStyle = "blue";
                        dibujo.lineWidth = 5;
                        dibujo.stroke();
                        dibujo.closePath();
                    }
                }
            }	
        }
	}
}

ahorcado.prototype.trazar = function ()
{
	this.intentos++;
	if(this.intentos >= this.maximo)
	{
		this.vivo = false;
		alert("Estas Muerto!" + " la labra es" + " " + palabra);
	}
	this.dibujar();
}


function iniciar() {
	l = document.getElementById("letra");
	var b = document.getElementById("boton");
	var canvas = document.getElementById("c");
	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext("2d");
	hombre = new ahorcado(contexto);

	//Convierte a mayuscula un texto
	palabra = palabra.toUpperCase();

	//Declaro un array con n espacios de acuerdo al largo de la palabra
	espacio = new Array(palabra.length);

	//Agregamos una funcion que se dispare al dar click
	b.addEventListener("click", agregarLetra);	

	mostrarPista(espacio);
}

//Cuando se carge el navegador, haga focus en la caja de texto.
window.onload = function() {
  document.getElementById("letra").focus();
};

function agregarLetra()
{
	var letra = l.value;
	letra = letra.toUpperCase();
	mostrarPalabra(palabra, hombre, letra);

	//Borrar el valor del input despues de dar click
	document.getElementById("letra").value="";
}

function mostrarPalabra(palabra, ahorcado, letra)
{
	var encontrado = false;
	var p;
	for (p in palabra)
	{
		if(letra == palabra[p])
		{
			espacio[p] = letra;
			encontrado = true;
		}		
	}
	mostrarPista(espacio);

	//Si no lo encontre
	if(!encontrado)
	{
		ahorcado.trazar();
	}
	if(ahorcado.vivo)
	{
		//alert("Ganaste");
	}

}

 
function mostrarPista(espacio)
{
	var pista = document.getElementById("pista");
	var texto = "";
	var i = 0;
	var largo = espacio.length;

	for(i=0; i<largo; i++)
	{
		if(espacio[i] != undefined)
		{ 
			texto = texto + espacio[i] + " ";
		}
		else
		{
			texto += "_ ";
		}
		pista.innerText = texto
	}
}