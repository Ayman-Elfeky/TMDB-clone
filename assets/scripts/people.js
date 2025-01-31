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
    document.head.children[2].innerHTML = actor.name;
    document.head.children[4].href = `${apiImage}${actor.profile_path}`;

    image.src = `${apiImage}${actor.profile_path}`;
    actorName.textContent = actor.name;
    birth.textContent = actor.birthday;
    placeOfbirth.textContent = actor.place_of_birth;
    department.textContent = actor.known_for_department;
    biography.textContent = actor.biography;
    homePage.href = actor.homepage;
})   

