let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async () => {
    try {
       await loadPlanets(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Error object not found');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
}

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet) => {
            const card = document.createElement("div");
            card.className = "cards";

            // Definindo a imagem de fundo para o planeta
            const planetId = planet.url.split('/').slice(-2, -1)[0];
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg')`;

            const planetNameBG = document.createElement("div");
            planetNameBG.className = "planets-name-bg";

            const planetName = document.createElement("span");
            planetName.className = "planets-name";
            planetName.innerText = `${planet.name}`;

            // Alocando as informações dentro do card
            planetNameBG.appendChild(planetName);
            card.appendChild(planetNameBG);

            // Adicionando o card ao conteúdo principal
            mainContent.appendChild(card);

            card.onclick = () => {
                const modal = document.getElementById('modal')
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content')
                modalContent.innerHTML = ''

                const planetImage = document.createElement('div')
                planetImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg')`
                planetImage.className = 'planets-image'

                const name = document.createElement('span')
                name.className = 'planets-details'
                name.innerText = `Name: ${planet.name}`

                const population = document.createElement('span')
                population.className = 'planets-details'
                population.innerText = `Population: ${planet.population}`

                const climate = document.createElement('span')
                climate.className = 'planets-details'
                climate.innerText = `Climate: ${planet.climate}`

                const terrain = document.createElement('span')
                terrain.className = 'planets-details'
                terrain.innerText = `Terrain: ${planet.terrain}`

                const diameter = document.createElement('span')
                diameter.className = 'planets-details'
                diameter.innerText = `Diameter: ${planet.diameter} km`

                const gravity = document.createElement('span')
                gravity.className = 'planets-details'
                gravity.innerText = `Gravity: ${planet.gravity}`

                const rotationPeriod = document.createElement('span')
                rotationPeriod.className = 'planets-details'
                rotationPeriod.innerText = `Rotation Period: ${planet.rotation_period} hours`

                const orbitalPeriod = document.createElement('span')
                orbitalPeriod.className = 'planets-details'
                orbitalPeriod.innerText = `Orbital Period: ${planet.orbital_period} days`

                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(population)
                modalContent.appendChild(climate)
                modalContent.appendChild(terrain)
                modalContent.appendChild(diameter)
                modalContent.appendChild(gravity)
                modalContent.appendChild(rotationPeriod)
                modalContent.appendChild(orbitalPeriod)
            }
        })

        // Configurando os botões para habilitar ou desabilitar e deixar visíveis ou ocultos
        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next 
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden"

        currentPageUrl = url  // Atualizando a URL para a próxima página

    } catch (error) {
        alert('Error object not found')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadPlanets(responseJson.next);
        
    } catch (error) {
        console.log(error);
        alert('Error Page not found!');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadPlanets(responseJson.previous);
    } catch (error) {
        console.log(error);
        alert('Error Page not found!');
    }
}

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}
