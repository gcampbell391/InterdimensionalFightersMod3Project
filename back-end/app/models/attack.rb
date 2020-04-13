class Attack < ApplicationRecord
    has_many :hero_attacks 
    has_many :heros, through: :hero_attacks
    has_many :enemy_attacks
    has_many :enemies, through: :enemy_attacks
end
