const URL = 'http://localhost:3000/api/v1';
const body = document.querySelector('#body');

let tableCell;
let currentCampaign;

// Add event listeners to header and sidebar
const newCampaignButton = document.getElementById('new-campaign-button');
newCampaignButton.addEventListener('click', createCampaign);

const existingCampaignsButton = document.getElementById('existing-campaigns-button');
existingCampaignsButton.addEventListener('click', listCampaigns);

const compendiumBtn = document.getElementById('compendium');
compendiumBtn.addEventListener('click', toggleCompendium);

// Toggles compendium options
function toggleCompendium() {
  menu = document.getElementById('menu');
  menu.hidden == true ? menu.hidden = false : menu.hidden = true;
};

// List of all campaigns
function listCampaigns() {
  tableCell = 0;
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
    allCampaigns.forEach(listEachCampaign)});
};

// Lists each campaign
function listEachCampaign(campaign) {
  campaignTable = document.getElementById('campaign-table')
  if (tableCell % 3 == 0) {
    addRowToTable(campaignTable)
  }
  tableCell += 1
  currentCell = document.getElementById(`cell${tableCell}`)
  currentCell.hidden = false

  div = document.createElement('div');
  div.className = 'ui card';
  div.id = 'campaign-list';
  div.style = 'width: 350px;'
  createCampaignDivHtml(div, campaign)

  div.querySelector('.ui.green.button').addEventListener('click', () => campaignHomePage(campaign));
  div.querySelector('.ui.blue.button').addEventListener('click', () => console.log(event.target));
  div.querySelector('.ui.red.button').addEventListener('click', () => console.log(event.target));

  currentCell.appendChild(div);
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
          <textarea style="height: 160px; width: 320px;">
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
      <button class="ui red button">Discard</button>
    </div>
  </div>`;
}

// Adds row when campaigns pass a multiple of 3
function addRowToTable(campaignTable) {
  newRow = document.createElement('tr')
  newRow.innerHTML = `
  <td id=cell${tableCell+1} hidden=true style="padding: 1.5em 0.8em;"></td>
  <td id=cell${tableCell+2} hidden=true style="padding: 1.5em 0.8em;"></td>
  <td id=cell${tableCell+3} hidden=true style="padding: 1.5em 0.8em;"></td>`;

  campaignTable.firstChild.appendChild(newRow)
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
      <textarea name='campaign-description' form='create-campaign-form' style='height: 250px; width: 300px;'></textarea>
      <br><br>
      <input type='submit' value='Submit'>
    </div>`;
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

// Home page for a single campaign
function campaignHomePage(campaign) {
  debugger
}


function clearBody() {
  const body = document.getElementById('body')
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
}

//////////////// End of Campaign related functions //////////////


/////////////// Start of Individual Campaign related functions //
function editCampaign(campaign) {
  clearCampaigns();

  const campaignCharactersList = document.createElement('ul')
  campaignCharactersList.id = 'campaign-characters-list'
  campaignCharactersList.className = 'ul list'
  document.body.appendChild(campaignCharactersList)

  fetch(URL + '/characters')
    .then(resp => resp.json())
    .then(allCharacters => allCharacters.forEach(listCharacter))

  //when hooking this up the backend, it will be necessary to write a
  //filter that uses the campaign object that's been passed in to find
  //the characters associated with that campaign

  const newCampaignCharacter = document.createElement('button')
  newCampaignCharacter.className = 'ui button'
  newCampaignCharacter.innerText = 'Create New Character'
  campaignCharactersList.appendChild(newCampaignCharacter)

  newCampaignCharacter.addEventListener('click', newCharacter)
}

function listCharacter(character) {
  const campaignCharactersList = document.getElementById('campaign-characters-list')

  const campaignCharacter = document.createElement('div')
  campaignCharacter.className = 'item'
  campaignCharacter.innerHTML = `<img class='ui avatar image' src=''>
    <div class='content'>
      <a class='header'>${character.name}</a>
      <div class='description'>${character.race} ${character.char_class}</div>
    </div>`

  const viewCampaignCharacter = document.createElement('button')
  viewCampaignCharacter.className = 'ui button'
  viewCampaignCharacter.innerText = 'View Character Sheet'

  campaignCharactersList.appendChild(campaignCharacter)
  campaignCharacter.appendChild(viewCampaignCharacter)

  viewCampaignCharacter.addEventListener('click', function() {
    viewCharacter(character)
  })
}

function clearCharacters() {
  const campaignCharactersList = document.getElementById('campaign-characters-list')

  while (campaignCharactersList.firstChild) {
    campaignCharactersList.removeChild(campaignCharactersList.firstChild)
  }
  campaignCharactersList.remove()
}

////////////End of Mass Character Related Functions////////////

///////////Display Character Sheet Related Functions///////////

function viewCharacter(character) {
  clearCharacters()

  const characterSheet = document.createElement('div')
  document.body.appendChild(characterSheet)

  // const characterAbility
}

function getCharacterAbilityScores(character) {

  fetch('http://localhost:3000/routeTBD')
    .then(resp => resp.json())
    .then(scores => listScores(scores))

  function listScores(scores) {
    const abilityScoresUl = document.createElement('ul')

  }
}

///////

function newCharacter() {
  clearCharacters()

}
