class Battle < ApplicationRecord
  belongs_to :hero
  belongs_to :enemy
  belongs_to :battle_stage
end
