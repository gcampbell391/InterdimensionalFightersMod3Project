class CreateHeroAttacks < ActiveRecord::Migration[6.0]
  def change
    create_table :hero_attacks do |t|
      t.belongs_to :hero, null: false, foreign_key: true
      t.belongs_to :attack, null: false, foreign_key: true

      t.timestamps
    end
  end
end
