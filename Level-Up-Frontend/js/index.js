const URL = 'http://localhost:3000/api/v1';
const body = document.querySelector('#body');

// Add event listeners to header and sidebar
const newCampaignButton = document.getElementById('new-campaign-button');
newCampaignButton.addEventListener('click', createCampaign);

const existingCampaignsButton = document.getElementById('existing-campaigns-button');
existingCampaignsButton.addEventListener('click', listCampaigns);

const newCharacterButton = document.getElementById('new-character-button');
newCharacterButton.addEventListener('click', characterFormPage)

const compendiumBtn = document.getElementById('compendium');
compendiumBtn.addEventListener('click', toggleCompendium);

const currentBtn = document.getElementById('current-campaign');
currentBtn.addEventListener('click', currentCampaignBtn);

//// Utility functions ////

// Adds row to table when number passes a multiple of 3
function addRowToTable(table, cellCounter, num) {
  newRow = document.createElement('tr');
  for (let i = 1; i <= num; i++) {
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
function currentCampaignBtn() {
  if (currentCampaign) {
    campaignHomePage(currentCampaign);
  }
  else {
    h3 = document.createElement('h3')
    h3.innerText = "Make a new campaign or choose from our existing campaigns first."
    body.appendChild(h3)
  }
};

// Toggles compendium options
function toggleCompendium() {
  menu = document.getElementById('extra-menu');
  menu.hidden == true ? menu.hidden = false : menu.hidden = true;

  const compendiumClassMenu = menu.querySelector('#classes');
  const compendiumRaceMenu = menu.querySelector('#races');
  const compendiumSpellMenu = menu.querySelector('#spells');

  const classSubMenu = document.getElementById('class-submenu');
  const raceSubMenu = document.getElementById('race-submenu');
  const spellSubMenu = document.getElementById('spell-submenu');

  compendiumClassMenu.addEventListener('click', () => {
    raceSubMenu.hidden = true;
    spellSubMenu.hidden = true;
    toggleClassCompendium(classSubMenu);
  });

  compendiumRaceMenu.addEventListener('click', () => {
    spellSubMenu.hidden = true;
    classSubMenu.hidden = true;
    toggleRaceCompendium(raceSubMenu);
  });

  compendiumSpellMenu.addEventListener('click', () =>{
    raceSubMenu.hidden = true;
    classSubMenu.hidden = true;
    toggleSpellCompendium(spellSubMenu)
  })
};

// Toggles a submenu for classes under the compendium and stashes a dataset in them to use for a fetch
function toggleClassCompendium(submenu){
  submenu.hidden == true ? submenu.hidden = false : submenu.hidden = true;

  const classSubMenuOptions = submenu.querySelectorAll(".item")
  let counter = 1
  while(counter <= 9){
    classSubMenuOptions.forEach(function(classItem){
      classItem.dataset.classId = counter
      classItem.addEventListener("click", function(){
        displayClassCompendium(classItem.dataset.classId)
      })
      counter += 1
    })
  }
}

//Clears the page and fetches class data from server
function displayClassCompendium(classId){
  clearBody()

  fetch(URL + `/char_classes/${classId}`)
  .then(resp => resp.json())
  .then(charClass => displayClass(charClass))
}

//Accepts a class object for its argument and displays its info in the body
function displayClass(charClass){

  clearBody();

  const classShowPage = document.createElement("div")
  classShowPage.className = "page"

  const classHeader = document.createElement("h1")
  classHeader.className = "ui header center aligned"
  classHeader.innerText = `${charClass.name}`
  classShowPage.appendChild(classHeader)

  //builds the subclass and lore segment
  const classSubclassDiv = document.createElement("div")
  classSubclassDiv.className = "ui piled segment"
  classShowPage.appendChild(classSubclassDiv)

  const classSubclassHeader = document.createElement("h2")
  classSubclassHeader.innerText = `${charClass.subclasses[0].name}`
  classSubclassHeader.className = "ui header center aligned"
  classSubclassDiv.appendChild(classSubclassHeader)

  const classSubclassFlavor = document.createElement("h3")
  classSubclassFlavor.className = "ui header center aligned"
  classSubclassFlavor.innerText = `${charClass.subclasses[0].flavor}`
  classSubclassDiv.appendChild(classSubclassFlavor)

  const classSubclassFluff = document.createElement("p")
  classSubclassFluff.innerText = `${charClass.subclasses[0].desc}`
  classSubclassDiv.appendChild(classSubclassFluff)

  //builds the proficiency segment
  const classProfDiv = document.createElement("div")

  const classProfHeader = document.createElement("h2")
  classProfHeader.innerText = "Proficiencies"
  classProfHeader.className = "ui header center aligned"
  classProfDiv.appendChild(classProfHeader)

  const classProfUl = document.createElement("ul")
  classProfUl.className = "ul list"
  classProfDiv.appendChild(classProfUl)

  const classProfItems = charClass.proficiencies

  function listClassProficiency(proficiencyItem){
    const classProfLi = document.createElement("li")
    classProfLi.innerText = `${proficiencyItem.name}`
    classProfUl.appendChild(classProfLi)
  }

  classProfItems.forEach(listClassProficiency)
  classShowPage.appendChild(classProfDiv)

  body.appendChild(classShowPage)
}

// Toggles a submenu for races under the compendium and stashes a dataset in them to use for a fetch
function toggleRaceCompendium(submenu){
  submenu.hidden == true ? submenu.hidden = false : submenu.hidden = true;

  const raceSubMenuOptions = submenu.querySelectorAll(".item")
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

// Clears the page and fetches race data from server
function displayRaceCompendium(raceId){

  clearBody();

  fetch(URL + `/races/${raceId}`)
  .then(resp => resp.json())
  .then(race => displayRace(race))

}



// Accepts a race object as an argument and displays its data on the page
function displayRace(race){

  clearBody()

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
  raceShowPage.appendChild(raceStats)

  if (!(race.name == "Human")) {
    const raceTraitsHeader = document.createElement("h3")
    raceTraitsHeader.className = "ui header"
    raceTraitsHeader.innerText = "Traits"

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
  }

  body.appendChild(raceShowPage)
}

function toggleSpellCompendium(submenu){
  submenu.hidden == true ? submenu.hidden = false : submenu.hidden = true;

  spellSubMenuOptions = submenu.querySelectorAll(".item")
  spellSubMenuOptions.forEach(hookUpListener)
  // spellSubMenuOptionsNames = Array.from(spellSubMenuOptions).map(option => option.innerText)

  function hookUpListener(menuItem){
    menuItem.addEventListener("click", function(){
      displaySpellCompendium(menuItem.innerText)
    })
  }
}

function displaySpellCompendium(spellSchool){

  fetch(URL + `/spells`)
  .then(resp => resp.json())
  .then(spells => displaySpells(spells, spellSchool))

}

function displaySpells(spells, spellSchool){
  clearBody();
  const filteredSpells = spells.filter(spell => spellSchool === spell.school)
  const spellCount = filteredSpells.length;

  const spellSchoolDiv = document.createElement("div")
  spellSchoolDiv.className = "page"

  spellSchoolDiv.innerHTML = `<h1 class=ui header center aligned> ${spellSchool}</h1>`

  const spellSchoolListing = document.createElement("div")
  spellSchoolListing.id = "spell-page"
  spellSchoolDiv.appendChild(spellSchoolListing)

  listSpell(spells);


  function listSpell(spells){

    const pageScroll = document.createElement("div")

    const spellFirst = document.createElement("button");
    spellFirst.id = "spell-first"
    spellFirst.innerText = "First"
    pageScroll.appendChild(spellFirst)

    const spellPrev = document.createElement("button");
    spellPrev.id = "spell-previous"
    spellPrev.innerText = "Previous"
    pageScroll.appendChild(spellPrev)

    const spellNext = document.createElement("button");
    spellNext.id = "spell-next"
    spellNext.innerText = "Next"
    pageScroll.appendChild(spellNext)

    const spellLast = document.createElement("button");
    spellLast.id = "spell-last"
    spellLast.innerText = "Last"
    pageScroll.appendChild(spellLast)

    spellFirst.addEventListener("click", firstPage)
    spellNext.addEventListener("click", nextPage)
    spellPrev.addEventListener("click", previousPage)
    spellLast.addEventListener("click", lastPage)
    spellSchoolListing.appendChild(pageScroll)

    const spellPage = document.createElement("div")
    spellSchoolListing.appendChild(spellPage)

    /////experimental
    let list = spells;
    let pageList = new Array();
    let currentPage = 1;
    let numberPerPage = 8;
    let numberOfPages = 1;

    function getNumberOfPages() {
      return Math.ceil(list.length / numberPerPage);
    }

    function load(){
      loadList();
    }

    function nextPage() {
      currentPage += 1;
      loadList();
    }

    function previousPage() {
      currentPage -= 1;
      loadList();
    }

    function firstPage() {
      currentPage = 1;
      loadList();
    }

    function lastPage() {
      currentPage = numberOfPages;
      loadList();
    }

    function loadList() {
      let begin = ((currentPage - 1) * numberPerPage);
      let end = begin + numberPerPage;

      pageList = list.slice(begin, end);
      drawList();
      check();
    }

    function drawList() {
        spellPage.innerHTML = "";
        for (r = 0; r < pageList.length; r++) {
          addSpell(pageList[r])
        }
    }

    function addSpell(spell){

      const singleSpellDiv = document.createElement("div")
      singleSpellDiv.className = "ui raised segment"

      const spellNameHeader = document.createElement("h3")
      spellNameHeader.className = "ui header"
      spellNameHeader.innerText = `${spell.name}`
      singleSpellDiv.appendChild(spellNameHeader)

      const spellInfo = document.createElement("p")
      spellInfo.innerHTML = `
      Level: ${spell.level}<br>
      ${spell.range} <br>
      ${spell.casting_time} <br>
      Duration: ${spell.duration}<br>
      Components: ${spell.components} <br>
      ${spell.desc}
      `
      singleSpellDiv.appendChild(spellInfo)
      spellPage.appendChild(singleSpellDiv)
    }

    function check() {
      // spellNext.disabled = currentPage == numberOfPages ? true : false;
      // spellPrev.disabled = currentPage == 1 ? true : false;
      // spellFirst.disabled = currentPage == 1 ? true : false;
      // spellLast.disabled = currentPage == numberOfPages ? true : false;
    }

    load();
      //////////
  }


    body.appendChild(spellSchoolDiv);
}
