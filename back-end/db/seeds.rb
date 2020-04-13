# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Clearing Database..."
Attack.destroy_all()
Hero.destroy_all()
Enemy.destroy_all()

#All Attacks 
attacks = [
    {
        "name": "Sucker Punch",
        "attack_type": "Power",
        "attack_value": "30"
    },
    {
        "name": "NoseBreaker",
        "attack_type": "Power",
        "attack_value": "20"
    },
    {
        "name": "Judo Chop",
        "attack_type": "Power",
        "attack_value": "20"
    },
    {
        "name": "Curb Stomp",
        "attack_type": "Power",
        "attack_value": "50"
    },
    {
        "name": "Body Slam",
        "attack_type": "Power",
        "attack_value": "40"
    },
    {
        "name": "MailBox",
        "attack_type": "Speed",
        "attack_value": "20"
    },
    {
        "name": "NutCracker",
        "attack_type": "Speed",
        "attack_value": "30"
    },
    {
        "name": "Double Wet Willy",
        "attack_type": "Speed",
        "attack_value": "30"
    },
    {
        "name": "Slap on Back of Neck",
        "attack_type": "Speed",
        "attack_value": "40"
    },
    {
        "name": "Projectile Vomit In Face",
        "attack_type": "Speed",
        "attack_value": "50"
    },
    {
        "name": "Teleport Tooth Flick",
        "attack_type": "Magic",
        "attack_value": "20"
    },
    {
        "name": "Ruby RugBurn",
        "attack_type": "Magic",
        "attack_value": "30"
    },
    {
        "name": "Corona Cough",
        "attack_type": "Magic",
        "attack_value": "50"
    },
    {
        "name": "1Week Without Brushing Breathe Beam",
        "attack_type": "Magic",
        "attack_value": "40"
    },
    {
        "name": "Sinister Eye Poke",
        "attack_type": "Magic",
        "attack_value": "30"
    },
]

#All Heros 
heros = [
    {
        "name": "Rick Sanchez",
        "bio": "a sociopathic, nihilistic, grouchy, crude, rude, narcissistic, self-centered, alcoholic mad scientist",
        "hero_hp": "300",
        "hero_image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        "weakness": "Speed"
    },
    {
        "name": "Morty Smith",
        "bio": "Rick's neurotic 14-year-old grandson who is frequently dragged into Rick's misadventures",
        "hero_hp": "250",
        "hero_image": "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        "weakness": "Power"
    },
    {
        "name": "Summer Smith",
        "bio": "Morty's 17-year-old older sister, a more conventional and often superficial teenager",
        "hero_hp": "260",
        "hero_image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        "weakness": "Magic"
    },
    {
        "name": "Alan Rails",
        "bio": "A man who gained the ability to summon ghost trains after his parents were killed in a railroad accident",
        "hero_hp": "280",
        "hero_image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
        "weakness": "Speed"
    },
    {
        "name": "Alien Morty",
        "bio": "Pissed off human with antennae",
        "hero_hp": "310",
        "hero_image": "https://rickandmortyapi.com/api/character/avatar/18.jpeg",
        "weakness": "Power"
    }
]

#All Enemies
enemies = [
    {
        "name": "Abradolf Lincler",
        "bio": "A being created by Rick. He has the DNA of both Abraham Lincoln and Adolf Hitler",
        "enemy_hp": "280",
        "enemy_image": "https://rickandmortyapi.com/api/character/avatar/7.jpeg",
        "weakness": "Speed"
    },
    {
        "name": "Alien Googah",
        "bio": "Some ugly alien",
        "enemy_hp": "180",
        "enemy_image": "https://rickandmortyapi.com/api/character/avatar/13.jpeg",
        "weakness": "Power"
    },
    {
        "name": "Amish Cyborg",
        "bio": "An Amish cyborg, unlike the other parasites",
        "enemy_hp": "180",
        "enemy_image": "https://rickandmortyapi.com/api/character/avatar/16.jpeg",
        "weakness": "Magic"
    },
    {
        "name": "Alien Rick",
        "bio": "The Rick of Dimension J-19 Zeta 7",
        "enemy_hp": "230",
        "enemy_image": "https://rickandmortyapi.com/api/character/avatar/15.jpeg",
        "weakness": "Speed"
    },
    {
        "name": "Ants in my Eyes Johnson" ,
        "bio": " A man with ants crawling inside his eyes who owns an electronics store",
        "enemy_hp": "240",
        "enemy_image": "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
        "weakness": "Power"
    }
]

#All Stages
battle_stages = [
    {
        "stage_name": "Stage1",
        "stage_image": '/images/stage1.jpeg'
    },
    {
        "stage_name": "Stage2",
        "stage_image": '/images/stage2.jpeg'
    },
    {
        "stage_name": "Stage3",
        "stage_image": '/images/stage3.jpeg'
    },
    {
        "stage_name": "Stage4",
        "stage_image": '/images/stage4.jpeg'
    },
    {
        "stage_name": "Stage5",
        "stage_image": '/images/stage5.jpeg'
    }

]

#Enemy Attacks 
enemy_attacks = [
    ####Abradolf Linclers Attacks 
    {
        "enemy_id": "1",
        "attack_id": "1"
    },
    {
        "enemy_id": "1",
        "attack_id": "2"
    },
    {
        "enemy_id": "1",
        "attack_id": "3"
    },
    {
        "enemy_id": "1",
        "attack_id": "4"
    },
    {
        "enemy_id": "1",
        "attack_id": "5"
    },
    ####Alien Googahs Attacks
    {
        "enemy_id": "2",
        "attack_id": "6"
    },
    {
        "enemy_id": "2",
        "attack_id": "7"
    },
    {
        "enemy_id": "2",
        "attack_id": "8"
    },
    {
        "enemy_id": "2",
        "attack_id": "9"
    },
    {
        "enemy_id": "2",
        "attack_id": "10"
    },
    ####Amish Cyborgs Attacks 
    {
        "enemy_id": "3",
        "attack_id": "11"
    },
    {
        "enemy_id": "3",
        "attack_id": "12"
    },
    {
        "enemy_id": "3",
        "attack_id": "13"
    },
    {
        "enemy_id": "3",
        "attack_id": "14"
    },
    {
        "enemy_id": "3",
        "attack_id": "15"
    },
    ####Alien Ricks Attacks 
    {
        "enemy_id": "4",
        "attack_id": "1"
    },
    {
        "enemy_id": "4",
        "attack_id": "2"
    },
    {
        "enemy_id": "4",
        "attack_id": "3"
    },
    {
        "enemy_id": "4",
        "attack_id": "4"
    },
    {
        "enemy_id": "4",
        "attack_id": "5"
    },
    ###Ants in my Eyes Johnsons attacks
    {
        "enemy_id": "5",
        "attack_id": "6"
    },
    {
        "enemy_id": "5",
        "attack_id": "7"
    },
    {
        "enemy_id": "5",
        "attack_id": "8"
    },
    {
        "enemy_id": "5",
        "attack_id": "9"
    },
    {
        "enemy_id": "5",
        "attack_id": "10"
    }
]

#Hero Attacks 
hero_attacks = [
    ####Ricks Attacks 
    {
        "hero_id": "1",
        "attack_id": "1"
    },
    {
        "hero_id": "1",
        "attack_id": "2"
    },
    {
        "hero_id": "1",
        "attack_id": "3"
    },
    {
        "hero_id": "1",
        "attack_id": "4"
    },
    {
        "hero_id": "1",
        "attack_id": "5"
    },
    ####Mortys Attacks
    {
        "hero_id": "2",
        "attack_id": "6"
    },
    {
        "hero_id": "2",
        "attack_id": "7"
    },
    {
        "hero_id": "2",
        "attack_id": "8"
    },
    {
        "hero_id": "2",
        "attack_id": "9"
    },
    {
        "hero_id": "2",
        "attack_id": "10"
    },
    ####Summers Attacks 
    {
        "hero_id": "3",
        "attack_id": "11"
    },
    {
        "hero_id": "3",
        "attack_id": "12"
    },
    {
        "hero_id": "3",
        "attack_id": "13"
    },
    {
        "hero_id": "3",
        "attack_id": "14"
    },
    {
        "hero_id": "3",
        "attack_id": "15"
    },
    ####Alans Attacks 
    {
        "hero_id": "4",
        "attack_id": "1"
    },
    {
        "hero_id": "4",
        "attack_id": "2"
    },
    {
        "hero_id": "4",
        "attack_id": "3"
    },
    {
        "hero_id": "4",
        "attack_id": "4"
    },
    {
        "hero_id": "4",
        "attack_id": "5"
    },
    ###Alien Morty 
    {
        "hero_id": "5",
        "attack_id": "6"
    },
    {
        "hero_id": "5",
        "attack_id": "7"
    },
    {
        "hero_id": "5",
        "attack_id": "8"
    },
    {
        "hero_id": "5",
        "attack_id": "9"
    },
    {
        "hero_id": "5",
        "attack_id": "10"
    }
]

#Create All Seed Data 
Attack.create(attacks)
puts "Creating attacks..."

Hero.create(heros)
puts "Creating heros..."

Enemy.create(enemies)
puts "Creating enemies..."

BattleStage.create(battle_stages)
puts "Creating battle..."

HeroAttack.create(hero_attacks)
puts "Creating hero attacks..."

EnemyAttack.create(enemy_attacks)
puts "Creating enemy attacks..."

puts "Wubba Lubba Dub Dub..."