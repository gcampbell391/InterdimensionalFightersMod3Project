class Hero < ApplicationRecord
    has_many :battles
    has_many :enemies, through: :battles
    has_many :hero_attacks
    has_many :attacks, through: :hero_attacks
end
