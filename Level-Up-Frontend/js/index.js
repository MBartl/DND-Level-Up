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
  const raceShowPage = document.createElement("div")
  // const raceShowPage.className =

  raceShowPage.innerHTML = `<h1>Race Name</h1>
  <div>Race Alignment
  Race Age
  Race Size
  <div>
  <div>Race Speed and Bonuses</div>
  <div>Race Traits</div>
  `

  body.appendChild(raceShowPage)
}

//Clears the page and fetches race data from server
function displayRaceCompendium(raceId){

  clearBody();

  fetch(URL + `/races/${raceId}`)
  .then(resp => resp.json())
  .then(race => displayRace(race))

}

//Accepts a race object as an argument and displays its data on the page
function displayRace(race){

  const raceShowPage = document.createElement("div")
  raceShowPage.className = "page"

  const raceHeader = document.createElement("h1")
  raceHeader.className = "ui header center aligned"
  raceHeader.innerText = `${race.name}`
  raceShowPage.appendChild(raceHeader)

  const raceFluff = document.createElement("div")
  raceFluff.className = "ui piled segment"
  raceFluff.innerHTML = `${race.alignment}<br> <br>${race.age}`
  raceShowPage.appendChild(raceFluff)

  let raceAbilityBonusArray = race.ability_bonuses
  raceAbilityBonusArray = raceAbilityBonusArray.replace(/\D/g,"");

  const raceStats = document.createElement("div")
  raceStats.className = "ui card"
  raceStats.innerHTML = `
  <div class="content">
    <div class="header">Speed and Bonuses</div>
  </div>
  <div class="content">
    <h4 class= "ui sub header"> Speed: ${race.speed}</h4>
  </div>
  <div class="content">
    Strength: ${raceAbilityBonusArray[0]}<br>
    Dexteriy: ${raceAbilityBonusArray[1]}<br>
    Constitution: ${raceAbilityBonusArray[2]}<br>
    Intelligence: ${raceAbilityBonusArray[3]}<br>
    Wisdom: ${raceAbilityBonusArray[4]}<br>
    Charisma: ${raceAbilityBonusArray[5]}<br>
  </div>
  `

  const raceTraitsHeader = document.createElement("h3")
  raceTraitsHeader.className = "ui header"
  raceTraitsHeader.innerText = "Traits"

  raceShowPage.appendChild(raceStats)
  raceShowPage.appendChild(raceTraitsHeader)

  const raceTraitItem = document.createElement("div")
  raceTraitItem.className = "ui raised segment"

  race.traits.forEach((trait) => appendRaceTraits(trait))

  function appendRaceTraits(trait){

    const raceTraitItemHeader = document.createElement("h5")
    raceTraitItemHeader.innerText = `${trait.name}`
    raceTraitItem.appendChild(raceTraitItemHeader)

    const raceTraitItemDesc = document.createElement("p")
    raceTraitItemDesc.innerText = `${trait.desc}`
    raceTraitItem.appendChild(raceTraitItemDesc)
  }

  raceShowPage.appendChild(raceTraitItem)

  body.appendChild(raceShowPage)
}
