const apiMovie = `https://api.themoviedb.org/3/discover/movie`;
const apiTV = `https://api.themoviedb.org/3/discover/tv`;
const apiSearch = `https://api.themoviedb.org/3/search/movie`;   // query=${}?api_key=${apiKey}
const apiImage = `https://image.tmdb.org/t/p/w500/`;               // data?api_key=${apiKey}
const apiMovieDetails = `https://api.themoviedb.org/3/movie/`         //id?api_key=
const apiTvDetails = `https://api.themoviedb.org/3/tv/`
const apiPeople = `https://api.themoviedb.org/3/person/popular`
const apiPeopleDetails = `https://api.themoviedb.org/3/person/`

// should i divide the function into two fucntion or get the data in a single function for the performance?
// tv and movies
async function getData() {
    let data = {};
    const rawMovie = await fetch(`${apiMovie}?api_key=${apiKey}`);
    const movie = await rawMovie.json();
    data.movie = movie.results;

    const rawTv = await fetch(`${apiTV}?api_key=${apiKey}`);
    const tv = await rawTv.json();
    data.tv = tv.results;

    const rawPeople = await fetch(`${apiPeople}?api_key=${apiKey}`);
    const people = await rawPeople.json();
    data.people = people.results;

    return data;
}

// IIFE
const Helper = (function () {
    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    }
    // i will return it as an object
    return {
        formatDate
    };
})();