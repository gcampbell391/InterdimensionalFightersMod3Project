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
        "stage_image": 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQx-0Ir7_sWEC_LB9i1oYJRuUy1Tg4_IXyn3TTftNPA9vsHRaE_&usqp=CAU'
    },
    {
        "stage_name": "Stage2",
        "stage_image": 'data:image/jpeg;base64,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'
    },
    {
        "stage_name": "Stage3",
        "stage_image": 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgb_AwRxyVyvt0f2JaXuqHuklOW9fWclZRuriAqU3OYAw_XY9y&usqp=CAU'
    },
    {
        "stage_name": "Stage4",
        "stage_image": 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTeXNBQGY3WYEE-I1Bn9rlJRtWuVQp4Z_wL3zplJw-7QHFUxqVG&usqp=CAU'
    },
    {
        "stage_name": "Stage5",
        "stage_image": 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1WQtHofBx7MTeaFKIPz_fUBOBon3-fCo5CqNyX9HyMnXmpk01&usqp=CAU'
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