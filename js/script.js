let select = document.getElementById('ctg');
select.addEventListener('change', //Cuando se selecciona una categoria se guarda la selección y se pasa a la API
    function () {
        var selectedOption = this.options[select.selectedIndex];
        console.log(selectedOption.value + ': ' + selectedOption.text);
        callQuestions(selectedOption.value)
    });

// Declaramos las variables globales para no volver a declararlas en cada función
var posiblesRespuestas;
var pregunta;
var botones;
var contador = 0;
var contenedor = document.getElementsByClassName('contenedor-preguntas')[0];

function callQuestions(option) {
    quitarSelect()

    fetch(`https://opentdb.com/api.php?amount=10&category=${option}&type=multiple`)
        .then(res => res.json())
        .then(datos => {
            pregunta = datos.results
            mostrarPregunta(pregunta, contador)
        })
        .catch(e => error(e));

    // Si ya existen se inicializan a 0, si no se crean
    if (localStorage.rCorrectas) {
        localStorage.rCorrectas = 0;
        localStorage.rIncorrectas = 0;
    } else {
        localStorage.setItem('rCorrectas', 0);
        localStorage.setItem('rIncorrectas', 0);
    }
}

function quitarSelect() {
    let slct = document.getElementById('ctg');
    let btn = document.getElementsByClassName('btn-comienzo')[0];

    // Removemos los elementos para elegir la categoria
    btn.style.display = 'none';
    slct.style.display = 'none';
}

function mostrarPregunta(datos, c) {
    let pregunta = document.querySelector('.pregunta'); //Cogemos el div con clase 'pregunta'
    
    // El contador sirve para que cuando se vuelve a llamar la función se llame la pregunta aleatoria siguiente.
    datos = datos[c]; 

    pregunta.innerHTML = datos.question; // Añadimos pregunta en la página

    // Creamos array con todas las respuestas
    posiblesRespuestas = [
        datos.correct_answer,
        datos.incorrect_answers[0],
        datos.incorrect_answers[1],
        datos.incorrect_answers[2]
    ];

    let btn = document.getElementsByClassName('btn')[0];

    // Si los botones no existen, los crea
    if (!btn) {
        for (let i = 0; i < 4; i++) {
            let btns = document.createElement('button')
            btns.className = 'btn';
            btns.id = `respuesta${i + 1}`;
            btns.setAttribute('onclick', `oprimir(${i})`);
            contenedor.appendChild(btns);
        }
    }

    // Llamamos los botenes que acabamos de crear
    let respuestas = document.querySelectorAll('.btn'); //Cogemos el div con clase 'btn'

    // Desordenamos el array
    posiblesRespuestas.sort(() => Math.random() - 0.5);
    // Asignamos respuestas en order aleatorio
    respuestas.forEach((e, index) => {
        e.innerHTML = posiblesRespuestas[index];
    })
}

function oprimir(i) {
    botones = [
        document.getElementById('respuesta1'),
        document.getElementById('respuesta2'),
        document.getElementById('respuesta3'),
        document.getElementById('respuesta4')
    ];

    // Una vez contestado te bloca los otros botones
    botones.forEach(e => {
        e.setAttribute('disabled', 'true');
    })

    // Si la respuesta es correcta sale en verde si no en rojo y aumenta el contador del LocalStorage
    if (posiblesRespuestas[i] == pregunta[contador].correct_answer) {
        botones[i].style.backgroundColor = '#39FF14';
        localStorage.rCorrectas++;
    } else {
        botones[i].style.backgroundColor = '#990000'
        botones[i].style.color = 'white';
        localStorage.rIncorrectas++;
    }

    // Se actualizan las preguntas 1 segundo después haber contestado
    setTimeout(() => {
        reiniciar(botones);
    }, 1000)
}

function reiniciar(botones) {
    // Quitamos el disabled a los botones
    botones.forEach(e => {
        e.removeAttribute('disabled');
    })

    // Recorremos todos los botones para que después de la contestación vuelven a estár con colores default
    for (let btn of botones) {
        btn.style.backgroundColor = '#ffc8a3';
        btn.style.color = '#4A4A4A'
    }

    // Cada vuelta le añadimos 1 al contador para que pase a próxima pregunta
    contador++;

    // Cuando llega a 10 preguntas se acaba el quiz y nos lleva a la página results 
    if (contador < 10) {
        mostrarPregunta(pregunta, contador);
    } else {
        let hora = formatearFecha(new Date());

        // Añadimos la fecha en el array dentro el LocalStorage 
        let fecha = localStorage.getItem('fecha');

        fecha ? fecha = JSON.parse(fecha) : fecha = [];

        fecha.push(hora);

        localStorage.setItem('fecha', JSON.stringify(fecha));

        // Nos redirige a results.html
        window.location.href = 'results.html';
    }
}

function error(e) {
    // Sale este texto si la API no carga
    let error = document.getElementById('error');
    let text = document.createTextNode('El quiz al momento no está disponible. Reifrescar la página, por favor.')
    error.appendChild(text);
    error.style.color = "#fad8c1";
    error.style.textAlign = "center";
    error.style.textShadow = '2px 1px 7px rgba(0, 0, 0, 1)';
    error.style.fontFamily = '"Nosifer", sans-serif';
    error.style.fontSize = '30px';
    error.style.color = '#ffc8a3';
    error.style.padding = '50px';

    // Creamos y añadimos el button para reiniciar dentro del contenedor
    let contenedorError = document.getElementById('error');
    let enlace = document.createElement('a');
    let btnReiniciar = document.createElement('button');
    let txtBtn = document.createTextNode('Reiniciar');
    enlace.href = "./question.html";
    btnReiniciar.setAttribute('class', 'btn-comienzo');
    btnReiniciar.appendChild(txtBtn);
    enlace.appendChild(btnReiniciar);
    contenedorError.appendChild(enlace);
}

// Guardamos la fecha
function formatearFecha(f) {
    let dia = f.getDate().toString().padStart(2, '0');
    let mes = (f.getMonth() + 1).toString().padStart(2, '0'); // Mes es base 0
    let anio = f.getFullYear();
    let hora = f.getHours().toString().padStart(2, '0');
    let minutos = f.getMinutes().toString().padStart(2, '0');

    let fecha = `${dia}/${mes}/${anio}:${hora}:${minutos}`;

    return fecha;
}