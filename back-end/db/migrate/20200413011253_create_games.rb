class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :player_name
      t.integer :score

      t.timestamps
    end
  end
end
