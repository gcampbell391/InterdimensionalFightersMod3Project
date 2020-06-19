//Variables 
const indexHead = document.querySelector("#indexHeading")
const indexBody = document.querySelector("#indexBody")
let heroDetailParent = document.querySelector("#hero_details")
let heroAttacks = document.querySelector("#hero_attacks")
let optionParent = document.querySelector("#game_options")

//Start Up Application
function bootUpApp() {
    fetchHeros()
}

//Fetches all Heros
function fetchHeros() {
    fetch("https://floating-sea-80416.herokuapp.com/heros")
        .then(resp => resp.json())
        .then(heros => {
            heros.forEach(hero => {
                renderHero(hero)
            })
        })
}

//function create attack table
function createAttackTable() {
    //Create table and elements
    let attackTable = document.createElement("table")
    attackTable.id = "attackTableBody"
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")
    let headerTitle = document.createElement("caption")
    headerTitle.id = "tableCaption"
    headerTitle.innerText = "Attacks"
    //Create table header information
    let headerRow = document.createElement("tr")
    let headerName = document.createElement("td")
    headerName.innerText = "Name"
    let headerType = document.createElement("td")
    headerType.innerText = "Type"
    let headerValue = document.createElement("td")
    headerValue.innerText = "Value"
    //Slap table header info on onto row and then table
    headerRow.append(headerName, headerType, headerValue)
    thead.append(headerTitle, headerRow)
    attackTable.append(thead, tbody)
    let heroAttacks = document.querySelector("#hero_attacks")
    heroAttacks.append(attackTable)
}
//Create single attack row
function createAttackRow(attack) {
    let attackTable = document.querySelector("#attackTableBody")
    let attackRow = document.createElement("tr")
    //Create Attack Name Data
    let attackName = document.createElement("td")
    attackName.innerText = attack.name
    //Create Attack Type Data
    let attackType = document.createElement("td")
    attackType.innerText = attack.attack_type
    //Create Attack Power Data
    let attackPower = document.createElement("td")
    attackPower.innerText = attack.attack_value
    //Slap row on table
    attackRow.append(attackName, attackType, attackPower)
    attackTable.append(attackRow)
}

//Creates a start game button
function startBtn(heroId) {
    let optionParent = document.querySelector("#game_options")
    let startGameBtn = document.createElement("button")
    let lineBreak = document.createElement("br")
    startGameBtn.innerText = "Start Game"
    startGameBtn.id = "startGameBtn"
    startGameBtn.dataset.id = heroId
    startGameBtn.addEventListener("click", function (e) {
        heroId = e.target.dataset.id
        indexHead.innerHTML = ""
        indexBody.innerHTML = ""
        //Starts Game
        startGame(heroId)
    })
    optionParent.append(lineBreak)
    optionParent.append(startGameBtn)
}

//Render Single Hero
function renderHero(hero) {
    let heroName = document.createElement("li")
    let heroImg = document.createElement("img")
    heroImg.classList.add("imageHoverAction")
    heroImg.dataset.id = hero.id
    heroImg.addEventListener("click", function (e) {
        heroDetailParent.innerHTML = ""
        heroAttacks.innerHTML = ""
        optionParent.innerHTML = ""
        let heroId = e.target.dataset.id
        fetch(`https://floating-sea-80416.herokuapp.com/heros/${heroId}`)
            .then(resp => resp.json())
            .then(hero => {
                renderHeroDetails(hero)
            })
    })
    heroImg.src = hero.hero_image
    heroImg.height = 200
    heroName.width = 200
    heroImg.append(heroName)
    let heroCard = document.querySelector("#hero_card")
    let heroContainer = document.querySelector("#heros")
    heroCard.appendChild(heroImg)
    heroContainer.appendChild(heroCard)
}

//Render Hero Details 
function renderHeroDetails(hero) {
    let heroName = document.createElement("h1")
    heroName.innerText = hero.name
    let heroBio = document.createElement("h4")
    heroBio.innerText = `Bio: ${hero.bio}`
    let heroHp = document.createElement("h4")
    heroHp.innerText = `HP: ${hero.hero_hp}`
    let heroWeakness = document.createElement("h4")
    heroWeakness.innerText = `Weakness: ${hero.weakness}`
    createAttackTable()
    hero.attacks.forEach(attack => {
        createAttackRow(attack)
    })
    let heroDetails = document.createElement("div")
    heroDetails.append(heroName, heroBio, heroHp, heroWeakness)
    heroDetailParent.append(heroDetails)
    startBtn(hero.id)
}