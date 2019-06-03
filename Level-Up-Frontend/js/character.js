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

  let editBtn = card.querySelector('.ui.secondary.button');
  editBtn.addEventListener('click', () => characterFormPage(character));

  let remove = card.querySelector('button.ui.red.button')
  remove.addEventListener('click', () => removeFromCampaign(character));
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
  add.addEventListener('click', () => addToCampaign(character));
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
    <button class="ui secondary button" id="char-edit">Edit</button>
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

function removeFromCampaign(character) {
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

function addToCampaign(character) {

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


function characterFormPage(character) {
  clearBody()

  characterForm = document.createElement('form')
  createCharacterFormHTML(character, characterForm)

  const classOptions = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"]
  classScroll = characterForm.querySelector('#class-scroll')
  addClassOptions(classScroll, classOptions)

  const raceOptions = ["Dwarf", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"]
  raceScroll = characterForm.querySelector('#race-scroll')
  addClassOptions(raceScroll, raceOptions)

  statsBox = characterForm.querySelector('#stats-box')
  addStatsBox(statsBox)

  reroll = characterForm.querySelector('#reroll')
  reroll.addEventListener('click', (e) => {
    e.preventDefault();
    while (statsBox.firstChild) {
      statsBox.removeChild(statsBox.firstChild);
    };
    addStatsBox(statsBox);
  })

  characterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("We're still working on this part!")
  })

  body.appendChild(characterForm)
}


function createCharacterFormHTML(character, form) {
  body.style = `background-image: url("dndbackground.jpg"); z-index: 9; background-repeat: no-repeat; height: 108%;`;
  form.style = "padding-right: 5%;";
  form.innerHTML = `
  <div class="ui segment" style="width: 35em; height: 35em;">
    <div class="ui two column very relaxed grid">
      <div class="column textpanel" style="padding-top: 2em; padding-right: 10%;">
        <image src="charactersheet.png">
        <input id="charNameField"></input>
      </div>
      <div class="column" style="text-align: center; padding-left: 5.5em;">
        <h3>Class:</h3>
        <div id=class-scroll></div>
        <h3>Race:</h3>
        <div id=race-scroll></div>
      </div>
    </div>
    <div class="ui segment" style="width: 33em; height: 20em;">
    <br><br><br>
    <div class="ui three column very relaxed grid" id="stats-box">
    </div>
    <br><br>
    <button style='font-size: 1.35em;' id="reroll">Reroll Stats 🎲</button>
  </div>
  <input type="submit" style="align-content: center;">`;
}

function addClassOptions(scroll, options) {
  let picker = 0
  const currentOption = options[picker]

  scroll.innerHTML = `
  <button class="right toggle"><i class="angle double left icon"></i></button>
  <span id="option">${currentOption}</span>
  <button class="left toggle"><i class="angle double right icon"></i></button>`;

  scroll.querySelector('.right.toggle').addEventListener('click', (e) => {
    e.preventDefault()
    picker -= 1;
    if (picker < 0) {picker = 0}
    updateOption(picker);
  });

  let max = options.length-1

  scroll.querySelector('.left.toggle').addEventListener('click', (e) => {
    e.preventDefault()
    picker += 1;
    if (picker > max) {picker = max};
    updateOption(picker);
  });

  function updateOption(picker) {
    scroll.querySelector('#option').innerText = options[picker]
  }

}

function addStatsBox(statsBox) {
  let strength, dexterity, constitution, intelligence, wisdom, charisma;

  function rollStats() {
    strength = Math.floor(Math.random() * 8) + 8;
    dexterity = Math.floor(Math.random() * 8) + 8;
    constitution = Math.floor(Math.random() * 8) + 8;
    intelligence = Math.floor(Math.random() * 8) + 8;
    wisdom = Math.floor(Math.random() * 8) + 8;
    charisma = Math.floor(Math.random() * 8) + 8;
  }

  rollStats();

  statsBox.innerHTML = `
  <div class="column textpanel" style="font-size: 17;">
    <div>
      Strength:<div class='stat'>${strength}</div>
      <br>
      Dexterity:<div class='stat'>${dexterity}</div>
    </div>
  </div>
  <div class="column textpanel" style="font-size: 17;">
    <div>
      Constitution:<div class='stat'>${constitution}</div>
      <br>
      Intelligence:<div class='stat'>${intelligence}</div>
    </div>
  </div>
  <div class="column textpanel" style="font-size: 17;">
    <div>
      Wisdom:<div class='stat'>${wisdom}</div>
      <br>
      Charisma:<div class='stat'>${charisma}</div>
    </div>
  </div>
  `;
}
