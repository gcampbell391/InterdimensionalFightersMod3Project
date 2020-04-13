class EnemyAttack < ApplicationRecord
  belongs_to :enemy
  belongs_to :attack
end
