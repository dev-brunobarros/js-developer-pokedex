let pokeSpecie, pokeEvolution, evolutionsArray, pokeSpeciesArray;

function getPokemonSpeciesModal(pokemonId) {
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
  .then((response) => response.json())
  .then(pokeSpecies => {
    pokeSpecie = pokeSpecies.genera[7].genus
    pokeSpeciesArray = pokeSpecies
  })
}

function getPokemonEvolutionModal(pokemonId) {
  evolutionsArray = [];

  fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`)
  .then((response) => response.json())
  .then(pokeEvolutions => {
    pokeEvolution0 = pokeEvolutions.chain.evolves_to[0].species.name
    evolutionsArray.push(pokeEvolution0);
    if (pokeEvolutions.chain.evolves_to.length > 0) {
      pokeEvolution1 = pokeEvolutions.chain.evolves_to[0].evolves_to[0].species.name
      evolutionsArray.push(pokeEvolution1);
    }
  })
}

function getPokemonDetailsModal(pokemonId) {
  const tabAbout = document.getElementById('about-tab');
  const urlDetail = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  fetch(urlDetail)
    .then((response) => response.json())
    .then(pokeDetails => {

      document.getElementById('pokemon-number').innerText = "#" + pokeDetails.id
      document.getElementById('pokemon-name').innerText = pokeDetails.name
      document.getElementById('types').innerHTML = pokeDetails.types.map((type) => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('')
      document.getElementById('pokemon-image').src = pokeDetails.sprites.other.dream_world.front_default

      document.getElementById('about-tab-content').innerHTML = `
        <div class="info-item">
        <p>Species</p>
        <span>${pokeSpecie.replace('Pokémon', '')}</span>
        </div>
        <div class="info-item">
        <p>Height</p>
        <span>${(pokeDetails.height / 100).toFixed(2)} m</span>
        </div>
        <div class="info-item">
        <p>Weight</p>
        <span>${pokeDetails.weight} kg</span>
        </div>
        <div class="info-item">
        <p>Abilities</p>
        <span>${pokeDetails.abilities.map((ability) => ability.ability.name).join(', ')}</span>
        </div>

        <h2>Breeding</h2>

        <div class="info-item">
        <p>Gender </p>
        <p>Male ${100 - (pokeSpeciesArray.gender_rate * 12.5)}%</p>
        <p>Female ${pokeSpeciesArray.gender_rate * 12.5}%</p>
        </div>

        <div class="info-item">
        <p>Egg Groups</p>
        <span>${pokeSpeciesArray.egg_groups.map((eggGroup) => eggGroup.name).join(', ')}</span>
        </div>

        <div class="info-item">
        <p>Egg Cycle</p>
        <span>${pokeSpeciesArray.egg_cycle}</span>
        </div>
      `
      document.getElementById('baseStats-tab-content').innerHTML = `
        <div class="info-item">
        <p>HP</p>
        <span>${pokeDetails.stats[0].base_stat}</span>
        </div>
        <div class="info-item">
        <p>Attack</p>
        <span>${pokeDetails.stats[1].base_stat}</span>
        </div>
        <div class="info-item">
        <p>Defense</p>
        <span>${pokeDetails.stats[2].base_stat}</span>
        </div>
        <div class="info-item">
        <p>Speed</p>
        <span>${pokeDetails.stats[5].base_stat}</span>
        </div>
      `
      document.getElementById('evolution-tab-content').innerHTML = `
        <div class="info-item">
        <p>Evolution</p>
        <span>${evolutionsArray.join(', ')}</span>
      `
      document.getElementById('moves-tab-content').innerHTML = `
        <div class="info-item">
        <p>Moves</p>
        <span>${pokeDetails.moves.map((move) => move.move.name).join(',   ')}</span>
        </div>
      `
    })
}

function openModal(pokemonId, pokemonType) {
  document.getElementById('modal').showModal();
  getPokemonDetailsModal(pokemonId);
  getPokemonSpeciesModal(pokemonId);
  getPokemonEvolutionModal(pokemonId);
  document.getElementById('modal-header').classList.add(pokemonType);
  document.getElementById('modal-intro').classList.add(pokemonType);
  showTab('about-tab-content');
}

function closeModal(pokemonId) {
  pokemonId = 0;
  document.getElementById('modal').close();
  document.getElementById('modal-header').removeAttribute('class');
  document.getElementById('modal-intro').removeAttribute('class');
}

function showTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.div-content');
  const detailTabName = (tabName).replace('-content', '');
  for (let i = 0; i < tabs.length; i++) {
    tabContents[i].classList.remove('active');
    tabs[i].classList.remove('active');
  }
  document.getElementById(tabName).classList.add('active');
  document.getElementById(detailTabName).classList.add('active');
}