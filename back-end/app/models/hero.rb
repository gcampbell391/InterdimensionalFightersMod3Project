class Hero < ApplicationRecord
    has_many :hero_attacks
    has_many :attacks, through: :hero_attacks


    def self.totalHeros
        Hero.count
    end
end
