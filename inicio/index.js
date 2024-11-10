document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menuIcon");
    const sidebar = document.getElementById("sidebar");
    const submitAnswer = document.getElementById("submitAnswer");
    const customAlert = document.getElementById("customAlert");
    const pokemonMessage = document.getElementById("pokemonMessage");
    const pokemonImage = document.getElementById("pokemonImage"); 
    const closeAlert = document.getElementById("closeAlert");

    // Abrir/Cerrar Menu Lateral
    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("open");
    });

    // Cerrar menu lateral si se hace clic fuera de el
    document.addEventListener("click", function (e) {
        if (!sidebar.contains(e.target) && e.target !== menuIcon) {
            sidebar.classList.remove("open");
        }
    });

    // Alerta Personalizada
    submitAnswer.addEventListener("click", function () {
        const selectedPokemon = document.getElementById("pokemonSelect").value;

        switch (selectedPokemon) {
            case "Squirtle":
                pokemonMessage.textContent = `Tu Pokémon inicial es ¡${selectedPokemon}!`;
                pokemonImage.src = "../inicio/img/squirtle.png"; 
                pokemonImage.style.display = "block"; 
                break;
            case "Charmander":
                pokemonMessage.textContent = `Tu Pokémon inicial es ¡${selectedPokemon}!`;
                pokemonImage.src = "../inicio/img/charmander.jpg"; 
                pokemonImage.style.display = "block";
                break;
            case "Bulbasaur":
                pokemonMessage.textContent = `Tu Pokémon inicial es ¡${selectedPokemon}!`;
                pokemonImage.src = "../inicio/img/bulbasaur.png"; 
                pokemonImage.style.display = "block";
                break;
            default:
                pokemonMessage.textContent = "No has seleccionado ningún Pokémon";
                pokemonImage.style.display = "none"; 
        }

        customAlert.style.display = "flex";
    });

    // Cerrar alerta personalizada
    closeAlert.addEventListener("click", function () {
        customAlert.style.display = "none";
    });
});

// Ir a Pokedex/Batalla
const $pokedex = document.getElementById('btnPokedex');
$pokedex.addEventListener('click', () => window.location.href = "../pokedex/index.html");

const $empezar = document.getElementById('btnEmpezar');
$empezar.addEventListener('click', () => window.location.href = "../batalla/index.html");
