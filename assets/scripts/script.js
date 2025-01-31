// backgrounds container
const backgroundsCont = document.getElementById('backgrounds');
const childs = backgroundsCont.children;
// Navbars
const upperNav = document.getElementsByClassName('upper-nav')[0];
const bottomNav = document.getElementById('bottom-nav');
// Header
const header = document.getElementsByTagName('header')[0];

// Get data from TMDB api

getData().then(data => {
    getBackgrounds(data.movie);
    updateTrendingSliderMo(data.movie);
    // updateTrendingSliderTV(data.tv);
});

// backgrounds
function getBackgrounds(movies) {
    for (let i = 0; i < 5; i++) {
        childs[i].style.background = `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)),
        url(${apiImage}${movies[i].poster_path})`;
    }
}

// Scroll effect (bottom nav fixed while scrolling)
const upperNavHeight = upperNav.getBoundingClientRect().height;

window.addEventListener('scroll', (e) => {
    if (window.scrollY > upperNavHeight) {
        bottomNav.classList.add('fixed-nav');
    } else {
        bottomNav.classList.remove('fixed-nav');
    }
});

// Menu bars toggle
const menuBar = document.getElementById('menu-bar');
const listsCont = document.getElementById('listsContainer');
const lists = document.getElementById('lists');
const menu = document.getElementsByClassName('fa-bars')[0];
const exit = document.getElementsByClassName('fa-xmark')[0];

menuBar.addEventListener('click', () => {
    if (listsCont.offsetHeight === 0) {
        menu.style.display = 'none';
        exit.style.display = 'block';
        listsCont.style.height = `${lists.offsetHeight}px`;
    } else {
        menu.style.display = 'block';
        exit.style.display = 'none';
        listsCont.style.height = 0;
    }
});

// Lists onmouseover (hover lists)
const headerItems = document.querySelectorAll('.header > li');

headerItems.forEach(item => {
    const hoverList = item.querySelector('.hover-list');

    if (hoverList) {
        item.addEventListener('mouseenter', () => {
            hoverList.style.display = 'block';
        });

        item.addEventListener('mouseleave', () => {
            hoverList.style.display = 'none';
        });
    }
});

// Trending section
// Update the trending section with movie posters
function updateTrendingSliderMo(movies) {
    console.log(movies)
    const slider = document.querySelector('.slider');
    movies.forEach(movie => {
        const imgCard = document.createElement('div');
        imgCard.classList.add('img-card');
        const link = document.createElement('a');
        link.setAttribute('href', `../../pages/movie.html?id=${movie.id}`);

        const imgElement = document.createElement('img');
        imgElement.src = apiImage + movie.poster_path;
        imgElement.alt = movie.title;
        imgElement.classList.add('slider-img');

        const title = document.createElement('h3');
        title.innerText = movie.title;

        link.appendChild(imgElement);
        link.appendChild(title);
        imgCard.appendChild(link);
        slider.appendChild(imgCard);
    });
}

let currentIndex = 0;

function moveSlider(direction) {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider img');
    const totalSlides = slides.length;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const slideWidth = slides[0].clientWidth + 15;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}
