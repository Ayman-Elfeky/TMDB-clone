const container = document.getElementsByClassName('container')[0];

getData().then(data => {
    data.movie.forEach(element => {
        const link = document.createElement('a');
        link.setAttribute('href', `../../pages/movie.html?id=${element.id}`);

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.setAttribute('src', `${apiImage}${element.poster_path}?api_key=${apiKey}`);

        const div = document.createElement('div');
        div.classList.add('text');

        const title = document.createElement('h3');
        title.innerText = element.title;

        const date = document.createElement('p');
        date.innerText = Helper.formatDate(element.release_date);

        div.appendChild(title);
        div.appendChild(date);
        
        card.appendChild(img);  
        card.appendChild(div);

        link.appendChild(card)

        container.appendChild(link);
    });
})