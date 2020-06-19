//Variables
let currentHeroHp = 0
let currentEnemyHp = 0
let currentHeroName = ""
let currentEnemyName = ""
let currentEnemyAttacks = []
let currentHeroWeakness = ""
let currentEnemyWeakness = ""
let turnAmount = 1
let allStages = []
let enemiesDefeated = 0

function startGame(heroId) {

    //Clear page, Create Header, and Set Randomn Background image
    let battleHeader = document.createElement("h1")
    battleHeader.innerText = `Battle ${enemiesDefeated + 1}`
    indexHead.appendChild(battleHeader)
    randomStageURL = allStages[Math.floor(Math.random() * 5) + 0].stage_image
    document.body.style.backgroundImage = `url(${randomStageURL})`


    //Hero Div to display Hero 
    let heroDiv = document.createElement("div")
    heroDiv.id = "heroDiv"
    fetch(`https://floating-sea-80416.herokuapp.com/heros/${heroId}`)
        .then(resp => resp.json())
        .then(hero => {
            renderHero(hero)
        })

    //Create single Hero
    function renderHero(hero) {
        let heroImg = document.createElement("img")
        heroImg.src = hero.hero_image
        heroImg.id = "heroImage"
        heroImg.height = 200
        heroImg.width = 200
        let heroName = document.createElement("h2")
        heroName.innerText = hero.name
        currentHeroName = hero.name
        currentHeroWeakness = hero.weakness
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
            attackBtn.name = attack.attack_type
            attackCount++
            attackBtn.id = `attackBtn${attackCount}`
            attackBtn.classList.add("attackBtns")
            attackBtn.innerText = attack.name
            attackBtn.style.display = "block"
            attackBtn.addEventListener("click", function (e) {
                console.log(`Turn: ${turnAmount++}`)
                heroTurn(e)
                enemyTurn()
            })
            heroDiv.append(attackBtn)
        })
    }


    //Hero Turn Function
    function heroTurn(e) {
        let battleLogUl = document.querySelector("#battleLogUl")
        battleLogUl.innerHTML = ""
        let attackPower = parseInt(e.target.value)
        let attackType = e.target.name
        if (attackType === currentEnemyWeakness) {
            attackPower = attackPower + 25
            currentEnemyHp = currentEnemyHp - attackPower
            let advantageLi = document.createElement("li")
            advantageLi.innerText = `${currentEnemyName} is vulnerable to ${attackType} attacks...`
            let recentMove = document.createElement("li")
            recentMove.innerText = `${currentHeroName} used ${e.target.innerText} and dealt ${attackPower} damage to ${currentEnemyName}...it is super effective `
            battleLogUl.append(advantageLi, recentMove)
        } else {
            currentEnemyHp = currentEnemyHp - attackPower
            let recentMove = document.createElement("li")
            recentMove.innerText = `${currentHeroName} used ${e.target.innerText} and dealt ${attackPower} damage to ${currentEnemyName} `
            battleLogUl.append(recentMove)
        }
        if (currentEnemyHp <= 0) {
            enemiesDefeated++
            alert(`${currentEnemyName} has been defeated!`)
            nextEnemy()
        } else {
            setTimeout(function () {
                document.querySelector("#animateContainer").style.display = "none"
            },
                1500)
            attackAnimationContainerDiv.innerHTML = ""
            document.querySelector("#animateContainer").style.display = "block"
            let attackAnimationDiv = document.createElement("div")
            attackAnimationDiv.id = "attackAnimate"
            attackAnimationContainerDiv.append(attackAnimationDiv)
            heroMove()
            setTimeout(function () {
                document.querySelector("#enemyImage").classList.add("shakeImage")
                document.querySelector("#enemyHp").innerText = `Current HP: ${currentEnemyHp}`
            }, 1500)
            setTimeout(function () {
                document.querySelector("#enemyImage").classList.remove("shakeImage")
            }, 3000)
        }
        disableAttackBtns()
    }

    //Enemy Turn Function
    function enemyTurn() {
        setTimeout(function () {
            let enemyAttack = currentEnemyAttacks[Math.floor(Math.random() * 5) + 0]
            let enemyAttackName = enemyAttack.name
            let enemyAttackType = enemyAttack.attack_type
            let enemyAttackValue = parseInt(enemyAttack.attack_value)

            if (enemyAttackType === currentHeroWeakness) {
                enemyAttackValue = enemyAttackValue + 25
                currentHeroHp = currentHeroHp - enemyAttackValue
                if (currentHeroHp <= 0) {
                    gameOver()
                } else {
                    let advantageLi = document.createElement("li")
                    advantageLi.innerText = `${currentHeroName} is vulnerable to ${enemyAttackType} attacks...`
                    let enemyMove = document.createElement("li")
                    enemyMove.innerText = `${currentEnemyName} used ${enemyAttackName} and dealt ${enemyAttackValue} damage to ${currentHeroName}...it is super effective `
                    battleLogUl.append(advantageLi, enemyMove)
                }
            } else {
                currentHeroHp = currentHeroHp - enemyAttackValue
                if (currentHeroHp <= 0) {
                    gameOver()
                } else {
                    let enemyMove = document.createElement("li")
                    enemyMove.innerText = `${currentEnemyName} used ${enemyAttackName} and dealt ${enemyAttackValue} damage to ${currentHeroName}`
                    battleLogUl.append(enemyMove)
                }
            }
            attackAnimationContainerDiv.innerHTML = ""
            document.querySelector("#animateContainer").style.display = "block"
            let attackAnimationDiv = document.createElement("div")
            attackAnimationDiv.id = "attackAnimate"
            attackAnimationContainerDiv.append(attackAnimationDiv)
            enemyMove()
            setTimeout(function () {
                document.querySelector("#heroImage").classList.add("shakeImage")
                enableAttackBtns();
                document.querySelector("#heroHp").innerText = `Current HP: ${currentHeroHp}`
            }, 1500)
            setTimeout(function () {
                document.querySelector("#heroImage").classList.remove("shakeImage")
            }, 3000)
            setTimeout(function () {
                document.querySelector("#animateContainer").style.display = "none"
            },
                1500)

        }, 3000);
    }

    //Enemy Div to display Enemy
    let enemyDiv = document.createElement("div")
    enemyDiv.id = "enemyDiv"
    let enemyId = Math.floor(Math.random() * 5) + 1
    fetch(`https://floating-sea-80416.herokuapp.com/enemies/${enemyId}`)
        .then(resp => resp.json())
        .then(enemy => {
            renderEnemy(enemy)
        })

    //Render single Enemy
    function renderEnemy(enemy) {
        currentEnemyAttacks = enemy.attacks
        let enemyImg = document.createElement("img")
        enemyImg.id = "enemyImage"
        enemyImg.src = enemy.enemy_image
        enemyImg.height = 200
        enemyImg.width = 200
        let enemyName = document.createElement("h2")
        enemyName.id = "enemyName"
        enemyName.innerText = enemy.name
        currentEnemyName = enemy.name
        currentEnemyWeakness = enemy.weakness
        let enemyHp = document.createElement("h2")
        enemyHp.id = "enemyHp"
        currentEnemyHp = enemy.enemy_hp
        enemyHp.innerText = `Current HP: ${enemy.enemy_hp}`
        enemyDiv.append(enemyName, enemyImg, enemyHp)
    }

    //Create Animation Div
    let attackAnimationContainerDiv = document.createElement("div")
    attackAnimationContainerDiv.id = "animateContainer"

    //Slap Hero, Enemy, and Animation on the Body
    indexBody.append(heroDiv, enemyDiv, attackAnimationContainerDiv)

    //Create Battle Transanction Log Div 
    let battleBottom = document.querySelector("#battleBottom")
    battleBottom.classList.remove("hidden")
    let battleLog = document.createElement("ul")
    battleLog.id = "battleLogUl"
    let battleLogHeader = document.createElement("h2")
    battleLogHeader.innerText = "Battle Log"
    battleLogHeader.id = "battleLogHeader"
    let battleLiBegin = document.createElement("li")
    battleLiBegin.innerText = "Battle Started..."
    battleLog.append(battleLiBegin)
    let battleLiBeginHero = document.createElement("li")
    battleLiBeginHero.innerText = "Please Select an Attack to Proceed..."
    battleLog.append(battleLiBeginHero)
    //Slap BTL Div on Battle Bottom
    battleBottom.append(battleLogHeader, battleLog)

}

//Game Over function
function gameOver() {
    //Render Game Over page displaying battle statistics and input for initials
    indexHead.innerHTML = ""
    indexBody.innerHTML = ""
    let battleHeader = document.createElement("h1")
    let battleScore = Math.round((100 * turnAmount) * enemiesDefeated)
    console.log(` enemimies defeated: ${enemiesDefeated}, total turns: ${turnAmount}`)
    let battleScoreTitle = document.createElement("h3")
    battleScoreTitle.innerText = "Final Score"
    let battleScoreHeader = document.createElement("h1")
    battleScoreHeader.innerText = battleScore
    let battleDetails = document.createElement("h3")
    battleDetails.innerText = ` Enemies Defeated: ${enemiesDefeated}, Total Turns: ${turnAmount}`
    //Create Player Form for user input 
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
    playerForm.addEventListener("submit", function (e) {
        e.preventDefault()
        submitNewGame(e)
    })
    indexBody.append(battleDetails, battleScoreTitle, battleScoreHeader, battlePlayerNameInput, playerForm)
    battleHeader.innerText = "GAME OVER"
    indexHead.appendChild(battleHeader)
    document.querySelector("#battleBottom").remove()
}

//Submit New Game with Post Request and then display Leaderboard
function submitNewGame(e) {
    const newGame = {
        name: e.target.querySelector("input").value,
        score: parseInt(e.target.parentElement.querySelector("h1").innerText)
    }
    fetch('https://floating-sea-80416.herokuapp.com/games', {
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
}
//Next Enemy Function 
function nextEnemy() {
    console.log("On to the Next...")
    currentHeroHp = currentHeroHp + 100
    document.querySelector("#heroHp").innerText = `Current HP: ${currentHeroHp}`
    let battleLogUl = document.querySelector("#battleLogUl")
    battleLogUl.innerHTML = ""
    let nextRoundLi = document.createElement("li")
    nextRoundLi.innerText = `Round ${enemiesDefeated + 1}....`
    battleLogUl.append(nextRoundLi)
    document.querySelector("h1").innerText = `Battle ${enemiesDefeated + 1}`
    //Grab Next Enemy
    fetchNextEnemy()

}

//Fetches Next Enemy for nextEnemy function
function fetchNextEnemy() {
    let selectedEnemyImage = document.querySelector("#enemyImage")
    let selectedEnemyName = document.querySelector("#enemyName")
    let selectedEnemyHp = document.querySelector("#enemyHp")
    let enemyId = Math.floor(Math.random() * 5) + 1
    fetch(`https://floating-sea-80416.herokuapp.com/enemies/${enemyId}`)
        .then(resp => resp.json())
        .then(enemy => {
            selectedEnemyImage.src = enemy.enemy_image
            selectedEnemyName.innerText = enemy.name
            currentEnemyName = enemy.name
            selectedEnemyHp.innerText = `Current HP: ${enemy.enemy_hp}`
            currentEnemyHp = enemy.enemy_hp
            currentEnemyAttacks = enemy.attacks
        })
}


//Disables Attack btns until after enemy's turn
function disableAttackBtns() {
    //Hero Attack 1
    let atkBtn1 = document.querySelector("#attackBtn1")
    atkBtn1.disabled = true
    atkBtn1.style.background = "black"
    //Hero Attack 2
    let atkBtn2 = document.querySelector("#attackBtn2")
    atkBtn2.disabled = true
    atkBtn2.style.background = "black"
    //Hero Attack 3
    let atkBtn3 = document.querySelector("#attackBtn3")
    atkBtn3.disabled = true
    atkBtn3.style.background = "black"
    //Hero Attack 4
    let atkBtn4 = document.querySelector("#attackBtn4")
    atkBtn4.disabled = true
    atkBtn4.style.background = "black"
    //Hero Attack 5
    let atkBtn5 = document.querySelector("#attackBtn5")
    atkBtn5.disabled = true
    atkBtn5.style.background = "black"
}

//Enables Attack btns after enemy's turn
function enableAttackBtns() {
    //Hero Attack 1
    let atkBtn1 = document.querySelector("#attackBtn1")
    atkBtn1.disabled = false
    atkBtn1.style.background = "white"
    //Hero Attack 2
    let atkBtn2 = document.querySelector("#attackBtn2")
    atkBtn2.disabled = false
    atkBtn2.style.background = "white"
    //Hero Attack 3
    let atkBtn3 = document.querySelector("#attackBtn3")
    atkBtn3.disabled = false
    atkBtn3.style.background = "white"
    //Hero Attack 4
    let atkBtn4 = document.querySelector("#attackBtn4")
    atkBtn4.disabled = false
    atkBtn4.style.background = "white"
    //Hero Attack 5
    let atkBtn5 = document.querySelector("#attackBtn5")
    atkBtn5.disabled = false
    atkBtn5.style.background = "white"
}


//Render Leaderboard
function renderLeaderBoard() {
    indexBody.innerHTML = ""
    indexHead.innerHTML = ""
    document.body.style.backgroundImage = `url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGRgXFxYYFxUVFxgYFxUXFhcYGBcYHSggGBolGxYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0mICYvLS8vLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAEBQIDBgAB/8QAPBAAAQIEAwUGBQMEAgEFAAAAAQACAwQRIRIxQQUiUWFxMoGRobHBE0LR4fAGUvEUI2JykrLSFTNDgqL/xAAaAQADAQEBAQAAAAAAAAAAAAABAgMEAAUG/8QAKREAAgICAgEDAwQDAAAAAAAAAAECEQMhEjFBIjJRBGHwE3GR0UKBof/aAAwDAQACEQMRAD8A0UlEYwYnGrtALkBeumHRThG63U8uJPsgUS94azDp8xGbjwHIcV8Woq7PAryGMiQ2tv2RkOJ4niUPChGM7ERhYMgNfziuk5XHRzxb5W6dUyLrhoz9AulPwhHIsY0Dor2wHnIUCgGACtb6Lpqe/t4bh1rjgmjwV8vgaCi9MHjTlBhA6k8eSE+JepP5yQ8xM0sLlDNDnHqoU5djUGxtoE60Hifovdnz4NaGpretyRy5ZoGelcIrUEapa2IK7oJOlM03G1SOcqN62NUVBsg9rEOYWuGLWl9Lpbs2Zc0b4PiB40N1RPB8Qmj6N4Ur4mt0afkpLNcQVkvDd8j2no4fZeP2RXsuPeK+YVjZeIBQFhHMEHuIKq/p4w+b/i93obJ9fJCzz4cxD0Lh/wAh9Qof1LXHe3XeFOjhl0PiiYc1MNzGMcDQO8s1cychRrOFHcCL9yeojaAwYjbscXcj2vv1CvgbUDrOsfzVeRZEtG4ajhcgcxq0pdGuaRBQ6PHvSzhzzSOCZ20a+Vn2UH8oxkzjFOCwMGO6GbH6FO9mbTFRX85Hknc5VWq/Ox+eqGk7J1NQK9M+5APLmWdl4EdQnw0cMtD7Kxjw40eAa5GmfIqSirp6Y8E7oR4q53CWT8lTeblqOHMcloJ6RoatFuHBCDDSmvknjadME8flCaThY6srelW+4UpeTJLm5OHFRit+FEBGVajpqPUJw9lS17f5aUJtozsTQorobrWIzHsV7GIDsTcjenDiEXteBQh41seunl6IBrrEd4TJ2ghzTW6tl34XA+PRBSsTTwRKk1RHcWOYgqCOoS6SiUeOdvH7q+SiX6+qEjCjiOB/hKtF4u0aWVjUBGuiFjvNzr9F7BdYO4r2KB4q+SUpQS+Cyk2qDpCNiaCoT7hUIKRq23VWRs08/qHLDwotyuJAhUFtEQvFLG7VGbJHdmfkZUxHU0GZRI2fV5Luw2wHGnsrtmuDa86ADxV05NhtBqTQBdfpEb0euNBYVOQVsCFhHM5ldDcK0GiIhYa72SRRp0Ko7BY0SgqUvMYEOrUk5KzaEepoMvVKpqaput7zzXQVO2NFcdslEiBvVBxpwi9b6Kh8Uk0FyV40AG1HO1cew36ny6qqVgcmwuYD3NBiE1PZhtzPM8AhzEwimIN/xh597/uVOJOsLMJqa9pwG841rmdPFVQ4/wCyG0c3VcU2l0gt0XwJBxo6jRrvb58Mk0w2Adfu9lnY09EyLyOlvRCOiE5knqg4Sl2xabNaIQ4eyl8MjU+qyDIpGRI8kVLT0WoaCSSaAZpXhfydwNMCqpiVZEzseIzSw7Tex2GI2hGhsmErNtfkb8ElSjsXaK4fxIZwuOJuj9R14KUaOGmkQVacnU8nAa8wiVXEl/kd2XZXyXLJTCpbBJvZ9qsuM6Z24tPzBKwS01TFoiQHUN2E2PDmOB4jVXT8rXeAocyNCP3D3Co3HtFLTGv6c2kHDA4/nEdE0moZFR3rEwSWODm6LayMyI0IEZgfgStclx/j+h0/B0tFNN4E014/dCTkANcDm03UmRnDdBtWqKhEEFpy7Q6ajuPqlUlKP3RSMhLtSVxMqNLj3H5wXuxIuJhac2nyNx7puYFBTRKGN+HF5G3j9CucuUSE1TC48AOBacjrz0KzsRhaSDmLLUkJVtuXyeOh9j7eCXHLdCikI2BEqOaCVku+hVZK0LJWhnAd5KM67+5XiB6LyEbqE3opIGNjvZkSrAO787qKxwol2x4liOBHn/CdOYKVVYrkqNCVlMHtBWzVqrygc7dCvjwcTgOV08cb4NLey0VoXszVqjGZhdRNYTG0FAKJcP07ySauqGUbMhs00D4rtLD1NPIIWE5z34znXd66dwzU5w0hw4QzO8e/IefkEVIS2/QmwoK8yAXHzRSMaHuxpMBlSK1yr5nqTVDbUiNacLe/6Iudn2w2bugoPaiQx6tGJ+brn2HomzODioxV12zRJJRpAG0ZjT8olbzXdFybKyPELnWu4omFBEO1avIqXaNH825qSRlbt2DS0IGorRo7b+P+LeXqoRaE2FAMhoPqeak92gsBkPc8SvGMJyTOQrZUIV6m5UY8cN5ngmkOUa0VefYBKNoRoZO4P/sfZCHqZy2CPfU1UVy5aCpy1X6TkwBjPazHStB+c1lUdJbWiQqBpBAyr9QkyRbVIKdM1X6mkxEhl3zC4Pt4LHy2JpDgaIzaG3IkVuE2Gt/sEJCfXqlimlsLakzW7NcyKyvzDtDgfoiYz2sDnObiABWUko5Y4PbppxHA8lrZebbHbYci3gpSgmFRXjsWSMwIzCx2f5Q/nupxahgxZixPA5V6G3il0zLPl4oOmYPEag805iua9nEOHkVOS4v7EpKhS+WrkmGw3OhPpWxy4V4KmR55tOF3MZAqx1jTUG3deqN+B40xlNdqvEo2ACQOV+7UJfGiAsB4+R/kIuQj1A/OqEO7K4d9h0Vg04JNteFYO4FP8Ip0/Ag52WxAjiqVtj5serQFBfVoPEKE5DxMcOXpcLpNhDaHMV9aq4BR8mQyZC5XRm3NNCaKlaUzg2A+oV00LAoSUOYR0YbpUnpk1qRPY53nDl6H7rQwzu9yzeyTvnofUJ1jtRGM+DZohKiLHEOsjPjkFBfFwkOOiufGxGqKnxVp7saEqXZGYi1JUWxCNV49eBTcm3ZRPyIZeJjiuechU9ALDyTOTGR43PfdKvhFsN9Abuw9wrUp5BhGlsz5LRJNql2QivUgabJe8NGSB/U0wMWGtSBccCch4X70fMUhYib0HidAs3BHxYm9zc788Alj6IuL/KDklVxCpCDgaXuzIr0GaobF/t3u55q4ngDQU8FKYjl4cMmkjwGfiqyanKg4cALAIXSIN0RZD4o+rYbcR/OQVUBlTyClFhCKaHsg+J4dFPt7J3sVxnxI9wKMHh3nUoONALc0ZtCfq4NZ2W8MjT2U5eC6PYDC0Hecb9w4laoaRoj0LGtJNAKngLlGN2VGIqGHvIB8CU8/tS7eve5354JLO7WiPsDhbwGfedUydnJkdpRobsAhswECjsrm3DOlDfmgly5ELdnKyG3VQa2quNlzOo9ESiYbE2h8KJe4dQHxsfNKXOqvQ9LRybTtGy2qPisIGenUCyV7CjF1WHS46ajx9Vfs+aq5oJ7bAR/s0mvv4IJn9qaHAu8n/wA+SjJXFiSk5W2HToLX1GrfNv2RDH1ew8cJ8bKO1hQsP+VPEKmVzhdcPg/6EKKVqww2gmJEo1zODrdFfIxaEcENOD+48cCpw8lTGt7L4zUQIgpfLI92Sr+JUlDSb6w+lB7IuWczCQRR2hTrbptGruNC9o3nKxcW3qpYVmkqZjWzObSh0iOplWviKoQsTbabN/qB9PZCQpWocRkBVVjLRN9lMs26YOFj0QsCA4YXUsa+Vka0WPQoS7EfZRsrt9x9k4SjZPbPQ+oTdLLscF2mdwdQr2HeA6qvaDawndK+BVUKJWMBoG376fZF9HeRgG1I0RhkG6E+RSuPFvRSZMPFg4qmKcI++NmmDS7A4LwYJDe0BfjUlFfFobaWSWRrh/2cB3AYj7pu1io3W0Rh7rFH6jxBwqagiw8z6pZCOGG86uo0dM3eyebU2W+IajQZfnckMWA5rgxwpQ5dT9vJT5JsnO7tkzoOCkRQL3DRwHH+fZSArZI2Z3vZbLA4P9jny4+RVW15jAwMbYut0Gv51TBraADgs7tiLWKeVB9fMlPBXIfGtkNmyRjRGsGuZ4DUreTEmIUNrGgBuQ9STzSP9HS9A9+tgOhv7BMtoToxiHiuBl1+wVpNdFnKKWxDtXZLiXxcYyJoRkAMq1SFP/1BOUAhjM3d00HefRIEy6ORysbBcdCoAos/EAxEENOtLIsZV5IfCdSwTCBDGAA3tdLv6soiEX51HSinOMmHlTPX7OF6Hpw6Je4UNCtFDbWhS+Yg47gam6THkd0zpUE7JbX4R4Nf/wBqe69262j2O5f9TX3TORkcENh1oPMlx9kLt8NIZhyqfZcn6mSS2Xbci2Zxri8P5UthQjEw0+WJU8gaH1CT4iSK3tRPf0e+jojeQPgae6WMKVDY1Wi7abaRnjmPQFUtCntJ9Yz+tPC3sohM2rNZpZSA1kJpF8QBNeOdl6+EXVfQAEoaSZhAaeHmUWxxwj9tT4oylGUetfmy8Wmgd7F2FXR2ixGuaiQs81RFQ2xXtSDUAjNSlJYBlD82aOiQgdFYICEbEeFt2BCXFA0CwyUYmzyGkjgbdyJO6vJufDYZOuSfXkmoQ/yEmy22ceg/PFMoaFlIdG9d7pXRWRH4QSue0ZL9ZKO8OhOI4HyQWyGklxzNAOtf4RP/AMB/1Puq/wBOzIbEwkdqwPAqkYqTUWaIq2kTeCDexViYbTlC4hzRXQ+yizZhpdwB4Uqmn9Lk5OMVZo4O6EGzWWb0J8TQf9SnkGJhsQg5eHRkP/UegPuVfE5ZoOTi9EMethEaYYTZwsBXrRZjbcQOi4mnIAICba9rnEYgK0JFQLjIlQhCySt2LkyOWmSixTibzPsR7omWG8EKz/3YfVNZSWoSdKLpLaISXRNZScP9x/8AsfVawhZaYb/ecP8AP3VMfuDjNX+mDuvbwLfQj2StxJmKnVxRv6cf/cc3i2veCPqVPaQ32ng/1qPojLsM0ZufY5zokSlg4ivQ0HshAFp9syRbCeQLdr/9AlByGzMLsTrigp1Na+Huu/USWxuWgV+zwxgiE1oRiGlK3Cb7Q34VWkEGhHBU7TZSC4Dr5hL4c2WMDcwRWh9l2OdrZ0XYDEhOBuD4W7kzhNsCpMnXRW/Cs2uWteqvl5F0O5NRnSluqM8iWhpNIm6WdQCtKi46prJ7LaYZxV5aJfBjFzu/uTjeKg57Gg3e1ZVHjUBoOyPQJDtAuOAUsGlx5VP2WoiyrcBHmlW1ItGUAALt3uR4uD2dkxODVi6Tl8QLv2i3+xFvzomexWiHGIdbdNfJ3oiZKWEOGAdN49Rc+nklXxSS52pqPH7VQjO2wItg1cS4637zcpjs2BV18m3+n5yQcNtAnMBvw4dTnmepyHopt2PibdsthvqT/sAO6lUwigA7uSqkZawB+UVJ5n8Ksa04ha2ZPstMoNJRo241ohECsAUX3KtKRRVDR9zIhqkuC9TxjocAnnXolE8aua0flU0nW0NUrY4VdEOQsPz8zUJdnm5m+TsvqMhoq5ltWlCyccl19ao9FGOWpA7j/YP58yUwY5a4OGhqmE6+kAD9x8qk+wSlURos2kPbEItBxCp+XWqGjbRcTu2HBZVpoQeF0/awnIJ831ORpK/4LrK5HSMXFBZyse63pRM2MDRUpFsq0Mg5h5HkE2EewronhKMXbFwteRR+ooLmMJB3YjxiFMiKkUPckUPJara8+x0NzKElwNKiw5pBOiHumFYFoqL2drmhl4N+l2JmSu0UzcPC6DEHZIaDyNaFaCXZuEpPLUc1zD+A/ceaey3ZHMLPN1RABiBZmebSNWmZHjkVqsNbdyqmNgudW4vQjqLqilTGSd2kK9mR8EVjtK0PQ2PqtLOSgIJpcUI6g1HospEgkOLTmDQp7J7ZAa1rwa1oXaU49VRqx3G0GT7McJ7QKmlu69EtIonLhQoGeg5OHQrPPaIXehZMQw8Eaix7wk/9K47tN5tuFeHsnn9OceIHOzhx4KUWWa6+vFCMuJSNlGx5KICMdKaA0JHeE6bLVsTmb9NAFRCtTkm8KBkpzduy6hZ4dnMA3WjovZdjRpdGw2quLBrn5LVidLk0b0o/BQ9iQ/0uOKXO7LTbnzTCYDycLTQa/RUxhgbU5Dgo5cvPoy55qWl4K9rTADMIzdbuGfsEogCrgq5h5c7EfDgiZJmvcglxiZm9DGRh1eK5Z+CZtcHRA35W3PUZedEuhxQwW7R8hqU02ZCDbuzzPsF2JepF8KpDSA8DdpelT7BWYCQaKmXIJJFbro8RwqMgVv5pq5bX2N6aS+xVDF+imV4wWXtFBp1SFgqR6F491FW9yB2hGoKalI8lIXJk4oDmo5e48K2S+di/KMhnzKujPwivgl6jHezzW7dsIkBv9K/T3TGK6jSUNs1tiedPD+URGFcLeJ8hmqEmuUgHa9hDbwFfT7pajNrRKxDyoPc+ZKEa2poMymKF8jLl7gNMytbCkzQZJVJwAwADPU8Smg2mBnn1ojieKUn+p/oricN8hATT4lPlcx3iKIsRKttkUNQfHc05PZ5j+CrYTMDiytbVHulq0RTa2VugOfZoqUoiQDjwBu9WgHPgtDLFzXVb55JRtMObEx13wcXKuYSR4r9ys6asDOKE/eBBFiNafl1oIbqsaR/iR4pJtOeMYhxaAQKW1uT7ojYEzb4Z0rT3Hv4p8kU+jPJK9BzIoa8lxoBU10CdGYaRiB8LpHPQ/AihQWz37pYc27p6fKfBd4LY8jii7a7Q8/FZlk72KTuuj5KIGRHQXdl129+nqhpmAWOLT3HiFRN1ROOSTuLNDITIcxnGlPC3si48vibbX1WZ2XNYH043H+w07wta19W4meH5qjjhyTXlDwxqV/IC+RyAs7WqqiShbz48k0MZrxXJ35mr2RQeqjLg6cdGx44SdxYnlWAm6dQDa6HjQRWrRdEQIoNteC6K+C0Y0qLqqmO6gVqiV2RuS2GgBz28Ugn5jHl2Rl9Vo5mRDvsgYsm0NLQMI1pQV5ErOo0zHmi0zNfDJKYsAY30Ck2EGCp8ePRWSssXnE7s6Dj9k7dmdK2XbJli443Zac+fRNzqpQi1rbZonABvGmVgFWMLj2bccCUgQxu8bm/8KqLExO/MlQ+JUrsdEf124qHhf9LSlpRC6quLFohjMUzQwcXOSvK2hJ50tLsLdFS+MKkudkPRExClO05j5B3/AES9mTLNvQHMxsTq+CqXLkxIKk45FG58B1NySjsYBc85MHmfynehZRoa0vPd0+5XTs+z4Xw2XLqFx51qe9PFHJK7AYErEilxa0upd1Of4bKey2jHU0sCfb3R0nthsKAWMH9wnOlhUZk60+iRhPOMeKp78jSSpUPo880WBxHgPcq6BK4hV2ZSvZEHE8VyF1rYMqCKqcMMpuojYsfLozO1WlrmRB8tj41HuFcI7Xlr282kHMWqETEYHAg5GyVbPqyI6Gdcurbt8QhB2qIr4HMBB7VgVuM6IuXjYTUXVUxHxXpTNDIkld7LQpxoSR5dmAFpOO+NpFhwogYEQtfUZ5juTiPLOJqzvCEiyZcMbWm2ZoadF0ZWSlF2OXUeyo1FQk8zuOEQZdl/TQ9yu2dFLmmGDRw3mH2/OJV89EY5pdDBJpvsOjuHfdNHymKgXaMv8Rgc27hcU1HBCyk38UCHENHDsvOv+LvqqIEd0PfZUw9W8OR4dUVGk4cYY4Zo7Uc+Y0PNOFqwqNsU0s4E8xTwKM2bNPhkNiimlfldzroUsk9pvhEMjA00dmfHUJwydhuHbaQefrw70r5J2hFKcWM4+E7zDR3Dj9VbJTTaUNilsINbdoJB/abeFaK4tDuvgUk5Ny5GiGd3y8h0aZbWlQvKtPzAFL3MOtSOStAaPukUmnaKL6mV2MGuNL35hWtSiJOgfM0eaBjT/wDmT0FE3Pd0Uf1a+B9MTFLJTHmMVm7x4DLvKBdOD9pPU28AjJdxoCQByAolabezNkz32ewpCpxPuf26BMC0AVNgEPCil1T2WjNx9lU6O6Id0AMGp48aa9E7iu2VhHVsOlYtTUttSwOfUq/+qsQNdULAcCQ0G51PFcRRxB0S85pWuujRBtBr4IDQa1JQky8NuVaXCiFiuxGp/hGfFrSoXNNeAV8UkomC3C1QDL1R8KWFKlLGJmxxlJ6FU9M4W8zl9UlzR23YZa8HQi3LkqGN+E3G7tfKEyElp0weMcJoc1OSZjNKWGaCALjxJPmU8aBBh8/VypxFsG2rGyYOp9h+cktqpxCTVxNyfFVkInI8K9aFFWQm1KIRvsSCbu0TpsQjVds+UBaNGjhrxUo2z3V3XW529FywZWucTRHHKrQrgxsTMQzp5jTxS+M4RHNeLEZ9ylsaNdze8e/sq3DBEc3Qmo77/nRSSpmUJl49DhOWhRbmVSyKFfKTNLHL0XPemIpcWGy0csJtWvcvYE04McwAb1fPNc5tVU0kEHgfRDnOFK9f32a4zsEm9kxGD4gsRe1xTrxVDpltREyJ3YjfcLT/ANViGViKEZ8ikMxs0OOFtnVoM+5NPhyqLZOeNP2iuflXQXF7BuntN/NPRVuky4CJDqwkVplXofwJrtRseE4GK4PBFK6EDuFDfP1SyJKOib0HFu3w17NdW6KtNPiyStPiyobScNyKzENaihXNgMcawomE/tdburr5opzXgD40Ko0IAr3jj0UCyAeA8Wlc1Q1lslHhMeBHD22+Ugg94uBmjYjwSTDjUZoHOdUBJ4kvA/ce6/sipXZQLcbIhp3elF3HkqQavVBuF2sZv/Mqp8MaxGnxPoELihjtOd/xcPUKEd0Agbz/AA+yTiAJoNDVcGoSFMwmdlrj1Jp6oyV20yt2YR/jSviUHE6hrAl2tAJueJ9grY8cNG9b/H5j/wCIQceLFDPiNZhhnJ1QXGvOtfAIOE4uyDjzoT5p0kux4xS9wREmHRHNbSgqAAMhW3etDOyrmw2Ma0kNzNOA+5SKXknONwQE4M28ChcaZZ+6e8aTTffwasdU7B4TSCCMxdX1LiS7NTitbhBaak5hDRI4YCXeHos7gl6b+505KKLXnRQUQ61TbW+irZHxZC3Hj0S9mNy+S6tEO7bra4aGg1S/aM7Xdaban2CqkpYUxvs0cdfsjVBjka2hhGjh++6zRcV9fokc5Ml7q6aDgFZPzheaCzRkOPMq3Zsli33dkZDj9k8Y1titt7ZfsyWwj4jrWtyHFDTMYxHWyyA91ZPTRecLcvU/Rc1nw2lx7RsOSLFbr9zwSmOI2G08q8NSVoJxkKDAcy1CCADm51LHma66LLQ47mkOaSHcfVVxYrnHE4kk6m6tjyKEXrZaElCNeSUrDDntaci4A9CQFrJ3Z0FkM0YAbUN615lZjZxaIjS7IEFbGZiMe3CCDXK/mnxU4S6sphS4sp2fPtDcLrU/lWu2hXstqOOSAjbPe0A2+isY2golWbLFcXqhpZJRVGRhxC0gjMJnPkPa2I3oeX8H1XLlCfhmVlcOJiHMKD3UFVy5I1slJbDJGa0rXl9EcXYhY2XLkXp8R03F6JQIlLHLiu+PQmgFa1DtRTguXKL9L0Xi7VlceIXmrjVBPgNqbU5i3ouXLuTbs5g0aE4U3i4ftJr4E5KoxoWLeY4tpyrX6LlytCbvYvGN20CzUaDXdhuaP9q18clWyPDHyHvouXKjd7FlG2T/APUODT4+yGfNcGtHdVcuXJA4JBjZWC6HjMfepXDQC9MgMz3JYCuXJm0/Aza8IthvfYAm2QqaeC0cpORaAOh+3louXKOTYVFPsaunyWhuECipm3vGYXLkVBTxynLtUWq02eywcW3spFo+65cgkktGScmyEYClXGw45d6X/HMZ4hMOFpzPEAVPdQL1cngk2djVvYXtLZsGFhNSBS4JrX85JNOThfYWaMh9Vy5UyxSm6K5ElJ0WbPksZqeyPPkjo5LyWNs0dp2nQLlymTPYYa0booOJzPNLZmNiPIZLlyVCY9tyYMSvWrxcnKhEKHVM5bcoRmFy5Rk3ZSI3/qXPaKqsvXLldyb2xZNt7P/Z)`
    let leaderBoardHeader = document.createElement("h1")
    leaderBoardHeader.innerText = "High Scores"
    indexHead.append(leaderBoardHeader)
    fetchAllGames()
    setTimeout(function () {
        addHomebtn()
    }, 1000)
}

//Fetch all games
function fetchAllGames() {
    let scoreOl = document.createElement("ol")
    scoreOl.id = "scoreOl"
    let allGames = [{ name: "TINY RICK", score: 300000 }]
    fetch("https://floating-sea-80416.herokuapp.com/games")
        .then(resp => resp.json())
        .then(games => {
            games.forEach(game => {
                allGames.push({
                    name: game.player_name,
                    score: game.score
                })
            })
            allGames.sort(function (a, b) {
                return b.score - a.score;
            });
            allGames.forEach(game => {
                let scoreLi = document.createElement("li")
                scoreLi.innerText = `${game.name}...............${game.score}`
                scoreOl.append(scoreLi)
            })
            indexBody.append(scoreOl)
        })
}

//Creates Home btn 
function addHomebtn() {
    let homeBtn = document.createElement("button")
    homeBtn.id = "homeBtn"
    homeBtn.innerText = "Play Again?!"
    homeBtn.addEventListener("click", function (e) {
        location.assign('file:///Users/gc3/Development/code/mod3project/front-end%20/index.html');
    })

    indexBody.append(homeBtn)
}

//Fetch all Stages
fetch("https://floating-sea-80416.herokuapp.com/battle_stages")
    .then(resp => resp.json())
    .then(stages => {
        stages.forEach(stage => {
            allStages.push(stage)
        })
    })

//Animation function for Hero attack
function heroMove() {
    let elem = document.getElementById("attackAnimate");
    let pos = 0;
    let id = setInterval(frame, 5);

    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.left = pos + "px";
        }
    }
}

//Animation function for Enemy attack
function enemyMove() {
    let attackAnimationDiv = document.createElement("div")
    attackAnimationDiv.id = "attackAnimate"
    let elem = document.getElementById("attackAnimate");
    let pos = 0;
    let id = setInterval(frame, 5);

    function frame() {
        if (pos == 350) {
            clearInterval(id);
        } else {
            pos++;
            elem.style.right = pos + "px";
        }
    }
}