let characterCell = 0;
let characters;

function goToCharacters(campaignId) {
  createCharacterTable()

  fetchCharacters(campaignId);
}

// Get request for characters of one campaign
function fetchCharacters(campaignId) {
  fetch(URL + `/campaigns/${campaignId}`)
  .then(resp => resp.json())
  .then(campaignInfo => {
    characters = campaignInfo.characters
    campaignInfo.characters.forEach((character) => displayCharacter(character))
  });
};

// Fetch unassigned characters
function fetchUnassigned() {
  fetch(URL + '/characters')
  .then(resp => resp.json())
  .then(characters => {
    characterTable = body.querySelector('#character-table');
    characterTable.remove();
    characterCell = 0;
    campaignCell = 0;
    let div = document.createElement('div');
    div.className ="ui divided items"
    body.appendChild(div)
    characters.forEach((character) => {
      if (character.character_campaigns.length == 0) {
        displayFreeCharacter(character);
      };
    });
  });
};

function createCharacterTable() {
  characterTable = document.createElement('table');
  characterTable.id = 'character-table';
  characterTable.className = 'ui very basic collapsing celled table';
  characterTable.innerHTML = `<tbody></tbody>`;
  body.appendChild(characterTable)
}

// Display each character on campaign page
function displayCharacter(character) {
  characterTable = document.getElementById('character-table');
  if (characterCell % 3 == 0) {
    addRowToTable(characterTable, characterCell, 3);
  };
  characterCell += 1;

  let card = document.createElement('div');
  card.style = 'width: 350px;'

  createCharacterCell(character, characterTable, card);
  addCharacterDivHtml(card, character);

  // let editBtn = card.querySelector('.ui.secondary.button');
  // editBtn.addEventListener('click', () => {console.log(character)});

  let remove = card.querySelector('button.ui.red.button')
  remove.addEventListener('click', (e) => removeFromCampaign(e, character));
};

// Create cell for previous function
function createCharacterCell(character, characterTable, card) {
  currentCell = document.getElementById(`cell${characterCell}`);

  currentCell.hidden = false;

  currentCell.appendChild(card);
};

// Display characters in 'add to Campaign'
function displayFreeCharacter(character) {
  let table = body.querySelector('.ui.divided.items')

  let card = document.createElement('div')
  card.className = "item"

  addFreeCharacterDivHTML(card, character)

  table.appendChild(card)

  let add = card.querySelector('.ui.right.floated.primary.button')
  add.addEventListener('click', (e) => addToCampaign(e, character));
};

// HTML for character card
function addCharacterDivHtml(card, character) {
  card.className = 'ui card character';
  card.innerHTML = `
  <div class="content">
    <div class="header"></div>
    <div class="meta">
      <span class="right floated time">${character.race.name} ${character.char_class.name}</span>
      <span class="category">Level: ${character.level}</span>
    </div>
    <div class="description">
      <p>${character.bio.length > 195 ? character.bio.slice(0, 195)+'...' : character.bio}</p>
    </div>
  </div>
  <div class="extra content">
    <div class="left floated button">
    <!-- <button class="ui secondary button">Edit</button> -->
    <button class="ui red button" id="char-remove">Remove</button>
    </div>
    <div class="right floated author">
      <span style="font-size: 1.2em;">${character.name}
    </div>
  </div>`;
};

function addFreeCharacterDivHTML(div, character) {
  div.innerHTML = `
    <div class="content" style="width: 75%; padding-right: 50px;">
      <a class="header">${character.name}</a>
      <div class="meta">
        <span class="class race">Level ${character.level}</span>
      </div>
      <div class="description">
        <p>
          ${character.bio}<br>
        </p>
      </div>
      <div class="extra">
        <p>Strength: ${character.ability_score.strength}, Dexterity: ${character.ability_score.dexterity}, Constitution: ${character.ability_score.constitution}, Intelligence: ${character.ability_score.intelligence}, Wisdom: ${character.ability_score.wisdom}, Charisma: ${character.ability_score.charisma}</p>
        <div class="ui label">${character.race.name}</div>
        <div class="ui label">${character.char_class}</div>
        <div class="ui right floated primary button">
          Add to Campaign
          <i class="right chevron icon"></i>
        </div>
      </div>
    </div>
  `;
}

function removeFromCampaign(e, character) {
  let character_campaign = character.character_campaign[0];

  characters = characters.filter((x) => !(x == character))
  fetch(URL + `/character_campaigns/${character_campaign.id}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(doc => {
      let characterTable = body.querySelector('#character-table');
      characterTable.remove();
      characterCell = 0;
      campaignCell = 0;

      createCharacterTable();

      characters.forEach(displayCharacter);
    });
}

function addToCampaign(e, character) {

  fetch(URL + '/character_campaigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Header': 'application/json'
    },
    body: JSON.stringify({character_campaign: {campaign_id: currentCampaign.id, character_id: character.id}})
  }).then(res => res.json())
    .then(doc => {
      campaignHomePage(currentCampaign);
    })

}


// function createCharacter() {
//
// }
