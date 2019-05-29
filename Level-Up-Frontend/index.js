const URL = 'http://localhost:3000/api/v1';
const body = document.querySelector('#body');

let campaignCell = 0;
let characterCell = 0;
let campaignId;

// Add event listeners to header and sidebar
const newCampaignButton = document.getElementById('new-campaign-button');
newCampaignButton.addEventListener('click', createCampaign);

const existingCampaignsButton = document.getElementById('existing-campaigns-button');
existingCampaignsButton.addEventListener('click', listCampaigns);

const compendiumBtn = document.getElementById('compendium');
compendiumBtn.addEventListener('click', toggleCompendium);

const currentBtn = document.getElementById('current-campaign');
currentBtn.addEventListener('click', currentCampaign);

//// Utility functions ////

// Adds row to table when number passes a multiple of 3
function addRowToTable(table, cellCounter) {
  newRow = document.createElement('tr');
  for (let i = 1; i <= 3; i++) {
    newRow.innerHTML += `
    <td id=cell${cellCounter+i} hidden=true style="padding: 1.5em 0.8em;"></td>`;
  };

  table.firstChild.appendChild(newRow);
};

// Function to reset body
function clearBody() {
  const body = document.getElementById('body');
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  };
};

// Auto scales textarea by input
function scaleTextArea() {
  let tx = document.getElementsByTagName('textarea');
  let width = tx[0].style.width;
  let height = 0;
  let i;

  //keeps i at starting value for each row of 3
  function setValue() {
    i = (Math.ceil(tx.length/3));
    i += (i-1)*2-1;
  };

  //set max height
  setValue();
  for (i; i < tx.length; i++) {
    if (tx[i].scrollHeight > height) {
      height = tx[i].scrollHeight;
    };
  };

  //set textarea styling
  setValue();
  for (i; i < tx.length; i++) {
    tx[i].style = `height: ${height}px; overflow-y: hidden; width: ${width};`
    tx[i].addEventListener('input', OnInput, false);
  };
  function OnInput() {
    this.style = 'height: auto; width: auto';
    this.style = `height: ${height}px; overflow-y: hidden; width: ${width};`
  };
};

// Toggles compendium options
function toggleCompendium() {
  menu = document.getElementById('menu');
  menu.hidden == true ? menu.hidden = false : menu.hidden = true;

  const compendiumMenus = menu.querySelectorAll(".item")
  const compendiumRaceMenu = compendiumMenus[1]
  compendiumRaceMenu.addEventListener("click", toggleRaceCompendium)
};

//toggles a submenu for races under the compendium and stashes a dataset in them to use for a fetch
function toggleRaceCompendium(){
  raceSubMenu = document.getElementById("race-submenu");
  raceSubMenu.hidden == true ? raceSubMenu.hidden = false : raceSubMenu.hidden = true;

  const raceSubMenuOptions = raceSubMenu.querySelectorAll(".item")
  let counter = 1
  while(counter <= 9){
    raceSubMenuOptions.forEach(function(raceItem){
      raceItem.dataset.raceId = counter
      raceItem.addEventListener("click", function(){
        displayRaceCompendium(raceItem.dataset.raceId)
      })
      counter += 1;
    });
  }
}

//Clears the page and fetches race data from server
function displayRaceCompendium(raceId){

  clearBody();

  fetch(URL + `/races/${raceId}`)
  .then(resp => resp.json())
  .then(race => displayRace(race))

}

function displayRace(race){

  // const raceShowPage = document.createElement("div")
  // const raceShowPage.className =
  //
  // raceShowPage.innerHTML = `<h1>Race Name</h1>
  // <div>Race Alignment
  // Race Age
  // Race Size
  // <div>
  // <div>Race Speed and Bonuses</div>
  // <div>Race Traits</div>
  // `
  //
  // document.body.appendChild(raceShowPage)
}

//// End of utility functions ////


//// Campaign functions ////

// List of all campaigns
function listCampaigns() {
  characterCell = 0
  campaignCell = 0;
  clearBody();

  campaignTable = document.createElement('table');
  campaignTable.id = 'campaign-table';
  campaignTable.className = 'ui very basic collapsing celled table';
  campaignTable.innerHTML = `<tbody></tbody>`;

  addRowToTable(campaignTable);

  body.appendChild(campaignTable);

  fetch(URL + '/campaigns')
  .then(resp => resp.json())
  .then(allCampaigns => {
    allCampaigns.forEach(listEachCampaign)
    scaleTextArea
  });
};

// Lists each campaign
function listEachCampaign(campaign) {
  campaignTable = document.getElementById('campaign-table')
  if (campaignCell % 3 == 0) {
    addRowToTable(campaignTable, campaignCell)
  }
  campaignCell += 1
  currentCell = document.getElementById(`cell${campaignCell}`)
  currentCell.hidden = false

  let div = document.createElement('div');
  div.className = 'ui card';
  div.id = 'campaign-list';
  div.style = 'width: 350px;'
  createCampaignDivHtml(div, campaign)

  div.querySelector('.ui.green.button').addEventListener('click', () => campaignHomePage(campaign));
  div.querySelector('.ui.blue.button').addEventListener('click', () => console.log(event.target));
  div.querySelector('.ui.red.button').addEventListener('click', () => console.log(event.target));

  currentCell.appendChild(div);
  scaleTextArea()
};

// HTML for campaign card
function createCampaignDivHtml(div, campaign) {
  div.innerHTML = `
  <div class="content">
    <div class="header">${campaign.name}</div>
  </div>
  <div class="extra content">
    <h4 class="ui sub header">Summary</h4><br>
      <div class="event">
        <div class="content">
          <div class="summary">
          <form>
          <textarea style="width: 320px;">
            ${campaign.plot_notes}
          </textarea>
          </form>
          </div>
      </div>
    </div>
  </div>
  <div class="extra content">
    <div class="three ui buttons">
      <button class="ui green button">Overview</button>
      <button class="ui blue button">Save</button>
      <button class="ui red button">Delete</button>
    </div>
  </div>`;
}

// Create a new campaign
function createCampaign() {
  let campaignForm
  if (!(body.firstChild.id == "campaign-form")) {
    clearBody()
    createCampaignForm()
    campaignForm = document.querySelector('form')
    campaignForm.addEventListener('submit', function() {
      event.preventDefault()
      const campaignNameInput = this.querySelector('input[name="campaign-name"]').value
      const plotNotesInput = this.querySelector('textarea[name="campaign-description"]').value

      createCampaignInstance(campaignNameInput, plotNotesInput)
    })
  }
  else {
    campaignForm = document.querySelector('form')
    campaignForm.hidden == true ? campaignForm.hidden = false : campaignForm.hidden = true
  }
}

// Form for new campaign
function createCampaignForm() {
  campaignForm = document.createElement('form')
  body.appendChild(campaignForm)
  campaignForm.className = 'ui form'
  campaignForm.id = 'campaign-form'

  campaignForm.innerHTML = `
  <br><br>
  <div class='field'>
    <label>Campaign Name</label><br>
    <input type='text' name='campaign-name' style='width: 300px;'><br><br>

    <label>Campaign Summary</label><br>
    <textarea name='campaign-description' form='create-campaign-form' style='width: 300px;'></textarea>
    <br><br>
    <input type='submit' value='Submit'>
  </div>`;
  scaleTextArea();
}

// Send the new campaign to the database
function createCampaignInstance(name, plot_notes) {
  campaignForm = document.querySelector('form');
  campaignForm.hidden = true;
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': `application/json`,
      'Accept': `application/json`
    },
    body: JSON.stringify({name, plot_notes}),
  }

  fetch(URL + '/campaigns', configObj)
    .then(resp => resp.json())
    .then(campaign => {
      campaignHomePage(campaign)
    })
}


//// Start of Individual Campaign related functions ////

// Home page for a single campaign
function campaignHomePage(campaign) {
  //sets the current campaign to last created or visited homepage
  currentCampaign = campaign

  characterCell = 0
  campaignCell = 0;
  clearBody();

  body.innerHTML = `
  <br>
  <h1>${campaign.name}</h1>
  <div class="content">
    <div class="summary">
      <form><textarea style="width: 70%; height: 15%;">
        ${campaign.plot_notes}
      </textarea></form>
    </div>
  </div>
  <h3>Characters:</h3>`;

  characterTable = document.createElement('table');
  characterTable.id = 'character-table';
  characterTable.className = 'ui very basic collapsing celled table';
  characterTable.innerHTML = `<tbody></tbody>`;

  addRowToTable(characterTable);

  body.appendChild(characterTable);

  fetch(URL + `/campaigns/${campaign.id}`)
  .then(resp => resp.json())
  .then(campaign => {
    campaign.characters.forEach(displayCharacter)
  });
}

// Display each character on campaign page
function displayCharacter(character) {
  characterTable = document.getElementById('character-table');
  if (characterCell % 3 == 0) {
    addRowToTable(characterTable, characterCell)
  }
  characterCell += 1

  currentCell = document.getElementById(`cell${characterCell}`)
  currentCell.hidden = false

  let div = document.createElement('div');
  createCharacterDivHtml(div, character)

  // div.querySelector('.ui.green.button').addEventListener('click', () => campaignHomePage());
  // div.querySelector('.ui.blue.button').addEventListener('click', () => console.log(event.target));
  // div.querySelector('.ui.red.button').addEventListener('click', () => console.log(event.target));

  currentCell.appendChild(div);
}

function createCharacterDivHtml(div, character) {
  div.className = 'ui card character';
  div.innerHTML = `
  <div class="content">
    <div class="header"></div>
    <div class="meta">
      <span class="right floated time">${character.race.name} ${character.char_class.name}</span>
      <span class="category">Level: ${character.level}</span>
    </div>
    <div class="description">
      <p>${character.bio.length > 180 ? character.bio.slice(0, 180)+'...' : character.bio}</p>
    </div>
  </div>
  <div class="extra content">
    <div class="right floated author">
      ${character.name}
    </div>
  </div>`;
}

// Edit a single campaign
// function editCampaign(campaign) {
//   clearCampaigns();

  //when hooking this up the backend, it will be necessary to write a
  //filter that uses the campaign object that's been passed in to find
  //the characters associated with that campaign

//   const newCampaignCharacter = document.createElement('button')
//   newCampaignCharacter.className = 'ui button'
//   newCampaignCharacter.innerText = 'Create New Character'
//   campaignCharactersList.appendChild(newCampaignCharacter)
//
//   newCampaignCharacter.addEventListener('click', newCharacter)
// }

// List characters specific to campaign
// function listCharacter(character) {
//   const campaignCharactersList = document.getElementById('campaign-characters-list')
//
//   const campaignCharacter = document.createElement('div')
//   campaignCharacter.className = 'item'
//   campaignCharacter.innerHTML = `
//   <img class='ui avatar image' src=''>
//   <div class='content'>
//     <a class='header'>${character.name}</a>
//     <div class='description'>${character.race} ${character.char_class}</div>
//   </div>`
//
//   const viewCampaignCharacter = document.createElement('button')
//   viewCampaignCharacter.className = 'ui button'
//   viewCampaignCharacter.innerText = 'View Character Sheet'
//
//   campaignCharactersList.appendChild(campaignCharacter)
//   campaignCharacter.appendChild(viewCampaignCharacter)
//
//   viewCampaignCharacter.addEventListener('click', function() {
//     viewCharacter(character)
//   })
// }
//
// function clearCharacters() {
//   const campaignCharactersList = document.getElementById('campaign-characters-list')
//
//   while (campaignCharactersList.firstChild) {
//     campaignCharactersList.removeChild(campaignCharactersList.firstChild)
//   }
//   campaignCharactersList.remove()
// }
//// End of Mass Character Related Functions ////
