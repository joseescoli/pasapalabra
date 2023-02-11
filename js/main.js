// Definición de variables
let mensaje = "";
let puntaje = 0;
let jugador = "";
let otro = "N"

// Definición de datos
const preguntas = [

    {
        texto:      "EN EL LENGUAJE DE CHAT, ¿CUÁL DE ESTAS OPCIONES SUELE SIGNIFICAR “REÍRSE A CARCAJADAS”?",
        opciones:   "(1) FYI     (3) BRB\n\(2) LOL     (4) TBH",
        respuesta:  "2"
    },
    {
        texto:      "¿CON QUÉ COLOR SE ASOCIA POPULARMENTE AL PERIODISMO SENSACIONALISTA?",
        opciones:   "(1) NARANJA     (3) AMARILLO\n(2) BLANCO      (4) AZUL",
        respuesta:  "3"
    },
    {
        texto:      "EN EL LENGUAJE DE LAS REDES SOCIALES, ¿CUÁNTOS SEGUIDORES SON “1K”?",
        opciones:   "(1) 1000    (3) 100 \n(2) 10      (4) 10000\n",
        respuesta:  "1"
    },
    {
        texto:      "¿CÓMO COMIENZA LA CANCIÓN PATRIA CONOCIDA COMO “AURORA”?",
        opciones:   "(1) FEBO ASOMA      (3) CORONADOS\n(2) OID MORTALES    (4) ALTA EN EL CIELO",
        respuesta:  "4"
    },
    {
        texto:      "¿CUÁL ES EL NOMBRE DEL CABALLO DEL ZORRO EN LA FAMOSA SERIE TELEVISIVA?",
        opciones:   "(1) BESTIA      (3) ESTRELLA \n(2) TORNADO     (4) TRUENO",
        respuesta:  "2"
    },
    {
        texto:      "¿CUÁL ES LA CAPITAL DE PORTUGAL?",
        opciones:   "(1) PARAMARIBO  (3) LISBOA \n(2) MADRID      (4) PORTO ALEGRE \n",
        respuesta:  "3"
    }
]

// Constructores
class Persona{
    constructor(nombre, puntaje){
        this.nombre = nombre;
        this.puntaje = puntaje;
    }
}

const Jugador = [];

// Definición de funciones
function preguntar (n) {
    let respuesta = 0;
    do {
        respuesta = parseInt( prompt(" === Pregunta #" + (n + 1) + " ===\n" +
        preguntas[n].texto + 
        "\n==========================\n" +
        "[Recuerde ingresar sólo el número de la opción]\n" +
        "Opciones:\n" +
        "==========================\n" +
        preguntas[n].opciones
        ) )

        if ( ( respuesta > 4 || respuesta <= 0 )    ||  isNaN(respuesta) ) {
            alert("Debe ingresar sólo las opciones informadas.")
        }
    } while ( ( respuesta > 4 || respuesta <= 0 )    ||  isNaN(respuesta) );
    return respuesta;
}

function guardarJugador (nombre, puntos) {
    Jugador.push(new Persona(nombre, puntos))
}

// Inicio de salida por pantalla con bienvenida
alert("\
============================================= \
                                Bienvenidos a Pasapalabra \
============================================= \
El concurso de preguntas y respuestas que suma puntos.\n\n \
Presione Aceptar cuando esté listo para comenzar... \n \
");

// Iterador para repetir el juego si se elije jugar nuevamente u otro jugador
do {
    puntaje = 0;
    do {
        jugador = prompt("Ingrese su nombre...")
        if ( !isNaN(parseInt(jugador)) || jugador.length > 20 ) alert("Ingrese datos correctos!")
    } while ( !isNaN(parseInt(jugador)) || jugador.length > 20 )

    // Bucle que hace las preguntas y manda el índice a la función para saber que pregunta esta en juego.
    for (let n = 0; n < preguntas.length; n++) {
        if (preguntar(n) == preguntas[n].respuesta) {
            puntaje++;
        }                 
    }

    // Cálculo de puntaje para colocar en pantalla un mensaje personalizado según el puntaje obtenido.
    if (puntaje >= 0 && puntaje <= 2 ) {
        mensaje = "¡Hay que repasar muchos conceptos básicos!";
    } else if (puntaje >= ( preguntas.length )/2    &&      puntaje <= ( preguntas.length ) -1 ) {
        mensaje = "¡Bien ahí, algo te acordás. Te falta un poco repasar igual! Siempre se puede mejorar.";
    } else {
        mensaje = "¡Impecable! Buen trabajo. ¡FELICITACIONES!";
    }

    // Salida de pantalla con resultados finales y mensajes personalizado de aliento.
    alert( `\
=============================================\n \
                                RESULTADOS FINALES \
=============================================\n\n \
    ${jugador}, tu puntaje es ${puntaje}\n \
    ${mensaje}\n`);

    otro = prompt("¿Va a jugar alguien más?\n\nColoque S o N.\nS = SI  --- N = NO")
    guardarJugador(jugador.toUpperCase(), puntaje)

} while (otro.toUpperCase() == "S")

// Resumen de jugadores que probaron
let resumen = ""
for (const lista of Jugador) resumen += "- " + lista.nombre + ": " + lista.puntaje + "\n"
alert("Jugadores que han probado y sus puntajes:\n\n" + resumen)


// Jugadores con el puntaje más alto
resumen = ""
const resultado = Jugador.filter((lista) => lista.puntaje === 6)
if (resultado.length > 0) {
    for (const lista of resultado) resumen += "- " + lista.nombre + "\n"
    alert("Jugadores con el mejor puntaje:\n\n" + resumen)
}