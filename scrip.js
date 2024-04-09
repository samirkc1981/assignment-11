const popularAnimeList = document.getElementById('popular-anime-list');
const newAnimeList = document.getElementById('new-anime-list');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.querySelector('.close');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const itemsPerPage = 4; 

const popularAnimeData = [
    { title: 'Demon Slayer: Kimetsu no Yaiba', description: 'A story about Tanjiro Kamado, a kind-hearted boy who becomes a demon slayer to avenge his family.' },
    { title: 'Jujutsu Kaisen', description: 'Follows high school student Yuji Itadori as he joins a secret organization of Jujutsu sorcerers to protect the world from evil curses.' },
    { title: 'Dr. Stone', description: 'After a mysterious phenomenon turns all of humanity to stone, genius boy Senku Ishigami awakens and begins the quest to rebuild civilization using science.' },
    { title: 'The Rising of the Shield Hero', description: 'Naofumi Iwatani is summoned to another world as the Shield Hero and must protect the world from waves of catastrophe.' }
];

const newAnimeData = [
    { title: 'Naruto', description: 'A ninja who dreams of becoming the strongest ninja and leader of his village.' },
    { title: 'One Piece', description: 'A pirate adventure following Monkey D. Luffy and his crew in search of the One Piece treasure.' },
    { title: 'Attack on Titan', description: 'Humanity\'s struggle against giant humanoid creatures known as Titans.' },
    { title: 'My Hero Academia', description: 'A world where people with superpowers known as "Quirks" are the norm.' }
];


function populateAnimeList(animeList, listElement, page) {
    listElement.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAnime = animeList.slice(startIndex, endIndex);
    paginatedAnime.forEach(anime => {
        const li = document.createElement('li');
        li.textContent = anime.title;
        li.addEventListener('click', () => {
            modalTitle.textContent = anime.title;
            modalDescription.textContent = anime.description;
            modal.style.display = 'block';
        });
        listElement.appendChild(li);
    });
}


function handlePagination(animeList, listElement, totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.createElement('div');
    paginationContainer.classList.add('pagination');
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.href = '#';
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            populateAnimeList(animeList, listElement, i);
        });
        paginationContainer.appendChild(pageLink);
    }
    listElement.parentNode.appendChild(paginationContainer);
}


populateAnimeList(popularAnimeData, popularAnimeList, 1);
populateAnimeList(newAnimeData, newAnimeList, 1);
handlePagination(popularAnimeData, popularAnimeList, popularAnimeData.length);
handlePagination(newAnimeData, newAnimeList, newAnimeData.length);


searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim().toLowerCase();
    const filteredAnime = [...popularAnimeData, ...newAnimeData].filter(anime => anime.title.toLowerCase().includes(searchQuery));
    populateAnimeList(filteredAnime, newAnimeList, 1);
    const totalFilteredItems = filteredAnime.length;
    const listElement = document.getElementById('new-anime-list');
    const paginationContainer = listElement.parentNode.querySelector('.pagination');
    if (paginationContainer) {
        listElement.parentNode.removeChild(paginationContainer);
    }
    handlePagination(filteredAnime, listElement, totalFilteredItems);
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
