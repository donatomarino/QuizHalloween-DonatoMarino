window.addEventListener('load', function () { // Se ejecuta al cargar la página
    // Obtener el contenedor de la gráfica
    let contenedorGrafica = document.getElementById("main");

    // Creamos el boton
    let enlace = document.createElement('a');
    let boton = document.createElement('button');
    let txtBtn = document.createTextNode('Empezamos');
    enlace.href = "../html/question.html";
    boton.setAttribute('class', 'btn-comienzo');
    boton.appendChild(txtBtn);
    enlace.appendChild(boton);
    contenedorGrafica.appendChild(enlace);

    // Creamos array para recoger todos los resultados
    let resultados = JSON.parse(localStorage.Resultados) || [];
    let fecha = JSON.parse(this.localStorage.fecha) || [];
    // console.log(fecha[0]);
    // console.log(resultados);

    let correctas = [];
    let incorrectas = [];
    let labels = []

    // Rellenamos el array con las respuestas correctas y incorrectas y las incorrectas
    resultados.forEach((_, i) => {
        correctas.push(parseInt(resultados[i].rCorrectas) || 0);
        incorrectas.push(parseInt(resultados[i].rIncorrectas) || 0);
    });

    // Rellenamos las etiquetas con las fechas
    fecha.forEach((element) => {
        labels.push(element);
    })

    // Crear un canvas para la gráfica
    let canvas = document.createElement('canvas');
    canvas.id = 'grafica-resultados';
    contenedorGrafica.appendChild(canvas);
    canvas.style.backgroundColor = 'transparent';
    canvas.style.height = '350px';
    canvas.style.margin = 'auto';
    canvas.style.backgroundColor = '#fad8c1';
    canvas.style.padding = '20px';
    canvas.style.maxHeight = '500px';
    canvas.style.opacity = '0.8';
    canvas.style.width = '800px'
    canvas.style.maxWidth = '800px';

    // Crear la gráfica
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Correctas',
                    data: correctas,
                    backgroundColor: 'rgb(247, 95, 28, 0.6)',
                    borderColor: 'rgb(247, 95, 28, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Incorrectas',
                    data: incorrectas,
                    backgroundColor: 'rgb(255, 154, 0, 0.6)',
                    borderColor: 'rgb(255, 154, 0, 1)',
                    borderWidth: 1
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Ultimos resultados',
                    color: 'rgb(247, 95, 28, 0.6)',
                }
            }
        }
    });
})