// Definición de variables
let correctas = "231423";
let puntaje = 0;
let mensaje = "";
let respuestas = "";

let pregunta1 = "EN EL LENGUAJE DE CHAT, ¿CUÁL DE ESTAS OPCIONES SUELE SIGNIFICAR “REÍRSE A CARCAJADAS”?";
let opciones1 = " \
(1) FYI     (3) BRB\n\
(2) LOL     (4) TBH\
";

let pregunta2 = "¿CON QUÉ COLOR SE ASOCIA POPULARMENTE AL PERIODISMO SENSACIONALISTA?";
let opciones2 = " \
(1) NARANJA     (3) AMARILLO \n \
(2) BLANCO      (4) AZUL \n \
";

let pregunta3 = "EN EL LENGUAJE DE LAS REDES SOCIALES, ¿CUÁNTOS SEGUIDORES SON “1K”?";
let opciones3 = " \
(1) 1000    (3) 100 \n \
(2) 10      (4) 10000 \n \
";

let pregunta4 = "¿CÓMO COMIENZA LA CANCIÓN PATRIA CONOCIDA COMO “AURORA”?";
let opciones4 = " \
(1) FEBO ASOMA      (3) CORONADOS \n \
(2) OID MORTALES    (4) ALTA EN EL CIELO \n \
";

let pregunta5 = "¿CUÁL ES EL NOMBRE DEL CABALLO DEL ZORRO EN LA FAMOSA SERIE TELEVISIVA?";
let opciones5 = " \
(1) BESTIA      (3) ESTRELLA \n \
(2) TORNADO     (4) TRUENO \n \
";

let pregunta6 = "¿CUÁL ES LA CAPITAL DE PORTUGAL?";
let opciones6 = " \
(1) PARAMARIBO  (3) LISBOA \n \
(2) MADRID      (4) PORTO ALEGRE \n \
";


// Definición de funciones
function pregunta (n) {
    let respuesta = "";
    do {
        respuesta = prompt(" === Pregunta #" + n + " ===\n" +
        eval("pregunta"+ n) + 
        "\n==========================\n" +
        "[Recuerde ingresar sólo el número de la opción]\n" +
        "Opciones:\n" +
        "==========================\n" +
        eval("opciones"+ n));

        if (respuesta.length != 1) {
            alert("Debe ingresar sólo un número.")
        }
    } while (respuesta.length != 1);
    return respuesta;
}

// Inicio de salida por pantalla con bienvenida
alert("\
============================================= \
            Bienvenidos a Pasapalabra \
============================================= \
El concurso de preguntas y respuestas que suma puntos.\n\n \
Presione Aceptar cuando esté listo para comenzar... \n \
");

// Bucle que hace las preguntas y manda el índice a la función para saber que pregunta esta en juego.
for (let n = 0; n < correctas.length; n++) {
    respuestas += pregunta(n+1);
    if (correctas.charAt(n) == respuestas.charAt(n)) {
        puntaje++;
    }                 
}

// Cálculo de puntaje para colocar en pantalla un mensaje personalizado según el puntaje obtenido.
if (puntaje >= 0 && puntaje <= 2 ) {
    mensaje = "¡Hay que repasar muchos conceptos básicos!";
} else if (puntaje >= ( correctas.length )/2    &&      puntaje <= ( correctas.length ) -1 ) {
    mensaje = "¡Bien ahí, algo te acordás. Te falta un poco repasar igual! Siempre se puede mejorar.";
} else {
    mensaje = "¡Impecable! Buen trabajo. ¡FELICITACIONES!";
}

// Salida de pantalla con resultados finales y mensajes personalizado de aliento.
alert( `\
=============================================\n \
                    RESULTADOS FINALES \
=============================================\n\n \
Su puntaje es ${puntaje}\n \
${mensaje}\n \
`);