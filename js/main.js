// Definición de variables
let mensaje = "";
let puntaje = 0;
let npregunta = 0;
let Jugador = [];
let nombre = ""
let preguntas = []
let icono = ""

// Constructores
class Persona{
    constructor(nombre, puntaje){
        this.nombre = nombre;
        this.puntaje = puntaje;
    }
}

class Pregunta{
    constructor(texto, opciones, respuesta){
        this.texto = texto;
        this.opciones = opciones;
        this.respuesta = respuesta;
    }
}

// Definición de funciones
function guardarJugador (nombre, puntos) {
    Jugador.push(new Persona(nombre, puntos))
}

function cargarPregunta (texto, opciones, respuesta) {
    const nuevaPregunta = new Pregunta(texto, opciones, respuesta)
    preguntas.push(nuevaPregunta)
}

// Ingreso de datos por archivo JSON
fetch('./json/preguntas.json')
    .then( (resp) => resp.json() )
    .then( (data) =>    {
                            data.forEach( (lista) => {
                                cargarPregunta(lista.texto, lista.opciones, lista.respuesta)
                            }
                            )
                        }
    )
    .catch( (error) => { console.error(error); console.log("Validar carga archivo JSON") } )

// Inicio de App

let botonLimpiar = document.getElementById("limpiar")
let bienvenida = document.getElementsByTagName("main")[0]


if (localStorage.getItem('jugadores') ) {
    const JSON_lee = JSON.parse(localStorage.getItem('jugadores'))
    let listado = []
    for ( const objeto of JSON_lee ) {
        guardarJugador(objeto.nombre, objeto.puntaje)
        listado = `${objeto.nombre} = ${objeto.puntaje}\n`
    }
    listado = `Listado de jugadores y sus puntajes\n\n${listado}`

    let jugadores = document.createElement("div")
    jugadores.id = "jugadores"
    jugadores.innerText = listado;
    bienvenida.appendChild(jugadores)
    botonLimpiar.style.display = "block"
    
} else {
    // Muestra el botón "Borrar resultados" al haberse guardado resultados en el localStorage
    botonLimpiar.style.display = "none"
}

function jugar(n) {
    bienvenida.style.display = "none"
    let juego = document.getElementsByClassName("juego")[0]
    juego.style.display = "flex"
    // let opciones = document.getElementById("o1")
    // opciones.textContent = "PRUEBA"
 
    nombre = document.getElementsByName("nombre")[0].value
    
    let enunciado = document.getElementsByClassName("pregunta")[0]
    enunciado.innerText = `Pregunta #${n+1}: ${preguntas[n].texto}`
 
    let opciones = document.querySelectorAll("#o")
    let indice = 0;
    opciones.forEach( (e) => {
        e.textContent = preguntas[n].opciones[indice];
        indice++;
    }
    )
}

function boton_validar() {

    // Comprueba si el juego tiene que seguir mostrando otra pregunta restante o se termina el juego
    if (npregunta < preguntas.length -1 ) {
        npregunta++
        jugar(npregunta)
    } 
    else {
        // Instancia en la que no hay más preguntas por mostrar y se muestran resultados y se procesa el código final

        // Se almacena el jugador en curso en el array de jugadores
        guardarJugador(nombre, puntaje)

        let juego = document.getElementsByClassName("juego")[0]
        juego.style.display = "none"

        // Evalua el puntaje obtenido y genera en pantalla un mensaje personalizado según el resultado obtenido.
        if (puntaje >= 0 && puntaje <= 2 ) {
            mensaje = "¡Hay que repasar muchos conceptos básicos!";
            icono = "error"
        } else if (puntaje >= ( preguntas.length )/2    &&      puntaje <= ( preguntas.length ) -1 ) {
            mensaje = "¡Bien ahí, algo te acordás. Te falta un poco repasar igual! Siempre se puede mejorar.";
            icono = "warning"
        } else {
            mensaje = "¡Impecable! Buen trabajo. ¡FELICITACIONES!";
            icono = "success"
        }

        let resumen = ""
        resumen = `${nombre}, tenés un puntaje de ${puntaje}\n\n`
        resumen += mensaje + "\n\n";
        Swal.fire({
            title: '¡Juego terminado!',
            text: `${resumen}`,
            icon: `${icono}`,
            confirmButtonText: 'OK'
        })
        
        resumen = "Listado de jugadores y sus puntajes\n\n";
        Jugador.forEach( (lista) => resumen += `${lista.nombre} = ${lista.puntaje}\n`)
        
        // Se reinicia el juego y se muestra el main inicial
        document.getElementsByName("nombre")[0].placeholder = "Coloque su nombre aquí..."

        bienvenida.style.display = "flex"
        npregunta = 0;

        // Se evalua si existe el div de "jugadores". De ser así le carga los jugadores que han intentado
        if (document.getElementById("jugadores")) {

            // Si existe el div de "jugadores", carga los que ya han intentado.
            jugadores.innerText = resumen;
        }
        else {

            // Muestra el botón "Borrar resultados" al haberse guardado resultados en el localStorage
            botonLimpiar.style.display = "block"
            
            // De lo contrario, crea el div "jugadores", le asigna un "ID" y lo carga en su elemento padre "<main>"
            let jugadores = document.createElement("div")
            jugadores.id = "jugadores"
            jugadores.innerText = resumen;
            bienvenida.appendChild(jugadores)            
        }

        const JSON_guarda = JSON.stringify(Jugador)
        localStorage.setItem('jugadores',JSON_guarda)
        puntaje = 0
    }
}

function limpiar_resultados () {
    localStorage.removeItem('jugadores')
    if ( document.getElementById("jugadores") ) {
        document.getElementById("jugadores").remove();
        Jugador = []
        botonLimpiar.style.display = "none"
    }
}

// Monitoreo de Eventos DOM
let botonJugar = document.getElementById("jugar")
botonJugar.addEventListener("click", () => jugar(0))


let formulario = document.getElementsByClassName("formulario")[0]
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    // let inputs = e.target.children
    // let respuesta = document.querySelector( 'input[name="respuesta"]:checked' );
    // let resp = document.getElementsByName( "respuesta" )
    let respuesta = 0;
    let ninput = 0;
    document.getElementsByName( "respuesta" ).forEach ( (e) =>  { e.checked && ( respuesta = ninput ); ninput++ } )
    // probar usar arriba .includes en lugar de forEach
    if ( respuesta + 1 == preguntas[npregunta].respuesta ) {
        puntaje++;

        // Uso de la librería Toastify para notificar una opción correcta.
        Toastify({
            text: "¡Correcto!",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: { background: "green" }
        }).showToast();
    
    }
    else {
        Toastify({
            text: "¡Incorrecto!",
            duration: 3000,
            gravity: 'top',
            position: 'right',
            style: { background: "red" }
        }).showToast();
        
    }

    boton_validar();
}
)

botonLimpiar.addEventListener("click", limpiar_resultados)