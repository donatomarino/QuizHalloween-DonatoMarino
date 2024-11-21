# QuizHalloween-DonatoMarino

## HTML
>HTML home

He puesto un contenedor para todos los elementos (En los 3 HTML), de forma que el contenido ocupe el 100% del viewport.
Hay 3 secciones:

- Header
- Main con dentro otro div por el h2
- Footer

> HTML page question

Dentro del main he puesto un menu desplegable para que puedas eligir la categoria y un botón para volver a la Home.
Además hay un contenedor para insertar las preguntas y las respuestas desde el JS.
Y también un contenedor donde salga el error si la API falla.

> HTML page results

Dentro del main he puesto un contenedor donde salga si el test ha sido superado o no y además otro contenedor donde aparezca la grafica.


## JAVASCRIPT
> JS Home

Cuando se carga la página se ejecuta la función para que aparezca el botón por empezar el QUIZ. La grafica aparecerá después el primer tentativo finalizado con la fecha puesta como etiqueta.

> JS Script

Cuando se carga la página aparecerán las categorias para empezar el quiz y un bóton para volver a la home.
Una vez que se eliga la categoria, en base a la elegida, apareceran las preguntas y posibles repsuestas random.
En lugar de crear un div por cada pregunta, he inicializado un contador y con el metodo **setTimeout**, una vez contestado, se incrementa y vuelve a llamar a la función **mostrarPregunta**, sostituyendo la pregunta actual con la siguiente.
**SI LA API FALLA SALE EL ERROR EN PANTALLA**

> JS Results

Cuando se carga la página se muestra simplemente si hay superado o no el quiz **(Superado si contestas al menos 6 respuestas correctamente)**.
Y, además, aparece la grafica solamente del tentativo actual.


Espero que se entienda lo mejoooor posible!!! 
- Donato Marino
