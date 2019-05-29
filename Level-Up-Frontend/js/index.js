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

const charactersBtn = document.getElementById('characters');
charactersBtn.addEventListener('click', checkCampaignCharacters)

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

// Current Campaign button
function currentCampaign() {
  if (currentCampaign) {
    campaignHomePage(currentCampaign);
  };
};

// Current Campaign Characters button
function checkCampaignCharacters() {
  if (currentCampaign) {
    currentCampaign.characters.forEach(displayCharacter);
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

// Get request for characters of one campaign
function fetchCharacters(campaign) {
  fetch(URL + `/campaigns/${campaign.id}`)
  .then(resp => resp.json())
  .then(campaignInfo => {
    campaignInfo.characters.forEach((character) => displayCharacter(character))
  });
};
