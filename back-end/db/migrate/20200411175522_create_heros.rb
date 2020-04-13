class CreateHeros < ActiveRecord::Migration[6.0]
  def change
    create_table :heros do |t|
      t.string :name
      t.string :bio
      t.integer :hero_hp
      t.string :hero_image
      t.string :weakness

      t.timestamps
    end
  end
end
