class HeroAttack < ApplicationRecord
  belongs_to :hero
  belongs_to :attack
end
