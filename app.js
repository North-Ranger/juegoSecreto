let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 0;
let rangoFijado = false; // Nueva variable para verificar si ya se fijó el rango

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (!rangoFijado) {
        // Fijar el rango si no está definido
        if (numeroDeUsuario > 0) {
            numeroMaximo = numeroDeUsuario;
            rangoFijado = true;
            limpiarCaja();
            condicionesIniciales(); // Inicia el juego con el nuevo rango
        } else {
            asignarTextoElemento('p', 'Por favor, introduce un número válido para el rango.');
        }
        return;
    }

    // Una vez fijado el rango, continúa el juego normalmente
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        asignarTextoElemento('p', numeroDeUsuario > numeroSecreto ? 'El número secreto es menor' : 'El número secreto es mayor');
        intentos++;
        limpiarCaja();
    }
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles.');
    } else {
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    limpiarCaja();
    asignarTextoElemento('p', 'Ingresa el número máximo para el rango:');
    rangoFijado = false;
    listaNumerosSorteados = [];
    numeroMaximo = 0;
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}

// Mensaje inicial para el usuario
asignarTextoElemento('h1', 'Juego del número secreto!');
asignarTextoElemento('p', 'Ingresa el número máximo para el rango:');
