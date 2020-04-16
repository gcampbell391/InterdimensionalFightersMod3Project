# Interdimensional Fighters
 
Welcome to the battle for supremacy of the galaxy. Choose one of our heros and see how many enemies 
you can defeat before you run out of Hp! 

## API Setup

From the `back-end` directory, run the following commands to set up and start the server:

```sh
$ bundle install            # Install gems
$ rails db:migrate db:seed  # Migrate and seed
$ rails s                   # Start the server
```

A full list of available routes can be found by visiting `http://localhost:3000/rails/info/routes`.
  
## Start Up Front End 
From the `front-end` directory, run the following command to open up the app in the browser:

```sh
$ open html                # open index.html
```

## After App is open in browser 
There are 5 heros to choose from. Clicking on each hero's image will display their bio and attacks. Each hero and enemy have a battle type: "Power", "Speed", and "Magic". "Power beats Speed, Speed beats Magic, and Magic beats Power. If your hero's attack type is equivulant to the enemy's weakness, an extra "25" damage will be applied to your attack. This is also the same for the enemy when then enemy attacks the hero. After reviewing the heros and selecting one, press start game at the bottom to begin. 

## Battle 
In the first round, the hero will go first. After the first round the enemy will go first to add an extra challenge. The object of the game is to defeat as many enemies as you can before your HP falls below 0. After successfully defeating an enemy, the hero will be granted 100 HP to his overall HP. Consider this a gift to help out with the battles. A hero will have the option of 5 attacks on his turn. Each attack has a different attack value, but the same type(as of now). (Moves can also be used an infinite amount of times...meaning you can use the strongest attack every time....this is will be patched eventually). After the hero selects an attack the enemy will has their turn. The battle will contiune until either the hero or the enemy are defeated. An alert will appear when the enemy is defeated to notify the user before the next enemy is summoned. 

## Game Over
Two of the worst words ever combined..... When your selected hero reaches 0 HP or less, the game is over. A statistic page will render displaying how many enemies were defeated, how many turns you lasted, and your battle score. The battle score is an algorithm based of the enemies defeated and turns lasted. A form will be there to submit your initials with your score like an old school arcade name. Once submit is clicked, all the scores will be displayed in descending order by score with the corresponding name. There is a button at the bottom of the school with the option to play again. This will take you back to the index page to start a new game.(There is no save feature as of now...coming soon).


## Thanks and a little more about the App
Front-end: Javascript, HTML, CSS
Back-end: Ruby on Rails 
App was created from scratch in 4 days


Thanks for playing checking out the app!
Hope you enjoyed it!

---GC3