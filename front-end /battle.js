let currentHeroHp = 0
let currentEnemyHp = 0
let currentHeroName = ""
let currentEnemyName = ""
let currentEnemyAttacks = []
let turnAmount = 1
    // let allStages = []

function startGame(heroId) {

    //Clear page and Create Header
    console.log(`battle: ${heroId}`)
    let battleHeader = document.createElement("h1")
    battleHeader.innerText = "Battle 1"
    indexHead.appendChild(battleHeader)
        // randomStageURL = allStages[Math.floor(Math.random() * 5) + 0].stage_image

    // Create 3 divs(Hero - left, Enemy - right, Battle log - bottom)
    let heroDiv = document.createElement("div")
    heroDiv.id = "heroDiv"
    fetch(`http://localhost:3000/heros/${heroId}`)
        .then(resp => resp.json())
        .then(hero => {
            console.log(hero)
            let heroImg = document.createElement("img")
            heroImg.src = hero.hero_image
            heroImg.height = 200
            heroImg.width = 200
            let heroName = document.createElement("h2")
            heroName.innerText = hero.name
            currentHeroName = hero.name

            let heroHp = document.createElement("h2")
            heroHp.id = "heroHp"
            currentHeroHp = hero.hero_hp
            heroHp.innerText = `Current HP: ${hero.hero_hp}`
            let heroAttackHeader = document.createElement("h2")
            heroAttackHeader.innerText = "Attacks"
            heroDiv.append(heroName, heroImg, heroHp, heroAttackHeader)
            let attackCount = 0
            hero.attacks.forEach(attack => {
                let attackBtn = document.createElement("button")
                attackBtn.dataset.id = attack.id
                attackBtn.value = attack.attack_value
                attackCount++
                attackBtn.id = `attackBtn${attackCount}`
                attackBtn.classList.add("attackBtns")
                attackBtn.innerText = attack.name
                attackBtn.style.display = "block"
                attackBtn.addEventListener("click", function(e) {
                    console.log(`Enemy HP: ${currentEnemyHp} Name: ${currentEnemyName}`)
                    console.log(`Hero HP: ${currentHeroHp} Name: ${currentHeroName}`)
                    console.log(turnAmount++)
                        //Hero's Turn
                    setTimeout(function() {
                        let attackPower = parseInt(e.target.value)
                        currentEnemyHp = currentEnemyHp - attackPower
                        let battleLogUl = document.querySelector("#battleLogUl")
                        let recentMove = document.createElement("li")
                        recentMove.innerText = `${currentHeroName} used ${e.target.innerText} and dealt ${attackPower} damage to ${currentEnemyName} `
                        if (currentEnemyHp <= 0) {
                            wonGame()
                        }
                        document.querySelector("#enemyHp").innerText = `Current HP: ${currentEnemyHp}`
                        battleLogUl.append(recentMove)
                        disableAttackBtns()
                    }, .5000);

                    //Enemy's Turn
                    setTimeout(function() {
                        let enemyAttack = currentEnemyAttacks[Math.floor(Math.random() * 5) + 0]
                        let enemyAttackName = enemyAttack.name
                        let enemyAttackValue = parseInt(enemyAttack.attack_value)
                        currentHeroHp = currentHeroHp - enemyAttackValue
                        if (currentHeroHp <= 0) {
                            lostGame()
                        }
                        document.querySelector("#heroHp").innerText = `Current HP: ${currentHeroHp}`
                        let enemyMove = document.createElement("li")
                        enemyMove.innerText = `${currentEnemyName} used ${enemyAttackName} and dealt ${enemyAttackValue} damage to ${currentHeroName} `
                        battleLogUl.append(enemyMove)
                        enableAttackBtns();
                    }, 2000);

                })
                heroDiv.append(attackBtn)
            })


        })

    let enemyDiv = document.createElement("div")
    enemyDiv.id = "enemyDiv"
    let enemyId = Math.floor(Math.random() * 5) + 1
    fetch(`http://localhost:3000/enemies/${enemyId}`)
        .then(resp => resp.json())
        .then(enemy => {
            console.log(enemy)
            currentEnemyAttacks = enemy.attacks
            let enemyImg = document.createElement("img")
            enemyImg.src = enemy.enemy_image
            enemyImg.height = 200
            enemyImg.width = 200
            let enemyName = document.createElement("h2")
            enemyName.innerText = enemy.name
            currentEnemyName = enemy.name
            let enemyHp = document.createElement("h2")
            enemyHp.id = "enemyHp"
            currentEnemyHp = enemy.enemy_hp
            enemyHp.innerText = `Current HP: ${enemy.enemy_hp}`
            enemyDiv.append(enemyName, enemyImg, enemyHp)
        })

    indexBody.append(heroDiv, enemyDiv)

    let battleBottom = document.querySelector("#battleBottom")
    let battleLog = document.createElement("ul")
    battleLog.id = "battleLogUl"
    let battleLogHeader = document.createElement("h2")
    battleLogHeader.innerText = "Battle Log"
    let battleLiBegin = document.createElement("li")
    battleLiBegin.innerText = "Battle Started..."
    battleLog.append(battleLiBegin)
    let battleLiBeginHero = document.createElement("li")
    battleLiBeginHero.innerText = "Please Select an Attack to Proceed..."
    battleLog.append(battleLiBeginHero)
    battleBottom.append(battleLogHeader, battleLog)
}

//Won Game function
function wonGame() {
    indexHead.innerHTML = ""
    indexBody.innerHTML = ""
    let battleHeader = document.createElement("h1")
    let battleScore = Math.round((100 / turnAmount) * currentHeroHp)
    let battleScoreTitle = document.createElement("h3")
    battleScoreTitle.innerText = "Final Score"
    let battleScoreHeader = document.createElement("h1")
    battleScoreHeader.innerText = battleScore

    let playerForm = document.createElement("form")
    playerForm.id = "playerForm"
    let battlePlayerNameInput = document.createElement("h3")
    battlePlayerNameInput.innerText = "Please Enter Your Initials"
    let playerName = document.createElement("input")
    playerName.placeholder = "Enter Here"
    let submitBtn = document.createElement("button")
    submitBtn.id = "submitBtn"
    submitBtn.innerText = "Submit"
    playerForm.append(battlePlayerNameInput, playerName, submitBtn)
    playerForm.addEventListener("submit", function(e) {
        e.preventDefault()
        const newGame = {
            name: e.target.querySelector("input").value,
            score: parseInt(e.target.parentElement.querySelector("h1").innerText)
        }
        fetch('http://localhost:3000/games', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGame)
            })
            .then(response => response.json())
            .then(game => {
                console.log(game)
                renderLeaderBoard()
            })
    })
    indexBody.append(battleScoreTitle, battleScoreHeader, battlePlayerNameInput, playerForm)
    battleHeader.innerText = "Congrats!!! You Won!!!"
    indexHead.appendChild(battleHeader)
    document.querySelector("#battleBottom").remove()
}


//Lost Game Function 
function lostGame() {
    indexHead.innerHTML = ""
    indexBody.innerHTML = ""
    document.querySelector("#battleBottom").remove()

    let lostHeader = document.createElement("h1")
    lostHeader.innerText = "Sorry..You Lose...."
    indexHead.append(lostHeader)
}


function disableAttackBtns() {
    let atkBtn1 = document.querySelector("#attackBtn1")
    atkBtn1.disabled = true
    atkBtn1.style.background = "black"

    let atkBtn2 = document.querySelector("#attackBtn2")
    atkBtn2.disabled = true
    atkBtn2.style.background = "black"

    let atkBtn3 = document.querySelector("#attackBtn3")
    atkBtn3.disabled = true
    atkBtn3.style.background = "black"

    let atkBtn4 = document.querySelector("#attackBtn4")
    atkBtn4.disabled = true
    atkBtn4.style.background = "black"
    let atkBtn5 = document.querySelector("#attackBtn5")
    atkBtn5.disabled = true
    atkBtn5.style.background = "black"
}

function enableAttackBtns() {
    let atkBtn1 = document.querySelector("#attackBtn1")
    atkBtn1.disabled = false
    atkBtn1.style.background = "white"

    let atkBtn2 = document.querySelector("#attackBtn2")
    atkBtn2.disabled = false
    atkBtn2.style.background = "white"

    let atkBtn3 = document.querySelector("#attackBtn3")
    atkBtn3.disabled = false
    atkBtn3.style.background = "white"

    let atkBtn4 = document.querySelector("#attackBtn4")
    atkBtn4.disabled = false
    atkBtn4.style.background = "white"
    let atkBtn5 = document.querySelector("#attackBtn5")
    atkBtn5.disabled = false
    atkBtn5.style.background = "white"
}


function fetchLeaderBoard() {

}

function renderLeaderBoard() {
    indexBody.innerHTML = ""
    indexHead.innerHTML = ""
    let leaderBoardHeader = document.createElement("h1")
    leaderBoardHeader.innerText = "High Scores"
    indexHead.append(leaderBoardHeader)
    let scoreOl = document.createElement("ol")
    scoreOl.id = "scoreOl"
    fetch("http://localhost:3000/games")
        .then(resp => resp.json())
        .then(games => {
            games.forEach(game => {
                let scoreLi = document.createElement("li")
                scoreLi.innerText = `${game.player_name}...............${game.score}`
                scoreOl.append(scoreLi)
            })
            let homeBtn = document.createElement("button")
            homeBtn.id = "homeBtn"
            homeBtn.innerText = "Play Again?!"
            homeBtn.addEventListener("click", function(e) {
                location.assign('file:///Users/gc3/Development/code/mod3project/front-end%20/index.html');
            })

            indexBody.append(scoreOl, homeBtn)
        });

}