const Link = 'https://rickandmortyapi.com/api/character/';
let characters = []; // Para almacenar los personajes cargados

// Función para obtener los datos de un personaje por ID
async function getCharacter(id) {
    try {
        const response = await fetch(Link + id);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching character data:', error);
    }
}

// Función para agregar el nombre y la imagen del personaje a la lista en el HTML
function addCharacterToList(name, imageUrl, id) {
    const container = document.getElementById('character-list');
    
    const card = document.createElement('div');
    card.className = 'character-card';
    card.dataset.id = id; // Añadir el ID como atributo de datos

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;
    
    const span = document.createElement('span');
    span.textContent = name;
    
    card.appendChild(img);
    card.appendChild(span);
    
    card.addEventListener('click', () => openModal(name, imageUrl)); // Añadir evento de clic
    
    container.appendChild(card);
}

// Función para cargar todos los personajes y almacenarlos en el array
async function loadCharacters() {
    for (let id = 1; id <= 500; id++) {
        const data = await getCharacter(id);
        if (data && data.name && data.image) {
            characters.push(data);
            addCharacterToList(data.name, data.image, id);
        }
    }
}

// Función para filtrar y mostrar personajes basado en la búsqueda
function filterCharacters(event) {
    const query = event.target.value.toLowerCase();
    const container = document.getElementById('character-list');
    container.innerHTML = ''; // Limpiar la lista actual
    
    const filteredCharacters = characters.filter(character => 
        character.name.toLowerCase().includes(query)
    );
    
    filteredCharacters.forEach(character => {
        addCharacterToList(character.name, character.image, character.id);
    });
}

// Función para abrir el modal
function openModal(name, imageUrl) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');

    modalImage.src = imageUrl;
    modalName.textContent = name;

    modal.style.display = 'flex'; // Mostrar el modal
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none'; // Ocultar el modal
}

// Llamar a la función principal para cargar los personajes al inicio
loadCharacters();

// Agregar un evento de entrada para la barra de búsqueda
document.getElementById('search-input').addEventListener('input', filterCharacters);

// Agregar eventos de cierre del modal
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
});