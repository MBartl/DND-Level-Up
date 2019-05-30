let characterCell = 0;

// Get request for characters of one campaign
function fetchCharacters(campaign) {
  fetch(URL + `/campaigns/${campaign.id}`)
  .then(resp => resp.json())
  .then(campaignInfo => {
    campaignInfo.characters.forEach((character) => displayCharacter(character))
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
    addRowToTable(characterTable, characterCell);
  };
  characterCell += 1;

  currentCell = document.getElementById(`cell${characterCell}`);
  currentCell.hidden = false;

  let div = document.createElement('div');
  addCharacterDivHtml(div, character);

  let editBtn = div.querySelector('.ui.secondary.button');
  editBtn.addEventListener('click', () => {console.log(character)});

  currentCell.appendChild(div);
};

// HTML for character card
function addCharacterDivHtml(div, character) {
  div.className = 'ui card character';
  div.innerHTML = `
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
      <button class="ui secondary button">Edit</button>
    </div>
    <div class="right floated author">
      ${character.name}
    </div>
  </div>`;
};
