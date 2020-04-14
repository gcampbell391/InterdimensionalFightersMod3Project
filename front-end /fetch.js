let ALLGAMES = [{ name: "TINY RICK", score: 300000 }]

fetch("http://localhost:3000/games")
    .then(resp => resp.json())
    .then(games => {
        games.forEach(game => {
            ALLGAMES.push({
                name: game.player_name,
                score: game.score
            })
        })
        ALLGAMES.sort(function(a, b) {
            return b.score - a.score;
        });
    })