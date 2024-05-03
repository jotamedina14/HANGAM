// Variables globales para almacenar la categoría y la dificultad seleccionadas
let selectedCategory;
let selectedDifficulty;
let palabraAAdivinar; // Variable global para almacenar la palabra actual
let mistakes;

const palabrasPorCategoria = [
    {
        categoria: "frutas",
        palabras: ["manzana", "banano", "uva", "pera", "fresa", "mango", "naranja", "limon", "cereza", "kiwi", "papaya", "piña", "sandia", "melon", "coco", "maracuya", "granadilla", "mora", "frambuesa", "arandano", "ciruela", "durazno", "guayaba", "mandarina", "toronja", "lulo", "mamon", "guanabana", "tamarindo", "pitahaya", "zapote", "chontaduro", "curuba"]
    },
    {
        categoria: "animales",
        palabras: ["perro", "gato", "elefante", "jirafa", "tigre", "leon", "cebra", "mono", "oso", "panda", "koala", "canguro", "hipopotamo", "rinoceronte", "cocodrilo", "serpiente", "aguila", "pajaro", "loro", "pulpo", "ballena", "delfin", "tiburon", "pez", "tortuga", "camaleon", "lagartija", "rana", "sapo", "abeja", "mariposa", "araña", "escorpion", "cienpies", "escarabajo", "mosca", "mosquito", "cucaracha", "hormiga", "avispa", "grillo", "saltamontes", "libelula", "alacran", "garrapata", "pulga", "zancudo", "gusano", "oruga", "caracol", "babosa"]
    },
    {
        categoria: "paises",
        palabras: ["paris", "londres", "tokio", "roma", "madrid", "Argentina", "Brasil", "Canada", "China", "Colombia", "Egipto", "España", "Francia", "Alemania", "India", "Italia", "Japon", "Mexico", "Nigeria", "Pakistan", "Peru"]
    }
];

function showDifficulty(category) {
    const categoryButtons = document.querySelectorAll('.category');
    const difficultyContainer = document.getElementById('difficulty');

    // Oculta los botones de la categoría
    categoryButtons.forEach(button => {
        button.style.display = 'none';
    });

    // Muestra los botones de dificultad
    difficultyContainer.innerHTML = `
        <div class="difficulty">
        <h2>Nivel de dificultad para ${category}:</h2>
        <button class="dificultad" onclick="startGame('${category}', 'facil')">Fácil</button>
        <button class="dificultad" onclick="startGame('${category}', 'medio')">Medio</button>
        <button class="dificultad" onclick="startGame('${category}', 'dificil')">Difícil</button>
        </div>
    `;

    const difficulty = document.querySelector('.difficulty');
    difficulty.style.display = 'block';

    // Almacena la categoría seleccionada en la variable global
    selectedCategory = category;
}

function startGame(categoria, dificultad) {
    const difficulty = document.querySelector('.difficulty');
    const alfabetoContainer = document.querySelector('.alfabeto');
    const imageContainer = document.querySelector('.image-container');
    const palabrasElement = document.getElementById('palabras');

    // Reiniciar las letras adivinadas al comienzo de cada juego
    let letrasAdivinadas = [];

    // Almacena la dificultad seleccionada en la variable global
    selectedDifficulty = dificultad;

    // Reiniciar los intentos cada vez que se inicie el juego con una nueva palabra
    let intentos;
    switch (dificultad) {
        case 'facil':
            intentos = 10;
            break;
        case 'medio':
            intentos = 8;
            break;
        case 'dificil':
            intentos = 6;
            break;
        default:
            intentos = 8; 
    }

    // Mostrar el número de intentos en el HTML
    mostrarIntentosRestantes(intentos);

    // Oculta la imagen
    imageContainer.style.display = 'none';

    // Oculta los botones de dificultad
    difficulty.style.display = 'none';

    // Muestra el contenedor del alfabeto
    alfabetoContainer.style.display = 'flex';

    // Selecciona una palabra aleatoria de la categoría seleccionada
    const palabrasCategoria = palabrasPorCategoria.find(item => item.categoria === categoria).palabras;
    palabraAAdivinar = palabrasCategoria[Math.floor(Math.random() * palabrasCategoria.length)];

    // Mostrar la palabra a adivinar en el HTML como líneas
    palabrasElement.innerHTML = '';
    for (let i = 0; i < palabraAAdivinar.length; i++) {
        if (palabraAAdivinar[i] === ' ') {
            // Si la letra es un espacio, muestra un espacio en blanco
            palabrasElement.innerHTML += ' ';
        } else {
            // Si la letra es otra cosa, muestra una línea para adivinarla
            palabrasElement.innerHTML += `<span class="espacio-palabra">_</span> `;
        }
    }

    // Variable para contar los errores
    mistakes = 0;

    // Define las imágenes para cada nivel de dificultad
    const images = {
        facil: ['s0.jpg', 's1.jpg', 's2.jpg', 's3.jpg', 's4.jpg', 's5.jpg', 's6.jpg', 's7.jpg', 's8.jpg', 's9.jpg'],
        medio: ['s1.jpg', 's2.jpg', 's3.jpg', 's4.jpg', 's5.jpg', 's6.jpg', 's7.jpg', 's9.jpg'],
        dificil: ['s2.jpg', 's4.jpg', 's5.jpg', 's6.jpg', 's7.jpg', 's9.jpg']
    };

    // Mostrar la siguiente imagen del ahorcado
    const image = images[dificultad][mistakes];
    document.getElementById('gallows').innerHTML = '<img src="' + image + '" alt="">';

    // Agrega un evento de clic a los botones de letras
    const botonesLetras = document.querySelectorAll('.letras');
    botonesLetras.forEach(boton => {
        boton.addEventListener('click', () => {
            // Desactiva el botón
            boton.disabled = true;

            // Verifica si la letra está presente en la palabra a adivinar
            const letra = boton.innerText;
            const letrasPalabra = palabraAAdivinar.toLowerCase().split(''); // Convierte la palabra a minúsculas
            const espaciosPalabra = document.querySelectorAll('.espacio-palabra');
            let aciertos = 0;

            letrasPalabra.forEach((letraPalabra, index) => {
                if (letraPalabra === letra.toLowerCase()) {
                    espaciosPalabra[index].innerText = letraPalabra.toUpperCase();
                    aciertos++;
                }
            });

            // Verificar si se han adivinado todas las letras de la palabra
            const letrasSinEspacios = palabraAAdivinar.replace(/\s/g, '');
            if (aciertos === letrasSinEspacios.length) {
                // Todas las letras han sido adivinadas
                console.log("¡Ganaste!");
                showGameOverMessage(true);
                document.querySelector('.you-win').style.display = 'flex'; // Mostrar mensaje de victoria
            } else if (aciertos === 0) { // Si no hubo aciertos, restar un intento
                // Restar un intento
                intentos--;
                mostrarIntentosRestantes(intentos);

                // Incrementar el contador de errores
                mistakes++;

                // Verificar si se acabaron los intentos
                if (intentos === 0) {
                    // El jugador perdió
                    console.log("¡Perdiste!");
                    showGameOverMessage(false, palabraAAdivinar);
                } else {
                    // Mostrar la siguiente imagen del ahorcado
                    if (mistakes < images[dificultad].length) {
                        const image = images[dificultad][mistakes];
                        document.getElementById('gallows').innerHTML = '<img src="' + image + '" alt="">';
                    }
                }
            }

            // Chequear si todas las letras han sido adivinadas
            const letrasAdivinadas = document.querySelectorAll('.espacio-palabra');
            const todasAdivinadas = Array.from(letrasAdivinadas).every(span => span.innerText !== '_');
            if (todasAdivinadas) {
                console.log("¡Ganaste!");
                showGameOverMessage(true);
                document.querySelector('.you-win').style.display = 'flex'; // Mostrar mensaje de victoria
            }
        });
    });
}

function mostrarIntentosRestantes(intentos) {
    const intentosContainer = document.getElementById('intentos');
    intentosContainer.innerText = `💚: ${intentos}`;
    console.log('Intentos actualizados:', intentos); // Agregamos este console.log para verificar si los intentos se actualizan correctamente
}


function restartGameWithNewWord() {
    // Reiniciar las variables relacionadas con el estado del juego
    let intentos;
    switch (selectedDifficulty) {
        case 'facil':
            intentos = 10;
            break;
        case 'medio':
            intentos = 8;
            break;
        case 'dificil':
            intentos = 6;
            break;
        default:
            intentos = 8; // Por defecto, se elige nivel medio
    }

    // Mostrar el número de intentos en el HTML
    mostrarIntentosRestantes(intentos);

    // Reiniciar el contador de errores
    mistakes = 0;

    // Limpiar HTML relacionado con el juego
    const letrasPalabra = document.querySelectorAll('.espacio-palabra');
    letrasPalabra.forEach(span => {
        span.innerText = '_';
    });

    const botonesLetras = document.querySelectorAll('.letras');
    botonesLetras.forEach(boton => {
        boton.disabled = false;
    });

    // Ocultar elementos de finalización del juego
    document.querySelector('.game-over').style.visibility = 'hidden';
    document.querySelector('.you-win').style.display = 'none';
    document.querySelector('.you-loss').style.display = 'none';

    // Llamar a la función startGame para reiniciar el juego con la misma categoría y dificultad
    startGame(selectedCategory, selectedDifficulty);
}



function showGameOverMessage(isWin, word) {
    const gameOverContainer = document.querySelector('.game-over');
    const youWinContainer = document.querySelector('.you-win');
    const youLossContainer = document.querySelector('.you-loss');
    const playAgainButton = document.querySelector('.btn-primary');
    const returnToMenuButton = document.querySelector('.btn-secondary');

    if (isWin) {
        youWinContainer.style.display = 'flex';
        // Mostrar mensaje de victoria y botones correspondientes
        document.querySelector('.win-text').innerText = '¡Felicidades lo lograste, salvaste al inocente!!';
        playAgainButton.style.display = 'block'; // Botón para salvar otro
        returnToMenuButton.style.display = 'block'; // Botón para volver al menú
    } else {
        const lossText = document.querySelector('.loss-text');
        lossText.innerHTML += `<br> La palabra era: ${word}</br>`;
        youLossContainer.style.display = 'flex';
        playAgainButton.style.display = 'block'; // Botón para intentar de nuevo
        returnToMenuButton.style.display = 'block'; // Botón para rendirse
    }
    gameOverContainer.style.visibility = 'visible';
}


function restartGame() {
    // Oculta los elementos de finalización del juego
    document.querySelector('.game-over').style.visibility = 'hidden';
    document.querySelector('.you-win').style.display = 'none';
    document.querySelector('.you-loss').style.display = 'none';

    // Llama a la función para reiniciar el juego con la misma categoría y dificultad
    restartGameWithNewWord();
}

// Función para regresar al menú principal
document.querySelector('.btn-secondary').addEventListener('click', () => {
    // Mostrar nuevamente los botones de categoría
    const categoryButtons = document.querySelectorAll('.category');
    categoryButtons.forEach(button => {
        button.style.display = 'inline-block';
    });

    // Ocultar elementos de finalización del juego
    document.querySelector('.game-over').style.visibility = 'hidden';
    document.querySelector('.you-win').style.display = 'none';
    document.querySelector('.you-loss').style.display = 'none';

    // Limpiar mensaje de pérdida
    const lossText = document.querySelector('.loss-text');
    lossText.innerHTML = 'Has sido atrapado, pero no todo está perdido...';

    // Mostrar el contenedor de categorías
    const categoryContainer = document.querySelector('.category-container');
    categoryContainer.style.display = 'flex';
});
