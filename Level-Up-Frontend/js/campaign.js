let campaignCell = 0;
let currentCampaign;

// List of all campaigns
function listCampaigns() {
  characterCell = 0
  campaignCell = 0;
  clearBody();

  campaignTable = document.createElement('table');
  campaignTable.id = 'campaign-table';
  campaignTable.className = 'ui very basic collapsing celled table';
  campaignTable.innerHTML = `<tbody></tbody>`;

  body.appendChild(campaignTable);

  fetch(URL + '/campaigns')
  .then(resp => resp.json())
  .then(allCampaigns => {
    allCampaigns.forEach(listEachCampaign)
    scaleTextArea
  });
};

// Creates individual campaign cards
function listEachCampaign(campaign) {
  campaignTable = document.getElementById('campaign-table')
  if (campaignCell % 3 == 0) {
    addRowToTable(campaignTable, campaignCell, 3)
  }
  campaignCell += 1
  currentCell = document.getElementById(`cell${campaignCell}`)
  currentCell.hidden = false

  let div = document.createElement('div');
  div.className = 'ui card';
  div.id = 'campaign-list';
  div.style = 'width: 350px;'
  createCampaignDivHtml(div, campaign)

  div.querySelector('.ui.green.button').addEventListener('click', () => fetchCampaignDetails(campaign));
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
    .then(campaign => campaignHomePage(campaign))
}

// Fetches additional details for the campaign
function fetchCampaignDetails(campaign) {
  fetch(URL+ `/campaigns/${campaign.id}`)
    .then(resp => resp.json())
    .then(campaign => campaignHomePage(campaign))
}

// Home page for a single campaign
function campaignHomePage(campaign) {
  //sets the current campaign to last created or visited homepage
  currentCampaign = campaign

  characterCell = 0
  campaignCell = 0;
  clearBody();

  body.innerHTML = `
  <h1>${campaign.name}</h1>
  <table class="ui table" style="width: 66%">
  <thead>
    <tr>
    <th class="fifteen wide" style="font-style: normal">
      <textarea style="width: 100%; height: 12%; font-weight: normal;">${campaign.plot_notes}</textarea>
    </th>
    <th class="one wide">
      <button class="ui primary button">Add Character</button>
      <br>
      <button class="ui button">Save Description</button></th>
    </tr>
  </thead>
  </table>
  <h3>Characters:</h3>`;

  addCharacterBtn = body.querySelector('.ui.primary.button')
  addCharacterBtn.addEventListener('click', fetchUnassigned)

  goToCharacters(campaign.id);
}
