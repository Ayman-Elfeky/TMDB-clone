const id = location.search.split('=')[1];
const image = document.getElementById("profileImage")
const actorName = document.getElementById("name");
const birth = document.getElementById("birthday");
const placeOfbirth = document.getElementById("placeOfBirth");
const department = document.getElementById("department");
const biography = document.getElementById("biography");
const homePage = document.getElementById("homepage");


async function getData() {
    const rawPerson = await fetch(`${apiPeopleDetails}${id}?api_key=${apiKey}`);
    const person = await rawPerson.json()
    return person;
}

getData().then(actor => {
    document.title = actor.name;
    console.log(document.title)
    const linkImg = document.getElementsByTagName('link');
    for(let i = 0; i < linkImg.length; i++) {
        if(linkImg[i].rel === 'icon') {
            linkImg[i].href = `${apiImage}${actor.profile_path}`
        }
    }


    linkImg.href = `${apiImage}${actor.profile_path}`;

    image.src = `${apiImage}${actor.profile_path}`;
    actorName.textContent = actor.name;
    birth.textContent = actor.birthday;
    placeOfbirth.textContent = actor.place_of_birth;
    department.textContent = actor.known_for_department;
    biography.textContent = actor.biography;
    homePage.href = actor.homepage;
})   

