function getRickMortyInfo() {
    const rickMortyNameInput = document.getElementById('rickMortyName');
    const rickMortyInfo = document.getElementById('rickMortyInfo');

    const rickMortyName = rickMortyNameInput.value.toLowerCase();

    fetch(`http://localhost:3003/characters/${rickMortyName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Personaje no encontrado');
            }
            return response.json();
        })
        .then(data => {
            const {name, status, species, gender, origin, image} = data;

            rickMortyInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${image}" alt="${name}"/>
                <p>Status: ${status}</p>
                <p>Species: ${species}</p>
                <p>Gender: ${gender}</p>
                <p>Origin: ${origin.name}</p>
            `;
        })
        .catch(error => rickMortyInfo.innerHTML = `<p>Imposible acceder al personaje</p>`)
};