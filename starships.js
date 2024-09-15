let currentPageUrl = 'https://swapi.dev/api/starships/';

window.onload = async () => {
    try {
       await loadStarships(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Error object not found');
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
}

async function loadStarships(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starship) => {
            const card = document.createElement("div");
            card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards";

            const starshipNameBG = document.createElement("div");
            starshipNameBG.className = "starship-name-bg";

            const starshipName = document.createElement("span");
            starshipName.className = "starship-name";
            starshipName.innerText = `${starship.name}`;

            starshipNameBG.appendChild(starshipName);
            card.appendChild(starshipNameBG);

            card.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'visible';

                const modalContent = document.getElementById('modal-content');
                modalContent.innerHTML = '';

                const starshipImage = document.createElement('div');
                starshipImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/starships/${starship.url.replace(/\D/g, "")}.jpg')`;
                starshipImage.className = 'starship-image';

                const name = document.createElement('span');
                name.className = 'starship-details';
                name.innerText = `Name: ${starship.name}`;

                const model = document.createElement('span');
                model.className = 'starship-details';
                model.innerText = `Model: ${starship.model}`;

                const manufacturer = document.createElement('span');
                manufacturer.className = 'starship-details';
                manufacturer.innerText = `Manufacturer: ${starship.manufacturer}`;

                const cost = document.createElement('span');
                cost.className = 'starship-details';
                cost.innerText = `Cost: ${starship.cost_in_credits} credits`;

                modalContent.appendChild(starshipImage);
                modalContent.appendChild(name);
                modalContent.appendChild(model);
                modalContent.appendChild(manufacturer);
                modalContent.appendChild(cost);
            }

            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;
        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";

        currentPageUrl = url;  // Atualizando a URL
    } catch (error) {
        alert('Error object not found');
        console.log(error);
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarships(responseJson.next);
        
    } catch (error){
        console.log(error);
        alert('Error Page not found!');
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarships(responseJson.previous);
    } catch (error){
        console.log(error);
        alert('Error Page not found!');
    }
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}
