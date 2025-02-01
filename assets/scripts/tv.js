const tvId = location.search.split('=')[1];
const apiUrl = `${apiTvDetails}${tvId}?api_key=${apiKey}`;
// const apiImage = "https://image.tmdb.org/t/p/w500";

async function getData() {
    const rawTv = await fetch(apiUrl);
    const tv = await rawTv.json();
    return tv;
}

getData().then(tv => {
    document.head.children[3].innerHTML = tv.name;
    document.head.children[4].href = `${apiImage}${tv.poster_path}`;

    document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.9)),url(${apiImage}${tv.backdrop_path})`;
    document.getElementById('title').textContent = tv.name;
    document.getElementById('poster').src = `${apiImage}${tv.poster_path}`;
    document.getElementById('overview').textContent = tv.overview;
    
    const genresContainer = document.getElementById('genres');
    tv.genres.forEach(genre => {
        let span = document.createElement('span');
        span.textContent = genre.name;
        genresContainer.appendChild(span);
    });
    
    const networksContainer = document.getElementById('networks');
    tv.networks.forEach(network => {
        let img = document.createElement('img');
        img.src = `${apiImage}${network.logo_path}`;
        img.alt = network.name;
        img.classList.add('network-logo');
        networksContainer.appendChild(img);
    });

    document.getElementById('last-episode').textContent = tv.last_episode_to_air?.overview || "No data available";
    document.getElementById('next-episode').textContent = tv.next_episode_to_air?.overview || "No data available";
});