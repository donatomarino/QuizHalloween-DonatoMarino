# 🎃 Quiz de Halloween

Quiz de preguntas por categoría hecho con HTML, CSS y JavaScript puro (sin frameworks ni build).

## Cómo funciona

1. **Inicio** (`index.html`): botón para empezar y gráfica con el historial de intentos.
2. **Preguntas** (`html/question.html`): eliges categoría y se cargan preguntas con respuestas aleatorias desde una API. Si la API falla, se muestra un error.
3. **Resultados** (`html/results.html`): indica si has superado el quiz (mínimo 6 respuestas correctas) y muestra la gráfica del intento actual.

Los resultados se guardan en `localStorage` y las gráficas usan [Chart.js](https://www.chartjs.org/).

## Estructura

```
index.html      → página de inicio
html/           → preguntas y resultados
js/             → home.js, script.js, results.js
style.css, img/
```

## Ejecutar / desplegar

Abre `index.html` en el navegador.

— Donato Marino
