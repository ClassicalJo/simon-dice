function usuarioSonido(objetivo) {
    $audio = document.querySelector(`.${objetivo}`)
    $audio.load()
    $audio.play()
}

function simonSonido(objetivo) {
    $audio = document.querySelector(`audio[class=${simon[secuenciaSimon[objetivo]]}]`)
    $audio.load()
    $audio.play()
}

function brillar(objetivo) {
    objetivo.classList.add("botonpresionado")
}

function desbrillar(objetivo) {
    objetivo.classList.remove("botonpresionado")
}

function desbrillarTodo() {
    $botones = document.querySelectorAll(".botonpresionado")
    $botones.forEach(function (key) {
        key.classList.remove("botonpresionado")
    })
}

function habilitarBotonComenzar() {
    $comenzar = document.querySelector("input[value=Comenzar]")
    $comenzar.disabled = false
}

function deshabilitarBotonComenzar() {
    $comenzar = document.querySelector("input[value=Comenzar]")
    $comenzar.disabled = true
}

function habilitarBotonesSimon() {
    $botones = document.querySelectorAll(".boton")
    $botones.forEach(function (key) {
        key.setAttribute("onclick", "clickSimon(event)")
    })
    $textoSimon.textContent = `Ronda ${ronda}`
}

function deshabilitarBotonesSimon() {
    $botones = document.querySelectorAll(".boton")
    $botones.forEach(function (key) {
        key.setAttribute("onclick", "")
    })
}

function toggleOcultar(objetivo) {
    objetivo.classList.contains("hidden") ? objetivo.classList.remove("hidden") : objetivo.classList.add("hidden")
}

function simonContento() {
    $rojo = document.querySelector("#rojo")
    $amarillo = document.querySelector("#amarillo")
    $azul = document.querySelector("#azul")
    $verde = document.querySelector("#verde")

    if (simonBrilla === true) {
        simonContentoColor($rojo)
        setTimeout(function () { simonContentoColor($amarillo) }, 200)
        setTimeout(function () { simonContentoColor($azul)}, 400)
        setTimeout(function () { simonContentoColor($verde)}, 600)
        setTimeout(function () { simonContento() }, 800)
    }
}

function simonContentoColor(color) {
    if (simonBrilla === true) {
        brillar(color)
        setTimeout(function () { desbrillar(color) }, 200)
    }
}

function setTimer() {
    $timer = document.querySelector(".timer")
    if (ratio === 1) { $timer.innerText = "10.00" }
    else if (ratio === 2) { $timer.innerText = "05.00" }
    else { $timer.innerText = "02.00" }
}

function runTimer() {
    $timer = document.querySelector(".timer")
    timerNumero = Number($timer.innerText)
    restarTimer()
}

function restarTimer() {
    $timer = document.querySelector(".timer")
    if (timerNumero > 0 && detenerReloj === false) {
        timerNumero = Number((timerNumero - 0.01).toFixed(2))
        $timer.innerText = `0${timerNumero.toFixed(2)}`
        setTimeout(function () { restarTimer() }, 10)
    }

    else if (timerNumero == 0 && detenerReloj === false) {
        detenerReloj = true
        $timer.innerText = "00.00"
        $textoSimon.innerText = "Se te acabo el tiempo!"
        usuarioSonido("error")
        deshabilitarBotonesSimon()
        habilitarBotonComenzar()
    }
}

function habilitarMouse() {
    $simon.classList.remove("deshabilitar-mouse")
}

function deshabilitarMouse() {
    $simon.classList.add("deshabilitar-mouse")
}
