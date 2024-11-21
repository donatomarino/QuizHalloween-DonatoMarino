window.addEventListener('load', function () {
    let contenedor = document.getElementsByClassName('contenedor-results')[0];
    let div = document.createElement('div');
    let text;

    // Si hay al menos 6 respuestas correctas sale como finalizado con éxito, si no sale como no superado.
    if (localStorage.rCorrectas >= 6) {
        text = document.createTextNode(String.fromCodePoint(0x1F9DB, 0x200D, 0x2642, 0xFE0F) + 'TEST FINALIZADO CON ÉXITO' + String.fromCodePoint(0x1F9DB, 0x200D, 0x2642, 0xFE0F));
        div.appendChild(text)
        div.style.opacity = '0.9'
        contenedor.appendChild(div);
    } else {
        text = document.createTextNode(String.fromCodePoint(0x1F9DF, 0x200D, 0x2642, 0xFE0F) + ' TEST NO SUPERADO ' + String.fromCodePoint(0x1F9DF, 0x200D, 0x2642, 0xFE0F));
        div.appendChild(text)
        div.style.opacity = '0.9'
        contenedor.appendChild(div);
    }

    // Creamos array para guardar los resultados en el LocalStorage
    let resultados = {
        rCorrectas: localStorage.rCorrectas,
        rIncorrectas: localStorage.rIncorrectas
    };

    let arrResultados = localStorage.getItem('Resultados');

    arrResultados ? arrResultados = JSON.parse(arrResultados) : arrResultados = [];

    // Añadimos el JSON resultados en el Array
    arrResultados.push(resultados);

    localStorage.setItem('Resultados', JSON.stringify(arrResultados));

    // Estilamos el contenedor
    contenedor.style.color = "#fad8c1";
    contenedor.style.textAlign = "center";
    contenedor.style.textShadow = '2px 1px 7px rgba(0, 0, 0, 1)';
    contenedor.style.fontFamily = '"Creepster", system-ui';
    contenedor.style.margin = '20px';

    // Estilamos el primer DIV
    div.style.fontWeight = '400';
    div.style.fontSize = '50px';

    mostrarGrafica();
})

function mostrarGrafica() {
    // Obtener el contenedor de la gráfica
    let contenedorGrafica = document.getElementsByClassName('grafica')[0];

    // Convertimos en enteros los valores de las respuestas en el LocalStorage
    let correctas = [parseInt(localStorage.rCorrectas)];
    let incorrectas = [parseInt(localStorage.rIncorrectas)];

    // Crear un canvas para la gráfica
    let canvas = document.createElement('canvas');
    canvas.id = 'grafica-resultados';
    contenedorGrafica.appendChild(canvas);
    contenedorGrafica.style.height = '500px';
    contenedorGrafica.style.width = '800px';
    contenedorGrafica.style.margin = 'auto';
    contenedorGrafica.style.backgroundColor = '#fad8c1';
    contenedorGrafica.style.padding = '20px';
    contenedorGrafica.style.opacity = '0.8';

    // Crear la gráfica
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: [""],
            backgroundColor: '#fad8c1',
            datasets: [{
                label: 'Respuestas Correctas',
                data: correctas,
                backgroundColor: 'rgb(247, 95, 28, 0.6)',
                borderColor: 'rgb(247, 95, 28, 1)',
                color: '#fad8c1'
            }, {
                label: 'Respuestas Incorrectas',
                data: incorrectas,
                backgroundColor: 'rgb(255, 154, 0, 0.6)',
                borderColor: 'rgb(255, 154, 0, 1)',
                color: '#fad8c1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1,
                    color: '#fad8c1'
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Resultados',
                }
            }
        }
    });

    // Creamos y estilamos botón para reiniciar
    let main = document.getElementsByTagName('main')[0];
    let div = document.createElement('div');
    let enlace = document.createElement('a');
    let boton = document.createElement('button');
    let txtBtn = document.createTextNode('Quiero volver a hacer el Quiz');
    enlace.href = "../html/home.html";
    boton.setAttribute('class', 'btn-comienzo');
    boton.appendChild(txtBtn);
    enlace.appendChild(boton);
    div.appendChild(enlace);
    main.appendChild(div);
}