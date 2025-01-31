const container = document.getElementsByClassName('container')[0];

getData().then(data => {
    data.people.forEach(element => {
        console.log(element)
        const link = document.createElement('a');
        link.setAttribute('href', `../../pages/people.html?id=${element.id}`);

        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.setAttribute('src', `${apiImage}${element.profile_path}?api_key=${apiKey}`);

        const div = document.createElement('div');
        div.classList.add('text');

        const title = document.createElement('h3');
        title.innerText = element.name;

        const date = document.createElement('p');
        date.innerText = element.known_for_department;

        div.appendChild(title);
        div.appendChild(date);
        
        card.appendChild(img);  
        card.appendChild(div);

        link.appendChild(card)

        container.appendChild(link);
    });
})