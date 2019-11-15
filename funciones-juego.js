let secuenciaSimon = []
let secuenciaUsuario = []
let ronda = 1
let cuentaExitos = 0
let simonBrilla = false
let dificultad = Number(document.querySelector("select").value)
let $simon = document.querySelector(".simon-container")
let $textoSimon = document.querySelector("span")
let tiempoTotalTurnoSimon;
let detenerReloj = false

const simon = {
    "rojo": 1,
    "amarillo": 2,
    "verde": 3,
    "azul": 4,
    1: "rojo",
    2: "amarillo",
    3: "verde",
    4: "azul"
}

clickSimon = function (event) {
    color = event.path[0].id
    $boton = document.querySelector(`#${color}`)
    detenerReloj = true
    secuenciaUsuario.push(simon[color])
    if (secuenciaUsuario.length === ronda) { deshabilitarBotonesSimon() }
    brillar($boton)
    setTimeout(function () { desbrillar($boton) }, 400 / ratio)

    let resultado = simonCompara()
    resultadoError(resultado)
    resultadoExito(resultado)
}

function resultadoError(valor) {
    if (valor === "error") {
        $textoSimon.textContent = "Error! Pero no te preocupes, haz click en comenzar para intentar de nuevo."
        usuarioSonido("error")
        reset()
    }
    else { usuarioSonido(color) }
}

function resultadoExito(valor) {
    if (valor === "exito") {
        ronda++
        cuentaExitos++
        secuenciaUsuario = []
        revisarVictoria()
    }
}

function rondas(rondaNumero) {
    $textoSimon.innerText = `Ronda ${rondaNumero}`
    turnoSimon(rondaNumero)
    siguienteRonda()
}

function siguienteRonda() {
    setTimeout(function () { 
        habilitarBotonesSimon(), 
        habilitarMouse(), 
        detenerReloj = false, 
        runTimer() }, tiempoTotalTurnoSimon)
}

function simonCompara() {
    if (compararArrays(secuenciaUsuario, secuenciaSimon) !== true) { return "error" }
    if (secuenciaUsuario.length === ronda) { return "exito" }
}

function compararArrays(arrayMenor, arrayMayor) {
    let errores = 0
    for (let i = 0; i < arrayMenor.length; i++) {
        if (arrayMenor[i] !== arrayMayor[i]) { errores++ }
    }
    return errores === 0
}

function reset() {
    ronda = 1
    cuentaExitos = 0
    secuenciaUsuario = []
    deshabilitarBotonesSimon()
    habilitarBotonComenzar()
}

function random() {
    return Math.ceil(Math.random() * 4)
}

function determinarSecuencia(numero) {
    secuenciaSimon = []
    for (let i = 1; i <= numero; i++) {
        secuenciaSimon.push(random())
    }
}

function comenzar() {
    reset()
    simonBrilla = false
    desbrillarTodo()
    dificultad = Number(document.querySelector("select").value)
    ratio = dificultad / 5
    determinarSecuencia(dificultad)
    habilitarBotonesSimon()
    deshabilitarBotonComenzar()
    setTimer()
    rondas(ronda)
}

function turnoSimon(numero) {
    deshabilitarMouse()
    let constanteTiempoTurnoSimon = 0;
    for (let x = 0; x < numero; x++) {
        let $objetivoBrillo = document.querySelector(`#${simon[secuenciaSimon[x]]}`)
        setTimeout(function () { simonSonido(x) }, (x * 1000) / ratio)
        setTimeout(function () { brillar($objetivoBrillo) }, (x * 1000) / ratio)
        setTimeout(function () { desbrillar($objetivoBrillo) }, (x * 1000 + 500) / ratio)
        constanteTiempoTurnoSimon = x
    }
    tiempoTotalTurnoSimon = (constanteTiempoTurnoSimon * 1000 + 1000) / ratio
}

function revisarVictoria() {
    if (cuentaExitos === dificultad) {
        setTimeout(function () { victoria() }, 1500)
    }
    else {
        deshabilitarMouse
        setTimeout(function () { habilitarMouse(), rondas(ronda) }, 2000 / ratio)
    }
}

function victoria() {
    $textoSimon.innerText = "Victoria!"
    usuarioSonido("aplauso")
    simonBrilla = true
    simonContento()
    deshabilitarBotonesSimon()
}
