const indexHead = document.querySelector("#indexHeading")
const indexBody = document.querySelector("#indexBody")

//Fetches all Heros
function fetchHeros() {
    fetch("http://localhost:3000/heros")
        .then(resp => resp.json())
        .then(heros => {
            heros.forEach(hero => {
                let heroName = document.createElement("li")
                let heroImg = document.createElement("img")
                heroImg.dataset.id = hero.id
                heroImg.addEventListener("click", function(e) {
                    let heroDetailParent = document.querySelector("#hero_details")
                    let heroAttacks = document.querySelector("#hero_attacks")
                    let optionParent = document.querySelector("#game_options")
                    heroDetailParent.innerHTML = ""
                    heroAttacks.innerHTML = ""
                    optionParent.innerHTML = ""
                    let heroId = e.target.dataset.id
                    fetch(`http://localhost:3000/heros/${heroId}`)
                        .then(resp => resp.json())
                        .then(hero => {
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
            })
        })
}


//function create attack table
function createAttackTable() {
    let attackTable = document.createElement("table")
    attackTable.id = "attackTableBody"
    let thead = document.createElement("thead")
    let tbody = document.createElement("tbody")
    let headerTitle = document.createElement("caption")
    headerTitle.id = "tableCaption"
    headerTitle.innerText = "Attacks"
    let headerRow = document.createElement("tr")
    let headerName = document.createElement("td")
    headerName.innerText = "Name"
    let headerType = document.createElement("td")
    headerType.innerText = "Type"
    let headerValue = document.createElement("td")
    headerValue.innerText = "Value"
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
    let attackName = document.createElement("td")
    attackName.innerText = attack.name
    let attackType = document.createElement("td")
    attackType.innerText = attack.attack_type
    let attackPower = document.createElement("td")
    attackPower.innerText = attack.attack_value
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
    startGameBtn.addEventListener("click", function(e) {
        heroId = e.target.dataset.id
        indexHead.innerHTML = ""
        indexBody.innerHTML = ""
        startGame(heroId)

    })
    optionParent.append(lineBreak)
    optionParent.append(startGameBtn)
}