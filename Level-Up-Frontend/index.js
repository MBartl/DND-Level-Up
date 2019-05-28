const URL = 'http://localhost:3000/api/v1'
const body = document.querySelector('#body')

const newCampaignButton = document.getElementById('new-campaign-button')
newCampaignButton.addEventListener('click', createCampaign)

const existingCampaignsButton = document.getElementById('existing-campaigns-button')
existingCampaignsButton.addEventListener('click', listCampaigns)


function listCampaigns() {
  fetch(URL + '/campaigns')
  .then(resp => resp.json())
  .then(allCampaigns => {
    debugger
    allCampaigns.forEach(listEachCampaign)})
}


function listEachCampaign(campaign) {
  const body = document.getElementById('body')
  const campaignDiv = document.createElement('div')
  campaignDiv.className = 'ui items'

  campaignDiv.innerHTML = `
  <div class='ui small image'>
    <img src=''>
  </div>
  <div class='content'>
    <div class='header'>${campaign.name}</div>
    <div class='meta'></div>
    <div class='description'>
      <p>${campaign.plot_notes}</p>
    </div>
  </div>`

  const editCampaignButton = document.createElement('button')
  editCampaignButton.className = 'ui button'
  editCampaignButton.innerText = 'Edit This Campaign'
  editCampaignButton.addEventListener('click', function() {
    editCampaign(campaign)
  })

  body.appendChild(campaignDiv)
  campaignDiv.appendChild(editCampaignButton)
}


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


function createCampaignForm() {
  campaignForm = document.createElement('form')
  body.appendChild(campaignForm)
  campaignForm.className = 'ui form'
  campaignForm.id = 'campaign-form'

  campaignForm.innerHTML = `
    <div class='field'>
      <label>Title</label><br>
      <input type='text' name='campaign-name' style='width: 300px;'><br><br>

      <label>Summary</label><br>
      <textarea rows='2' name='campaign-description' form='create-campaign-form' style='height: 250px; width: 300px;'></textarea>
      <br><br>
      <input type='submit' value='Submit'>
    </div>`;
}


function createCampaignInstance(name, plot_notes) {
  clearForm();

  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': `application/json`,
      'Accept': `application/json`
    },
    body: JSON.stringify({name, plot_notes}),
  }

  fetch(URL + 'campaigns', configObj)
    .then(resp => resp.json())
    .then(campaign => {
      campaignHomePage(campaign)
    })
}


function campaignHomePage(campaign) {

}


function clearBody() {
  const body = document.getElementById('body')
  while (body.firstChild) {
    body.removeChild(body.firstChild)
  }
}

function clearCampaigns() {
  const campaignList = document.getElementById('current-campaigns')
  console.log(campaignList)
  while (campaignList.firstChild) {
    campaignList.removeChild(campaignList.firstChild)
  }
  campaignList.remove()
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
