class CreateBattles < ActiveRecord::Migration[6.0]
  def change
    create_table :battles do |t|
      t.belongs_to :hero, null: false, foreign_key: true
      t.belongs_to :enemy, null: false, foreign_key: true
      t.belongs_to :battle_stage, null: false, foreign_key: true

      t.timestamps
    end
  end
end
