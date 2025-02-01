const movieId = location.search.split('=')[1];
const api = `${apiMovieDetails}${movieId}?api_key=${apiKey}&append_to_response=credits`   // Cast and crew

const column1 = document.getElementsByClassName('col-1')[0];
const img = document.getElementById('image');
const title = document.getElementById('titlee');
const titleYear = document.getElementById('year');
const releaseDate = document.getElementsByClassName('release-date')[0];
const originCountry = document.getElementsByClassName('origin-country')[0];
const genres = document.getElementsByClassName('genres-list')[0];
const tagline = document.getElementsByClassName('tagline')[0];
const overview = document.getElementById('overview');
const people = document.getElementsByClassName('people')[0];

async function getSingleMovie() {
    const rawMovie = await fetch(api);
    const movie = await rawMovie.json();
    return movie;
}

getSingleMovie().then(movie => {
    console.log(movie)
    drawContent(movie)
})

function drawContent(movie) {
    const year = movie.release_date.slice(0,4)

    const head = document.head.children;
    head[3].innerHTML = `${movie.title} (${year}) &#8212; The Movie Database (TMDB)`

    img.setAttribute('src', `${apiImage}${movie.poster_path}?api_key=${apiKey}`);

    document.getElementsByTagName('body')[0].style.background = `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(${apiImage}${movie.backdrop_path})`

    title.innerText = movie.title;
    titleYear.innerText = `(${year})`;

    releaseDate.innerHTML = movie.release_date;
    originCountry.innerHTML = movie.origin_country;         
    movie.genres.forEach(element => {                        
        const list = document.createElement('li');
        list.classList.add('genres');
        list.innerText = `${element.name}`;
        genres.appendChild(list);
    });

    tagline.innerText = movie.tagline

    overview.innerText = movie.overview

    const directors = movie.credits.crew.filter(ele => ele.known_for_department === 'Directing');
    let count = 0;
    directors.forEach(ele => {
        if(count < 6) {
            const list = document.createElement('li');
            list.classList.add('person');
            list.innerHTML = `<p>${ele.name}</p><p>${ele.department}</p>`;
            people.appendChild(list);
            count++;
        }
        });
}