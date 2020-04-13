class CreateEnemies < ActiveRecord::Migration[6.0]
  def change
    create_table :enemies do |t|
      t.string :name
      t.string :bio
      t.integer :enemy_hp
      t.string :enemy_image
      t.string :weakness

      t.timestamps
    end
  end
end
