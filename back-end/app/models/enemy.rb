class Enemy < ApplicationRecord
    has_many :enemy_attacks
    has_many :attacks, through: :enemy_attacks
end
